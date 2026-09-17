import { CASE_TYPES } from "@/lib/caseTypes";
import { STATES, SITE_URL } from "@/lib/states";

const LOGO = {
  loc: `${SITE_URL}/apple-touch-icon.png`,
  title: "Accident Care Helpline — logo",
  caption: "Connect US injury victims with trusted personal injury attorneys.",
};

const COVER = {
  loc: `${SITE_URL}/og-cover.jpg`,
  title: "Accident Care Helpline — brand cover",
  caption: "Free case review. Car, truck & motorcycle accident and personal injury claims.",
};

const blogPosts = [
  { slug: "car-accident-settlement-amount", priority: 0.8 },
  { slug: "statute-of-limitations-car-accident-claims", priority: 0.8 },
];

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function imageXML(imgs: Array<{ loc: string; title: string; caption: string }>): string {
  return imgs
    .map(
      (im) =>
        `    <image:image>\n      <image:loc>${esc(im.loc)}</image:loc>\n      <image:title>${esc(im.title)}</image:title>\n      <image:caption>${esc(im.caption)}</image:caption>\n    </image:image>`,
    )
    .join("\n");
}

function urlXML(
  loc: string,
  priority: number,
  changeFrequency: string,
  images: Array<{ loc: string; title: string; caption: string }> = [],
): string {
  const imagesBlock = images.length ? "\n" + imageXML(images) : "";
  const lastmod = new Date().toISOString();
  return `  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>${imagesBlock}
  </url>`;
}

export function GET() {

  const urls = [
    urlXML(SITE_URL, 1, "weekly", [LOGO, COVER]),
    urlXML(`${SITE_URL}/blog`, 0.6, "weekly"),
    ...blogPosts.map((p) => urlXML(`${SITE_URL}/blog/${p.slug}`, p.priority, "monthly")),
    urlXML(`${SITE_URL}/faq`, 0.6, "monthly"),
    urlXML(`${SITE_URL}/privacy`, 0.2, "yearly"),
    urlXML(`${SITE_URL}/terms`, 0.2, "yearly"),
    ...CASE_TYPES.map((c) => urlXML(`${SITE_URL}/case-types/${c.slug}`, 0.9, "weekly")),
    ...STATES.map((s) => urlXML(`${SITE_URL}/states/${s.slug}`, 0.8, "weekly")),
    ...CASE_TYPES.flatMap((c) =>
      STATES.map((s) => urlXML(`${SITE_URL}/case-types/${c.slug}/${s.slug}`, 0.7, "weekly")),
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}