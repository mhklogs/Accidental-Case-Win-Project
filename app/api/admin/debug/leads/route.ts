import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { authenticate } from "@/lib/auth";

export const dynamic = "force-dynamic";

// TEMPORARY debug route — run multiple queries in ONE function to compare views.
export async function GET(req: Request) {
  const user = authenticate(req);
  if (!user || user !== process.env.ADMIN_USERNAME) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const sb = getSupabase();

  const { data: all, error: allErr } = await sb
    .from("leads")
    .select("id, owner, name, created_at")
    .order("created_at", { ascending: true });

  const sattiId = "27bd170a-932e-4ec6-8fcb-9a15e9bae5c9";
  const { data: byId, error: byIdErr } = await sb
    .from("leads")
    .select("id, owner, name, created_at")
    .eq("id", sattiId)
    .single();

  return NextResponse.json({
    supabaseUrl: (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").slice(0, 30),
    allCount: Array.isArray(all) ? all.length : null,
    all: all,
    allErr: allErr ? String(allErr) : null,
    byId: byId,
    byIdErr: byIdErr ? String(byIdErr) : null,
  });
}