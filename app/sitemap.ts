import type { MetadataRoute } from "next";
import { CASE_TYPES } from "@/lib/caseTypes";
import { STATES, SITE_URL } from "@/lib/states";

const lastModified = new Date();

const blogPosts = [
  {
    slug: "car-accident-settlement-amount",
    priority: 0.8 as const,
  },
  {
    slug: "statute-of-limitations-car-accident-claims",
    priority: 0.8 as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...blogPosts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...CASE_TYPES.map((c) => ({
      url: `${SITE_URL}/case-types/${c.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...STATES.map((s) => ({
      url: `${SITE_URL}/states/${s.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...CASE_TYPES.flatMap((c) =>
      STATES.map((s) => ({
        url: `${SITE_URL}/case-types/${c.slug}/${s.slug}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ),
  ];

  return entries;
}