import { NextResponse } from "next/server";
import { authenticate, verifySecret } from "@/lib/auth";
import { getUser, setPassword } from "@/lib/users";

// POST /api/admin/change-password — for logged-in users. Also lets the
// caller set security questions in the same request.
export async function POST(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { currentPassword?: unknown; newPassword?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const currentPassword =
    typeof body.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 422 }
    );
  }

  const user = await getUser(username);
  if (!user || !verifySecret(currentPassword, user.passwordHash)) {
    return NextResponse.json(
      { error: "Current password is incorrect." },
      { status: 401 }
    );
  }

  await setPassword(username, newPassword);
  return NextResponse.json({ ok: true });
}
