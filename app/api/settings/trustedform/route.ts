import { NextResponse } from "next/server";
import { getUserSettings } from "@/lib/db";
import { authenticate } from "@/lib/auth";

/**
 * TrustedForm API key status.
 * The key is managed server-side via the TRUSTEDFORM_API_KEY deployment env
 * var (never stored per-user in the database). This endpoint only reports
 * whether it's configured.
 */
export async function GET(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const settings = await getUserSettings(username);
  return NextResponse.json({
    configured: Boolean(settings.trustedFormApiKey),
    // Never return the raw key to the client — masked preview only.
    keyPreview: settings.trustedFormApiKey
      ? `${settings.trustedFormApiKey.slice(0, 4)}••••${settings.trustedFormApiKey.slice(-4)}`
      : null,
    source: "env",
    usingEnvFallback: true,
    updatedAt: settings.trustedFormApiKeyUpdatedAt,
  });
}

export async function POST(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // The key is set at deploy time via TRUSTEDFORM_API_KEY. Nothing is stored.
  const settings = await getUserSettings(username);
  return NextResponse.json({
    ok: true,
    configured: Boolean(settings.trustedFormApiKey),
    message: settings.trustedFormApiKey
      ? "TrustedForm key is active. It is managed server-side via the TRUSTEDFORM_API_KEY environment variable."
      : "No TrustedForm key set. Add TRUSTEDFORM_API_KEY to the deployment environment.",
  });
}
