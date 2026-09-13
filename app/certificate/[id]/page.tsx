import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// The certificate page is now a thin redirect to the lead's real TrustedForm
// certificate on ActiveProspect — we never render an in-house "certificate"
// copy. The TrustedForm cert is the only authoritative consent proof.
export default async function CertificatePage({
  params,
}: {
  params: { id: string };
}) {
  const sb = getSupabase();
  const { data } = await sb
    .from("leads")
    .select("trusted_form_cert_url")
    .eq("id", params.id)
    .single();

  const url = (data as Record<string, unknown> | null)?.trusted_form_cert_url as
    | string
    | null;

  if (!url || !/^https?:\/\/(cert\.)?trustedform\.com\//i.test(url)) {
    redirect("/admin");
  }

  redirect(url);
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  return { title: "TrustedForm Certificate — Accident Care Helpline" };
}