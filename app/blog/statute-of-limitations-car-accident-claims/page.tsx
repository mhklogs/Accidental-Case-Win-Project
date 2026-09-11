import Link from "next/link";

export const metadata = {
  title: "Statute of Limitations for Car Accident Claims — Accident Care Helpline",
  description:
    "How long do you have to file a car accident claim? State-by-state statute of limitations deadlines, what happens if you miss one, and why you shouldn't wait.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Statute of Limitations for Car Accident Claims: How Long Do You Have to File?",
  datePublished: "2026-09-11",
  dateModified: "2026-09-11",
  author: { "@type": "Organization", name: "Accident Care Helpline" },
  publisher: {
    "@type": "Organization",
    name: "Accident Care Helpline",
    logo: { "@type": "ImageObject", url: "https://accidentcarehelpline.com/apple-touch-icon.png" },
  },
  mainEntityOfPage: "https://accidentcarehelpline.com/blog/statute-of-limitations-car-accident-claims",
};

const commonLimits: Array<{ state: string; limit: string }> = [
  { state: "Alabama", limit: "2 years" },
  { state: "Arizona", limit: "2 years" },
  { state: "California", limit: "2 years" },
  { state: "Colorado", limit: "3 years" },
  { state: "Florida", limit: "2 years (formerly 4 years — see note)" },
  { state: "Georgia", limit: "2 years" },
  { state: "Illinois", limit: "2 years" },
  { state: "New York", limit: "3 years" },
  { state: "Ohio", limit: "2 years" },
  { state: "Pennsylvania", limit: "2 years" },
  { state: "Texas", limit: "2 years" },
];

export default function StatuteOfLimitationsPost() {
  return (
    <main className="min-h-screen bg-white py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900">
          ← Back to resources
        </Link>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          September 11, 2026 · 6 min read
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold uppercase leading-tight text-navy-950 md:text-4xl">
          Statute of Limitations for Car Accident Claims
        </h1>
        <div className="prose prose-slate mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
          <p>
            After a car accident, the clock is already ticking. Every state sets a{" "}
            <strong>statute of limitations for car accident claims</strong> — a hard deadline for
            filing a lawsuit — and if you miss it, you can lose your right to recover
            compensation entirely, no matter how serious your injuries are.
          </p>
          <p>
            Here is what you need to know about how long you have to file, the deadline in your
            state, and the exceptions that can extend — or shorten — your window of time.
          </p>

          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">
            What Is a Statute of Limitations?
          </h2>
          <p>
            A statute of limitations is a law that limits how long you have to bring a legal
            claim. For personal injury cases, the clock usually starts on the day of the accident
            or the day you discovered your injury. Most car accident injury claims must be filed
            within one to three years, depending on the state.
          </p>
          <p>
            Importantly, the deadline applies to a <em>lawsuit</em>. Insurance settlement
            negotiations can take longer, but if those talks break down and you need to sue, you
            must be within your state&apos;s limit.
          </p>

          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">
            Typical Car Accident Claim Deadlines by State
          </h2>
          <p>
            Two years is the most common limit, but rules vary. Make sure you verify the exact
            law in your state — your case type and who you are suing can change the countdown.
          </p>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-navy-900 text-white">
                  <th className="px-4 py-3 font-heading font-semibold uppercase tracking-wide">State</th>
                  <th className="px-4 py-3 font-heading font-semibold uppercase tracking-wide">Personal Injury Limit</th>
                </tr>
              </thead>
              <tbody>
                {commonLimits.map((row) => (
                  <tr key={row.state} className="border-t border-slate-200 bg-white">
                    <td className="px-4 py-3 font-medium text-navy-900">{row.state}</td>
                    <td className="px-4 py-3 text-slate-600">{row.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            See our{" "}
            <Link href="/states/texas" className="font-semibold text-indigo-700 hover:text-indigo-900">
              Texas
            </Link>
            ,{" "}
            <Link href="/states/california" className="font-semibold text-indigo-700 hover:text-indigo-900">
              California
            </Link>
            ,{" "}
            <Link href="/states/florida" className="font-semibold text-indigo-700 hover:text-indigo-900">
              Florida
            </Link>
            , and{" "}
            <Link href="/states/new-york" className="font-semibold text-indigo-700 hover:text-indigo-900">
              New York
            </Link>{" "}
            pages for state-specific guidance.
          </p>

          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">
            What Happens If You Miss the Deadline?
          </h2>
          <p>
            If you file after the statute of limitations has expired, the defendant can ask the
            court to dismiss your case before it ever goes to trial. In most situations, the
            dismissal is permanent — you lose your right to sue and, with it, your leverage in
            settlement discussions. Insurance adjusters know these deadlines, and they often wait
            them out.
          </p>

          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">
            Exceptions That Can Extend the Deadline
          </h2>
          <p>
            A few situations can pause or lengthen your window:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Minors:</strong> many states pause the countdown until the injured child
              turns 18.
            </li>
            <li>
              <strong>Discovery rule:</strong> if an injury was not discovered right away (such as
              certain medical issues), the clock may start when it was reasonably discovered.
            </li>
            <li>
              <strong>Claims against government entities:</strong> these often have dramatically
              shorter filing windows — sometimes 90 to 180 days — plus special notice
              requirements.
            </li>
          </ul>
          <p>
            Two people injured in the same accident can even have different deadlines, since the
            type of claim affects the limit. Don&apos;t assume yours matches the table above.
          </p>

          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">
            Don&apos;t Wait to Protect Your Claim
          </h2>
          <p>
            Evidence disappears, witnesses forget details, and deadlines pass faster than you
            think. If you were hurt in a{" "}
            <Link href="/case-types/car-accidents" className="font-semibold text-indigo-700 hover:text-indigo-900">
              car accident
            </Link>
            ,{" "}
            <Link href="/case-types/truck-accidents" className="font-semibold text-indigo-700 hover:text-indigo-900">
              truck crash
            </Link>
            , or{" "}
            <Link href="/case-types/motorcycle-crashes" className="font-semibold text-indigo-700 hover:text-indigo-900">
              motorcycle collision
            </Link>
            , a free case review takes minutes and costs you nothing.
          </p>
        </div>
        <div className="mt-10 rounded-2xl bg-navy-900 p-6 text-center shadow-lifted">
          <p className="font-heading text-xl font-bold uppercase tracking-wide text-white">
            Free Case Review · No Fee Unless We Win
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Speak with an attorney in your state before time runs out.
          </p>
          <a
            href="/#claim"
            className="mt-5 inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            Get Your Free Case Review
          </a>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center">
          <Link href="/blog" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">
            ← Back to resources
          </Link>
        </div>
      </div>
    </main>
  );
}