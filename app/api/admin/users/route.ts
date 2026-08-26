import { NextResponse } from "next/server";
import { authenticate, hashSecret, verifySecret } from "@/lib/auth";
import {
  getUser,
  saveUser,
  listUsers,
  deleteUser,
  type AdminUser,
} from "@/lib/users";

// GET /api/admin/users — list all accounts (usernames + metadata, never passwords)
export async function GET(req: Request) {
  const caller = authenticate(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const users = await listUsers();
  return NextResponse.json({
    users: users.map((u) => ({
      username: u.username,
      createdAt: u.createdAt,
      createdBy: u.createdBy ?? null,
      hasSecurityQuestions: u.securityQuestions.length > 0,
    })),
  });
}

// POST /api/admin/users — create a new account
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
      { error: "Username must be 3-64 chars (letters, numbers, @ . _ -)." },
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

// PUT /api/admin/users — update a user's password (or full reset)
export async function PUT(req: Request) {
  const caller = authenticate(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { targetUsername?: unknown; newPassword?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const targetUsername =
    typeof body.targetUsername === "string"
      ? body.targetUsername.trim().toLowerCase()
      : "";
  const newPassword =
    typeof body.newPassword === "string" ? body.newPassword : "";

  if (!targetUsername) {
    return NextResponse.json({ error: "targetUsername required." }, { status: 422 });
  }
  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters." },
      { status: 422 }
    );
  }

  const target = await getUser(targetUsername);
  if (!target) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  target.passwordHash = hashSecret(newPassword);
  target.passwordChangedAt = new Date().toISOString();
  await saveUser(target);

  return NextResponse.json({ ok: true, username: targetUsername });
}

// DELETE /api/admin/users — remove an account
export async function DELETE(req: Request) {
  const caller = authenticate(req);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { targetUsername?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const targetUsername =
    typeof body.targetUsername === "string"
      ? body.targetUsername.trim().toLowerCase()
      : "";

  if (!targetUsername) {
    return NextResponse.json({ error: "targetUsername required." }, { status: 422 });
  }
  if (targetUsername === caller) {
    return NextResponse.json(
      { error: "You cannot delete your own account." },
      { status: 409 }
    );
  }

  const deleted = await deleteUser(targetUsername);
  if (!deleted) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, username: targetUsername });
}
