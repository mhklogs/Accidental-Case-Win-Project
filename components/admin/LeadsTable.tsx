"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export type LeadRow = {
  id: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
  state: string;
  trustedFormCertUrl: string | null;
  hasClaim?: boolean;
  claimStatus?: string | null;
  createdAt: string;
};

export type LeadsQuery = {
  search: string;
  state: string;
  from: string;
  to: string;
  page: number;
};

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

const CLAIM_BADGES: Record<string, { label: string; className: string }> = {
  claimed: { label: "Claimed", className: "bg-emerald-100 text-emerald-700" },
  failed: { label: "Claim Failed", className: "bg-red-100 text-red-700" },
  skipped: { label: "No Certificate", className: "bg-slate-200 text-slate-600" },
  not_configured: { label: "API Key Not Set", className: "bg-amber-100 text-amber-700" },
};

export default function LeadsTable({
  leads,
  total,
  loading,
  error,
  query,
  onQueryChange,
  onSelect,
  onRefresh,
}: {
  leads: LeadRow[];
  total: number;
  loading: boolean;
  error: string;
  query: LeadsQuery;
  onQueryChange: (patch: Partial<LeadsQuery>) => void;
  onSelect: (lead: LeadRow) => void;
  onRefresh: () => void;
}) {
  const [showFilters, setShowFilters] = useState(false);
  const pageSize = 25;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-navy-900">Leads</h1>
          <p className="text-sm text-slate-500">{total} lead{total === 1 ? "" : "s"} in your account</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-slate-50"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            onClick={() => setShowFilters((s) => !s)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2.5 text-sm font-semibold transition ${
              showFilters
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-slate-300 bg-white text-navy-900 hover:bg-slate-50"
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Search + filters */}
      <div className="mt-4 space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query.search}
            onChange={(e) => onQueryChange({ search: e.target.value })}
            placeholder="Search by name, email, phone, state, or zip…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/30"
          />
        </div>

        {showFilters && (
          <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-card sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">State</label>
              <select
                value={query.state}
                onChange={(e) => onQueryChange({ state: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-gold-500"
              >
                <option value="">All states</option>
                {US_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">From date</label>
              <input
                type="date"
                value={query.from}
                onChange={(e) => onQueryChange({ from: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">To date</label>
              <input
                type="date"
                value={query.to}
                onChange={(e) => onQueryChange({ to: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-gold-500"
              />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Name", "Phone", "Email", "Location", "Submitted", "TrustedForm"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Loader2 className="mx-auto h-7 w-7 animate-spin text-navy-600" />
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Inbox className="mx-auto mb-3 h-9 w-9 text-slate-300" />
                    <p className="font-semibold text-slate-600">No leads found</p>
                    <p className="text-sm text-slate-400">
                      New submissions from your landing page will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const badge = lead.claimStatus ? CLAIM_BADGES[lead.claimStatus] : null;
                  return (
                    <tr
                      key={lead.id}
                      onClick={() => onSelect(lead)}
                      className="cursor-pointer transition hover:bg-navy-50/60"
                    >
                      <td className="px-5 py-3.5 font-semibold text-navy-900">{lead.name}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">{lead.phone}</td>
                      <td className="px-5 py-3.5 text-slate-600">{lead.email}</td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-slate-600">
                        {lead.state} {lead.zip}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-slate-500">
                        {new Date(lead.createdAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        {badge ? (
                          <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${badge.className}`}>
                            {badge.label}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-medium text-slate-400">
                            <ShieldCheck className="h-3.5 w-3.5" /> —
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3">
            <p className="text-xs text-slate-500">
              Page {query.page} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={query.page <= 1}
                onClick={() => onQueryChange({ page: query.page - 1 })}
                className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={query.page >= totalPages}
                onClick={() => onQueryChange({ page: query.page + 1 })}
                className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Click any row to view full lead details and the TrustedForm certificate.
      </p>
    </section>
  );
}
