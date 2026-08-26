import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { hashSecret, normalizeAnswer, verifySecret } from "./auth";

export type SecurityQuestion = {
  id: string;
  question: string;
  answerHash: string;
};

export type AdminUser = {
  username: string;
  passwordHash: string;
  securityQuestions: SecurityQuestion[];
  passwordChangedAt: string | null;
  createdAt: string;
  /** Username of the account that created this user (seeded user: null). */
  createdBy?: string | null;
};

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

async function readUsers(): Promise<Record<string, AdminUser>> {
  try {
    const raw = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeUsers(users: Record<string, AdminUser>): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${USERS_FILE}.${crypto.randomBytes(4).toString("hex")}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(users, null, 2), "utf-8");
  await fs.rename(tmp, USERS_FILE);
}

/**
 * Seeds the first admin account from env vars (or the provided defaults)
 * the very first time anyone looks up a user. Change credentials after
 * first login via the dashboard's settings panel.
 */
async function ensureSeeded(): Promise<void> {
  const users = await readUsers();
  if (Object.keys(users).length > 0) return;

  const username = (
    process.env.ADMIN_USERNAME || "umar@0987654321"
  ).toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "um@r#0987654321";

  users[username] = {
    username,
    passwordHash: hashSecret(password),
    securityQuestions: [],
    passwordChangedAt: null,
    createdAt: new Date().toISOString(),
  };
  await writeUsers(users);
}

export async function getUser(username: string): Promise<AdminUser | null> {
  await ensureSeeded();
  const users = await readUsers();
  return users[username.trim().toLowerCase()] ?? null;
}

/** The seeded/first account — fallback owner for leads without an explicit owner. */
export async function getPrimaryUsername(): Promise<string> {
  await ensureSeeded();
  const users = await readUsers();
  const first = Object.values(users).sort(
    (a, b) => a.createdAt.localeCompare(b.createdAt)
  )[0];
  return first?.username ?? "admin";
}

export async function saveUser(user: AdminUser): Promise<void> {
  const users = await readUsers();
  users[user.username] = user;
  await writeUsers(users);
}

export async function listUsers(): Promise<AdminUser[]> {
  await ensureSeeded();
  const users = await readUsers();
  return Object.values(users).sort(
    (a, b) => a.createdAt.localeCompare(b.createdAt)
  );
}

export async function deleteUser(username: string): Promise<boolean> {
  await ensureSeeded();
  const users = await readUsers();
  if (!users[username]) return false;
  delete users[username];
  await writeUsers(users);
  return true;
}

export async function setPassword(
  username: string,
  newPassword: string
): Promise<boolean> {
  const user = await getUser(username);
  if (!user) return false;
  user.passwordHash = hashSecret(newPassword);
  user.passwordChangedAt = new Date().toISOString();
  await saveUser(user);
  return true;
}

export async function replaceSecurityQuestions(
  username: string,
  entries: Array<{ question: string; answer: string }>
): Promise<boolean> {
  const user = await getUser(username);
  if (!user) return false;

  user.securityQuestions = entries.map((e) => ({
    id: crypto.randomUUID(),
    question: e.question.trim(),
    answerHash: hashSecret(normalizeAnswer(e.answer)),
  }));
  await saveUser(user);
  return true;
}

/** Verifies every provided answer against its matching stored question. */
export async function verifySecurityAnswers(
  user: AdminUser,
  answers: string[]
): Promise<boolean> {
  if (user.securityQuestions.length === 0) return false;
  if (answers.length !== user.securityQuestions.length) return false;
  return user.securityQuestions.every((q, i) =>
    verifySecret(normalizeAnswer(answers[i] ?? ""), q.answerHash)
  );
}
