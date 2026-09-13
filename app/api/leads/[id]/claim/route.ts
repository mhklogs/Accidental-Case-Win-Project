import { NextResponse } from "next/server";
import {
  getLeads,
  updateLeadTrustedFormClaim,
  type TrustedFormClaim,
} from "@/lib/db";
import { claimCertificate } from "@/lib/trustedform";
import { authenticate } from "@/lib/auth";

export const dynamic = "force-dynamic";

// POST /api/leads/[id]/claim — re-attempt the TrustedForm retain for a lead.
// Safe to call on already-claimed certs (TrustedForm returns the existing
// retention) and on failed certs still inside the retain window.
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const leads = await getLeads();
  const lead = leads.find((l) => l.id === params.id && l.owner === username);

  if (!lead) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  const claim: TrustedFormClaim = await claimCertificate({
    id: lead.id,
    owner: lead.owner,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    zip: lead.zip,
    state: lead.state,
    trustedFormCertUrl: lead.trustedFormCertUrl,
    trustedFormClaim: lead.trustedFormClaim,
    createdAt: lead.createdAt,
  });

  await updateLeadTrustedFormClaim(params.id, claim);

  return NextResponse.json({ leadId: params.id, claim });
}