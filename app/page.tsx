import Link from "next/link";
import {
  Scale,
  PhoneCall,
  CheckCircle2,
  Gavel,
  HeartPulse,
  ShieldCheck,
  FileText,
  Car,
  AlertTriangle,
  DollarSign,
  Stethoscope,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import Sidebar from "@/components/home/Sidebar";
import Reveal from "@/components/home/Reveal";
import Stats from "@/components/home/Stats";
import TestimonialCard from "@/components/home/TestimonialCard";
import { CASE_TYPES } from "@/lib/caseTypes";
import { STATES } from "@/lib/states";

const steps = [
  {
    icon: PhoneCall,
    title: "1. Tell Us What Happened",
    body: "Fill out the quick form or call our 24/7 line. It takes under two minutes, costs nothing, and there is no obligation whatsoever. We'll ask about the type of accident, your injuries, and basic contact details.",
  },
  {
    icon: Scale,
    title: "2. Get Matched Instantly",
    body: "We review your case details and connect you with a top-rated personal injury attorney licensed in your state — often within minutes. Your attorney will evaluate the facts, explain your legal options, and outline a path forward.",
  },
  {
    icon: Gavel,
    title: "3. Win Your Case",
    body: "Your attorney handles the insurers, negotiations, and paperwork while you focus on healing. Most cases settle out of court. You pay nothing unless you win — that's guaranteed in writing.",
  },
];

const practiceAreas = CASE_TYPES;

const whyChooseUs = [
  {
    title: "Attorneys Who Handle Injury Claims",
    body: "We connect individuals with attorneys who focus specifically on personal injury cases — including car accidents, truck crashes, motorcycle collisions, slip and falls, workplace injuries, and more. These aren't general practice lawyers; they specialize in getting injured people the compensation they deserve.",
  },
  {
    title: "Focused on Your Situation",
    body: "Every accident is different. Attorneys in our network review the details of each case individually to determine how they may be able to assist. Whether you're dealing with stacked medical bills, lost wages, or ongoing pain and suffering, we match you with someone who understands your specific circumstances.",
  },
  {
    title: "Clear Information About Legal Options",
    body: "Attorneys can explain how personal injury claims may involve factors such as medical expenses, lost income, property damage, pain and suffering, and other considerations — depending on the facts of your case and the laws of your jurisdiction. Knowledge is power, and it starts with a free review.",
  },
  {
    title: "No Upfront Costs — Ever",
    body: "Many attorneys in our network offer consultations at no upfront cost. Fee arrangements, including contingency fee structures where the attorney only gets paid if you win, are discussed directly between you and the attorney you choose to work with. You focus on recovery; we handle the financial risk.",
  },
];

const damages = [
  {
    icon: Stethoscope,
    title: "Medical Expenses and Hospital Bills",
    body: "Includes emergency room visits, ambulance transport, surgery, diagnostic imaging, prescription medications, and long-term therapy costs caused by your accident injury. Future medical costs are also considered when injuries require ongoing treatment.",
  },
  {
    icon: HeartPulse,
    title: "Pain and Suffering Compensation",
    body: "Covers physical pain, emotional distress, and reduced quality of life related to the accident. This is often calculated using per diem or multiplier methods, and can represent a significant portion of your total settlement depending on the severity of your injuries.",
  },
  {
    icon: AlertTriangle,
    title: "Mental Health and Emotional Trauma",
    body: "Includes anxiety, depression, stress, PTSD, insomnia, and other psychological effects caused by the collision or its aftermath. These invisible injuries are real and compensable — an experienced attorney knows how to document and value them.",
  },
  {
    icon: DollarSign,
    title: "Lost Wages and Future Income",
    body: "Compensation for time missed at work, lost job opportunities, reduced earning capacity, and ongoing loss of income due to injury or disability. If your injuries prevent you from returning to your previous occupation, future lost earnings may also be included.",
  },
  {
    icon: Car,
    title: "Vehicle and Property Damage",
    body: "Reimbursement for car repairs, total vehicle loss, replacement of personal items damaged in the crash, and rental car costs while your vehicle is being repaired. Property damage claims are often handled separately from injury claims.",
  },
  {
    icon: FileText,
    title: "Rehabilitation and Therapy Costs",
    body: "Helps cover physical therapy, occupational therapy, chiropractic care, mental health counseling, and continued medical support that aids long-term recovery. These costs can add up quickly — documentation is key to recovering them.",
  },
];

const testimonials = [
  {
    quote: "After my highway accident I was drowning in medical bills. My attorney recovered six figures and I never paid a dollar out of pocket. They handled everything from start to finish — I just focused on getting better.",
    name: "Marcus T.",
    detail: "Car accident · Texas",
  },
  {
    quote: "I called at 11pm on a Sunday and a real person answered. By Tuesday I had an attorney reviewing my case. The insurance company folded in three weeks and I got more than I ever expected.",
    name: "Denise R.",
    detail: "Slip & fall · Florida",
  },
  {
    quote: "They handled everything — the adjusters, the paperwork, all of it. I just focused on physical therapy. Settled for 4x their first offer. I can't recommend them enough to anyone who's been hurt.",
    name: "James K.",
    detail: "Workplace injury · Ohio",
  },
];

const faqs = [
  {
    q: "How much does this cost?",
    a: "Nothing upfront, ever. Every attorney in our network works on contingency — they only get paid a percentage of what they win for you. If you don't win, you owe nothing. The initial case review is completely free with no obligation.",
  },
  {
    q: "How do I know if I have a case?",
    a: "If you were injured and someone else may be even partly at fault, you likely have grounds for a claim. Common situations include car accidents caused by another driver, slip and falls on unsafe property, workplace injuries from negligence, and dog bites. The free case review takes two minutes and there's zero obligation to proceed.",
  },
  {
    q: "How long do I have to file?",
    a: "It depends on your state — most give between one and three years from the date of the accident, but some states have shorter deadlines for claims against government entities. Evidence disappears fast, witnesses forget details, and surveillance footage gets deleted. The sooner you act, the stronger your claim.",
  },
  {
    q: "Will I have to go to court?",
    a: "Most personal injury cases settle out of court through negotiation. However, if a fair settlement can't be reached, your attorney will be fully prepared to take your case to trial and fight for maximum compensation before a judge and jury.",
  },
  {
    q: "What if I was partially at fault?",
    a: "Many states follow comparative negligence rules, which means you can still recover damages even if you were partially responsible for the accident. Your compensation may be reduced by your percentage of fault, but you can still receive significant recovery. An attorney can evaluate how fault allocation works in your state.",
  },
  {
    q: "How long does the process take?",
    a: "Timelines vary depending on the complexity of your case, the severity of injuries, and whether a settlement can be reached. Simple cases may resolve in a few months, while more complex cases involving serious injuries or disputed liability may take longer. Your attorney will keep you informed throughout.",
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
            <span className="font-heading text-xl font-bold uppercase tracking-tight text-white">
              Accident<span className="text-gold-400">Care</span>Helpline
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
            <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Three simple steps between your accident and the settlement you
              deserve. Most clients complete step one in under two minutes — and
              many are connected with an attorney the same day.
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

      {/* How We Support Your Legal Journey */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
              How We Support Your Legal Journey
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-slate-500">
              After an accident, navigating insurance claims and legal questions
              can feel overwhelming. Accident Care Helpline helps connect
              individuals with attorneys who handle personal injury matters, making
              it easier to take the next step and understand your available legal
              options.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Free, Confidential Case Review",
                body: "Start with a no-cost, no-obligation review of your accident details. An experienced attorney will evaluate the facts, explain whether you have a viable claim, and outline the legal options available to you — all at no charge.",
              },
              {
                icon: Users,
                title: "Matched With the Right Attorney",
                body: "Not every attorney handles every type of case. We connect you with lawyers who specialize in your specific type of accident — whether it's a car crash, truck collision, motorcycle accident, slip and fall, or workplace injury. The right specialist makes all the difference.",
              },
              {
                icon: FileText,
                title: "Evidence Preservation Guidance",
                body: "Time is critical after an accident. Surveillance footage gets deleted, witnesses forget details, and physical evidence disappears. Your attorney will help you understand what documentation to gather and how to protect your claim from the start.",
              },
              {
                icon: Gavel,
                title: "Insurance Negotiation on Your Behalf",
                body: "Insurance companies are businesses — their goal is to pay you as little as possible. An experienced attorney knows the tactics insurers use, understands the true value of your claim, and will negotiate aggressively to secure the compensation you deserve.",
              },
              {
                icon: Clock3,
                title: "24/7 Availability — Even Weekends",
                body: "Accidents don't wait for business hours. Our network includes attorneys available around the clock, including weekends and holidays. Call anytime to get immediate guidance and start the process of protecting your rights.",
              },
              {
                icon: CheckCircle2,
                title: "No Fee Unless You Win",
                body: "Every attorney in our network works on a contingency fee basis — meaning you pay absolutely nothing upfront. The attorney only gets paid a percentage of what they recover for you. If you don't win, you owe nothing. It's that simple.",
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={(i % 3) * 100}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50/60 p-7 transition hover:border-gold-400/40 hover:bg-white hover:shadow-lifted">
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
            <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
              Practice Areas
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-slate-500">
              Select your accident type to get a free case review and connect with
              a personal injury attorney who can review your situation and explain
              your legal options. Whatever kind of accident left you hurt, there is
              an experienced attorney in our network ready to fight for you.
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
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-indigo-700 sm:mt-3">
                    Get a Free Case Evaluation →
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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Why Choose Accident Care Helpline
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-slate-300">
              After an accident, the insurance company has a team working to minimize
              your claim. You deserve a team working to maximize it. Here&apos;s how we
              help level the playing field.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {whyChooseUs.map(({ title, body }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-gold-400/30 hover:bg-white/10">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-gold-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-14 rounded-2xl border border-gold-400/30 bg-gradient-to-br from-white/10 to-white/5 p-8 text-center backdrop-blur sm:p-10">
              <p className="text-xl font-bold text-white">
                Time is limited. Evidence disappears fast.
              </p>
              <p className="mt-2 max-w-2xl mx-auto text-sm leading-relaxed text-slate-300">
                Surveillance footage gets deleted, witnesses forget details, and
                statutes of limitations can bar your claim forever. Every week you
                wait weakens your case. Don&apos;t let the insurance company dictate
                the terms — act now and protect your rights.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#claim"
                  className="inline-block rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-8 py-4 text-base font-bold text-navy-950 shadow-lifted transition hover:brightness-110 active:scale-[0.98]"
                >
                  Get My Free Case Review →
                </a>
                <a
                  href="tel:+17139197830"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
                >
                  <PhoneCall className="h-5 w-5 text-gold-400" />
                  Call (713) 919-7830 · Available 24/7
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Types of Damages */}
      <section id="damages" className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
              Types of Damages in an Accident Claim
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-center text-slate-500">
              If you&apos;ve been injured in an accident, an attorney can review your
              situation and explain what types of damages may be considered under
              applicable law. The availability and scope of damages depend on the
              facts of each case and the laws of the jurisdiction involved. Below
              are examples of categories that may be discussed during a legal review.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {damages.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={(i % 3) * 100}>
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
          <p className="mt-8 text-center text-sm text-slate-400">
            Note: Eligibility depends on case details and state laws. Speak with an attorney to understand what applies to your situation.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
              Real Clients. Real Recoveries.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Don&apos;t just take our word for it — hear from people who connected
              with an attorney through our network and got the help they needed.
            </p>
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

      {/* Find Accident Lawyers Near You */}
      <section id="states" className="relative overflow-hidden bg-navy-950 py-16 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-[360px] w-[360px] rounded-full bg-indigo-600/25 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-gold-500/15 blur-[110px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="h-8 w-8 text-gold-400" />
              <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
                Find Accident Lawyers Near You
              </h2>
            </div>
            <p className="mx-auto mt-3 max-w-3xl text-center text-slate-300">
              Get a free case review and connect with personal injury attorneys
              across the United States who can review your situation and explain
              your legal options. Browse attorneys serving your state below.
            </p>
          </Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {STATES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 8) * 30} y={10}>
                <Link
                  href={`/states/${s.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200 transition hover:border-gold-400/40 hover:bg-white/10 hover:text-white"
                >
                  {s.name}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-16 lg:py-24">
        <div className="faq mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <h2 className="font-heading text-center text-3xl font-bold uppercase tracking-tight text-navy-950 sm:text-4xl">
              Questions? Answered.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Everything you need to know about getting a free case review and
              working with an attorney through our network.
            </p>
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
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Turning Injuries Into Settlements.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Your case is worth more than you think. Find out in two minutes — free,
            confidential, and with zero obligation. Submit your case details to be
            connected with a qualified attorney who can help evaluate your claim.
            The call that could change everything starts here.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#claim"
              className="inline-block rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 px-10 py-4 text-base font-bold text-navy-950 shadow-lifted transition hover:brightness-110 active:scale-[0.98]"
            >
              Get My Free Case Review →
            </a>
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
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-navy-950 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 shadow-lifted">
                  <Scale className="h-5 w-5 text-navy-950" strokeWidth={2.5} />
                </span>
                <span className="font-heading text-lg font-bold uppercase tracking-tight text-white">
                  Accident<span className="text-gold-400">Care</span>Helpline
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Connecting injury victims with experienced personal injury attorneys
                across the United States. Free case reviews, no upfront costs.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">About</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li><Link href="/#how" className="transition hover:text-gold-300">How It Works</Link></li>
                <li><Link href="/#areas" className="transition hover:text-gold-300">Practice Areas</Link></li>
                <li><Link href="/#why" className="transition hover:text-gold-300">Why Choose Us</Link></li>
                <li><Link href="/#reviews" className="transition hover:text-gold-300">Testimonials</Link></li>
                <li><Link href="/#faq" className="transition hover:text-gold-300">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">Find Services</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li><Link href="/case-types/car-accidents" className="transition hover:text-gold-300">Car Accident Lawyers</Link></li>
                <li><Link href="/case-types/truck-accidents" className="transition hover:text-gold-300">Truck Accident Lawyers</Link></li>
                <li><Link href="/case-types/motorcycle-crashes" className="transition hover:text-gold-300">Motorcycle Accident Lawyers</Link></li>
                <li><Link href="/case-types/slip-and-fall" className="transition hover:text-gold-300">Slip &amp; Fall Lawyers</Link></li>
                <li><Link href="/case-types/workplace-injury" className="transition hover:text-gold-300">Workplace Injury Lawyers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-white">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li><Link href="/terms" className="transition hover:text-gold-300">Terms of Service</Link></li>
                <li><Link href="/privacy" className="transition hover:text-gold-300">Privacy Policy</Link></li>
                <li>
                  <Link
                    href="/admin"
                    aria-label="Staff login"
                    className="text-slate-500 transition hover:text-gold-300"
                  >
                    Staff Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-xs leading-relaxed text-slate-400">
              DISCLAIMER: Accident Care Helpline is a privately owned website and is
              not a law firm, attorney referral service, or government agency. This
              website is intended to connect consumers with participating attorneys
              and legal professionals. Submitting your information constitutes
              permission for an attorney or representative to contact you regarding
              your legal inquiry, including details about potential legal services
              and representation. Legal services are provided only through a signed
              agreement with an attorney. Past results do not guarantee future
              outcomes, and every case is unique. This is attorney advertising and
              does not establish an attorney-client relationship.
            </p>
            <p className="mt-4 text-center text-sm text-slate-500">
              © 2026 Accident Care Helpline. All rights reserved.
            </p>
          </div>
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
