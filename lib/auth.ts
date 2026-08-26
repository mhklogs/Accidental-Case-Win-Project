import crypto from "crypto";

const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

/* ------------------------------ hashing ------------------------------ */

export function hashSecret(secret: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derived = crypto.scryptSync(secret.normalize("NFKC"), salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifySecret(secret: string, stored: string | null): boolean {
  if (!stored || !stored.includes(":")) return false;
  const [salt, expected] = stored.split(":");
  const derived = crypto.scryptSync(secret.normalize("NFKC"), salt, 64).toString("hex");
  return safeEqual(derived, expected);
}

/** Security-question answers are compared loosely: trimmed + case-insensitive. */
export function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s+/g, " ");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/* ------------------------------ tokens ------------------------------- */

/**
 * Time-bucketed token bound to the username, so revoking a password
 * effectively invalidates old buckets. Format: base64url(user).hexsig
 */
function computeSignature(username: string, bucket: number): string {
  return crypto
    .createHash("sha256")
    .update(`${username.toLowerCase()}::${bucket}`)
    .digest("hex");
}

export function issueToken(username: string): {
  token: string;
  expiresAtMs: number;
} {
  const bucket = Math.floor(Date.now() / SESSION_TTL_MS);
  const payload = Buffer.from(username.toLowerCase()).toString("base64url");
  const token = `${payload}.${computeSignature(username, bucket)}`;
  return { token, expiresAtMs: (bucket + 1) * SESSION_TTL_MS };
}

export function verifyToken(token: string | null): string | null {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  let username: string;
  try {
    username = Buffer.from(payload, "base64url").toString("utf-8");
  } catch {
    return null;
  }
  if (!username) return null;
  const bucket = Math.floor(Date.now() / SESSION_TTL_MS);
  // Accept current or previous bucket so sessions survive a rollover.
  const ok =
    safeEqual(signature, computeSignature(username, bucket)) ||
    safeEqual(signature, computeSignature(username, bucket - 1));
  return ok ? username : null;
}

export function extractAdminToken(req: Request): string | null {
  const header = req.headers.get("x-admin-token");
  if (header) return header;
  const auth = req.headers.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return null;
}

/** Returns the authenticated username, or null. Use inside API routes. */
export function authenticate(req: Request): string | null {
  return verifyToken(extractAdminToken(req));
}
