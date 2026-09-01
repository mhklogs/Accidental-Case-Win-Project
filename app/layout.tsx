import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accident Case Win — Get the Compensation You Deserve",
  description:
    "Injured in an accident? Our network of experienced personal injury attorneys fights to get you maximum compensation. Free case review — no fee unless we win.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Oswald:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
