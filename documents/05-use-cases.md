# Accidental-Case-Win-Project — Use Cases

> Generated from static analysis on 2026-09-28. Each use case is anchored to the
> route or module that implements it. Actors are named from what the code
> touches; a role model was not discoverable statically.

## Actors

| Actor | Basis for inclusion |
| --- | --- |
| **Visitor** | unauthenticated consumer of the public interface |
| **Authenticated user** | no auth layer detected — this actor is assumed, not confirmed |
| **Administrator** | admin surface present |
| **External service** | no outbound integrations detected |
| **AI model provider** | not applicable |

## Use cases

### UC-01 — Access `/admin`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/admin` |
| **Main success flow** | 1. User requests `/admin`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/admin/layout.tsx` |

### UC-02 — Access `/admin`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/admin` |
| **Main success flow** | 1. User requests `/admin`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/admin/page.tsx` |

### UC-03 — Access `/blog/car-accident-settlement-amount`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/blog/car-accident-settlement-amount` |
| **Main success flow** | 1. User requests `/blog/car-accident-settlement-amount`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/blog/car-accident-settlement-amount/page.tsx` |

### UC-04 — Access `/blog`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/blog` |
| **Main success flow** | 1. User requests `/blog`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/blog/page.tsx` |

### UC-05 — Access `/blog/statute-of-limitations-car-accident-claims`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/blog/statute-of-limitations-car-accident-claims` |
| **Main success flow** | 1. User requests `/blog/statute-of-limitations-car-accident-claims`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/blog/statute-of-limitations-car-accident-claims/page.tsx` |

### UC-06 — Access `/case-types/[slug]/[state]`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/case-types/[slug]/[state]` |
| **Main success flow** | 1. User requests `/case-types/[slug]/[state]`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/case-types/[slug]/[state]/page.tsx` |

### UC-07 — Access `/case-types/[slug]`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/case-types/[slug]` |
| **Main success flow** | 1. User requests `/case-types/[slug]`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/case-types/[slug]/page.tsx` |

### UC-08 — Access `/certificate/[id]`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/certificate/[id]` |
| **Main success flow** | 1. User requests `/certificate/[id]`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/certificate/[id]/page.tsx` |

### UC-09 — Access `/faq`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/faq` |
| **Main success flow** | 1. User requests `/faq`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/faq/page.tsx` |

### UC-10 — Access `/app`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/app` |
| **Main success flow** | 1. User requests `/app`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/layout.tsx` |

### UC-11 — Access `/app`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/app` |
| **Main success flow** | 1. User requests `/app`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/page.tsx` |

### UC-12 — Access `/privacy`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/privacy` |
| **Main success flow** | 1. User requests `/privacy`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/privacy/page.tsx` |

### UC-13 — Access `/states/[state]`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/states/[state]` |
| **Main success flow** | 1. User requests `/states/[state]`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/states/[state]/page.tsx` |

### UC-14 — Access `/terms`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/terms` |
| **Main success flow** | 1. User requests `/terms`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/terms/page.tsx` |

### UC-15 — Access `/thank-you`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Application is deployed and serving |
| **Trigger** | User navigates to `/thank-you` |
| **Main success flow** | 1. User requests `/thank-you`. 2. Server resolves the route module. 3. Response renders with status 200. |
| **Alternatives** | Route not matched → 404; dependency unavailable → error boundary |
| **Postcondition** | Page delivered; no server state mutated |
| **Evidence** | `app/thank-you/page.tsx` |

### UC-16 — Invoke handler `app/api/admin/change-password/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/admin/change-password/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/admin/change-password/route.ts` |

### UC-17 — Invoke handler `app/api/admin/debug/leads/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/admin/debug/leads/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/admin/debug/leads/route.ts` |

### UC-18 — Invoke handler `app/api/admin/forgot-password/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/admin/forgot-password/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/admin/forgot-password/route.ts` |

### UC-19 — Invoke handler `app/api/admin/login/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/admin/login/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/admin/login/route.ts` |

### UC-20 — Invoke handler `app/api/admin/security-questions/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/admin/security-questions/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/admin/security-questions/route.ts` |

### UC-21 — Invoke handler `app/api/admin/social-links/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/admin/social-links/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/admin/social-links/route.ts` |

### UC-22 — Invoke handler `app/api/admin/users/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/admin/users/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/admin/users/route.ts` |

### UC-23 — Invoke handler `app/api/certificate/[id]/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/certificate/[id]/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/certificate/[id]/route.ts` |

### UC-24 — Invoke handler `app/api/leads/[id]/claim/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/leads/[id]/claim/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/leads/[id]/claim/route.ts` |

### UC-25 — Invoke handler `app/api/leads/[id]/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/leads/[id]/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/leads/[id]/route.ts` |

### UC-26 — Invoke handler `app/api/leads/export/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/leads/export/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/leads/export/route.ts` |

### UC-27 — Invoke handler `app/api/leads/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/leads/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/leads/route.ts` |

### UC-28 — Invoke handler `app/api/settings/trustedform/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/settings/trustedform/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/settings/trustedform/route.ts` |

### UC-29 — Invoke handler `app/api/social-links/route.ts`

| Field | Value |
| --- | --- |
| **Primary actor** | Visitor |
| **Precondition** | Server process is running and the route is registered |
| **Trigger** | An HTTP request reaches `app/api/social-links/route.ts` |
| **Main success flow** | 1. Request is routed to the handler. 2. Input is read and validated. 3. Domain logic executes. 4. A structured response is returned. |
| **Alternatives** | Invalid input → 4xx; unhandled exception → 5xx |
| **Postcondition** | State may be persisted |
| **Evidence** | `app/api/social-links/route.ts` |
