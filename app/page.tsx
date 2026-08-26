import Link from "next/link";
import {
  Scale,
  PhoneCall,
  CheckCircle2,
  Gavel,
  Quote,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import Sidebar from "@/components/home/Sidebar";
import Reveal from "@/components/home/Reveal";
import Stats from "@/components/home/Stats";
import TestimonialCard from "@/components/home/TestimonialCard";
import { CASE_TYPES } from "@/lib/caseTypes";

const steps = [
  {
    icon: PhoneCall,
    title: "1. Tell Us What Happened",
    body: "Fill out the quick form or call our 24/7 line. It takes under two minutes, costs nothing, and there is no obligation whatsoever.",
  },
  {
    icon: Scale,
    title: "2. Get Matched Instantly",
    body: "We review your case details and connect you with a top-rated personal injury attorney licensed in your state — often within minutes.",
  },
  {
    icon: Gavel,
    title: "3. Win Your Case",
    body: "Your attorney handles the insurers, negotiations, and paperwork while you focus on healing. You pay nothing unless you win.",
  },
];

const practiceAreas = CASE_TYPES;

const guarantees = [
  "Free, no-obligation case evaluation within minutes",
  "No fees unless we win your case — guaranteed in writing",
  "Nationwide network of vetted, top-rated injury attorneys",
  "You focus on healing — we handle insurers, paperwork, deadlines",
  "Your information stays confidential and securely certified",
];

const testimonials = [
  {
    quote: "After my highway accident I was drowning in medical bills. My attorney recovered six figures and I never paid a dollar out of pocket.",
    name: "Marcus T.",
    detail: "Car accident · Texas",
  },
  {
    quote: "I called at 11pm on a Sunday and a real person answered. By Tuesday I had an attorney. The insurance company folded in three weeks.",
    name: "Denise R.",
    detail: "Slip & fall · Florida",
  },
  {
    quote: "They handled everything — the adjusters, the paperwork, all of it. I just focused on physical therapy. Settled for 4x their first offer.",
    name: "James K.",
    detail: "Workplace injury · Ohio",
  },
];

const faqs = [
  {
    q: "How much does this cost?",
    a: "Nothing upfront, ever. Every attorney in our network works on contingency — they only get paid a percentage of what they win for you. If you don't win, you owe nothing.",
  },
  {
    q: "How do I know if I have a case?",
    a: "If you were injured and someone else may be even partly at fault, you likely have grounds. The free case review takes two minutes and there's zero obligation to proceed.",
  },
  {
    q: "How long do I have to file?",
    a: "It depends on your state — most give between one and three years, but evidence disappears fast. The sooner you act, the stronger your claim.",
  },
  {
    q: "Will I have to go to court?",
    a: "Most cases settle out of court. If yours doesn't, your attorney will be fully prepared to fight for maximum compensation before a judge.",
  },
];

export default function LandingPage({
  searchParams,
}: {
  searchParams?: { ref?: string };
}) {
  const ownerRef = searchParams?.ref?.trim() || undefined;

  return (
    <main className="min-h-screen bg-white">
      {/* Section sidebar — laptop only */}
      <Sidebar />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 shadow-lifted">
              <Scale className="h-6 w-6 text-navy-950" strokeWidth={2.5} />
            </span>
            <span className="text-xl font-bold tracking-tight text-white">
              Accident<span className="text-gold-400">Case</span>Win
            </span>
          </Link>
          <a
            href="#claim"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-5 py-2.5 text-sm font-bold text-navy-950 shadow-lifted transition hover:brightness-110 sm:inline-flex"
          >
            Free Case Review
          </a>
        </div>
      </header>

      {/* Hero — scroll-parallax on desktop, looping motion on mobile */}
      <div id="hero">
        <Hero />
      </div>

      {/* Stats band — counts up + draws the background signal graph on scroll */}
      <Stats />

      {/* How it works */}
      <section id="how" className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Three simple steps between your accident and the settlement you
              deserve. Most clients complete step one in under two minutes.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lifted">
                  <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy-900 to-indigo-800">
                    <Icon className="h-6 w-6 text-gold-400" />
                  </span>
                  <h3 className="text-lg font-bold text-navy-950">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Practice areas */}
      <section id="areas" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Case Types We Handle
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Whatever kind of accident left you hurt, there is an experienced
              attorney in our network ready to fight for you.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {practiceAreas.map(({ icon: Icon, slug, title, tagline }, i) => (
              <Reveal key={slug} delay={(i % 4) * 80} y={18}>
                <Link
                  href={`/case-types/${slug}`}
                  className="group block h-full rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-gold-400/60 hover:bg-white hover:shadow-lifted sm:p-6"
                >
                  <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950 transition group-hover:bg-gold-500 sm:mb-4">
                    <Icon className="h-5 w-5 text-gold-400 transition group-hover:text-navy-950" />
                  </span>
                  <h3 className="font-bold leading-snug text-navy-950">{title}</h3>
                  <p className="mt-1.5 hidden text-sm leading-relaxed text-slate-500 md:block">
                    {tagline}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-700 sm:mt-3 md:opacity-0 md:transition md:group-hover:opacity-100">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section id="why" className="relative overflow-hidden bg-navy-950 py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-indigo-600/25 blur-[130px]" />
          <div className="absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-gold-500/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Why Injured Victims Choose AccidentCaseWin
            </h2>
            <ul className="mt-8 space-y-4">
              {guarantees.map((g) => (
                <li key={g} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-2xl border border-gold-400/30 bg-gradient-to-br from-white/10 to-white/5 p-8 text-center backdrop-blur">
              <p className="text-xl font-bold text-white">
                Time is limited. Evidence disappears fast.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Surveillance footage gets deleted, witnesses forget, and statutes
                of limitations can bar your claim forever. Every week you wait
                weakens your case.
              </p>
              <a
                href="tel:+18885550199"
                className="mt-6 inline-block rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-8 py-4 text-base font-bold text-navy-950 shadow-lifted transition hover:brightness-110 active:scale-[0.98]"
              >
                Call (888) 555-0199 · Available 24/7
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Real Clients. Real Recoveries.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <TestimonialCard {...t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-16 lg:py-24">
        <div className="faq mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
              Questions? Answered.
            </h2>
          </Reveal>
          <div className="mt-12 space-y-4">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 80} y={16}>
                <details className="group rounded-xl border border-slate-200 bg-slate-50/60 px-6 py-5 open:border-gold-400/50 open:bg-white open:shadow-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-navy-950">
                    {f.q}
                    <ChevronDownIcon />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-[#101b3f] to-indigo-950 py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[110px]" />
        </div>
        <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Your Case Is Worth More Than You Think.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Find out in two minutes — free, confidential, and with zero
            obligation. The call that could change everything starts here.
          </p>
          <a
            href="#claim"
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-10 py-4 text-base font-bold text-navy-950 shadow-lifted transition hover:brightness-110 active:scale-[0.98]"
          >
            Get My Free Case Review →
          </a>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center text-sm text-slate-500 sm:px-6 md:flex-row md:text-left">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-navy-800" />
            <span className="font-bold text-navy-950">AccidentCaseWin</span>
          </div>
          <p className="max-w-xl">
            This is attorney advertising and does not establish an
            attorney-client relationship. Results vary; prior outcomes do not
            guarantee similar results.
          </p>
          <Link
            href="/admin"
            aria-label="Staff login"
            className="text-xs font-medium text-slate-300 transition-colors hover:text-navy-800"
          >
            Staff Login
          </Link>
        </div>
      </footer>
    </main>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="faq-chevron h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
