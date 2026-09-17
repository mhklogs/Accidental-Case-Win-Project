import Link from "next/link";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions — Accident Care Helpline",
  description:
    "Answers to common questions about car accident claims, how our free case review works, attorney fees, and when to contact a lawyer after an accident.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does a free case review cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nothing. Our case review is completely free and carries no obligation. Attorneys in our network typically work on a contingency fee basis, which means you pay no attorney fees unless you win your case.",
      },
    },
    {
      "@type": "Question",
      name: "What does 'no fee unless we win' actually mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It means your matched attorney only gets paid if you recover compensation for your injury. If there is no settlement or court award, you do not owe attorney's fees. This makes legal help accessible even if you were hurt with no savings.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a lawyer to file a car accident claim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can file on your own, but injury claims involve insurance negotiations, deadlines, and evidence that most people are not trained to handle. An attorney can protect your rights and typically negotiates higher settlements than unrepresented claimants.",
      },
    },
    {
      "@type": "Question",
      name: "How long do I have to file a car accident claim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It varies by state. Most states give you two years from the date of the accident to file a personal injury lawsuit, but some allow three or more, and special rules shorten deadlines for claims against government entities. Check your state's statute of limitations as soon as possible.",
      },
    },
    {
      "@type": "Question",
      name: "What if the accident was partly my fault?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You may still be able to recover. Many states use comparative negligence, so you can recover compensation reduced by your percentage of fault, even up to 99% in some states. Other states bar recovery if you are 1% or more at fault. An attorney can explain how your state's rules apply.",
      },
    },
    {
      "@type": "Question",
      name: "What types of accidents do you handle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our network covers car accidents, truck accidents, motorcycle crashes, slip and fall injuries, workplace injuries, medical malpractice, wrongful death, and dog bites in all 50 states plus Washington, D.C. and Puerto Rico.",
      },
    },
    {
      "@type": "Question",
      name: "What damages can I recover in an injury claim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You may recover medical expenses, lost wages, future medical care, pain and suffering, and property damage, depending on your state's laws and the facts of your case. Punitive damages are available in some situations of gross negligence.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly should I contact a lawyer after an accident?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "As soon as you are medically stable. Evidence disappears, witnesses forget details, and insurance companies act fast. Seeking guidance early protects your claim and keeps you within your state's filing deadline.",
      },
    },
    {
      "@type": "Question",
      name: "Will insurance cover my accident if I wasn't at fault?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Usually yes, through the at-fault driver's liability coverage. If that driver is uninsured or underinsured, your own uninsured motorist coverage may apply. An attorney can identify every potential source of coverage in your case.",
      },
    },
    {
      "@type": "Question",
      name: "Do I have to go to court?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The vast majority of personal injury cases settle out of court. Your attorney negotiates with the insurance company first. Going to trial only happens if no fair settlement is reached.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900">
          ← Back to home
        </Link>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-gold-500">
            <HelpCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="font-heading text-3xl font-bold uppercase leading-tight text-navy-950">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Straight answers about accident claims, attorney fees, and how our free case review works.
        </p>

        <div className="mt-10 space-y-3">
          {jsonLd.mainEntity.map((item) => (
            <details
              key={item.name}
              className="group rounded-2xl border border-slate-200 bg-white shadow-card transition hover:shadow-lifted"
              open={item.name === "How much does a free case review cost?"}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <h2 className="font-heading text-base font-bold uppercase leading-snug text-navy-950">
                  {item.name}
                </h2>
                <span className="shrink-0 text-slate-400 transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-navy-900 p-6 text-center shadow-lifted">
          <p className="font-heading text-xl font-bold uppercase tracking-wide text-white">
            Free Case Review · No Fee Unless We Win
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Still have questions? A real attorney in your state can help.
          </p>
          <a
            href="/#claim"
            className="mt-5 inline-block rounded-lg bg-gold-500 px-8 py-3 font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            Get Your Free Case Review
          </a>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-center text-sm text-slate-500">
            Explore more resources:{" "}
            <Link href="/blog" className="font-semibold text-indigo-700 hover:text-indigo-900">our guides</Link>{" "}
            ·{" "}
            <Link href="/case-types/car-accidents" className="font-semibold text-indigo-700 hover:text-indigo-900">car accident claims</Link>{" "}
            ·{" "}
            <Link href="/states/texas" className="font-semibold text-indigo-700 hover:text-indigo-900">Texas attorneys</Link>
          </p>
        </div>
      </div>
    </main>
  );
}