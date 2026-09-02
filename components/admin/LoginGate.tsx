"use client";

import { useState } from "react";
import {
  Scale,
  Loader2,
  Lock,
  ArrowLeft,
  HelpCircle,
  ShieldQuestion,
} from "lucide-react";
import { apiFetch } from "./api";

type Mode = "login" | "forgot-username" | "forgot-answers";

type LoginResponse = {
  ok: boolean;
  username: string;
  token: string;
};

export default function LoginGate({
  onSuccess,
}: {
  onSuccess: (username: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // forgot-password state
  const [questions, setQuestions] = useState<Array<{ id: string; question: string }>>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await apiFetch<LoginResponse>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      localStorage.setItem("acw.admin.token", res.token);
      localStorage.setItem("acw.admin.username", res.username);
      onSuccess(res.username);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotStep1(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await apiFetch<{
        questions?: Array<{ id: string; question: string }>;
        message?: string;
      }>("/api/admin/forgot-password", {
        method: "POST",
        body: JSON.stringify({ username }),
      });
      if (!res.questions || res.questions.length === 0) {
        throw new Error(
          res.message ?? "No security questions available for this account."
        );
      }
      setQuestions(res.questions);
      setAnswers(new Array(res.questions.length).fill(""));
      setMode("forgot-answers");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load questions.");
    } finally {
      setBusy(false);
    }
  }

  async function handleForgotStep2(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await apiFetch("/api/admin/forgot-password", {
        method: "POST",
        body: JSON.stringify({ username, answers, newPassword }),
      });
      setResetDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed.");
    } finally {
      setBusy(false);
    }
  }

  function backToLogin() {
    setMode("login");
    setError("");
    setQuestions([]);
    setAnswers([]);
    setPassword("");
    setNewPassword("");
    setResetDone(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-3 text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500">
            <Scale className="h-7 w-7 text-navy-900" strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-xl font-bold">Accident Care Helpline</p>
            <p className="text-xs font-medium tracking-wide text-navy-200 uppercase">
              Admin Dashboard
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lifted">
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <h1 className="text-xl font-bold text-navy-900">Sign in</h1>
              <div>
                <label htmlFor="username" className="input-label">Username</label>
                <input id="username" type="text" required autoComplete="username"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                  className="input-field" placeholder="your.username" />
              </div>
              <div>
                <label htmlFor="password" className="input-label">Password</label>
                <input id="password" type="password" required autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="input-field" placeholder="••••••••" />
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
              )}
              <button type="submit" disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 font-bold text-white transition hover:bg-navy-800 disabled:opacity-60">
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-5 w-5" />}
                Sign In
              </button>
              <button type="button" onClick={() => { setMode("forgot-username"); setError(""); }}
                className="mx-auto flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-navy-800">
                <HelpCircle className="h-4 w-4" /> Forgot password?
              </button>
            </form>
          )}

          {mode === "forgot-username" && (
            <form onSubmit={handleForgotStep1} className="space-y-4">
              <button type="button" onClick={backToLogin}
                className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-navy-800">
                <ArrowLeft className="h-4 w-4" /> Back to sign in
              </button>
              <h1 className="text-xl font-bold text-navy-900">Reset your password</h1>
              <p className="text-sm text-slate-500">
                Enter your username. We&apos;ll ask your security questions.
              </p>
              <div>
                <label htmlFor="fp-username" className="input-label">Username</label>
                <input id="fp-username" type="text" required value={username}
                  onChange={(e) => setUsername(e.target.value)} className="input-field" />
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
              )}
              <button type="submit" disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 font-bold text-white transition hover:bg-navy-800 disabled:opacity-60">
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                Continue
              </button>
            </form>
          )}

          {mode === "forgot-answers" && resetDone && (
            <div className="space-y-4 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <ShieldQuestion className="h-7 w-7 text-emerald-600" />
              </span>
              <h1 className="text-xl font-bold text-navy-900">Password updated</h1>
              <p className="text-sm text-slate-500">
                Your password has been changed. You can now sign in with it.
              </p>
              <button type="button" onClick={backToLogin}
                className="w-full rounded-xl bg-navy-900 px-6 py-3.5 font-bold text-white transition hover:bg-navy-800">
                Back to sign in
              </button>
            </div>
          )}

          {mode === "forgot-answers" && !resetDone && (
            <form onSubmit={handleForgotStep2} className="space-y-4">
              <button type="button"
                onClick={() => { setMode("forgot-username"); setQuestions([]); setError(""); }}
                className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-navy-800">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <h1 className="text-xl font-bold text-navy-900">Security questions</h1>
              {questions.map((q, i) => (
                <div key={q.id}>
                  <label htmlFor={`sq-${q.id}`} className="input-label">{q.question}</label>
                  <input id={`sq-${q.id}`} type="text" required autoComplete="off"
                    value={answers[i]}
                    onChange={(e) => {
                      const next = [...answers];
                      next[i] = e.target.value;
                      setAnswers(next);
                    }}
                    className="input-field" />
                </div>
              ))}
              <div>
                <label htmlFor="new-password" className="input-label">New password (min 8 chars)</label>
                <input id="new-password" type="password" required minLength={8}
                  autoComplete="new-password" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field" placeholder="••••••••" />
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
              )}
              <button type="submit" disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 font-bold text-navy-900 transition hover:bg-gold-400 disabled:opacity-60">
                {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                Reset Password
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-navy-300">
          Authorized personnel only. All activity is logged.
        </p>
      </div>
    </div>
  );
}
