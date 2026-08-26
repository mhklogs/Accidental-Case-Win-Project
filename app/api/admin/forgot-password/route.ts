import { NextResponse } from "next/server";
import { getUser, verifySecurityAnswers, setPassword } from "@/lib/users";

/**
 * POST /api/admin/forgot-password
 *
 * Step 1 ({username}): returns the account's security questions.
 * Step 2 ({username, answers[], newPassword}): verifies all answers and,
 *   on success, resets the password.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username.trim() : "";
  if (!username) {
    return NextResponse.json({ error: "Username is required." }, { status: 422 });
  }

  const user = await getUser(username);
  // Do not reveal whether the account exists.
  if (!user) {
    if ("newPassword" in body) {
      return NextResponse.json({ error: "Answers are incorrect." }, { status: 401 });
    }
    return NextResponse.json({
      questions: [],
      message:
        "If that account exists and has security questions configured, they are shown below.",
    });
  }

  // Step 2: reset with answers + new password.
  if ("newPassword" in body) {
    const newPassword = typeof body.newPassword === "string" ? body.newPassword : "";
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "New password must be at least 8 characters." },
        { status: 422 }
      );
    }
    const answers = Array.isArray(body.answers)
      ? body.answers.map((a) => (typeof a === "string" ? a : ""))
      : [];

    const valid = await verifySecurityAnswers(user, answers);
    if (!valid) {
      return NextResponse.json({ error: "Answers are incorrect." }, { status: 401 });
    }

    await setPassword(username, newPassword);
    return NextResponse.json({ ok: true, reset: true });
  }

  // Step 1: hand back the questions.
  if (user.securityQuestions.length === 0) {
    return NextResponse.json(
      {
        error:
          "This account has no security questions yet. Log in once and configure them under Settings → Security Questions to enable self-service reset.",
      },
      { status: 409 }
    );
  }

  return NextResponse.json({
    questions: user.securityQuestions.map((q) => ({ id: q.id, question: q.question })),
  });
}
