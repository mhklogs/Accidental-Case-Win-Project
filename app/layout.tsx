import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL } from "@/lib/states";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Accident Care Helpline — Get the Compensation You Deserve",
  description:
    "Injured in an accident? Our network of experienced personal injury attorneys fights to get you maximum compensation. Free case review — no fee unless we win.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Accident Care Helpline — Get the Compensation You Deserve",
    description:
      "Injured in an accident? Our network of experienced personal injury attorneys fights to get you maximum compensation. Free case review — no fee unless we win.",
    type: "website",
    siteName: "Accident Care Helpline",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Accident Care Helpline — Get the Compensation You Deserve",
    description:
      "Injured in an accident? Connect with an experienced attorney for a free case review. No fee unless you win.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Accident Care Helpline",
  url: SITE_URL,
  description:
    "Accident Care Helpline connects injury victims with experienced personal injury attorneys across the United States. Free case reviews, no upfront costs.",
  areaServed: "US",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-713-919-7830",
    contactType: "customer service",
    availableLanguage: ["English", "Spanish"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="nLuEPs6hd2n5N-lcj7APwRdgPTlkVN7UkWAEGBSog2I" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Oswald:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-800">
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}