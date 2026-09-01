import { NextResponse } from "next/server";
import { getLeads } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(
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

  return NextResponse.json({ lead });
}
