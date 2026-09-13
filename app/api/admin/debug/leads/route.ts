import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { authenticate } from "@/lib/auth";

export const dynamic = "force-dynamic";

// TEMPORARY debug route — dump raw leads ids/owners/names to diagnose cleanup.
export async function GET(req: Request) {
  const user = authenticate(req);
  if (!user || user !== process.env.ADMIN_USERNAME) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const sb = getSupabase();
  const { data, error } = await sb
    .from("leads")
    .select("id, owner, name, created_at")
    .order("created_at", { ascending: true });
  if (error) return NextResponse.json({ error: String(error) }, { status: 500 });
  return NextResponse.json(data);
}