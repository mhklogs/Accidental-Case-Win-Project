# 06 — API Reference

Base URL: `http://localhost:3000` (dev) or your deployed domain.
Auth header for protected routes: `x-admin-token: <token>` (or
`Authorization: Bearer <token>`).

Errors are always JSON: `{ "error": "human readable message" }`.

---

## Public Endpoints

### POST /api/leads — Capture a lead

**Body**

```json
{
  "name":  "Jane Doe",
  "phone": "(555) 123-4567",
  "email": "jane@test.com",
  "zip":   "90210",
  "state": "CA",
  "trustedFormCertUrl": "https://cert.trustedform.com/2601…4f",
  "owner": "attorney.jane"
}
```

- `owner` optional. Must match an existing username (case-insensitive);
  otherwise the primary seeded account receives the lead.

**201 Response**

```json
{
  "ok": true,
  "leadId": "5683d0d8-9230-44c3-bc5d-657c298ba5bb",
  "trustedFormCertUrl": "https://cert.trustedform.com/2601…4f",
  "certificateStatus": "claimed" | "failed" | "skipped" | "not_configured"
}
```

**Errors** · `400` invalid JSON · `422` field validation, e.g.
`"A valid ZIP code is required."`

Validation rules: name ≥ 2 chars · phone matches `[\d\s()+.-]{7,20}` ·
standard email regex · zip `\d{5}(-\d{4})?` · state non-empty
(normalized to uppercase; US two-letter codes validated).

Side effect: if the resolved owner has a TrustedForm API key configured,
the server calls `POST https://cert.trustedform.com/{certId}/claims`
(Basic auth with that key; body includes page_id, vendor, funnel, email,
phone, name). The claim result is stored on the lead. Failure never blocks
the save.

---

## Authentication

### POST /api/admin/login

```json
{ "username": "umar@0987654321", "password": "um@r#0987654321" }
```

**200**

```json
{
  "ok": true,
  "username": "umar@0987654321",
  "hasSecurityQuestions": false,
  "token": "<base64url(payload).hex-signature>",
  "expiresAtMs": 1756200000000
}
```

Store `token` client-side and send it as `x-admin-token`. **401** on bad
credentials. First run auto-seeds the account from `ADMIN_USERNAME` /
`ADMIN_PASSWORD` env (defaults above).

### POST /api/admin/change-password 🔒

```json
{ "currentPassword": "…", "newPassword": "at-least-8-chars" }
```

**200** `{ "ok": true }` · **401** wrong current password / no token ·
**422** new password under 8 chars.

### POST /api/admin/forgot-password — Step 1 (get questions)

```json
{ "username": "umar@0987654321" }
```

**200** `{ "questions": [{ "id": "…", "question": "…" }, …] }` (generic
response when account unknown). **409** account exists but has no security
questions configured.

### POST /api/admin/forgot-password — Step 2 (reset)

```json
{
  "username": "umar@0987654321",
  "answers": ["answer one", "Answer Two", " answer three "],
  "newPassword": "new-secret-123"
}
```

Answers are trimmed/lowercased before comparison; all must be correct.
**200** `{ "ok": true, "reset": true }` · **401** wrong answers ·
**422** short password.

### GET /api/admin/security-questions 🔒

**200**

```json
{ "questions": [{ "id": "…", "question": "…" }],
  "minRequired": 3 }
```

(Answers are never returned.)

### POST /api/admin/security-questions 🔒

```json
{ "questions": [
    { "question": "What city were you born in?", "answer": "Karachi" },
    { "question": "First pet's name?",            "answer": "Whiskers" },
    { "question": "First car make?",              "answer": "Honda" }
] }
```

**200** `{ "ok": true, "count": 3 }` — replaces the entire set. **422**
fewer than 3 complete pairs.

### GET /api/admin/users 🔒 → `{ "ok": true }` (liveness/list ping)

### POST /api/admin/users 🔒 — create an account

```json
{ "username": "Attorney.Jane", "password": "password123" }
```

Username normalized to lowercase; allowed chars `[a-z0-9@._-]{3,64}`.
**201** `{ "ok": true, "username": "attorney.jane" }` · **409** duplicate ·
**422** rule violations.

---

## Settings (per-user)

### GET /api/settings/trustedform 🔒

**200**

```json
{
  "configured": true,
  "keyPreview": "TFKE••••9876",
  "usingEnvFallback": false,
  "updatedAt": "2026-08-26T04:15:20.657Z"
}
```

The raw key is never returned. `usingEnvFallback: true` means no personal
key yet but a server-wide `TRUSTEDFORM_API_KEY` is active.

### POST /api/settings/trustedform 🔒 — save key

```json
{ "apiKey": "your-activeprospect-key" }
```

**200** `{ "ok": true, "configured": true, "updatedAt": "…" }`

### POST /api/settings/trustedform 🔒 — remove key

```json
{ "action": "reset" }
```

**200** `{ "ok": true, "configured": false }`

---

## Leads (dashboard)

### GET /api/leads 🔒

Query params (all optional):

| Param | Example | Meaning |
|---|---|---|
| `search` | `jane` | substring across name/email/phone/state/zip |
| `state` | `CA` | exact state match |
| `from` / `to` | `2026-08-01` | submitted-date range (inclusive) |
| `page` | `2` | 1-based page number |
| `pageSize` | `25` | default 25, max 100 |

**200**

```json
{
  "leads": [{
    "id": "5683d0d8-…",
    "name": "Jane Doe", "phone": "(555) 123-4567", "email": "jane@test.com",
    "zip": "90210", "state": "CA",
    "trustedFormCertUrl": "https://cert.trustedform.com/2601…4f",
    "hasClaim": true,
    "claimStatus": "claimed",
    "createdAt": "2026-08-26T04:15:20.469Z"
  }],
  "page": 1, "pageSize": 25, "total": 1, "totalPages": 1
}
```

Only the authenticated user's own leads are ever returned. Full claim
metadata (raw response etc.) lives server-side and appears in the drawer via
future detail endpoint or by including pageSize=100 rows as done today.

🔒 = requires valid `x-admin-token`; returns **401** otherwise.
