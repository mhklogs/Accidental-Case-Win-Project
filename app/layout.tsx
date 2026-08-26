import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Accident Case Win — Get the Compensation You Deserve",
  description:
    "Injured in an accident? Our network of experienced personal injury attorneys fights to get you maximum compensation. Free case review — no fee unless you win.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
