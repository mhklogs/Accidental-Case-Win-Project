"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",    label: "Top" },
  { id: "how",     label: "How It Works" },
  { id: "areas",   label: "Practice Areas" },
  { id: "why",     label: "Why Us" },
  { id: "damages", label: "Damages" },
  { id: "states",  label: "Your State" },
  { id: "faq",     label: "FAQ" },
  { id: "claim",   label: "Form" },
];

export default function Sidebar() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      // Reading line sits ~40% down the viewport: the section under it is the
      // one the visitor is focused on. Falls back to the last section whose top
      // has been passed so the highlight matches wherever the user has scrolled.
      const readLine = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      let lastPassed = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= readLine) lastPassed = id;
        if (r.top <= readLine && r.bottom >= readLine) {
          current = id;
          break;
        }
      }
      // Between sections the line may sit in a gap; keep the last passed one.
      current = current === SECTIONS[0].id && lastPassed !== SECTIONS[0].id ? lastPassed : current;
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
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