import { NextResponse } from "next/server";
import { addLead, clearLeadsExceptNewest, getLeads, type Lead } from "@/lib/db";
import { claimCertificate } from "@/lib/trustedform";
import { authenticate } from "@/lib/auth";
import { getUser, getPrimaryUsername } from "@/lib/users";

export const dynamic = "force-dynamic";

const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
]);

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function sanitizeLead(body: Record<string, unknown>) {
  const errors: string[] = [];
  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email);
  const zip = str(body.zip);
  const stateRaw = str(body.state).toUpperCase();
  const state = US_STATES.has(stateRaw) ? stateRaw : str(body.state);
  const trustedFormCertUrl = str(body.trustedFormCertUrl) || null;

  if (name.length < 2) errors.push("Full name is required.");
  if (!/^[\d\s()+.-]{7,20}$/.test(phone)) errors.push("A valid phone number is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email address is required.");
  if (!/^\d{5}(-\d{4})?$/.test(zip)) errors.push("A valid ZIP code is required.");
  if (!state) errors.push("State is required.");

  return { errors, values: { name, phone, email, zip, state, trustedFormCertUrl } };
}

function matchesSearch(lead: Lead, q: string): boolean {
  const haystack =
    `${lead.name} ${lead.email} ${lead.phone} ${lead.state} ${lead.zip}`.toLowerCase();
  return haystack.includes(q.toLowerCase());
}

// GET /api/leads — paginated + searchable list of *the caller's own* leads.
// Each dashboard account only ever sees data it owns.
export async function GET(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = new URL(req.url);
  const search = url.searchParams.get("search")?.trim() ?? "";
  const stateFilter = url.searchParams.get("state")?.trim().toUpperCase() ?? "";
  const from = url.searchParams.get("from") ?? "";
  const to = url.searchParams.get("to") ?? "";
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(url.searchParams.get("pageSize") ?? "25", 10) || 25)
  );

  let leads = (await getLeads()).filter((l) => l.owner === username);

  if (search) leads = leads.filter((l) => matchesSearch(l, search));
  if (stateFilter) leads = leads.filter((l) => l.state.toUpperCase() === stateFilter);
  if (from) {
    const fromTs = new Date(`${from}T00:00:00`).getTime();
    if (!Number.isNaN(fromTs)) leads = leads.filter((l) => new Date(l.createdAt).getTime() >= fromTs);
  }
  if (to) {
    const toTs = new Date(`${to}T23:59:59.999`).getTime();
    if (!Number.isNaN(toTs)) leads = leads.filter((l) => new Date(l.createdAt).getTime() <= toTs);
  }

  const total = leads.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const items = leads.slice((page - 1) * pageSize, page * pageSize);

  // Table view never needs full claim payloads; strip them for lighter payloads.
  return NextResponse.json({
    leads: items.map(({ trustedFormClaim, ...rest }) => ({
      ...rest,
      hasClaim: Boolean(trustedFormClaim),
      claimStatus: trustedFormClaim?.status ?? null,
    })),
    page,
    pageSize,
    total,
    totalPages,
  });
}

// POST /api/leads — public lead capture with TrustedForm certificate handling.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { errors, values } = sanitizeLead(body);
  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 422 });
  }

  // Attribute the lead to a dashboard account. The landing page passes
  // `owner` (e.g. /?ref=username). Unknown owners fall back to the
  // primary account so no lead is ever dropped.
  const requestedOwner = str(body.owner).toLowerCase();
  let owner: string;
  if (requestedOwner && (await getUser(requestedOwner))) {
    owner = requestedOwner;
  } else {
    owner = await getPrimaryUsername();
  }

  // Claim/retain the certificate first so the result can be stored on the lead.
  const trustedFormClaim = await claimCertificate({ ...values, owner });

  const lead = await addLead({ ...values, owner, trustedFormClaim });

  return NextResponse.json(
    {
      ok: true,
      leadId: lead.id,
      trustedFormCertUrl: lead.trustedFormCertUrl,
      certificateStatus: trustedFormClaim.status,
    },
    { status: 201 }
  );
}

// DELETE /api/leads — hard-deletes every lead owned by the caller except the
// single newest one (fresh-test placeholder). Returns how many were removed.
export async function DELETE(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const deleted = await clearLeadsExceptNewest(username);
    return NextResponse.json({ deleted, kept: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Delete failed." },
      { status: 500 }
    );
  }
}
