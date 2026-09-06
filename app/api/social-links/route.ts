import { NextResponse } from "next/server";
import { getSocialLinks } from "@/lib/db";

export async function GET() {
  try {
    const links = await getSocialLinks();
    return NextResponse.json({ links });
  } catch {
    return NextResponse.json({ links: [] });
  }
}