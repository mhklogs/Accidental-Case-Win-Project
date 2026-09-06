import { NextResponse } from "next/server";
import { getSocialLinks, saveSocialLinks, type SocialLink } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export async function GET(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const links = await getSocialLinks();
  return NextResponse.json({ links });
}

export async function POST(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { action?: string; link?: Partial<SocialLink> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const action = body.action;

  if (action === "reset") {
    await saveSocialLinks([]);
    return NextResponse.json({ ok: true, links: [] });
  }

  const link = {
    id: String(body.link?.id || crypto.randomUUID()),
    type: String(body.link?.type || "").trim(),
    label: String(body.link?.label || "").trim(),
    url: String(body.link?.url || "").trim(),
    createdAt: String(body.link?.createdAt || new Date().toISOString()),
  };
  if (!link.type || !link.url) {
    return NextResponse.json({ error: "Platform and URL are required." }, { status: 400 });
  }
  if (!link.label) link.label = link.type;

  const current = await getSocialLinks();
  const idx = current.findIndex((l) => l.id === link.id);
  let next: SocialLink[];
  if (idx >= 0) {
    next = current.map((l) => (l.id === link.id ? link : l));
  } else {
    next = [link, ...current];
  }
  await saveSocialLinks(next);
  return NextResponse.json({ ok: true, links: next, link });
}

export async function DELETE(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  let body: { id?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const id = String(body.id || "");
  const current = await getSocialLinks();
  await saveSocialLinks(current.filter((l) => l.id !== id));
  return NextResponse.json({ ok: true });
}