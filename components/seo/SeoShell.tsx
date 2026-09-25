import Link from "next/link";
import { Scale, PhoneCall, CheckCircle2 } from "lucide-react";

export default function SeoShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
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

      {children}

      {/* CTA */}
      <section className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-navy-950 via-[#101b3f] to-indigo-950 py-16 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/10 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Ready to Find Out What Your Case Is Worth?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Get a free, confidential case review — no upfront cost, no
            obligation. Submit your details and an experienced attorney will
            review your situation and explain your legal options.
          </p>
          <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-sm text-slate-300">
            {[
              "Free, confidential case evaluation within minutes",
              "Attorneys who focus on these specific types of claims",
              "No fee unless you win — guaranteed in writing",
              "24/7 availability, including weekends",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#claim"
              className="inline-block rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-10 py-4 text-base font-bold text-navy-950 shadow-lifted transition hover:brightness-110 active:scale-[0.98]"
            >
              Get My Free Case Review →
            </Link>
            <a
              href="tel:+17139197830"
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <PhoneCall className="h-5 w-5 text-gold-400" />
              (713) 919-7830
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">
            Free · Confidential · No Obligation · Available 24/7
          </p>
        </div>
      </section>

    </main>
  );
}
