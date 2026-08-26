"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",    label: "Top" },
  { id: "stats",   label: "Results" },
  { id: "how",     label: "How It Works" },
  { id: "areas",   label: "Case Types" },
  { id: "why",     label: "Why Us" },
  { id: "reviews", label: "Reviews" },
  { id: "faq",     label: "FAQ" },
  { id: "claim",   label: "Form" },
];

export default function Sidebar() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
      );
      io.observe(el);
      obs.push(io);
    }
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Jump to section"
      className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 xl:flex items-center gap-3 rounded-full border border-slate-200/60 bg-white/80 px-4 py-2 shadow-lifted backdrop-blur-lg"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
            active === id
              ? "bg-navy-900 text-gold-400"
              : "text-slate-400 hover:text-navy-800"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
