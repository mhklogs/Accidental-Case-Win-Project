import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqBlock({
  items,
  eyebrow = "FAQ",
  title = "Frequently Asked Questions",
  intro,
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-14 lg:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </p>
        <h2 className="font-heading mt-2 text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
          {title}
        </h2>
        {intro ? (
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
            {intro}
          </p>
        ) : null}
        <div className="mt-10 space-y-4">
          {items.map((i) => (
            <details
              key={i.question}
              className="group rounded-xl border border-slate-200 bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-bold text-navy-950">{i.question}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-5 text-base leading-relaxed text-slate-600">
                {i.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}