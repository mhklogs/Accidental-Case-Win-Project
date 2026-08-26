import { NextResponse } from "next/server";
import {
  clearTrustedFormApiKey,
  getUserSettings,
  setTrustedFormApiKey,
} from "@/lib/db";
import { authenticate } from "@/lib/auth";

/**
 * Per-user TrustedForm API key management.
 * Each dashboard account stores its OWN key once — it persists across
 * sessions and devices until the user resets it.
 */
export async function GET(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const settings = await getUserSettings(username);
  const envFallback = Boolean(process.env.TRUSTEDFORM_API_KEY?.trim());
  return NextResponse.json({
    configured: Boolean(settings.trustedFormApiKey),
    // Never return the raw key to the client — masked preview only.
    keyPreview: settings.trustedFormApiKey
      ? `${settings.trustedFormApiKey.slice(0, 4)}••••${settings.trustedFormApiKey.slice(-4)}`
      : null,
    usingEnvFallback: !settings.trustedFormApiKey && envFallback,
    updatedAt: settings.trustedFormApiKeyUpdatedAt,
  });
}

export async function POST(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { apiKey?: unknown; action?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (body.action === "reset") {
    await clearTrustedFormApiKey(username);
    return NextResponse.json({ ok: true, configured: false });
  }

  const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
  if (!apiKey) {
    return NextResponse.json({ error: "API key is required." }, { status: 422 });
  }

  const settings = await setTrustedFormApiKey(username, apiKey);
  return NextResponse.json({
    ok: true,
    configured: true,
    updatedAt: settings.trustedFormApiKeyUpdatedAt,
  });
}
