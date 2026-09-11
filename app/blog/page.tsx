import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Personal Injury Resources & Guides — Accident Care Helpline",
  description:
    "Practical guides on car accident claims, personal injury cases, and getting the compensation you deserve. Free case review available nationwide.",
};

const posts = [
  {
    slug: "statute-of-limitations-car-accident-claims",
    title: "Statute of Limitations for Car Accident Claims: How Long Do You Have to File?",
    excerpt:
      "Time limits for filing a car accident claim vary by state. Here's what you need to know before your deadline expires — and what happens if you wait too long.",
    date: "September 11, 2026",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900">
          ← Back to home
        </Link>
        <h1 className="font-heading text-3xl font-bold uppercase text-navy-950">
          Personal Injury Resources
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Practical guides to help you understand your rights after an accident.
        </p>
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:shadow-lifted"
            >
              <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                <span>{post.date}</span>
                <span aria-hidden="true">•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-3 font-heading text-2xl font-bold uppercase leading-tight text-navy-950">
                <Link href={`/blog/${post.slug}`} className="hover:text-indigo-700">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Read the guide
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}