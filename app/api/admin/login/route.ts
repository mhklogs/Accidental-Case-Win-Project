import { NextResponse } from "next/server";
import { issueToken, verifySecret } from "@/lib/auth";
import { getUser } from "@/lib/users";

// POST /api/admin/login — exchange username + password for a session token.
export async function POST(req: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 422 }
    );
  }

  const user = await getUser(username);
  if (!user || !verifySecret(password, user.passwordHash)) {
    return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
  }

  const session = issueToken(user.username);
  return NextResponse.json({
    ok: true,
    username: user.username,
    hasSecurityQuestions: user.securityQuestions.length > 0,
    token: session.token,
    expiresAtMs: session.expiresAtMs,
  });
}
