"use client";

import { useEffect, useState } from "react";
import {
  X,
  Loader2,
  KeyRound,
  Lock,
  ShieldQuestion,
  UserPlus,
  CheckCircle2,
  Link2,
} from "lucide-react";
import { apiFetch } from "./api";
import LinksTab from "./LinksTab";

type Tab = "apikey" | "links" | "password" | "questions" | "users";

export default function SettingsModal({
  username,
  onClose,
}: {
  username: string | null;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("apikey");

  const tabs: Array<{ id: Tab; label: string; icon: typeof KeyRound }> = [
    { id: "apikey", label: "TrustedForm API Key", icon: KeyRound },
    { id: "links", label: "Social Links", icon: Link2 },
    { id: "password", label: "Change Password", icon: Lock },
    { id: "questions", label: "Security Questions", icon: ShieldQuestion },
    { id: "users", label: "Add User", icon: UserPlus },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-lifted sm:h-auto sm:max-h-[85vh] sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold text-navy-900">Account Settings</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-navy-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
          {/* Tab nav */}
          <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 px-3 py-2 sm:w-56 sm:flex-col sm:border-b-0 sm:border-r sm:py-4">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  tab === id
                    ? "bg-navy-900 text-white"
                    : "text-slate-600 hover:bg-slate-200/60"
                }`}
              >
                <Icon className="h-4 w-4" /> {label}
              </button>
            ))}
          </nav>

          <div className="min-h-0 flex-1 overflow-y-auto p-6">
            {tab === "apikey" && <ApiKeyTab />}
            {tab === "links" && <LinksTab />}
            {tab === "password" && <PasswordTab />}
            {tab === "questions" && <QuestionsTab />}
            {tab === "users" && <UsersTab />}
          </div>
        </div>

        <p className="border-t border-slate-200 bg-slate-50 px-6 py-2.5 text-xs text-slate-400">
          Signed in as {username}. Your settings are private to your account.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ API key ------------------------------ */

function ApiKeyTab() {
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);
  const [keyPreview, setKeyPreview] = useState<string | null>(null);
  const [usingEnvFallback, setUsingEnvFallback] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch<{
        configured: boolean;
        keyPreview: string | null;
        usingEnvFallback?: boolean;
      }>("/api/settings/trustedform");
      setConfigured(res.configured);
      setKeyPreview(res.keyPreview);
      setUsingEnvFallback(Boolean(res.usingEnvFallback));
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  async function save() {
    setBusy(true);
    setMessage("");
    try {
      await apiFetch("/api/settings/trustedform", {
        method: "POST",
        body: JSON.stringify({ apiKey: input }),
      });
      setInput("");
      setMessage("API key saved. New leads will use it for certificate claiming.");
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function reset() {
    setBusy(true);
    setMessage("");
    try {
      await apiFetch("/api/settings/trustedform", {
        method: "POST",
        body: JSON.stringify({ action: "reset" }),
      });
      setMessage("API key removed from your account.");
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Reset failed.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <Loader2 className="mx-auto mt-10 h-7 w-7 animate-spin text-navy-600" />;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-bold text-navy-900">ActiveProspect / TrustedForm API Key</h3>
        <p className="mt-1 text-sm text-slate-500">
          Paste your key once — it stays on your account across all devices until you remove it.
        </p>
      </div>

      {configured ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="flex items-center gap-2 text-sm font-bold text-emerald-800">
            <CheckCircle2 className="h-5 w-5" /> Key configured ({keyPreview})
          </p>
        </div>
      ) : usingEnvFallback ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-800">
            A server-level fallback key is active. Save your own key below to use yours instead.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            No key configured. Certificates are stored but not claimed/retained.
          </p>
        </div>
      )}

      <div>
        <label htmlFor="tf-key" className="input-label">Your TrustedForm API key</label>
        <input id="tf-key" type="password" value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. 9F1A2B3C4D5E6F70819263..." autoComplete="off"
          className="input-field font-mono text-sm" />
      </div>

      {message && (
        <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">{message}</p>
      )}

      <div className="flex flex-wrap gap-2">
        <button onClick={save} disabled={busy || !input.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800 disabled:opacity-50">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save Key
        </button>
        {configured && (
          <button onClick={reset} disabled={busy}
            className="rounded-xl border border-red-300 px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50">
            Remove Key
          </button>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- password ------------------------------ */

function PasswordTab() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (newPassword !== confirm) {
      setMessage({ ok: false, text: "New passwords do not match." });
      return;
    }
    setBusy(true);
    try {
      await apiFetch("/api/admin/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setMessage({ ok: true, text: "Password changed successfully." });
      setCurrentPassword(""); setNewPassword(""); setConfirm("");
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Change failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <h3 className="font-bold text-navy-900">Change Password</h3>
        <p className="mt-1 text-sm text-slate-500">Applies to this account on every device.</p>
      </div>
      <div>
        <label htmlFor="cur-pass" className="input-label">Current password</label>
        <input id="cur-pass" type="password" required autoComplete="current-password"
          value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="input-field" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="new-pass" className="input-label">New password</label>
          <input id="new-pass" type="password" required minLength={8} autoComplete="new-password"
            value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="input-field" />
        </div>
        <div>
          <label htmlFor="conf-pass" className="input-label">Confirm new password</label>
          <input id="conf-pass" type="password" required minLength={8} autoComplete="new-password"
            value={confirm} onChange={(e) => setConfirm(e.target.value)} className="input-field" />
        </div>
      </div>
      {message && (
        <p className={`rounded-lg px-4 py-3 text-sm font-medium ${message.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </p>
      )}
      <button type="submit" disabled={busy}
        className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800 disabled:opacity-50">
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Update Password
      </button>
    </form>
  );
}

/* -------------------------- security questions ------------------------ */

const SUGGESTED = [
  "What was the name of your first school?",
  "What is your mother's maiden name?",
  "What was the make of your first car?",
  "What city were you born in?",
  "What is the name of your first pet?",
];

function QuestionsTab() {
  const [rows, setRows] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);
  const [existing, setExisting] = useState(0);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    apiFetch<{ questions: unknown[]; minRequired: number }>("/api/admin/security-questions")
      .then((res) => setExisting(res.questions.length))
      .catch(() => setExisting(0));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setBusy(true);
    try {
      await apiFetch("/api/admin/security-questions", {
        method: "POST",
        body: JSON.stringify({ questions: rows }),
      });
      setExisting(rows.length);
      setMessage({ ok: true, text: "Security questions saved." });
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Save failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <h3 className="font-bold text-navy-900">Security Questions</h3>
        <p className="mt-1 text-sm text-slate-500">
          Used for self-service password reset. Minimum of three.
          {existing > 0 && ` (${existing} currently configured — saving replaces them.)`}
        </p>
      </div>

      {rows.map((row, i) => (
        <div key={i} className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="input-label">Question {i + 1}</label>
            <input
              list="suggested-questions"
              value={row.question}
              onChange={(e) => setRows(rows.map((r, j) => j === i ? { ...r, question: e.target.value } : r))}
              placeholder="Type or pick a question…"
              className="input-field"
            />
          </div>
          <div>
            <label className="input-label">Answer {i + 1}</label>
            <input
              value={row.answer}
              onChange={(e) => setRows(rows.map((r, j) => j === i ? { ...r, answer: e.target.value } : r))}
              placeholder="Answer (case-insensitive)"
              autoComplete="off"
              className="input-field"
            />
          </div>
        </div>
      ))}

      <datalist id="suggested-questions">
        {SUGGESTED.map((q) => (<option key={q} value={q} />))}
      </datalist>

      {message && (
        <p className={`rounded-lg px-4 py-3 text-sm font-medium ${message.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </p>
      )}

      <button type="submit" disabled={busy || rows.some((r) => !r.question.trim() || !r.answer.trim())}
        className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800 disabled:opacity-50">
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save Security Questions
      </button>
    </form>
  );
}

/* -------------------------------- users -------------------------------- */

type UserRow = {
  username: string;
  createdAt: string;
  createdBy: string | null;
  hasSecurityQuestions: boolean;
};

function UsersTab() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [editPass, setEditPass] = useState("");
  const [newQuestions, setNewQuestions] = useState([
    { question: "", answer: "" },
    { question: "", answer: "" },
    { question: "", answer: "" },
  ]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function loadUsers() {
    setLoading(true);
    try {
      const res = await apiFetch<{ users: UserRow[] }>("/api/admin/users");
      setUsers(res.users);
    } catch { /* silent */ }
    setLoading(false);
  }

  useEffect(() => { loadUsers(); }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null); setBusy(true);
    const securityQuestions = newQuestions
      .filter((r) => r.question.trim() && r.answer.trim())
      .map((r) => ({ question: r.question.trim(), answer: r.answer.trim() }));
    try {
      await apiFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          username: newUser,
          password: newPass,
          ...(securityQuestions.length > 0 ? { securityQuestions } : {}),
        }),
      });
      setMessage({ ok: true, text: `Account "${newUser.toLowerCase()}" created.` });
      setNewUser(""); setNewPass("");
      setNewQuestions([
        { question: "", answer: "" },
        { question: "", answer: "" },
        { question: "", answer: "" },
      ]);
      await loadUsers();
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Failed." });
    } finally { setBusy(false); }
  }

  async function resetPassword() {
    if (!editTarget || !editPass) return;
    setMessage(null); setBusy(true);
    try {
      await apiFetch("/api/admin/users", {
        method: "PUT",
        body: JSON.stringify({ targetUsername: editTarget, newPassword: editPass }),
      });
      setMessage({ ok: true, text: `Password updated for "${editTarget}".` });
      setEditTarget(null); setEditPass("");
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Failed." });
    } finally { setBusy(false); }
  }

  async function removeUser(target: string) {
    if (!confirm(`Delete account "${target}"? This cannot be undone.`)) return;
    setMessage(null); setBusy(true);
    try {
      await apiFetch("/api/admin/users", {
        method: "DELETE",
        body: JSON.stringify({ targetUsername: target }),
      });
      setMessage({ ok: true, text: `Account "${target}" deleted.` });
      await loadUsers();
    } catch (err) {
      setMessage({ ok: false, text: err instanceof Error ? err.message : "Failed." });
    } finally { setBusy(false); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-navy-900">Manage Users</h3>
        <p className="mt-1 text-sm text-slate-500">
          Create, reset passwords, or remove dashboard accounts. Each sees only its own leads.
        </p>
      </div>

      {/* user list */}
      {loading ? (
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-navy-600" />
      ) : (
        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
          {users.map((u) => (
            <div key={u.username} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-navy-900">{u.username}</p>
                <p className="text-xs text-slate-400">
                  Joined {new Date(u.createdAt).toLocaleDateString()}
                  {u.createdBy && ` · by ${u.createdBy}`}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setEditTarget(u.username); setEditPass(""); setMessage(null); }}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Reset Password
                </button>
                <button
                  onClick={() => removeUser(u.username)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* inline password reset */}
      {editTarget && (
        <div className="rounded-xl border border-gold-200 bg-gold-50/50 p-4">
          <p className="text-sm font-semibold text-navy-900">Reset password for {editTarget}</p>
          <div className="mt-2 flex gap-2">
            <input
              type="password" placeholder="New password (min 8)" minLength={8}
              value={editPass} onChange={(e) => setEditPass(e.target.value)}
              className="input-field flex-1 text-sm"
            />
            <button onClick={resetPassword} disabled={busy || editPass.length < 8}
              className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-navy-800 disabled:opacity-50">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
            </button>
            <button onClick={() => setEditTarget(null)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* create new */}
      <form onSubmit={createUser} className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Create new account</p>
        <div className="flex gap-2">
          <input type="text" required value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="username" className="input-field flex-1 text-sm" />
          <input type="password" required minLength={8} value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder="password (min 8)" autoComplete="new-password"
            className="input-field flex-1 text-sm" />
          <button type="submit" disabled={busy}
            className="rounded-lg bg-navy-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-navy-800 disabled:opacity-50">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
          </button>
        </div>
        <details className="group rounded-lg border border-slate-200 bg-slate-50/60 px-3 py-2">
          <summary className="cursor-pointer select-none text-xs font-semibold text-slate-500 hover:text-navy-800">
            Set initial security questions (optional — enables self-service password reset)
          </summary>
          <div className="mt-3 space-y-2">
            {newQuestions.map((row, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={row.question}
                  onChange={(e) => setNewQuestions(newQuestions.map((r, j) => j === i ? { ...r, question: e.target.value } : r))}
                  placeholder={`Question ${i + 1}`}
                  className="input-field text-sm"
                />
                <input
                  type="text"
                  value={row.answer}
                  onChange={(e) => setNewQuestions(newQuestions.map((r, j) => j === i ? { ...r, answer: e.target.value } : r))}
                  placeholder={`Answer ${i + 1}`}
                  autoComplete="off"
                  className="input-field text-sm"
                />
              </div>
            ))}
          </div>
        </details>
      </form>

      {message && (
        <p className={`rounded-lg px-4 py-3 text-sm font-medium ${message.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
