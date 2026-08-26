# AccidentCaseWin — Documentation Index

Production-ready lead-generation platform for personal-injury case intake with
per-user dashboards and TrustedForm compliance integration.

## Folder Contents

| File | Contents |
|---|---|
| [01-overview.md](01-overview.md) | Product overview, tech stack, project structure |
| [02-architecture-data-flow.md](02-architecture-data-flow.md) | System architecture + full data-flow diagrams |
| [03-functional-requirements.md](03-functional-requirements.md) | Every functional requirement, one by one (FR-1 … FR-30) |
| [04-nonfunctional-requirements.md](04-nonfunctional-requirements.md) | Performance, security, scalability, reliability requirements |
| [05-use-cases.md](05-use-cases.md) | Complete use cases, step by step, with actors and flows |
| [06-api-reference.md](06-api-reference.md) | Full REST API reference with request/response examples |

## Quick Start

```bash
npm install
cp .env.local.example .env.local   # then edit values
npm run dev                        # http://localhost:3000
```

Default first-login credentials (change immediately):

| Field | Value |
|---|---|
| Username | `umar@0987654321` |
| Password | `um@r#0987654321` |

Admin dashboard: `http://localhost:3000/admin`

## The 60-Second Mental Model

1. A visitor lands on `/`, fills the injury form, and submits.
2. The TrustedForm script stamps a **certificate URL** into a hidden field.
3. `POST /api/leads` validates, attributes the lead to an account
   (`?ref=username`), claims/retains the certificate using that account's
   TrustedForm API key, and stores everything.
4. That account signs in at `/admin` and sees **only its own leads**, each with
   the certificate link and claim metadata.
