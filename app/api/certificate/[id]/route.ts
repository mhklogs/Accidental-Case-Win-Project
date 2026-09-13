import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED = [
  "id",
  "name",
  "email",
  "phone",
  "zip",
  "state",
  "trusted_form_cert_url",
  "trusted_form_claim",
  "created_at",
];

export interface PublicCertificateLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  state: string;
  trustedFormCertUrl: string | null;
  trustedFormClaim: unknown;
  createdAt: string;
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
  }

  const r = data as Record<string, unknown>;
  const obj: Record<string, unknown> = {};
  for (const key of ALLOWED) obj[key] = r[key];

  let claim: unknown = null;
  try {
    if (typeof obj.trusted_form_claim === "string") {
      claim = JSON.parse(obj.trusted_form_claim as string);
    }
  } catch {
    claim = null;
  }

  const lead: PublicCertificateLead = {
    id: obj.id as string,
    name: (obj.name as string) ?? "—",
    email: (obj.email as string) ?? "",
    phone: (obj.phone as string) ?? "",
    zip: (obj.zip as string) ?? "",
    state: (obj.state as string) ?? "",
    trustedFormCertUrl: (obj.trusted_form_cert_url as string) ?? null,
    trustedFormClaim: claim,
    createdAt: (obj.created_at as string) ?? "",
  };

  return NextResponse.json({ lead });
}