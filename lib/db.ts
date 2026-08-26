import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export type TrustedFormClaim = {
  attemptedAt: string;
  status: "claimed" | "failed" | "skipped" | "not_configured";
  httpStatus?: number;
  response?: unknown;
  error?: string;
};

export type Lead = {
  id: string;
  /** Username of the dashboard account this lead belongs to. */
  owner: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
  state: string;
  trustedFormCertUrl: string | null;
  trustedFormClaim: TrustedFormClaim | null;
  createdAt: string;
};

export type UserSettings = {
  /** Per-user ActiveProspect / TrustedForm API key. Persists until reset. */
  trustedFormApiKey: string | null;
  trustedFormApiKeyUpdatedAt: string | null;
};

type SettingsFile = Record<string, UserSettings>;

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

/* ------------------------- concurrency control ------------------------ */

/**
 * Serializes all writes through a single promise chain so simultaneous
 * requests (multiple users, multiple devices) never interleave
 * read-modify-write cycles on the JSON files.
 */
let writeQueue: Promise<unknown> = Promise.resolve();
function locked<T>(fn: () => Promise<T>): Promise<T> {
  const run = writeQueue.then(fn, fn);
  writeQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonAtomic(file: string, value: unknown): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${file}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf-8");
  await fs.rename(tmp, file);
}

export async function getLeads(): Promise<Lead[]> {
  return readJson<Lead[]>(LEADS_FILE, []);
}

export async function saveLeads(leads: Lead[]): Promise<void> {
  return locked(() => writeJsonAtomic(LEADS_FILE, leads));
}

export async function addLead(
  input: Omit<Lead, "id" | "createdAt">
): Promise<Lead> {
  return locked(async () => {
    const leads = await readJson<Lead[]>(LEADS_FILE, []);
    const lead: Lead = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    leads.unshift(lead);
    await writeJsonAtomic(LEADS_FILE, leads);
    return lead;
  });
}

/** Returns the calling user's own settings (falls back to an optional env-level key). */
export async function getUserSettings(
  username: string
): Promise<UserSettings> {
  const all = await readJson<SettingsFile>(SETTINGS_FILE, {});
  const own = all[username];
  return {
    trustedFormApiKey:
      own?.trustedFormApiKey ??
      (process.env.TRUSTEDFORM_API_KEY?.trim() || null),
    trustedFormApiKeyUpdatedAt: own?.trustedFormApiKeyUpdatedAt ?? null,
  };
}

export async function setTrustedFormApiKey(
  username: string,
  apiKey: string
): Promise<UserSettings> {
  return locked(async () => {
    const all = await readJson<SettingsFile>(SETTINGS_FILE, {});
    const settings: UserSettings = {
      trustedFormApiKey: apiKey,
      trustedFormApiKeyUpdatedAt: new Date().toISOString(),
    };
    all[username] = settings;
    await writeJsonAtomic(SETTINGS_FILE, all);
    return settings;
  });
}

export async function clearTrustedFormApiKey(
  username: string
): Promise<UserSettings> {
  return locked(async () => {
    const all = await readJson<SettingsFile>(SETTINGS_FILE, {});
    const settings: UserSettings = {
      trustedFormApiKey: null,
      trustedFormApiKeyUpdatedAt: null,
    };
    delete all[username];
    await writeJsonAtomic(SETTINGS_FILE, all);
    return settings;
  });
}
