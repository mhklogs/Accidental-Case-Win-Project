import { NextResponse } from "next/server";
import { authenticate, hashSecret } from "@/lib/auth";
import { getUser, saveUser } from "@/lib/users";

/**
 * GET  /api/admin/users — list accounts (usernames only).
 * POST /api/admin/users — create a new dashboard account. Every account
 *   sees only its own leads; multiple simultaneous sessions per account
 *   and across devices are supported.
 */
export async function GET(req: Request) {
  if (!authenticate(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  const caller = authenticate(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { username?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const username =
    typeof body.username === "string" ? body.username.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!/^[a-z0-9@._-]{3,64}$/.test(username)) {
    return NextResponse.json(
      {
        error:
          "Username must be 3-64 chars (letters, numbers, @ . _ -).",
      },
      { status: 422 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 422 }
    );
  }
  if (await getUser(username)) {
    return NextResponse.json(
      { error: "That username already exists." },
      { status: 409 }
    );
  }

  await saveUser({
    username,
    passwordHash: hashSecret(password),
    securityQuestions: [],
    passwordChangedAt: null,
    createdAt: new Date().toISOString(),
    createdBy: caller,
  });

  return NextResponse.json({ ok: true, username }, { status: 201 });
}
