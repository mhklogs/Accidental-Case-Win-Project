"use client";

import { useEffect, useState } from "react";
import { X, Loader2, ExternalLink, ShieldCheck, ShieldAlert, FileText } from "lucide-react";
import { apiFetch } from "./api";
import type { LeadRow } from "./LeadsTable";

type ClaimMeta = {
  attemptedAt: string;
  status: string;
  httpStatus?: number;
  error?: string;
  response?: unknown;
};

type LeadDetail = LeadRow & {
  owner: string;
  trustedFormClaim: ClaimMeta | null;
};

export default function LeadDrawer({
  leadId,
  onClose,
}: {
  leadId: string;
  onClose: () => void;
}) {
  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the full record (including claim metadata) by searching for it.
    apiFetch<{ leads: Array<LeadDetail & { trustedFormClaim?: ClaimMeta }> }>(
      `/api/leads?pageSize=100`
    )
      .then((res) => {
        const found = res.leads.find((l) => l.id === leadId);
        if (found) setLead(found);
        else setError("Lead not found in current page of results.");
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Load failed."));
  }, [leadId]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/60 backdrop-blur-sm" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-md flex-col bg-white shadow-lifted"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold text-navy-900">Lead Details</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-navy-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
          {!lead && !error && <Loader2 className="mx-auto mt-10 h-7 w-7 animate-spin text-navy-600" />}

          {lead && (
            <div className="space-y-6">
              {/* Raw fields */}
              <section>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Lead Fields</h3>
                <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                  {[
                    ["Full Name", lead.name],
                    ["Phone", lead.phone],
                    ["Email", lead.email],
                    ["State", lead.state],
                    ["Zip Code", lead.zip],
                    ["Submitted", new Date(lead.createdAt).toLocaleString()],
                    ["Owner Account", lead.owner],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[130px_1fr] gap-3 px-4 py-2.5">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
                      <dd className="break-words text-sm font-medium text-navy-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {/* TrustedForm certificate */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" /> TrustedForm Certificate
                </h3>
                {lead.trustedFormCertUrl ? (
                  <a
                    href={lead.trustedFormCertUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 break-all rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800 transition hover:bg-emerald-100"
                  >
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" />
                    {lead.trustedFormCertUrl}
                  </a>
                ) : (
                  <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No certificate URL was captured on this submission.
                  </p>
                )}
              </section>

              {/* Claim / retain metadata */}
              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <ShieldAlert className="h-4 w-4 text-gold-600" /> Claim Status
                </h3>
                <ClaimPanel claim={lead.trustedFormClaim} />
              </section>

              {/* View Certificate */}
              <a
                href={`/certificate/${lead.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-navy-900 bg-navy-900 px-5 py-3.5 text-sm font-bold text-white shadow transition hover:bg-navy-800 active:scale-[0.98]"
              >
                <FileText className="h-4 w-4" />
                View / Download Certificate
              </a>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function ClaimPanel({ claim }: { claim: ClaimMeta | null }) {
  if (!claim) {
    return (
      <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
        No claim attempt recorded.
      </p>
    );
  }

  const styles: Record<string, string> = {
    claimed: "border-emerald-200 bg-emerald-50 text-emerald-800",
    failed: "border-red-200 bg-red-50 text-red-700",
    skipped: "border-slate-200 bg-slate-50 text-slate-600",
    not_configured: "border-amber-200 bg-amber-50 text-amber-800",
  };
  const labels: Record<string, string> = {
    claimed: "Certificate claimed & retained",
    failed: "Claim attempt failed",
    skipped: "Skipped — no certificate on lead",
    not_configured: "Not claimed — no API key configured at submit time",
  };

  return (
    <div className={`rounded-xl border p-4 ${styles[claim.status] ?? styles.skipped}`}>
      <p className="text-sm font-bold">{labels[claim.status] ?? claim.status}</p>
      <dl className="mt-2 space-y-1 text-xs">
        <div className="flex gap-2">
          <dt className="font-semibold">Attempted:</dt>
          <dd>{new Date(claim.attemptedAt).toLocaleString()}</dd>
        </div>
        {claim.httpStatus !== undefined && (
          <div className="flex gap-2">
            <dt className="font-semibold">HTTP status:</dt>
            <dd>{claim.httpStatus}</dd>
          </div>
        )}
        {claim.error && (
          <div className="flex gap-2">
            <dt className="font-semibold">Error:</dt>
            <dd className="break-words">{claim.error}</dd>
          </div>
        )}
      </dl>
      {claim.response != null && (
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-semibold underline">
            Raw API response
          </summary>
          <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-white/70 p-3 text-[11px] leading-relaxed">
            {JSON.stringify(claim.response, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
