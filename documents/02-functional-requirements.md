# Accidental-Case-Win-Project — Functional Requirements

> Derived from static analysis of the source tree on 2026-09-28. Each requirement cites
> the file that evidences it, so any claim can be checked. Requirements marked
> *inferred* are derived from naming and structure rather than an explicit
> specification.

## FR-1 Route and page behaviour

| ID | Requirement | Evidence |
| --- | --- | --- |
| FR-1.01 | The system shall serve `/admin` | `app/admin/layout.tsx` |
| FR-1.02 | The system shall serve `/admin` | `app/admin/page.tsx` |
| FR-1.03 | The system shall serve `/blog/car-accident-settlement-amount` | `app/blog/car-accident-settlement-amount/page.tsx` |
| FR-1.04 | The system shall serve `/blog` | `app/blog/page.tsx` |
| FR-1.05 | The system shall serve `/blog/statute-of-limitations-car-accident-claims` | `app/blog/statute-of-limitations-car-accident-claims/page.tsx` |
| FR-1.06 | The system shall serve `/case-types/[slug]/[state]` | `app/case-types/[slug]/[state]/page.tsx` |
| FR-1.07 | The system shall serve `/case-types/[slug]` | `app/case-types/[slug]/page.tsx` |
| FR-1.08 | The system shall serve `/certificate/[id]` | `app/certificate/[id]/page.tsx` |
| FR-1.09 | The system shall serve `/faq` | `app/faq/page.tsx` |
| FR-1.10 | The system shall serve `/app` | `app/layout.tsx` |
| FR-1.11 | The system shall serve `/app` | `app/page.tsx` |
| FR-1.12 | The system shall serve `/privacy` | `app/privacy/page.tsx` |
| FR-1.13 | The system shall serve `/states/[state]` | `app/states/[state]/page.tsx` |
| FR-1.14 | The system shall serve `/terms` | `app/terms/page.tsx` |
| FR-1.15 | The system shall serve `/thank-you` | `app/thank-you/page.tsx` |

## FR-2 Programmatic interface

| ID | Requirement | Evidence |
| --- | --- | --- |
| FR-2.01 | The system shall expose a handler at `app/api/admin/change-password/route.ts` | `app/api/admin/change-password/route.ts` |
| FR-2.02 | The system shall expose a handler at `app/api/admin/debug/leads/route.ts` | `app/api/admin/debug/leads/route.ts` |
| FR-2.03 | The system shall expose a handler at `app/api/admin/forgot-password/route.ts` | `app/api/admin/forgot-password/route.ts` |
| FR-2.04 | The system shall expose a handler at `app/api/admin/login/route.ts` | `app/api/admin/login/route.ts` |
| FR-2.05 | The system shall expose a handler at `app/api/admin/security-questions/route.ts` | `app/api/admin/security-questions/route.ts` |
| FR-2.06 | The system shall expose a handler at `app/api/admin/social-links/route.ts` | `app/api/admin/social-links/route.ts` |
| FR-2.07 | The system shall expose a handler at `app/api/admin/users/route.ts` | `app/api/admin/users/route.ts` |
| FR-2.08 | The system shall expose a handler at `app/api/certificate/[id]/route.ts` | `app/api/certificate/[id]/route.ts` |
| FR-2.09 | The system shall expose a handler at `app/api/leads/[id]/claim/route.ts` | `app/api/leads/[id]/claim/route.ts` |
| FR-2.10 | The system shall expose a handler at `app/api/leads/[id]/route.ts` | `app/api/leads/[id]/route.ts` |
| FR-2.11 | The system shall expose a handler at `app/api/leads/export/route.ts` | `app/api/leads/export/route.ts` |
| FR-2.12 | The system shall expose a handler at `app/api/leads/route.ts` | `app/api/leads/route.ts` |
| FR-2.13 | The system shall expose a handler at `app/api/settings/trustedform/route.ts` | `app/api/settings/trustedform/route.ts` |
| FR-2.14 | The system shall expose a handler at `app/api/social-links/route.ts` | `app/api/social-links/route.ts` |

## FR-3 Presentation components

The interface is composed of 17 component module(s) under `components/`. Each shall render without server-side state leakage between routes.

## FR-7 Persistence

A database or storage client is a dependency. The system shall persist domain records durably, and shall not lose writes on transient failure. *(inferred)*

## FR-8 Configuration

The following environment variables are referenced in source. Each shall be
validated at startup with a clear error when missing.

| Variable | Referenced in |
| --- | --- |
| `ADMIN_PASSWORD` | see source |
| `ADMIN_USERNAME` | see source |
| `NEXT_PUBLIC_SUPABASE_URL` | see source |
| `SUPABASE_SERVICE_ROLE_KEY` | see source |
| `TRUSTEDFORM_API_KEY` | see source |
