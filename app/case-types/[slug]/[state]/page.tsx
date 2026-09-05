import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  AlertTriangle,
  HeartPulse,
  BadgeDollarSign,
  ListChecks,
  CheckCircle2,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import { CASE_TYPES, getCaseType, singularLabel } from "@/lib/caseTypes";
import { STATES, getState } from "@/lib/states";
import SeoShell from "@/components/seo/SeoShell";

export function generateStaticParams() {
  return CASE_TYPES.flatMap((c) =>
    STATES.map((s) => ({ slug: c.slug, state: s.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { slug: string; state: string };
}) {
  const ct = getCaseType(params.slug);
  const st = getState(params.state);
  if (!ct || !st) {
    return { title: "Not Found — Accident Care Helpline" };
  }
  const heading = `${singularLabel(ct.title)} Lawyers in ${st.name}`;
  return {
    title: `${heading} | Free Case Review — Accident Care Helpline`,
    description: `Were you injured in a ${singularLabel(ct.title).toLowerCase()} in ${
      st.name
    }? ${singularLabel(ct.title)} lawyers in ${st.name} will review your case for free. No fee unless you win. Call (713) 919-7830.`,
  };
}

export default function PracticeStatePage({
  params,
}: {
  params: { slug: string; state: string };
}) {
  const ct = getCaseType(params.slug);
  const st = getState(params.state);
  if (!ct || !st) notFound();

  const Icon = ct.icon;
  const label = singularLabel(ct.title);
  const heading = `${label} Lawyers in ${st.name}`;

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

  const otherPractices = CASE_TYPES.filter((c) => c.slug !== ct.slug);
  const otherStates = STATES.filter((x) => x.slug !== st.slug).slice(0, 12);

  return (
    <SeoShell>
      {/* Hero strip */}
      <section className="relative overflow-hidden bg-navy-950 py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-[15%] h-[360px] w-[360px] rounded-full bg-indigo-600/25 blur-[120px]" />
          <div className="absolute bottom-[-30%] right-[8%] h-[320px] w-[320px] rounded-full bg-gold-500/20 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Link
            href={`/case-types/${ct.slug}`}
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" /> All {label} Lawyers
          </Link>
          <div className="flex items-start gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 sm:flex">
              <Icon className="h-8 w-8 text-navy-950" />
            </span>
            <div>
              <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
                {heading}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-300">
                {ct.tagline} If the accident happened in {st.name}, an
                experienced attorney can review your case for free and explain
                the legal options available to you.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { icon: CheckCircle2, text: "Free Case Review, No Upfront Costs" },
                  { icon: MapPin, text: `${label} Attorneys Serving ${st.name}` },
                  { icon: BadgeDollarSign, text: "No Fee Unless You Win" },
                ].map(({ icon: Ico, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-200"
                  >
                    <Ico className="h-4 w-4 shrink-0 text-emerald-400" />
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + sections */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-slate-700">
            {ct.intro}
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Were you injured in a {label.toLowerCase()} in {st.name}? The
            bottom line: if someone else was even partly at fault, you may be
            entitled to compensation — but only if you act. An experienced{" "}
            {label.toLowerCase()} attorney serving{" "}
            {st.name} can review the details of your situation at no cost and
            explain the legal options available to you under the laws of your
            state.
          </p>

          {/* Quick-support strip */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: CheckCircle2,
                title: "Free Case Review",
                body: "No cost, no obligation. Find out if you have a claim.",
              },
              {
                icon: AlertTriangle,
                title: "Act Fast",
                body: "Evidence fades fast. Deadlines vary by state — don't wait.",
              },
              {
                icon: BadgeDollarSign,
                title: "No Fee Unless You Win",
                body: "Attorneys work on contingency. $0 upfront, ever.",
              },
            ].map(({ icon: Ico, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 text-center"
              >
                <Ico className="mx-auto h-6 w-6 text-gold-500" />
                <h3 className="mt-2 text-sm font-bold text-navy-950">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            {sections.map(({ icon: Ico, heading: secHead, items }, i) => (
              <div
                key={secHead}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-7 sm:p-8"
              >
                <h2 className="flex items-center gap-3 text-xl font-bold text-navy-950">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 to-indigo-800">
                    <Ico className="h-5 w-5 text-gold-400" />
                  </span>
                  {secHead}
                </h2>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600"
                    >
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other practices in this state */}
      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-heading text-center text-2xl font-bold uppercase tracking-tight text-navy-950">
            More Injury Lawyers in {st.name}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {otherPractices.slice(0, 4).map((c) => (
              <Link
                key={c.slug}
                href={`/case-types/${c.slug}/${st.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-lifted"
              >
                <h3 className="font-bold text-navy-950">
                  {singularLabel(c.title)} Lawyers
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                  {c.tagline}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-700 group-hover:text-indigo-900">
                  Free Case Review <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link
              href={`/states/${st.slug}`}
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              View all accident lawyers in {st.name} →
            </Link>
          </p>
        </div>
      </section>

      {/* This practice in other states */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-heading text-center text-2xl font-bold uppercase tracking-tight text-navy-950">
            {label} Lawyers in Other States
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {otherStates.map((s) => (
              <Link
                key={s.slug}
                href={`/case-types/${ct.slug}/${s.slug}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-gold-400/60 hover:bg-gold-50 hover:text-navy-950"
              >
                {s.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link
              href={`/case-types/${ct.slug}`}
              className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              View all {label} lawyers →
            </Link>
          </p>
        </div>
      </section>
    </SeoShell>
  );
}