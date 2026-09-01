"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Download,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Scale,
} from "lucide-react";

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  zip: string;
  state: string;
  trustedFormCertUrl: string | null;
  createdAt: string;
  trustedFormClaim: {
    status: string;
    attemptedAt: string;
    httpStatus?: number;
    error?: string;
  } | null;
};

function certIdFromUrl(url: string | null): string {
  if (!url) return "N/A";
  const m = url.match(
    /([0-9a-f]{40}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i
  );
  return m ? m[1] : url;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function statusBadge(status: string) {
  switch (status) {
    case "claimed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="h-3.5 w-3.5" /> Claimed & Retained
        </span>
      );
    case "not_configured":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
          <Clock className="h-3.5 w-3.5" /> Pending Configuration
        </span>
      );
    case "failed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
          <AlertTriangle className="h-3.5 w-3.5" /> Claim Failed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {status}
        </span>
      );
  }
}

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLead() {
      try {
        const token = localStorage.getItem("acw.admin.token");
        const res = await fetch(`/api/leads/${params.id}`, {
          headers: token ? { "x-admin-token": token } : {},
        });
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/admin");
            return;
          }
          throw new Error("Not found");
        }
        const data = await res.json();
        setLead(data.lead);
      } catch {
        setError("Could not load certificate. You may need to log in first.");
      } finally {
        setLoading(false);
      }
    }
    fetchLead();
  }, [params.id, router]);

  function handlePrint() {
    window.print();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-navy-900 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading certificate…</p>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <p className="text-slate-600">{error || "Certificate not found."}</p>
          <button
            onClick={() => router.push("/admin")}
            className="mt-4 rounded-lg bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const certId = certIdFromUrl(lead.trustedFormCertUrl);

  return (
    <>
      {/* Screen-only toolbar */}
      <div className="no-print fixed left-0 right-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-navy-900"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="text-sm font-bold text-navy-900">
            Certificate of Consent
          </h1>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-navy-800 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Certificate */}
      <div className="min-h-screen bg-slate-100 pt-16 print:bg-white print:pt-0">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 print:px-0 print:py-0">
          <div
            id="certificate"
            className="relative overflow-hidden rounded-2xl border-2 border-navy-900 bg-white shadow-xl print:border-0 print:shadow-none"
          >
            {/* Gold top bar */}
            <div className="h-2 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

            <div className="px-8 py-10 sm:px-14 sm:py-14">
              {/* Header */}
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-950">
                  <Scale className="h-8 w-8 text-gold-400" />
                </div>
                <h2 className="text-2xl font-extrabold uppercase tracking-widest text-navy-950 sm:text-3xl">
                  Certificate of Consent
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  TrustedForm Verified · Accident Case Win
                </p>
              </div>

              {/* Divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
                <ShieldCheck className="h-5 w-5 text-gold-500" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
              </div>

              {/* Body */}
              <div className="space-y-6">
                <p className="text-center text-base leading-relaxed text-slate-600">
                  This certificate confirms that the individual named below has
                  voluntarily submitted their information and provided explicit
                  consent to be contacted regarding a personal injury case review
                  by Accident Case Win and its network of licensed attorneys.
                </p>

                {/* Lead info grid */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
                  <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-navy-800">
                    Consent Details
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Full Name
                      </p>
                      <p className="mt-1 text-base font-bold text-navy-950">
                        {lead.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Email Address
                      </p>
                      <p className="mt-1 text-base font-bold text-navy-950">
                        {lead.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Phone Number
                      </p>
                      <p className="mt-1 text-base font-bold text-navy-950">
                        {lead.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 text-base font-bold text-navy-950">
                        {lead.state} · {lead.zip}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certificate metadata */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
                  <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-navy-800">
                    Certification Information
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Certificate ID
                      </p>
                      <p className="mt-1 break-all font-mono text-sm font-bold text-navy-950">
                        {certId}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Consent Captured
                      </p>
                      <p className="mt-1 text-sm font-bold text-navy-950">
                        {formatDateTime(lead.createdAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Certificate Status
                      </p>
                      <div className="mt-1">
                        {lead.trustedFormClaim
                          ? statusBadge(lead.trustedFormClaim.status)
                          : statusBadge("not_configured")}
                      </div>
                    </div>
                    {lead.trustedFormClaim?.attemptedAt && (
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Claim Attempted
                        </p>
                        <p className="mt-1 text-sm font-bold text-navy-950">
                          {formatDateTime(lead.trustedFormClaim.attemptedAt)}
                        </p>
                      </div>
                    )}
                    {lead.trustedFormCertUrl && (
                      <div className="sm:col-span-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          TrustedForm Certificate URL
                        </p>
                        <a
                          href={lead.trustedFormCertUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block break-all font-mono text-xs font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-800"
                        >
                          {lead.trustedFormCertUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Legal disclaimer */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
                  <p className="text-xs leading-relaxed text-amber-800">
                    <strong>Disclaimer:</strong> This certificate is generated by
                    Accident Case Win and documents the consent captured through
                    our TrustedForm integration. It does not constitute legal
                    advice or establish an attorney-client relationship. The
                    information contained herein is encrypted and stored securely.
                    For questions about your data, contact us at{" "}
                    <a
                      href="tel:+17139197830"
                      className="font-bold underline decoration-amber-400"
                    >
                      (713) 919-7830
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Footer divider */}
              <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
                <Scale className="h-4 w-4 text-gold-400" />
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-navy-200 to-transparent" />
              </div>

              {/* Footer */}
              <div className="text-center">
                <p className="text-sm font-bold text-navy-950">
                  Accident Case Win
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Motor Vehicle Accident Attorneys · Free Case Review · No Fee
                  Unless We Win
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {formatDate(lead.createdAt)} · ID: {lead.id.slice(0, 8)}
                </p>
              </div>
            </div>

            {/* Gold bottom bar */}
            <div className="h-2 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />
          </div>
        </div>
      </div>

      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            margin: 0;
            padding: 0;
          }
          #certificate {
            border: 2px solid #071426 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            page-break-inside: avoid;
          }
          @page {
            margin: 0.5in;
            size: letter;
          }
        }
      `}</style>
    </>
  );
}
