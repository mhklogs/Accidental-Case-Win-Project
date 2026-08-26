import { NextResponse } from "next/server";
import { getLeads, type Lead } from "@/lib/db";
import { authenticate } from "@/lib/auth";

export const dynamic = "force-dynamic";

function toCSV(leads: Lead[]): string {
  const headers = [
    "Name",
    "Phone",
    "Email",
    "State",
    "Zip",
    "TrustedForm Cert URL",
    "Claim Status",
    "Submitted",
    "Owner",
  ];
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = leads.map((l) => [
    escape(l.name),
    escape(l.phone),
    escape(l.email),
    escape(l.state),
    escape(l.zip),
    escape(l.trustedFormCertUrl ?? ""),
    escape(l.trustedFormClaim?.status ?? ""),
    escape(new Date(l.createdAt).toLocaleString()),
    escape(l.owner),
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

export async function GET(req: Request) {
  const username = authenticate(req);
  if (!username) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = new URL(req.url);
  const format = url.searchParams.get("format") ?? "json";
  const leads = (await getLeads()).filter((l) => l.owner === username);

  // CSV export
  if (format === "csv") {
    return new NextResponse(toCSV(leads), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-${username}-${Date.now()}.csv"`,
      },
    });
  }

  // JSON export
  if (format === "json") {
    return new NextResponse(JSON.stringify(leads, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads-${username}-${Date.now()}.json"`,
      },
    });
  }

  // XLSX export
  if (format === "xlsx") {
    try {
      const XLSX = await import("xlsx");
      const data = leads.map((l) => ({
        Name: l.name,
        Phone: l.phone,
        Email: l.email,
        State: l.state,
        Zip: l.zip,
        "TrustedForm Cert URL": l.trustedFormCertUrl ?? "",
        "Claim Status": l.trustedFormClaim?.status ?? "",
        Submitted: new Date(l.createdAt).toLocaleString(),
        Owner: l.owner,
      }));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Leads");
      const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
      return new NextResponse(buf, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="leads-${username}-${Date.now()}.xlsx"`,
        },
      });
    } catch {
      return NextResponse.json(
        { error: "XLSX export unavailable." },
        { status: 501 }
      );
    }
  }

  return NextResponse.json(
    { error: "Unknown format. Use csv, json, or xlsx." },
    { status: 400 }
  );
}
