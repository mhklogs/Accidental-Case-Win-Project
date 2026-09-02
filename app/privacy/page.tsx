import Link from "next/link";

export const metadata = { title: "Privacy Policy — Accident Care Helpline" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Back to home</Link>
        <h1 className="font-heading text-3xl font-bold uppercase text-navy-950">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: August 26, 2026</p>
        <div className="prose prose-slate mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">1. Information We Collect</h2>
          <p>When you submit our form, we collect your full name, phone number, email address, zip code, and state. We also capture your TrustedForm certificate URL for consent verification.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">2. How We Use Your Information</h2>
          <p>Your information is used solely to match you with a licensed personal injury attorney for a free case review. We may share your information with attorneys in our network for this purpose.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest. We never sell your information to third parties.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">4. TrustedForm Certification</h2>
          <p>We use TrustedForm by ActiveProspect to certify your consent. TrustedForm creates a certificate documenting that you submitted this form and consented to be contacted. The certificate URL is stored with your lead record.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">5. Data Retention</h2>
          <p>Your information is retained as long as necessary to process your case review request and comply with legal obligations. You may request deletion of your data by contacting us.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at the information provided below.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">7. Cookies &amp; Tracking</h2>
          <p>This website uses cookies for analytics and performance purposes. We do not use cookies for targeted advertising.</p>
          <h2 className="font-heading text-xl font-bold uppercase text-navy-950">8. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at <a href="tel:+17139197830" className="font-bold text-navy-900">(713) 919-7830</a>.</p>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 text-center">
          <Link href="/" className="text-sm font-semibold text-indigo-700 hover:text-indigo-900">← Return to Accident Care Helpline</Link>
        </div>
      </div>
    </main>
  );
}
