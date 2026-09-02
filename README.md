# Accident Care Helpline 🏛️

Production-ready **lead-generation platform** for personal-injury case intake —
public landing page, multi-user admin dashboard, and full **ActiveProspect
TrustedForm** consent-certificate integration.

Built with Next.js 14 (App Router) · TypeScript · Tailwind CSS · lucide-react ·
zero-cost atomic JSON storage.

---

## Quick Start

```bash
npm install
cp .env.local.example .env.local    # then edit values
npm run dev                         # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

### Default Login (`/admin`)

| Username | Password |
|---|---|
| `umar@0987654321` | `um@r#0987654321` |

> Seeded automatically on first login from `ADMIN_USERNAME` / `ADMIN_PASSWORD`.
> **Change it right away** in Settings → Change Password, and set your
> Security Questions to enable self-service resets.

## Feature Highlights

- **Landing page `/`** — navy/gold legal brand, hero + trust sections, intake
  form (Name, Phone, Email, Zip, State), official TrustedForm JS tag captures
  a certificate URL into a hidden field on every submission, thank-you page.
- **Multi-user dashboard `/admin`** — unlimited accounts; each user sees only
  their own leads; same account can be logged in on any number of devices at
  once; leads table with search, state/date filters, pagination; detail drawer
  showing certificate link + claim metadata (status, HTTP result, raw API
  response).
- **Per-user TrustedForm API keys** — each account pastes its ActiveProspect
  key once in Settings; it persists across sessions/devices until removed;
  new leads are automatically claimed/retained server-side with that key
  (optional global fallback via `TRUSTEDFORM_API_KEY`).
- **Security** — salted scrypt password hashing, signed expiring session
  tokens, security-question based self-service password reset, masked key
  previews, username-enumeration-safe responses, admin pages `noindex`.
- **Reliability** — serialized atomic writes (crash-safe JSON files); a
  TrustedForm outage never blocks lead capture.

## Configuration (`.env.local`)

See `.env.local.example`. Key variables:

```
ADMIN_USERNAME=umar@0987654321     # first-run seed (optional)
ADMIN_PASSWORD=um@r#0987654321     # first-run seed (CHANGE IT)
TRUSTEDFORM_API_KEY=               # optional server-wide fallback key
DATA_DIR=                          # optional storage override
```

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

Any Node host works (Vercel, Railway, Fly.io, VPS with `npm start`). Point
your domain at it, log into `/admin`, paste your TrustedForm key once, and
you're live. On Vercel-style serverless platforms replace the JSON store with
a hosted DB first (see docs/02 §6).
