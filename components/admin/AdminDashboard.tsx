"use client";

import { useEffect, useState } from "react";
import {
  Scale,
  LogOut,
  Settings,
} from "lucide-react";
import LeadsTable, { type LeadRow } from "./LeadsTable";
import LeadDrawer from "./LeadDrawer";
import SettingsModal from "./SettingsModal";
import { apiFetch } from "./api";

export default function AdminDashboard({
  username,
  onLogout,
}: {
  username: string | null;
  onLogout: () => void;
}) {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState({ search: "", state: "", from: "", to: "", page: 1 });
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([k, v]) => v && params.set(k, String(v)));
      const res = await apiFetch<{
        leads: LeadRow[];
        total: number;
      }>(`/api/leads?${params.toString()}`);
      setLeads(res.leads);
      setTotal(res.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { loadLeads(); }, [query]);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900">
              <Scale className="h-5 w-5 text-gold-400" />
            </span>
            <div>
              <p className="font-bold leading-tight text-navy-900">Lead Dashboard</p>
              <p className="text-xs text-slate-500">Signed in as <span className="font-semibold">{username}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Export dropdown */}
            <div className="relative group">
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50">
                Export ↓
              </button>
              <div className="invisible absolute right-0 top-full z-20 mt-1 w-40 rounded-lg border border-slate-200 bg-white py-1 shadow-lifted transition group-hover:visible">
                {(["csv", "json", "xlsx"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={async () => {
                      const token = localStorage.getItem("acw.admin.token");
                      const res = await fetch(`/api/leads/export?format=${fmt}`, {
                        headers: { "x-admin-token": token ?? "" },
                      });
                      if (!res.ok) return;
                      const blob = await res.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `leads.${fmt}`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => setSettingsOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            >
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <LeadsTable
          leads={leads}
          total={total}
          loading={loading}
          error={error}
          query={query}
          onQueryChange={(patch) => setQuery((q) => ({ ...q, page: 1, ...patch }))}
          onSelect={(lead) => setSelected(lead)}
          onRefresh={loadLeads}
        />
      </main>

      {selected && (
        <LeadDrawer
          leadId={selected.id}
          onClose={() => setSelected(null)}
        />
      )}

      {settingsOpen && (
        <SettingsModal
          username={username}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}
