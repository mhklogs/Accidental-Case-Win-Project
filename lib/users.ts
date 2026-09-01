import { getSupabase } from "./supabase";
import { hashSecret, normalizeAnswer, verifySecret } from "./auth";

export type SecurityQuestion = {
  id: string;
  question: string;
  answerHash: string;
};

export type AdminUser = {
  username: string;
  passwordHash: string;
  securityQuestions: SecurityQuestion[];
  passwordChangedAt: string | null;
  createdAt: string;
  createdBy?: string | null;
};

/* ---- env-var fallback user (used when no DB rows exist yet) ---- */

let cachedEnvUser: AdminUser | null = null;

function getEnvUser(): AdminUser {
  if (cachedEnvUser) return cachedEnvUser;
  const envUser = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
  const envPass = process.env.ADMIN_PASSWORD || "admin";
  cachedEnvUser = {
    username: envUser,
    passwordHash: hashSecret(envPass),
    securityQuestions: [],
    passwordChangedAt: null,
    createdAt: new Date(0).toISOString(),
  };
  return cachedEnvUser;
}

/* ---- DB helpers ---- */

function rowToUser(r: Record<string, unknown>): AdminUser {
  return {
    username: r.username as string,
    passwordHash: r.password_hash as string,
    securityQuestions: r.security_questions
      ? JSON.parse(r.security_questions as string)
      : [],
    passwordChangedAt: (r.password_changed_at as string) ?? null,
    createdAt: r.created_at as string,
    createdBy: (r.created_by as string) ?? null,
  };
}

function userToRow(u: AdminUser): Record<string, unknown> {
  return {
    username: u.username,
    password_hash: u.passwordHash,
    security_questions: JSON.stringify(u.securityQuestions),
    password_changed_at: u.passwordChangedAt,
    created_at: u.createdAt,
    created_by: u.createdBy ?? null,
  };
}

/* ---- public API ---- */

export async function getUser(username: string): Promise<AdminUser | null> {
  const sb = getSupabase();
  const { data } = await sb
    .from("users")
    .select("*")
    .eq("username", username.trim().toLowerCase())
    .single();
  if (data) return rowToUser(data as Record<string, unknown>);

  const env = getEnvUser();
  if (username.trim().toLowerCase() === env.username) return env;
  return null;
}

export async function getPrimaryUsername(): Promise<string> {
  const sb = getSupabase();
  const { data } = await sb
    .from("users")
    .select("username")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();
  return data?.username ?? (process.env.ADMIN_USERNAME || "admin").toLowerCase();
}

export async function saveUser(user: AdminUser): Promise<void> {
  const sb = getSupabase();
  const { error } = await sb
    .from("users")
    .upsert(userToRow(user), { onConflict: "username" });
  if (error) throw error;
}

export async function listUsers(): Promise<AdminUser[]> {
  const sb = getSupabase();
  const { data } = await sb
    .from("users")
    .select("*")
    .order("created_at", { ascending: true });
  if (!data || data.length === 0) return [getEnvUser()];
  return data.map((r: Record<string, unknown>) => rowToUser(r));
}

export async function deleteUser(username: string): Promise<boolean> {
  const sb = getSupabase();
  const { error, count } = await sb
    .from("users")
    .delete()
    .eq("username", username);
  if (error) return false;
  return true;
}

export async function setPassword(
  username: string,
  newPassword: string
): Promise<boolean> {
  const user = await getUser(username);
  if (!user) return false;
  user.passwordHash = hashSecret(newPassword);
  user.passwordChangedAt = new Date().toISOString();
  await saveUser(user);
  return true;
}

export async function replaceSecurityQuestions(
  username: string,
  entries: Array<{ question: string; answer: string }>
): Promise<boolean> {
  const user = await getUser(username);
  if (!user) return false;
  user.securityQuestions = entries.map((e) => ({
    id: crypto.randomUUID(),
    question: e.question.trim(),
    answerHash: hashSecret(normalizeAnswer(e.answer)),
  }));
  await saveUser(user);
  return true;
}

export async function verifySecurityAnswers(
  user: AdminUser,
  answers: string[]
): Promise<boolean> {
  if (user.securityQuestions.length === 0) return false;
  if (answers.length !== user.securityQuestions.length) return false;
  return user.securityQuestions.every((q, i) =>
    verifySecret(normalizeAnswer(answers[i] ?? ""), q.answerHash)
  );
}
