"use client";

import { useState } from "react";
import { Quote, ChevronDown } from "lucide-react";

/**
 * Review card. On phones the quote starts clamped (~4 lines) and a round
 * chevron button expands/collapses it. Larger screens always show fully.
 */
export default function TestimonialCard({
  quote,
  name,
  detail,
}: {
  quote: string;
  name: string;
  detail: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <figure className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-card sm:rounded-2xl sm:p-7">
      <Quote className="h-5 w-5 shrink-0 text-gold-500 sm:h-7 sm:w-7" />
      <blockquote
        className={`mt-3 flex-1 text-sm leading-relaxed text-slate-600 ${
          open ? "" : "max-md:line-clamp-4"
        }`}
      >
        “{quote}”
      </blockquote>
      <div className="mt-2 flex items-center justify-end">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Hide full review" : "Show full review"}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-indigo-700 transition hover:bg-indigo-50 active:scale-90 md:hidden"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      <figcaption className="mt-3 border-t border-slate-100 pt-3 sm:mt-6 sm:pt-4">
        <p className="text-sm font-bold text-navy-950 sm:text-base">{name}</p>
        <p className="text-xs text-slate-400">{detail}</p>
      </figcaption>
    </figure>
  );
}
