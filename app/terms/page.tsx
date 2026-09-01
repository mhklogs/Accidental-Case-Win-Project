import Link from "next/link";
import { Scale } from "lucide-react";

export const metadata = { title: "Terms & Conditions — Accident Case Win" };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Back to home</Link>
        <h1 className="font-heading text-3xl font-bold uppercase text-navy-950">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: August 26, 2026</p>
        <div className="prose prose-slate mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">1. Service Overview</h2>
          <p>Accident Case Win provides a free case review service that connects individuals who have been injured in motor vehicle accidents with licensed personal injury attorneys. By submitting our form, you request a free, no-obligation case evaluation.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">2. No Attorney-Client Relationship</h2>
          <p>Submitting information through this website does not establish an attorney-client relationship. An attorney-client relationship is formed only after a signed retainer agreement with one of our network attorneys.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">3. Consent to Contact</h2>
          <p>By submitting the form, you expressly consent to be contacted by Accident Case Win and/or its network of licensed attorneys via phone, email, or text message regarding your potential legal case. Consent is captured and certified through TrustedForm.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">4. No Guarantee of Results</h2>
          <p>Prior results do not guarantee a similar outcome. Every case is unique and depends on its specific facts and applicable law.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">5. Contingency Fee</h2>
          <p>Attorneys in our network typically work on a contingency fee basis, meaning you pay no attorney fees unless you win your case. Specific fee arrangements are determined between you and your matched attorney.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">6. User Information</h2>
          <p>You agree to provide accurate, current, and complete information when using our service. False or misleading information may result in termination of your case review.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">7. Limitation of Liability</h2>
          <p>Accident Case Win is not a law firm and does not provide legal advice. We are a referral service. Our liability is limited to the maximum extent permitted by law.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">8. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of our service constitutes acceptance of the revised terms.</p>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center">
          <Link href="/" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Return to Accident Case Win</Link>
        </div>
      </div>
    </main>
  );
}
