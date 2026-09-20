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
  ip: string | null;
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

// Until the `ip` column is added to the `leads` table (migration below), IPs
// are parked here (rom_store jsonb, key "ach_lead_ips") so no lead data is lost.
// Migration: ALTER TABLE leads ADD COLUMN IF NOT EXISTS ip text;
const LEAD_IP_KEY = "ach_lead_ips";

async function getLeadIpMap(): Promise<Map<string, string>> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("rom_store")
    .select("data")
    .eq("key", LEAD_IP_KEY)
    .maybeSingle();
  if (error) return new Map();
  const value = data?.data;
  if (!Array.isArray(value)) return new Map();
  return new Map(
    value
      .filter((e: unknown) => e && typeof e === "object")
      .map((e) => {
        const rec = e as { leadId?: string; ip?: string };
        return [rec.leadId ?? "", rec.ip ?? ""] as const;
      })
  );
}

async function saveLeadIp(leadId: string, ip: string | null): Promise<void> {
  if (!ip) return;
  const sb = getSupabase();
  const map = await getLeadIpMap();
  map.set(leadId, ip);
  const { error } = await sb.from("rom_store").upsert({
    key: LEAD_IP_KEY,
    data: Array.from(map, ([id, value]) => ({ leadId: id, ip: value })),
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

async function withFallbackIp(lead: Lead): Promise<Lead> {
  if (lead.ip) return lead;
  const map = await getLeadIpMap();
  lead.ip = map.get(lead.id) ?? null;
  return lead;
}

export async function getLeads(): Promise<Lead[]> {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const leads: Lead[] = (data ?? []).map((r: Record<string, unknown>) => ({
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
    ip: (r.ip as string) ?? null,
    createdAt: r.created_at as string,
  }));
  const ipMap = await getLeadIpMap();
  return leads.map((l) => (l.ip ? l : { ...l, ip: ipMap.get(l.id) ?? null }));
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
    ip: input.ip ?? null,
    trusted_form_cert_url: input.trustedFormCertUrl,
    trusted_form_claim: input.trustedFormClaim
      ? JSON.stringify(input.trustedFormClaim)
      : null,
    created_at: now,
  };
  let { error } = await sb.from("leads").insert(row);
  if (
    error &&
    /Could not find the ['"]?ip['"]? column/i.test(error.message || "")
  ) {
    // `ip` column not migrated yet — retry without it, persist IP separately.
    const { ip: _ip, ...rowWithoutIp } = row;
    void _ip;
    const { error: retryError } = await sb.from("leads").insert(rowWithoutIp);
    if (retryError) throw retryError;
    await saveLeadIp(id, input.ip ?? null);
  } else if (error) {
    throw error;
  }
  return { ...input, id, createdAt: now };
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const sb = getSupabase();
  const { data, error } = await sb.from("leads").select("*").eq("id", id).single();
  if (error || !data) return null;
  const r = data as Record<string, unknown>;
  const lead: Lead = {
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
    ip: (r.ip as string) ?? null,
    createdAt: r.created_at as string,
  };
  return withFallbackIp(lead);
}

export async function updateLeadTrustedFormClaim(
  id: string,
  claim: TrustedFormClaim
): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb
    .from("leads")
    .update({ trusted_form_claim: JSON.stringify(claim) })
    .eq("id", id);
  if (error) throw error;
}

/**
 * Deletes every lead owned by `owner` except the single newest one.
 * Returns the number of rows deleted.
 */
export async function clearLeadsExceptNewest(owner: string): Promise<number> {
  const sb = getSupabase();
  // Newest lead wins; then delete everything else on this owner.
  const { data: newest, error: getError } = await sb
    .from("leads")
    .select("id")
    .eq("owner", owner)
    .order("created_at", { ascending: false })
    .limit(1);
  if (getError) throw getError;
  const keepId = newest?.[0]?.id;
  if (!keepId) return 0;
  const { count, error } = await sb
    .from("leads")
    .delete({ count: "exact" })
    .eq("owner", owner)
    .neq("id", keepId);
  if (error) throw error;
  return count ?? 0;
}

/* ============================ SETTINGS ============================ */

// The TrustedForm API key is managed server-side via the TRUSTEDFORM_API_KEY
// deployment env var (single ActiveProspect account for this site). The shared
// Supabase project's `settings` table is key/data (used by another app), so we
// never read or write per-user keys there.

const envTrustedFormApiKey = (): string | null =>
  process.env.TRUSTEDFORM_API_KEY?.trim() || null;

export async function getUserSettings(_username?: string): Promise<UserSettings> {
  return {
    trustedFormApiKey: envTrustedFormApiKey(),
    trustedFormApiKeyUpdatedAt: null,
  };
}

export async function setTrustedFormApiKey(): Promise<UserSettings> {
  return getUserSettings();
}

export async function clearTrustedFormApiKey(): Promise<UserSettings> {
  return getUserSettings();
}
