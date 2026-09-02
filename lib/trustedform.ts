import type { Lead, TrustedFormClaim, UserSettings } from "./db";
import { getUserSettings } from "./db";

const CLAIM_BASE = "https://cert.trustedform.com";

function certIdFromUrl(certUrl: string): string | null {
  const match = certUrl.match(/([0-9a-f]{40}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return match ? match[1] : null;
}

/**
 * Claims (and thereby retains) a TrustedForm certificate via ActiveProspect,
 * using the OWNING USER's API key. Docs: https://docs.activeprospect.com/docs/trustedform-claim-api
 *
 * Returns null-equivalent statuses when no key is configured so callers can
 * persist the lead regardless — certificate claiming must never block capture.
 */
export async function claimCertificate(
  lead: Partial<Lead> & { owner?: string }
): Promise<TrustedFormClaim> {
  const attemptedAt = new Date().toISOString();
  const settings: UserSettings = lead.owner
    ? await getUserSettings(lead.owner)
    : { trustedFormApiKey: null, trustedFormApiKeyUpdatedAt: null };
  const apiKey = settings.trustedFormApiKey;

  if (!apiKey) {
    return { attemptedAt, status: "not_configured" };
  }
  if (!lead.trustedFormCertUrl) {
    return { attemptedAt, status: "skipped", error: "No TrustedForm certificate URL on lead." };
  }

  const certId = certIdFromUrl(lead.trustedFormCertUrl);
  if (!certId) {
    return { attemptedAt, status: "failed", error: "Could not parse certificate id from URL." };
  }

  try {
    const body = new URLSearchParams();
    body.set("page_id", process.env.TRUSTEDFORM_PAGE_ID || "accident-care-helpline");
    body.set("vendor", process.env.TRUSTEDFORM_VENDOR || "Accident Care Helpline");
    body.set("funnel", process.env.TRUSTEDFORM_FUNNEL || "Personal Injury");
    if (lead.email) body.set("email", lead.email);
    if (lead.phone) body.set("phone", lead.phone);
    if (lead.name) body.set("name", lead.name);

    const res = await fetch(`${CLAIM_BASE}/${certId}/claims`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: body.toString(),
      signal: AbortSignal.timeout(10_000),
    });

    let parsed: unknown = null;
    try {
      parsed = await res.json();
    } catch {
      /* non-JSON response body */
    }

    return {
      attemptedAt,
      status: res.ok ? "claimed" : "failed",
      httpStatus: res.status,
      response: parsed,
      error: res.ok ? undefined : `TrustedForm claim failed with HTTP ${res.status}.`,
    };
  } catch (err) {
    return {
      attemptedAt,
      status: "failed",
      error: err instanceof Error ? err.message : "Unknown error claiming certificate.",
    };
  }
}
