"use client";

import { useRef } from "react";
import {
  ShieldCheck,
  Clock3,
  BadgeDollarSign,
  Star,
  PhoneCall,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import LeadForm from "@/components/LeadForm";
import useHeroMotion from "./useHeroMotion";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeroMotion(rootRef);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-navy-950"
      aria-label="Free case review"
    >
      {/* ambient aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div data-plx="-0.55" className="absolute -top-40 left-[6%] h-[520px] w-[520px] rounded-full bg-indigo-600/30 blur-[130px]" />
        <div data-plx="-0.3" className="auto-drift absolute right-[2%] top-[18%] h-[460px] w-[460px] rounded-full bg-gold-500/20 blur-[120px]" />
        <div data-plx="-0.45" className="absolute bottom-[-12%] left-[32%] h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.08fr_460px] lg:items-start lg:gap-12 lg:pb-32 lg:pt-24">
        {/* copy */}
        <div className="text-white">
          <p
            data-fade="1.6"
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-sm font-semibold text-gold-300 backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4" />
            Free Case Review · No Fee Unless You Win
          </p>

          <h1
            data-plx="0.16"
            data-fade="1.15"
            className="max-w-2xl text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.9rem]"
          >
            Injured in an Accident?
            <span className="shimmer-gradient mt-2 block bg-gradient-to-r from-gold-300 via-gold-500 to-amber-300 bg-clip-text text-transparent">
              Turn Your Pain Into Compensation.
            </span>
          </h1>

          <p
            data-plx="0.1"
            data-fade="1.35"
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            Insurance companies deploy entire legal teams to pay you as little
            as possible. We level the playing field — matching you within
            minutes with a battle-tested personal injury attorney in your state
            who has recovered{" "}
            <span className="font-semibold text-white">
              millions for people exactly like you.
            </span>
          </p>

          <ul
            data-plx="0.07"
            data-fade="1.5"
            className="mt-8 grid max-w-lg gap-3 sm:grid-cols-2"
          >
            {[
              { icon: BadgeDollarSign, text: "Maximum compensation, fought for dollar-by-dollar" },
              { icon: ShieldCheck, text: "$0 upfront — attorneys work on contingency" },
              { icon: Clock3, text: "Real attorneys available 24/7, even weekends" },
              { icon: TrendingUp, text: "Clients win 3–5x more than going alone" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-slate-200">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                {text}
              </li>
            ))}
          </ul>

          <div data-fade="1.7" className="mt-10">
            <a
              href="tel:+18885550199"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <PhoneCall className="h-5 w-5 text-gold-400" />
              Prefer to talk? Call (888) 555-0199 — 24/7
            </a>
            <p className="mt-3 text-sm text-slate-400 sm:hidden">
              Or use the form below 👇
            </p>
          </div>

          <div data-fade="1.85" className="auto-anim mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.8s" }}>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold-400 text-gold-400" />
              ))}
            </span>
            <span className="text-sm text-slate-300">
              <strong className="text-white">4.9/5</strong> from 2,300+ verified clients
            </span>
          </div>
        </div>

        {/* form card */}
        <div id="claim" data-plx="-0.12" className="lg:sticky lg:top-24">
          <div className="auto-anim rounded-2xl border border-white/20 bg-white p-6 shadow-lifted sm:p-8">
            <h2 className="text-2xl font-bold text-navy-950">
              Check My Compensation
            </h2>
            <p className="mt-1.5 text-sm text-slate-500">
              100% free &amp; confidential. See what your case is worth — in under 2 minutes.
            </p>
            <LeadForm />
          </div>
        </div>
      </div>

      {/* scroll cue — fades fast on desktop, bounces on mobile until scroll */}
      <div data-fade="2.4" aria-hidden className="pointer-events-none relative -mt-10 flex justify-center pb-6">
        <ChevronDown className="cue-anim h-7 w-7 text-gold-300/80" />
      </div>
    </section>
  );
}
