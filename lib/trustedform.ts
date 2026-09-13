import type { Lead, TrustedFormClaim } from "./db";
import { getUserSettings } from "./db";

const CLAIM_BASE = "https://cert.trustedform.com";

function certIdFromUrl(certUrl: string): string | null {
  const match = certUrl.match(/([0-9a-f]{40}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return match ? match[1] : null;
}

/**
 * Claims (and thereby retains) a TrustedForm certificate via ActiveProspect,
 * using the site's API key (set server-side via the TRUSTEDFORM_API_KEY env
 * var). Per the ActiveProspect docs the claim is a POST to the certificate URL
 * itself (https://cert.trustedform.com/{certificateId}) — NOT a /claims route:
 * https://developers.activeprospect.com/api-reference/trustedform/v2/overview
 *
 * Returns null-equivalent statuses when no key is configured so callers can
 * persist the lead regardless — certificate claiming must never block capture.
 */
export async function claimCertificate(
  lead: Partial<Lead> & { owner?: string }
): Promise<TrustedFormClaim> {
  const attemptedAt = new Date().toISOString();

  // Key resolution is env-driven (per-user storage isn't supported by the
  // shared DB). Guarded so a lookup failure can never block capture.
  let apiKey: string | null = null;
  try {
    const settings = await getUserSettings(lead.owner);
    apiKey = settings.trustedFormApiKey;
  } catch {
    apiKey = process.env.TRUSTEDFORM_API_KEY?.trim() ?? null;
  }

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
    // TrustedForm Certificate API v4.0 (Self-Service plan accounts).
    // v4.0 requires a JSON body with a `retain` operation plus a mandatory
    // `match_lead` operation and the `api-version: 4.0` header. The legacy
    // form-urlencoded v2/v3 format is rejected with
    // `400 {"reason":"No valid products detected"}` on v4.0 accounts.
    const email = lead.email?.trim().toLowerCase() || undefined;
    let phone = lead.phone?.trim() || undefined;
    if (phone) {
      phone = phone.replace(/[\s\-()]/g, "");
    }

    const matchLead: Record<string, string> = {};
    if (email) matchLead.email = email;
    if (phone) matchLead.phone = phone;

    const res = await fetch(`${CLAIM_BASE}/${certId}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`API:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "api-version": "4.0",
      },
      body: JSON.stringify({ retain: {}, match_lead: matchLead }),
      signal: AbortSignal.timeout(10_000),
    });

    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = (await res.json()) as Record<string, unknown>;
    } catch {
      /* non-JSON response body */
    }

    if (res.ok && parsed?.outcome === "success") {
      return {
        attemptedAt,
        status: "claimed",
        httpStatus: res.status,
        response: parsed,
        error: undefined,
      };
    }

    const reason =
      parsed && typeof parsed.reason === "string" ? parsed.reason : undefined;
    return {
      attemptedAt,
      status: "failed",
      httpStatus: res.status,
      response: parsed,
      error:
        reason ??
        (res.ok
          ? "TrustedForm could not retain this certificate."
          : `TrustedForm claim failed with HTTP ${res.status}.`),
    };
  } catch (err) {
    return {
      attemptedAt,
      status: "failed",
      error: err instanceof Error ? err.message : "Unknown error claiming certificate.",
    };
  }
}
