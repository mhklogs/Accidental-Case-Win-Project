import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import { getState, STATES } from "@/lib/states";
import { CASE_TYPES } from "@/lib/caseTypes";
import SeoShell from "@/components/seo/SeoShell";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export function generateMetadata({ params }: { params: { state: string } }) {
  const st = getState(params.state);
  if (!st) {
    return { title: "State Not Found — Accident Care Helpline" };
  }
  return {
    title: `${st.name} Accident Lawyers | Free Case Review — Accident Care Helpline`,
    description: `Injured in ${st.name}? Connect with experienced accident attorneys in ${st.name} who fight for maximum compensation. Free confidential case review — no fee unless you win.`,
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const st = getState(params.state);
  if (!st) notFound();

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
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition hover:text-gold-300"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="flex items-start gap-5">
            <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 sm:flex">
              <MapPin className="h-8 w-8 text-navy-950" />
            </span>
            <div>
              <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">
                {st.name} Accident Lawyers
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-slate-300">
                Injured in {st.name}? Connect with experienced personal injury
                attorneys across the state who handle car accidents, truck
                collisions, motorcycle crashes, workplace injuries and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-slate-700">
            After an accident in {st.name}, insurance companies move fast to
            minimize your claim. Accident Care Helpline connects people injured
            in {st.name} with experienced attorneys who review accident claims,
            explain your legal options, and fight for the maximum compensation
            you deserve — free of charge.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Every day you wait, evidence disappears, witnesses forget details,
            and surveillance footage gets deleted. Get a free, confidential case
            review today and an attorney can help you understand the value of
            your claim and every step that comes next.
          </p>
        </div>
      </section>

      {/* Practice areas in this state */}
      <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
            Accident Attorneys in {st.name}
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-slate-500">
            Select your accident type below to request a free case review and
            connect with an attorney who focuses on that area of injury law in{" "}
            {st.name}.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CASE_TYPES.map((ct) => (
              <Link
                key={ct.slug}
                href={`/case-types/${ct.slug}/${st.slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-lifted"
              >
                <h3 className="font-bold text-navy-950">
                  {ct.title} Lawyers in {st.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
                  {ct.tagline}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-700 group-hover:text-indigo-900">
                  Free Case Review <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All states */}
      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-heading text-center text-2xl font-bold uppercase tracking-tight text-navy-950">
            Accident Lawyers Near You
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-slate-500">
            We connect accident victims with attorneys in every state.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/states/${s.slug}`}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-gold-400/60 hover:bg-gold-50 hover:text-navy-950"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SeoShell>
  );
}