import Link from "next/link";
import { CheckCircle2, PhoneCall, Home, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Thank You — Accident Care Helpline",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-900 px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lifted sm:p-12">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </span>
        <h1 className="font-heading text-3xl font-bold uppercase tracking-tight text-navy-900">
          You&apos;re All Set!
        </h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          Your free case review request has been received. A licensed personal
          injury attorney will contact you shortly — keep an eye on your phone
          and email.
        </p>
        <ul className="mx-auto mt-8 max-w-sm space-y-3 text-left">
          {[
            { icon: PhoneCall, text: "Expect a call within 24 hours" },
            { icon: CheckCircle2, text: "No fees unless you win" },
            { icon: ShieldCheck, text: "Your consent is securely certified" },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
              <Icon className="h-5 w-5 shrink-0 text-gold-600" />
              {text}
            </li>
          ))}
        </ul>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-navy-900 px-6 py-3.5 text-base font-bold text-white transition hover:bg-navy-800"
        >
          <Home className="h-5 w-5" /> Back to Homepage
        </Link>
      </div>
    </main>
  );
}
