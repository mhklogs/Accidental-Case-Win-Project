# 04 — Non-Functional Requirements

| ID | Category | Requirement | How It Is Met |
|----|----------|-------------|---------------|
| NFR-1 | **Performance** | Landing page interactive in under 2s on a normal connection | Static prerender of `/` and `/thank-you` (verified: build emits static pages, ~99kB first-load JS) |
| NFR-2 | Performance | Lead submission round-trip < 1.5s excluding TrustedForm claim latency; claim call capped at 10s timeout so a slow ActiveProspect never hangs the visitor's request | `AbortSignal.timeout(10_000)` in `lib/trustedform.ts` |
| NFR-3 | Performance | Dashboard list queries stay fast at tens of thousands of leads: filtering is O(n) over an in-memory array read once per request | `lib/db.ts getLeads()` single file read |
| NFR-4 | **Scalability** | Supports many concurrent users and devices without crashing: writes serialized via mutex prevents lost-update corruption; no session state held in server memory (stateless tokens) → safe to run multiple instances behind a load balancer on shared storage | `locked()` + stateless token design |
| NFR-5 | Scalability | Storage abstraction (`lib/db.ts`, `lib/users.ts`) swappable to SQLite/Postgres/Prisma with identical function signatures when volume demands it — documented upgrade path | docs/02 §6 |
| NFR-6 | **Security** | Passwords and security-question answers hashed with per-secret random salt + scrypt (64-byte derived key); constant-time comparisons throughout | `hashSecret()`, `verifySecret()`, `safeEqual()` |
| NFR-7 | Security | API keys never leave the server after save — clients receive only masked previews | settings GET response shape |
| NFR-8 | Security | Session tokens are HMAC-style signed against the username + 12h time bucket; not forgeable, auto-expiring, invalidated by password change | `lib/auth.ts` |
| NFR-9 | Security | Username enumeration prevented: forgot-password returns identical generic responses for existing and non-existing accounts | `/api/admin/forgot-password` |
| NFR-10 | Security | Owner-scoped data access enforced server-side on every read; the client can never request another user's leads by crafting ids or query params | `l.owner === authenticated username` filter |
| NFR-11 | Security | Input validation and normalization server-side for every public field (regex checks for phone/email/zip, US-state whitelist); no HTML injection surface (React escaping) | `sanitizeLead()` |
| NFR-12 | Security | Admin routes marked `noindex, nofollow`; dashboard unreachable by crawlers | `app/admin/layout.tsx` metadata |
| NFR-13 | Security | Secrets live only in `.env.local` / `data/`, both gitignored; example file provided instead | `.gitignore`, `.env.local.example` |
| NFR-14 | **Reliability** | Atomic file persistence (write-to-temp + rename) means a crash mid-write can never corrupt `leads.json` / `users.json` / `settings.json` | `writeJsonAtomic()` |
| NFR-15 | Reliability | Graceful degradation: if TrustedForm is down or unconfigured, leads are still captured with status flags; if the TF script fails client-side, form submission proceeds | claim flow + `useTrustedForm` try/catch |
| NFR-16 | Reliability | All external calls time-boxed; unexpected exceptions in claim logic caught and recorded as structured failure metadata rather than thrown | try/catch in `claimCertificate()` |
| NFR-17 | **Compliance** | Every consent captured with a TrustedForm certificate URL where available; certificate retained via Claim API when configured — audit-ready proof of TCPA consent per lead | FR-26 … FR-30 |
| NFR-18 | Compliance | Legal-advertising disclaimer present in footer | `app/page.tsx` footer |
| NFR-19 | **Usability** | Responsive from 320px phones to wide desktops; touch-friendly targets; visible focus rings; loading, empty, and error states for every async view | Tailwind responsive classes + dedicated states in each component |
| NFR-20 | Usability | One-time setup UX: user pastes their API key once, sees persistent "Key configured" confirmation, and is never asked again unless they choose Remove Key | ApiKeyTab states |
| NFR-21 | **Maintainability** | Strict TypeScript across the codebase (`strict: true`); shared types (`Lead`, `LeadRow`, `ClaimMeta`) keep client/server contracts honest; production build compiles clean with zero errors | verified via `next build` |
| NFR-22 | Maintainability | Single source of truth per concern: storage in `db.ts`, identity in `users.ts`/`auth.ts`, compliance in `trustedform.ts`; UI split into small single-purpose components | project structure |
| NFR-23 | **Portability** | Runs anywhere Node 18+ runs; no native modules, no external services required for local operation; data folder relocatable via `DATA_DIR` | dependency set |
| NFR-24 | Portability | Zero paid dependencies or services required to run locally; TrustedForm account needed only for real certificate claiming | stack choice |

## Capacity Notes (current JSON-store build)

| Metric | Practical limit | Notes |
|---|---|---|
| Dashboard accounts | hundreds | users.json read per auth lookup; trivially fast |
| Leads total | ~50k–100k | full-array scan per list call; move to SQLite beyond this (§6 of docs/02) |
| Concurrent writes | serialized (correctness first) | mutex guarantees integrity; throughput fine for lead-gen volumes |
