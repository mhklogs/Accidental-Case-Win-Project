import { getSupabase } from "./supabase";

export type TrustedFormClaim = {
  attemptedAt: string;
  status: "claimed" | "failed" | "skipped" | "not_configured";
  httpStatus?: number;
  response?: unknown;
  error?: string;
};

export type Lead = {
  id: string;
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
  trustedFormApiKey: string | null;
  trustedFormApiKeyUpdatedAt: string | null;
};

export type SocialLink = {
  id: string;
  type: string;
  label: string;
  url: string;
  createdAt: string;
};

/* ======================== SOCIAL / PROFESSIONAL LINKS ======================== */

// Stored in the shared `rom_store` jsonb table (key "ach_links") so no schema
// migration is needed. Service-role client bypasses RLS.
const SOCIAL_LINKS_KEY = "ach_links";

async function readSocialLinksRaw(): Promise<unknown> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("rom_store")
    .select("data")
    .eq("key", SOCIAL_LINKS_KEY)
    .maybeSingle();
  if (error) throw error;
  return data?.data ?? null;
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const value = await readSocialLinksRaw();
  if (Array.isArray(value)) return value as SocialLink[];
  if (value && typeof value === "object") return [value as SocialLink];
  return [];
}

export async function saveSocialLinks(links: SocialLink[]): Promise<SocialLink[]> {
  const sb = getSupabase();
  const { error } = await sb.from("rom_store").upsert({
    key: SOCIAL_LINKS_KEY,
    data: links,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
  return links;
}

/* ============================ LEADS ============================ */

export async function getLeads(): Promise<Lead[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r: Record<string, unknown>) => ({
    id: r.id as string,
    owner: r.owner as string,
    name: r.name as string,
    phone: r.phone as string,
    email: r.email as string,
    zip: r.zip as string,
    state: r.state as string,
    trustedFormCertUrl: (r.trusted_form_cert_url as string) ?? null,
    trustedFormClaim: r.trusted_form_claim
      ? (typeof r.trusted_form_claim === "string"
          ? JSON.parse(r.trusted_form_claim as string)
          : r.trusted_form_claim) as TrustedFormClaim
      : null,
    createdAt: r.created_at as string,
  }));
}

export async function addLead(
  input: Omit<Lead, "id" | "createdAt">
): Promise<Lead> {
  const sb = getSupabase();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const row = {
    id,
    owner: input.owner,
    name: input.name,
    phone: input.phone,
    email: input.email,
    zip: input.zip,
    state: input.state,
    trusted_form_cert_url: input.trustedFormCertUrl,
    trusted_form_claim: input.trustedFormClaim
      ? JSON.stringify(input.trustedFormClaim)
      : null,
    created_at: now,
  };
  const { error } = await sb.from("leads").insert(row);
  if (error) throw error;
  return { ...input, id, createdAt: now };
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const sb = getSupabase();
  const { data, error } = await sb.from("leads").select("*").eq("id", id).single();
  if (error || !data) return null;
  const r = data as Record<string, unknown>;
  return {
    id: r.id as string,
    owner: r.owner as string,
    name: r.name as string,
    phone: r.phone as string,
    email: r.email as string,
    zip: r.zip as string,
    state: r.state as string,
    trustedFormCertUrl: (r.trusted_form_cert_url as string) ?? null,
    trustedFormClaim: r.trusted_form_claim
      ? (typeof r.trusted_form_claim === "string"
          ? JSON.parse(r.trusted_form_claim as string)
          : r.trusted_form_claim) as TrustedFormClaim
      : null,
    createdAt: r.created_at as string,
  };
}

/* ============================ SETTINGS ============================ */

export async function getUserSettings(username: string): Promise<UserSettings> {
  const sb = getSupabase();
  const { data } = await sb
    .from("settings")
    .select("*")
    .eq("username", username)
    .single();
  return {
    trustedFormApiKey: data?.trusted_form_api_key ?? process.env.TRUSTEDFORM_API_KEY?.trim() ?? null,
    trustedFormApiKeyUpdatedAt: data?.updated_at ?? null,
  };
}

export async function setTrustedFormApiKey(
  username: string,
  apiKey: string
): Promise<UserSettings> {
  const sb = getSupabase();
  const now = new Date().toISOString();
  const { error } = await sb.from("settings").upsert(
    { username, trusted_form_api_key: apiKey, updated_at: now },
    { onConflict: "username" }
  );
  if (error) throw error;
  return { trustedFormApiKey: apiKey, trustedFormApiKeyUpdatedAt: now };
}

export async function clearTrustedFormApiKey(
  username: string
): Promise<UserSettings> {
  const sb = getSupabase();
  await sb.from("settings").delete().eq("username", username);
  return { trustedFormApiKey: null, trustedFormApiKeyUpdatedAt: null };
}
