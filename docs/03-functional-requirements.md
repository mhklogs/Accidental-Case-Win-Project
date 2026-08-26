# 03 — Functional Requirements

Each requirement lists ID, description, and where it is implemented.

## A. Public Landing Page

| ID | Requirement | Implementation |
|----|-------------|----------------|
| FR-1 | Landing page at `/` with hero section, trust indicators, how-it-works steps, guarantee/CTA band, and legal footer | `app/page.tsx` |
| FR-2 | Legal-brand aesthetic: deep navy palette, gold/amber CTAs, Lucide icons, Inter typography | `tailwind.config.ts`, `globals.css` |
| FR-3 | Fully responsive layout for mobile and desktop | Tailwind responsive prefixes throughout |
| FR-4 | Sticky header with brand mark and CTA button; CTA anchors to the form (`#claim`) | `app/page.tsx` |
| FR-5 | Lead form collects: Full Name (text), Phone (tel), Email (email), Zip Code (text), State (select of all US states + DC) | `components/LeadForm.tsx` |
| FR-6 | Client-side required-field enforcement via HTML5 attributes (`required`, `minLength`, etc.) | `LeadForm.tsx` |
| FR-7 | Official ActiveProspect TrustedForm JS tag injected on mount; writes certificate URL into hidden input `xxTrustedFormCertUrl`; script load failure never blocks the form | `useTrustedForm()` in `LeadForm.tsx` |
| FR-8 | On submit, client POSTs `{name, phone, email, zip, state, trustedFormCertUrl}` to `/api/leads` | `handleSubmit()` in `LeadForm.tsx` |
| FR-9 | Attribution: landing page accepts `?ref=username` and forwards it as `owner` so the lead lands in that account's inbox | `app/page.tsx` searchParams → `LeadForm ownerRef` |
| FR-10 | Inline error banner on failed submission; loading state on submit button | `LeadForm.tsx` |
| FR-11 | Success redirect to `/thank-you` with confirmation content after a 201 response | `LeadForm.tsx`, `app/thank-you/page.tsx` |

## B. Accounts & Authentication

| ID | Requirement | Implementation |
|----|-------------|----------------|
| FR-12 | Login requires **username + password**; first-run account seeded as `umar@0987654321` / `um@r#0987654321` (overridable via env) | `lib/users.ts ensureSeeded()`, `app/api/admin/login/route.ts` |
| FR-13 | Passwords stored only as salted scrypt hashes — never plaintext | `lib/auth.ts hashSecret()` |
| FR-14 | Successful login returns a signed session token stored client-side; all subsequent API calls carry it via `x-admin-token` | login route, `components/admin/api.ts` |
| FR-15 | Same account may be logged in from multiple devices simultaneously (stateless tokens) | `lib/auth.ts issueToken()/verifyToken()` |
| FR-16 | Sessions expire automatically (~24h max) and are invalidated by password change | time-bucketed token design |
| FR-17 | Session restore on page reload: `/admin` silently validates the stored token before showing either gate or dashboard | `app/admin/page.tsx` |
| FR-18 | Change-password screen (current + new + confirm, min 8 chars); applies to every device | `SettingsModal → PasswordTab`, `/api/admin/change-password` |
| FR-19 | Security questions management UI (min 3 Q&A pairs, suggested question list); answers hashed like passwords, compared case-insensitively | `SettingsModal → QuestionsTab`, `/api/admin/security-questions`, `lib/users.ts replaceSecurityQuestions()` |
| FR-20 | Self-service forgot-password flow: enter username → answer all security questions → set new password. Generic responses prevent username enumeration | `LoginGate.tsx`, `/api/admin/forgot-password` |
| FR-21 | If an account has no security questions configured, reset is refused with guidance to configure them first | forgot-password route (409) |

## C. Multi-User & Data Isolation

| ID | Requirement | Implementation |
|----|-------------|----------------|
| FR-22 | Unlimited dashboard accounts can exist; any signed-in user can provision more from Settings → Add User (username rules, min 8-char password, duplicate check) | `SettingsModal → UsersTab`, `/api/admin/users` |
| FR-23 | Each user sees **only their own leads** — hard server-side filter on the authenticated identity | `/api/leads GET`: `l.owner === username` |
| FR-24 | Every lead is attributed to exactly one account at creation: explicit valid `owner` from `?ref=`, else the primary seeded account. Leads are never dropped due to unknown owners | `/api/leads POST` owner resolution |
| FR-25 | Concurrent logins/submissions from many users and devices must not corrupt data: all writes serialized through a mutex and written atomically (tmp-file + rename) | `lib/db.ts locked()`, `writeJsonAtomic()` |

## D. TrustedForm Integration

| ID | Requirement | Implementation |
|----|-------------|----------------|
| FR-26 | Each account saves its **own** TrustedForm/ActiveProspect API key once from Settings → TrustedForm API Key; it persists across sessions/devices until the user removes it | `SettingsModal → ApiKeyTab`, `/api/settings/trustedform` (user-scoped) |
| FR-27 | The raw key is never returned to any client — only a masked preview (`ABCD••••WXYZ`) and configuration status | settings route GET |
| FR-28 | Optional server-wide fallback key via `TRUSTEDFORM_API_KEY`, used only when the owning user has no personal key; UI shows "fallback active" state | `getUserSettings()`, ApiKeyTab |
| FR-29 | On lead submission, if the owning account has a key configured, the server claims/retains the certificate via `POST https://cert.trustedform.com/{certId}/claims` (Basic auth, vendor/funnel/page_id/email/phone/name payload). Result status + raw response stored on the lead | `lib/trustedform.ts claimCertificate()` |
| FR-30 | Claim failure or missing key never blocks lead storage; status recorded as `claimed` / `failed` / `skipped` / `not_configured` | claim route flow |

## E. Admin Dashboard

| ID | Requirement | Implementation |
|----|-------------|----------------|
| FR-31 | Password/account gate before any dashboard access; unauthenticated `/admin` shows only the login view | `LoginGate.tsx` |
| FR-32 | Leads table listing Name, Phone, Email, Location (state+zip), Submitted date, plus a TrustedForm status badge per row | `LeadsTable.tsx` |
| FR-33 | Search across name, email, phone, state, and zip | query param `search`, `matchesSearch()` |
| FR-34 | Filters by state and date range (from/to); combinable with search | `LeadsTable` filter panel, GET handler |
| FR-35 | Pagination (25/page default, capped 100) with prev/next controls | GET handler + table footer |
| FR-36 | Clicking a row opens a detail drawer with raw lead fields, the TrustedForm certificate link (opens cert site in new tab), and claim metadata: claim status, attempt timestamp, HTTP status, error, and collapsible raw API response | `LeadDrawer.tsx` |
| FR-37 | Manual refresh control re-fetches the current view | toolbar Refresh button |
| FR-38 | Sign-out clears local session immediately | `AdminDashboard handleLogout()` |

## F. Backend API

| ID | Requirement | Implementation |
|----|-------------|----------------|
| FR-39 | `POST /api/leads` — public; validates all five fields (+ phone/zip format checks), returns 201 with lead id and certificate status; 422 with specific messages on invalid input | `/api/leads/route.ts` |
| FR-40 | `GET /api/leads` — authenticated, owner-scoped, paginated/searchable; returns `total`, `page`, `totalPages`; strips heavy claim payloads from list rows | same file |
| FR-41 | `POST /api/settings/trustedform` — save (`apiKey`) or remove (`action:"reset"`) the calling user's key; `GET` returns masked status | `/api/settings/trustedform/route.ts` |
| FR-42 | All admin endpoints return 401 on missing/invalid/expired tokens | `authenticate()` guard everywhere |
