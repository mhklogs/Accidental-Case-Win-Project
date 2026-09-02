import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  HeartPulse,
  BadgeDollarSign,
  ListChecks,
  PhoneCall,
  Scale,
} from "lucide-react";
import { CASE_TYPES, getCaseType } from "@/lib/caseTypes";
import Reveal from "@/components/home/Reveal";

export function generateStaticParams() {
  return CASE_TYPES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const ct = getCaseType(params.slug);
  return {
    title: ct ? `${ct.title} — Free Case Review | Accident Care Helpline` : "Case Type",
    description: ct?.tagline,
  };
}

export default function CaseTypePage({ params }: { params: { slug: string } }) {
  const ct = getCaseType(params.slug);
  if (!ct) notFound();

  const Icon = ct.icon;
  const others = CASE_TYPES.filter((c) => c.slug !== ct.slug).slice(0, 4);

  const sections = [
    {
      icon: AlertTriangle,
      heading: `Common Causes of ${ct.title}`,
      items: ct.causes,
    },
    {
      icon: HeartPulse,
      heading: "Injuries We Commonly See",
      items: ct.injuries,
    },
    {
      icon: BadgeDollarSign,
      heading: "What Your Compensation May Cover",
      items: ct.compFactors,
    },
    {
      icon: ListChecks,
      heading: "What To Do Next — Step by Step",
      items: ct.nextSteps,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 shadow-lifted">
              <Scale className="h-6 w-6 text-navy-950" strokeWidth={2.5} />
            </span>
            <span className="font-heading text-xl font-bold uppercase tracking-tight text-white">
              Accident<span className="text-gold-400">Care</span>Helpline
            </span>
          </Link>
          <Link
            href="/#claim"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-5 py-2.5 text-sm font-bold text-navy-950 shadow-lifted transition hover:brightness-110 sm:inline-flex"
          >
            Free Case Review
          </Link>
        </div>
      </header>

      {/* Hero strip */}
      <section className="relative overflow-hidden bg-navy-950 py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-[15%] h-[360px] w-[360px] rounded-full bg-indigo-600/25 blur-[120px]" />
          <div className="absolute bottom-[-30%] right-[8%] h-[320px] w-[320px] rounded-full bg-gold-500/20 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-gold-300"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
            <div className="flex items-start gap-5">
              <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 sm:flex">
                <Icon className="h-8 w-8 text-navy-950" />
              </span>
              <div>
                <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
                  {ct.title}
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-slate-300">{ct.tagline}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Intro + sections */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Reveal>
            <p className="text-lg leading-relaxed text-slate-700">{ct.intro}</p>
          </Reveal>

          <div className="mt-12 space-y-10">
            {sections.map(({ icon: Icon, heading, items }, i) => (
              <Reveal key={heading} delay={i * 60}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7 open:shadow-card sm:p-8">
                  <h2 className="flex items-center gap-3 text-xl font-bold text-navy-950">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 to-indigo-800">
                      <Icon className="h-5 w-5 text-gold-400" />
                    </span>
                    {heading}
                  </h2>
                  <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600">
                        <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal delay={100}>
            <div className="relative mt-14 overflow-hidden rounded-2xl bg-gradient-to-br from-navy-950 via-[#101b3f] to-indigo-950 p-8 text-center sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-[90px]"
              />
              <div className="relative">
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  Hurt in a {ct.title.replace(/s$/, "")}? Don&apos;t Wait.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                  Evidence fades and deadlines pass. Get a free, confidential case
                  review in under two minutes — no fee unless you win.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/#claim"
                    className="inline-block rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-8 py-3.5 text-base font-bold text-navy-950 shadow-lifted transition hover:brightness-110 active:scale-[0.98]"
                  >
                    Start My Free Case Review →
                  </Link>
                  <a
                    href="tel:+17139197830"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                  >
                    <PhoneCall className="h-5 w-5 text-gold-400" /> (713) 919-7830
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other case types */}
      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-heading text-center text-2xl font-bold uppercase tracking-tight text-navy-950">
            Other Case Types We Handle
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map(({ icon: OIcon, title, tagline, slug }) => (
              <Link
                key={slug}
                href={`/case-types/${slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-lifted"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950 transition group-hover:bg-gold-500">
                  <OIcon className="h-5 w-5 text-gold-400 transition group-hover:text-navy-950" />
                </span>
                <h3 className="font-bold text-navy-950">{title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{tagline}</p>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center">
            <Link href="/" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">
              View all practice areas →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
