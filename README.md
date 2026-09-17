# Accident Care Helpline

Production-ready **lead-generation platform** for personal-injury case intake —
public SEO landing pages, a multi-user admin dashboard, per-account lead
attribution, and full **ActiveProspect TrustedForm** consent-certificate
integration.

Built with Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react ·
crash-safe atomic JSON storage (swappable for SQLite/Postgres — see docs).

---

## Quick Start

```bash
npm install
cp .env.local.example .env.local    # then set ADMIN_PASSWORD and edit values
npm run dev                         # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

### First Admin Login (`/admin`)

On first login the app seeds the initial account from environment variables
(defaults: `admin` / `admin`):

| Variable          | Default  | Notes                                  |
|-------------------|----------|----------------------------------------|
| `ADMIN_USERNAME`  | `admin`  | Lowercased on seed                     |
| `ADMIN_PASSWORD`  | `admin`  | **Change it right away**               |

Set a strong password in **Settings → Change Password** and configure your
Security Questions to enable self-service resets.

## Feature Highlights

- **SEO landing pages** — evergreen homepage plus per-case-type, per-state, and
  combined case-type × state pages, auto-generated sitemap/robots, self-
  referencing canonicals, JSON-LD, and FAQ blocks.
- **Lead capture `/`** — navy/gold legal brand, hero + trust sections, intake
  form (Name, Phone, Email, Zip, State), official TrustedForm JS tag captures a
  certificate URL into every submission, dedicated thank-you page.
- **Multi-user dashboard `/admin`** — unlimited accounts; each user sees only
  their own leads; same account can be signed in on any number of devices at
  once; leads table with search, state/date filters and pagination; CSV/JSON/XLSX
  export; detail drawer showing the certificate link + claim metadata.
- **Per-user TrustedForm API keys** — each account pastes its ActiveProspect key
  once in Settings; it persists across sessions/devices and new leads are claimed
  server-side (optional global fallback via `TRUSTEDFORM_API_KEY`).
- **Security** — salted scrypt password hashing, signed expiring session tokens,
  security-question based resets, masked key previews, username-enumeration-safe
  responses, admin pages `noindex`.
- **Reliability** — serialized atomic JSON writes; a TrustedForm outage never
  blocks lead capture.

## Configuration (`.env.local`)

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `ADMIN_USERNAME` | no | `admin` | First-run admin seed |
| `ADMIN_PASSWORD` | no | `admin` | First-run admin seed (**change in Settings**) |
| `TRUSTEDFORM_API_KEY` | no | — | Server-wide fallback key for claim retention |
| `DATA_DIR` | no | `./data` | Runtime data directory |
| `NEXT_PUBLIC_SUPABASE_URL` | no | — | Optional hosted DB (see docs/02 §6) |
| `SUPABASE_SERVICE_ROLE_KEY` | no | — | Optional hosted DB (see docs/02 §6) |

Runtime data lives in `data/` (`leads.json`, `users.json`, `settings.json`) —
gitignored, portable, and swappable for SQLite/Postgres later (see docs).

## Lead Attribution (`?ref=`)

Send traffic to per-account capture URLs:

```
https://yoursite.com/?ref=attorney.jane
```

Leads from that URL land in `attorney.jane`'s inbox. Unknown refs fall back to
the primary account so no lead is ever lost.

## Documentation

Full documentation set lives in [`docs/`](docs/00-index.md):

| Doc | Contents |
|---|---|
| [00-index](docs/00-index.md) | Entry point + mental model |
| [01-overview](docs/01-overview.md) | Product, stack, structure, config |
| [02-architecture-data-flow](docs/02-architecture-data-flow.md) | Diagrams: capture flow, auth flow, isolation |
| [03-functional-requirements](docs/03-functional-requirements.md) | FR-1 … FR-42, one by one |
| [04-nonfunctional-requirements](docs/04-nonfunctional-requirements.md) | Perf, security, scalability, compliance |
| [05-use-cases](docs/05-use-cases.md) | UC-1 … UC-9 step-by-step walkthroughs |
| [06-api-reference](docs/06-api-reference.md) | Every endpoint with examples |

## Deploying

Any Node host works (Vercel, Railway, Fly.io, VPS with `npm start`). Point your
domain at it, log into `/admin`, change the password, paste your TrustedForm
key once, and you're live. On Vercel-style serverless platforms replace the JSON
store with a hosted DB first (see docs/02 §6).