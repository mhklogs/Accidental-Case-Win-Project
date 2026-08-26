# 01 — Overview

## 1. What This Product Is

AccidentCaseWin is a lead-generation web application for personal-injury legal
services. It has two faces:

1. **A public landing page** (`/`) that converts accident victims into
   qualified leads through a short intake form.
2. **A multi-user admin dashboard** (`/admin`) where account owners review,
   search, filter, and inspect the leads that belong to them — including full
   TrustedForm consent-certification details.

## 2. Key Capabilities

- Landing page with hero section, trust signals, how-it-works, and CTA sections
- Lead form: Full Name, Phone, Email, Zip Code, State (+ hidden TrustedForm cert URL)
- Official ActiveProspect TrustedForm SDK embedded on the form; certificate URL
  captured automatically on every submission
- Server-side **claim & retain** of each certificate through the TrustedForm
  Claim API when the owning user's API key is configured
- **Multi-user**: unlimited dashboard accounts, each with a fully isolated lead
  inbox and its own TrustedForm API key
- **Multi-device sessions**: stateless signed tokens let one account be logged
  in from any number of devices simultaneously
- Password self-service reset via security questions; change-password UI
- User provisioning from within the dashboard (no server access needed)
- Search, state/date filters, pagination on leads; detail drawer with raw claim
  API response

## 3. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + React 18 | One deployable unit for pages *and* API routes; SSR for the landing page |
| Language | TypeScript (strict mode) | Type safety across client, server, and shared models |
| Styling | Tailwind CSS 3.4 with custom navy/gold palette | Fast, consistent, responsive design system |
| Icons | lucide-react | Consistent iconography |
| Storage | Atomic JSON file store under `data/` | Zero-cost, zero-config local persistence; swappable for SQLite/Postgres later |
| Auth | scrypt password hashing + SHA-256 time-bucketed session tokens | No external auth service needed; passwords never stored in plaintext |
| Compliance | ActiveProspect TrustedForm (JS tag + Claim REST API) | Industry-standard TCPA consent proof |

## 4. Project Structure

```
├── app/
│   ├── page.tsx                      # Landing page (hero, form, sections)
│   ├── layout.tsx                    # Root layout, fonts, metadata
│   ├── globals.css                   # Tailwind layers + .input-field etc.
│   ├── thank-you/page.tsx            # Post-submission success page
│   ├── admin/
│   │   ├── layout.tsx                # noindex metadata shell
│   │   └── page.tsx                  # Session restore + gate/dashboard switch
│   └── api/
│       ├── leads/route.ts            # GET (owner-scoped list) / POST (capture)
│       ├── settings/trustedform/route.ts   # Per-user TF API key CRUD
│       └── admin/
│           ├── login/route.ts              # username+password → token
│           ├── change-password/route.ts    # authenticated password change
│           ├── forgot-password/route.ts    # security-question reset (2 steps)
│           ├── security-questions/route.ts # manage question set
│           └── users/route.ts              # provision new accounts
├── components/
│   ├── LeadForm.tsx                  # Public form + TrustedForm SDK injection
│   └── admin/
│       ├── api.ts                    # fetch helper (token header, 401 handling)
│       ├── LoginGate.tsx             # login + forgot-password wizard
│       ├── AdminDashboard.tsx        # shell: top bar, state orchestration
│       ├── LeadsTable.tsx            # search/filter/table/pagination
│       ├── LeadDrawer.tsx            # details incl. claim metadata
│       └── SettingsModal.tsx         # API key / password / questions / users
├── lib/
│   ├── db.ts                         # atomic JSON store, write lock, models
│   ├── users.ts                      # account store, seeding, questions
│   ├── auth.ts                       # hashing, tokens, authenticate()
│   └── trustedform.ts               # Claim API client
├── data/                             # runtime storage (gitignored)
│   ├── leads.json                    # all leads (each tagged with owner)
│   ├── users.json                    # dashboard accounts
│   └── settings.json                 # per-user TrustedForm keys
├── docs/                             # this documentation set
└── .env.local.example                # configuration template
```

## 5. Configuration (.env.local)

| Variable | Required | Purpose |
|---|---|---|
| `ADMIN_USERNAME` | no | First-run seeded username. Default: `umar@0987654321` |
| `ADMIN_PASSWORD` | no | First-run seeded password. Default: `um@r#0987654321`. **Change after first login.** |
| `TRUSTEDFORM_API_KEY` | no | Optional server-wide fallback key used only when a user has not saved their own |
| `TRUSTEDFORM_PAGE_ID` / `_VENDOR` / `_FUNNEL` | no | Metadata sent with each claim call |
| `DATA_DIR` | no | Override storage location (default `<project>/data`) |
