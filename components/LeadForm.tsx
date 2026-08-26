"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Lock, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

type FormState = "idle" | "submitting" | "error";

/**
 * Injects the official ActiveProspect TrustedForm tag. The script writes a
 * certificate URL into a hidden input named `xxTrustedFormCertUrl`, which we
 * read from the form on submit.
 */
function useTrustedForm(formRef: React.RefObject<HTMLFormElement>) {
  const injected = useRef(false);
  useEffect(() => {
    if (injected.current || !formRef.current) return;
    injected.current = true;

    const field = "xxTrustedFormCertUrl";
    const provideReferrer = false;
    let tf: HTMLScriptElement | null = null;

    window.setTimeout(() => {
      try {
        const form = formRef.current;
        if (form && !form.querySelector(`input[name="${field}"]`)) {
          const certInput = document.createElement("input");
          certInput.type = "hidden";
          certInput.name = field;
          form.appendChild(certInput);
        }

        tf = document.createElement("script");
        tf.type = "text/javascript";
        tf.async = true;
        tf.src =
          "http" +
          ("https:" === document.location.protocol ? "s" : "") +
          "://api.trustedform.com/trustedform.js?field=" +
          encodeURIComponent(field) +
          (provideReferrer ? "&l=" + encodeURIComponent(document.referrer) : "");
        const s = document.getElementsByTagName("script")[0];
        s?.parentNode?.insertBefore(tf, s);
      } catch {
        /* TrustedForm is a compliance enhancement — never block the form. */
      }
    }, 500);

    return () => {
      tf?.parentNode?.removeChild(tf);
      injected.current = false;
    };
  }, [formRef]);
}

export default function LeadForm({
  ownerRef,
}: {
  /** Optional `?ref=username` from the URL — attributes the lead to that account. */
  ownerRef?: string;
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  useTrustedForm(formRef);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      zip: String(data.get("zip") ?? ""),
      state: String(data.get("state") ?? ""),
      trustedFormCertUrl: String(data.get("xxTrustedFormCertUrl") ?? ""),
      ...(ownerRef ? { owner: ownerRef } : {}),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Submission failed (${res.status}).`);
      }
      router.push("/thank-you");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setFormState("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="input-label">Full Name</label>
        <input id="name" name="name" type="text" required autoComplete="name"
          placeholder="Jane Doe" className="input-field" />
      </div>

      <div>
        <label htmlFor="phone" className="input-label">Phone Number</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel"
          placeholder="(555) 123-4567" className="input-field" />
      </div>

      <div>
        <label htmlFor="email" className="input-label">Email Address</label>
        <input id="email" name="email" type="email" required autoComplete="email"
          placeholder="jane@email.com" className="input-field" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zip" className="input-label">Zip Code</label>
          <input id="zip" name="zip" type="text" required inputMode="numeric"
            autoComplete="postal-code" maxLength={10} placeholder="90210"
            className="input-field" />
        </div>
        <div>
          <label htmlFor="state" className="input-label">State</label>
          <select id="state" name="state" required defaultValue=""
            className="input-field">
            <option value="" disabled>Select…</option>
            {US_STATES.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {errorMessage && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-6 py-4 text-base font-bold text-navy-900 shadow-lifted transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formState === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
          </>
        ) : (
          "Get My Free Case Review →"
        )}
      </button>

      <p className="flex items-start justify-center gap-1.5 pt-1 text-xs text-slate-400">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Your information is confidential and never sold to third parties.
      </p>
      <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        Consent captured with TrustedForm certification.
      </p>
    </form>
  );
}
