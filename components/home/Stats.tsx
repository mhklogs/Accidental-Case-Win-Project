"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { raw: "$250M+", label: "Recovered for clients" },
  { raw: "15,000+", label: "Cases won nationwide" },
  { raw: "98%", label: "Success rate" },
  { raw: "$0", label: "Upfront costs — ever" },
];

function parseRaw(raw: string) {
  const m = raw.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!m) return { prefix: "", value: 0, suffix: raw, commas: false };
  return {
    prefix: m[1] ?? "",
    value: parseFloat(m[2].replace(/,/g, "")) || 0,
    suffix: m[3] ?? "",
    commas: (m[2] ?? "").includes(","),
  };
}

/** Counts 0 → target with an ease-out curve once `start` flips true. */
function Stat({
  raw,
  label,
  start,
  delay,
}: {
  raw: string;
  label: string;
  start: boolean;
  delay: number;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!start) return;
    const { prefix, value, suffix, commas } = parseRaw(raw);
    void prefix;
    void suffix;
    let raf = 0;
    const duration = 1700;
    const t0 = performance.now() + delay;

    const tick = (now: number) => {
      const t = Math.min(Math.max((now - t0) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const v = Math.round(value * eased);
      setDisplay(commas ? v.toLocaleString("en-US") : String(v));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, raw, delay]);

  return (
    <div className="text-center">
      <p className="bg-gradient-to-r from-navy-900 to-indigo-700 bg-clip-text text-3xl font-extrabold tabular-nums tracking-tight text-transparent sm:text-4xl">
        {parseRaw(raw).prefix}
        {display}
        {parseRaw(raw).suffix}
      </p>
      <p className="mt-1.5 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Fire everything the moment the band scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-b border-slate-200 bg-white py-12"
    >
      {/* ---- faded background "signal" graph, draws itself on reveal ---- */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="signal-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3865ae" />
              <stop offset="55%" stopColor="#8fadda" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="signal-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* faint chart grid */}
          {[40, 105, 170, 235].map((y) => (
            <line
              key={y}
              x1="0"
              x2="1200"
              y1={y}
              y2={y}
              stroke="#0b1f3a"
              strokeOpacity="0.06"
              strokeWidth="1"
            />
          ))}

          {/* soft area under the curve */}
          <path
            d="M0 268 C140 254 205 208 335 214 C475 220 525 128 665 134 C805 140 862 58 1012 54 C1080 52 1150 42 1200 34 L1200 320 L0 320 Z"
            fill="url(#signal-fill)"
            className={`transition-opacity duration-[2200ms] delay-700 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* the rising recovery "signal" line */}
          <path
            d="M0 268 C140 254 205 208 335 214 C475 220 525 128 665 134 C805 140 862 58 1012 54 C1080 52 1150 42 1200 34"
            fill="none"
            stroke="url(#signal-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={visible ? 0 : 1}
            style={{
              transition: "stroke-dashoffset 2.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* endpoint pulse dot */}
          <circle
            cx="1200"
            cy="34"
            r="5"
            fill="#f59e0b"
            className={`transition-opacity delay-[2400ms] duration-500 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />
        </svg>
      </div>

      {/* ---- the counting stats ---- */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Stat key={s.label} {...s} start={visible} delay={i * 180} />
        ))}
      </div>
    </section>
  );
}
