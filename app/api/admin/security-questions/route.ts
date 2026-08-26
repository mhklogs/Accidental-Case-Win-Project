import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";
import {
  getUser,
  replaceSecurityQuestions,
} from "@/lib/users";

const MIN_QUESTIONS = 3;

function authGuard(req: Request): NextResponse | null {
  const username = authenticate(req);
  if (!username) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  return null;
}

// GET /api/admin/security-questions — list current questions (no answers).
export async function GET(req: Request) {
  const denied = authGuard(req);
  if (denied) return denied;

  const username = authenticate(req)!;
  const user = await getUser(username);
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  return NextResponse.json({
    questions: user.securityQuestions.map((q) => ({ id: q.id, question: q.question })),
    minRequired: MIN_QUESTIONS,
  });
}

// POST /api/admin/security-questions — add/replace the question set.
export async function POST(req: Request) {
  const denied = authGuard(req);
  if (denied) return denied;

  const username = authenticate(req)!;

  let body: { questions?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const raw = Array.isArray(body.questions) ? body.questions : [];
  const entries = raw
    .map((q) => ({
      question: typeof (q as { question?: unknown })?.question === "string"
        ? ((q as { question: string }).question).trim()
        : "",
      answer: typeof (q as { answer?: unknown })?.answer === "string"
        ? (q as { answer: string }).answer
        : "",
    }))
    .filter((e) => e.question && e.answer);

  if (entries.length < MIN_QUESTIONS) {
    return NextResponse.json(
      { error: `At least ${MIN_QUESTIONS} questions with answers are required.` },
      { status: 422 }
    );
  }

  await replaceSecurityQuestions(username, entries);
  return NextResponse.json({ ok: true, count: entries.length });
}
