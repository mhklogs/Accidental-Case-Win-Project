"use client";

import { useEffect, useState } from "react";
import { Loader2, Link2, Pencil, Trash2, Plus, X } from "lucide-react";
import { apiFetch } from "./api";

type SocialLink = {
  id: string;
  type: string;
  label: string;
  url: string;
  createdAt: string;
};

const LINK_OPTIONS = [
  { type: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/..." },
  { type: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
  { type: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
  { type: "youtube", label: "YouTube", placeholder: "https://youtube.com/@..." },
  { type: "x", label: "X (Twitter)", placeholder: "https://x.com/..." },
  { type: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@..." },
  { type: "whatsapp", label: "WhatsApp", placeholder: "https://wa.me/17139197830" },
  { type: "mail", label: "Email", placeholder: "mailto:info@..." },
  { type: "phone", label: "Phone", placeholder: "tel:+17139197830" },
  { type: "website", label: "Website", placeholder: "https://..." },
];

const emptyLink = (): SocialLink => ({ id: "", type: "linkedin", label: "", url: "", createdAt: "" });

export default function LinksTab() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [editing, setEditing] = useState<SocialLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await apiFetch<{ links: SocialLink[] }>("/api/admin/social-links");
      setLinks(res.links ?? []);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed to load links.");
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing || !editing.type || !editing.url.trim()) return;
    setBusy(true);
    setMessage("");
    try {
      const res = await apiFetch<{ links: SocialLink[]; link: SocialLink }>("/api/admin/social-links", {
        method: "POST",
        body: JSON.stringify({ link: editing }),
      });
      setLinks(res.links);
      setEditing(null);
      setMessage("Link saved — the icon on the website now points to it.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setBusy(true);
    setMessage("");
    try {
      await apiFetch("/api/admin/social-links", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setLinks((ls) => ls.filter((l) => l.id !== id));
      setMessage("Link removed.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <Loader2 className="mx-auto mt-10 h-7 w-7 animate-spin text-navy-600" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-navy-900">Social &amp; Professional Links</h3>
          <p className="mt-1 text-sm text-slate-500">
            Links shown behind the platform icons on the website footer (LinkedIn, Mail, Facebook, etc.). Only platforms with a URL appear.
          </p>
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(emptyLink())}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-navy-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-navy-800"
          >
            <Plus className="h-4 w-4" /> Add link
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <Link2 className="h-4 w-4 text-navy-600" />
        {links.length === 0 ? "No links configured yet." : `${links.length} link${links.length === 1 ? "" : "s"} configured.`}
      </div>

      {editing && (
        <div className="space-y-3 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-navy-900">{editing.id ? "Edit link" : "Add link"}</h4>
            <button onClick={() => setEditing(null)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-navy-900">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>
            <label className="input-label">Platform</label>
            <select
              value={editing.type}
              onChange={(e) => setEditing({ ...editing, type: e.target.value })}
              className="input-field"
            >
              {LINK_OPTIONS.map((o) => (
                <option key={o.type} value={o.type}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="input-label">URL</label>
            <input
              value={editing.url}
              onChange={(e) => setEditing({ ...editing, url: e.target.value })}
              placeholder={LINK_OPTIONS.find((o) => o.type === editing.type)?.placeholder}
              className="input-field font-mono text-sm"
            />
          </div>
          <div>
            <label className="input-label">Label (optional)</label>
            <input
              value={editing.label}
              onChange={(e) => setEditing({ ...editing, label: e.target.value })}
              placeholder="auto from platform"
              className="input-field"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={save} disabled={busy || !editing.url.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800 disabled:opacity-50">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save link
            </button>
            <button onClick={() => setEditing(null)}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {links.length > 0 && (
        <ul className="space-y-2">
          {links.map((l) => {
            const opt = LINK_OPTIONS.find((o) => o.type === l.type);
            return (
              <li key={l.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy-900">{opt?.label || l.type}</p>
                  <p className="truncate text-xs text-slate-500">{l.url}</p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button onClick={() => setEditing({ ...l, label: opt?.label || l.label })} title="Edit"
                    className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => remove(l.id)} disabled={busy} title="Delete"
                    className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {message && (
        <p className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700">{message}</p>
      )}
    </div>
  );
}