# 02 — Architecture & Data Flow

## 1. High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                          Browsers (any device)                        │
│  ┌───────────────────────────┐      ┌───────────────────────────────┐ │
│  │  Visitor (public)         │      │  Account Owner(s)             │ │
│  │  Landing page  /          │      │  Dashboard  /admin            │ │
│  │  + TrustedForm JS tag     │      │  (same account, N devices OK; │ │
│  │                           │      │   every user sees own data)   │ │
│  └─────────────┬─────────────┘      └──────────────┬────────────────┘ │
└────────────────┼───────────────────────────────────┼──────────────────┘
                 │ POST /api/leads                   │ x-admin-token header
                 ▼                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                     Next.js server (single deployable)                │
│                                                                      │
│   app/api/** route handlers                                          │
│   ├── lib/auth.ts        scrypt verify · token sign/verify           │
│   ├── lib/users.ts       accounts · security questions               │
│   ├── lib/db.ts          atomic JSON store + serialized write lock   │
│   └── lib/trustedform.ts Claim API client (per-user key)             │
└──────────────┬───────────────────────────────────────┬───────────────┘
               │ HTTPS                                 │ local files
               ▼                                       ▼
┌───────────────────────────────┐        ┌─────────────────────────────┐
│  ActiveProspect TrustedForm   │        │  data/                      │
│  cert.trustedform.com         │        │   leads.json (owner-tagged) │
│  POST /{certId}/claims        │        │   users.json                │
│  Basic auth: {user's API key} │        │   settings.json (per-user)  │
└───────────────────────────────┘        └─────────────────────────────┘
```

## 2. Data Flow — Lead Capture (the money path)

```
Visitor            Browser                    Next.js API              TrustedForm          Disk
   │  fills form       │                            │                       │                  │
   │──────────────────>│                            │                       │                  │
   │                   │ trustedform.js loaded      │                       │                  │
   │                   │─── writes hidden input ───>│(no, into the DOM)     │                  │
   │                   │   xxTrustedFormCertUrl     │                       │                  │
   │  clicks Submit    │                            │                       │                  │
   │──────────────────>│  POST /api/leads           │                       │                  │
   │                   │  {name, phone, email,      │                       │                  │
   │                   │   zip, state, certUrl,     │                       │                  │
   │                   │   owner: ?ref=username}    │                       │                  │
   │                   │───────────────────────────>│                       │                  │
   │                   │                            │ 1. validate fields    │                  │
   │                   │                            │ 2. resolve owner      │                  │
   │                   │                            │    (valid user or     │                  │
   │                   │                            │     primary account)  │                  │
   │                   │                            │ 3. owner's TF key?    │                  │
   │                   │                            │─── POST /{id}/claims ─>│                  │
   │                   │                            │<── claim result ──────│                  │
   │                   │                            │ 4. append lead        │                  │
   │                   │                            │    (atomic, locked)   │                  │
   │                   │                            │──────────────────────────────────────────> │
   │                   │  201 {ok, leadId,          │                       │                  │
   │                   │       certificateStatus}   │                       │                  │
   │                   │<───────────────────────────│                       │                  │
   │  redirect to      │                            │                       │                  │
   │  /thank-you       │                            │                       │                  │
   │<──────────────────│                            │                       │                  │
```

**Failure behavior:** if TrustedForm claiming fails or no key is configured,
the lead is **still saved** with `trustedFormClaim.status` set to `failed` /
`not_configured`. Consent capture never blocks revenue capture.

## 3. Data Flow — Authentication & Sessions

```
Owner                Browser                    Next.js                    users.json
 │  /admin              │                           │                          │
 │─────────────────────>│  GET stored token from    │                          │
 │                      │  localStorage             │                          │
 │                      │  (none → show LoginGate)  │                          │
 │  enter username+pwd  │                           │                          │
 │─────────────────────>│  POST /api/admin/login    │                          │
 │                      │──────────────────────────>│ scrypt-verify password   │
 │                      │                           │────────read────────────->│
 │                      │  200 {token}              │                          │
 │                      │<──────────────────────────│                          │
 │                      │  store token+username     │                          │
 │                      │  in localStorage          │                          │
 │                      │                           │                          │
 │  …every later call…  │  GET/POST + x-admin-token │                          │
 │                      │──────────────────────────>│ verify signature for the │
 │                      │                           │ decoded username against │
 │                      │                           │ current time bucket      │
```

- Tokens are **stateless**: nothing is stored server-side per session, so the
  same account can be signed in from unlimited devices at once.
- Tokens expire on a 12-hour rolling bucket (current ± previous bucket
  accepted), so a session dies at most ~24h after the last credential change.
- Changing a password invalidates old buckets → other devices are logged out.

## 4. Data Flow — Per-User Data Isolation

```
POST /api/admin/login (attorney.jane)
        │
        ▼
token = base64url("attorney.jane") + "." + sha256("attorney.jane::bucket")
        │
GET /api/leads  + x-admin-token
        │
        ▼
authenticate(req) ──> username = "attorney.jane"
        │
        ▼
leads = allLeads.filter(l => l.owner === "attorney.jane")   ← hard isolation
```

Every lead row carries an immutable `owner` field assigned at creation time.
No dashboard endpoint ever returns rows whose owner differs from the verified
token identity.

## 5. Storage Model

### data/users.json
```json
{
  "umar@0987654321": {
    "username": "umar@0987654321",
    "passwordHash": "<salt>:<scrypt-64-byte-hex>",
    "securityQuestions": [{ "id": "…", "question": "…", "answerHash": "…" }],
    "passwordChangedAt": null,
    "createdAt": "2026-08-26T04:15:20.000Z",
    "createdBy": null
  }
}
```

### data/settings.json  (per-user TrustedForm keys)
```json
{
  "attorney.jane": {
    "trustedFormApiKey": "TFKEY-…",
    "trustedFormApiKeyUpdatedAt": "2026-08-26T04:15:20.657Z"
  }
}
```

### data/leads.json (one entry per submission)
```json
[{
  "id": "5683d0d8-…",
  "owner": "umar@0987654321",
  "name": "Jane Doe", "phone": "(555) 123-4567", "email": "jane@test.com",
  "zip": "90210", "state": "CA",
  "trustedFormCertUrl": "https://cert.trustedform.com/2601…",
  "trustedFormClaim": {
    "attemptedAt": "2026-08-26T04:15:20.500Z",
    "status": "claimed | failed | skipped | not_configured",
    "httpStatus": 200,
    "response": { "…raw ActiveProspect payload…" },
    "error": null
  },
  "createdAt": "2026-08-26T04:15:20.469Z"
}]
```

All writes go through `locked()` in `lib/db.ts`, a promise-chain mutex that
serializes read-modify-write cycles, then performs **atomic rename** writes
(`file.tmp → file`). Concurrent submissions can never interleave and a crash
mid-write can never corrupt a JSON file.

## 6. Upgrade Path (when you outgrow files)

The storage layer is isolated behind `lib/db.ts` + `lib/users.ts`. To move to
SQLite/Postgres/Prisma, re-implement those two modules with the same function
signatures (`getLeads`, `addLead`, `getUserSettings`, `setTrustedFormApiKey`,
`getUser`, `saveUser`, …). No route handler or component needs to change.
