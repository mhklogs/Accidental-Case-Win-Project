# 05 — Use Cases (Step by Step)

Actors: **Visitor** (public site), **User** (dashboard account owner),
**System** (Next.js app), **TF** (ActiveProspect TrustedForm).

---

## UC-1 — Visitor Submits a Lead

**Actor:** Visitor · **Goal:** Get a free case review
**Precondition:** Landing page loaded at `/`

| # | Step |
|---|------|
| 1 | Visitor opens `/` and scrolls to the "Check My Compensation" form. |
| 2 | System has already injected the TrustedForm script in the background; TF silently stamps a certificate URL into hidden input `xxTrustedFormCertUrl`. |
| 3 | Visitor fills Full Name, Phone, Email, Zip Code, State. |
| 4 | Visitor clicks **Get My Free Case Review →**; button shows a spinner. |
| 5 | System POSTs all fields + certificate URL (+ `owner` if URL had `?ref=username`) to `/api/leads`. |
| 6 | System validates fields; resolves owner (valid user, else primary account). |
| 7 | If owner's TrustedForm API key exists: System claims/retains the cert with TF and records the result on the lead. Otherwise status is stored as `not_configured` — lead still saved. |
| 8 | System persists the lead atomically and returns 201. |
| 9 | Browser redirects to `/thank-you`; visitor sees confirmation and what happens next. |

**Alternate flows:** invalid input → 422 with specific message shown inline;
network/API failure → red error banner, visitor can retry.

---

## UC-2 — User Logs In (Any Device, Any Number of Devices)

**Actor:** User · **Goal:** Access own dashboard

| # | Step |
|---|------|
| 1 | User opens `/admin`. System checks localStorage for a saved token. |
| 2a | Valid token → dashboard opens directly (session restored). |
| 2b | No/expired token → Login Gate appears. |
| 3 | User enters username + password, clicks **Sign In**. |
| 4 | System verifies scrypt hash, issues a signed token valid ~12–24h. |
| 5 | Browser stores the token; user lands on their leads table. |

**Notes:** the same account can be logged in on a laptop and two phones at
once — tokens are stateless, so devices never conflict.

---

## UC-3 — First Login & One-Time TrustedForm API Key Setup

**Actor:** User · **Goal:** Enable certificate claiming for own leads
**Precondition:** UC-2 completed once

| # | Step |
|---|------|
| 1 | User clicks **Settings** → tab **TrustedForm API Key**. |
| 2 | System shows current state: *Key configured (ABCD••••WXYZ)* / *fallback active* / *no key configured*. |
| 3 | User pastes their ActiveProspect API key and clicks **Save Key**. |
| 4 | System stores the key against that username only. Confirmation appears. |
| 5 | From now on every new lead owned by this user is claimed automatically. User is never asked again until they click **Remove Key**. |

---

## UC-4 — Reviewing Leads (Search, Filter, Detail)

**Actor:** User

| # | Step |
|---|------|
| 1 | Dashboard shows only this user's leads: name, phone, email, location, submitted date, TF badge (Claimed / Claim Failed / No Certificate / API Key Not Set). |
| 2 | User types in search → live match across name, email, phone, state, zip. |
| 3 | User clicks **Filters** → picks state and/or date range → results update. |
| 4 | User clicks a row → right-side drawer opens with raw fields, clickable TrustedForm certificate link (opens cert site), and claim metadata: status, timestamp, HTTP code, error, collapsible raw API response. |
| 5 | User closes drawer or pages through results with ‹ › controls. Refresh button re-fetches. |

---

## UC-5 — Creating a New Team Account

**Actor:** Any signed-in User

| # | Step |
|---|------|
| 1 | Settings → **Add User** tab. |
| 2 | Enter new username + initial password (min 8 chars) → **Create User**. |
| 3 | System enforces username rules, rejects duplicates, saves hashed credentials. |
| 4 | New account can sign in immediately from anywhere. It sees an empty inbox — it will only ever see its own leads, and can set up its own TF key (UC-3). |

---

## UC-6 — Forgot Password (Self-Service Reset via Security Questions)

**Actor:** User who forgot their password

| # | Step |
|---|------|
| 1 | On the login screen click **Forgot password?** → enter username → Continue. |
| 2a | If the account has security questions: they are displayed. |
| 2b | If not configured: reset is refused with guidance to configure them after logging in (409). Non-existing usernames get a generic response (no enumeration). |
| 3 | User answers **all** questions (case-insensitive comparison) and sets a new password (min 8 chars). |
| 4 | System verifies every answer, updates the hash, confirms success. |
| 5 | User returns to sign-in and logs in with the new password. All previously issued tokens are invalidated. |

---

## UC-7 — Changing Password While Logged In

**Actor:** Signed-in User

| # | Step |
|---|------|
| 1 | Settings → **Change Password**: current password, new password, confirm. |
| 2 | System verifies current password, updates hash. |
| 3 | Success message shown; applies on every device (other sessions expire naturally with old token bucket). |

## UC-8 — Managing Security Questions

**Actor:** Signed-in User

| # | Step |
|---|------|
| 1 | Settings → **Security Questions**: three Q&A rows with suggested-question autocomplete. |
| 2 | Fill all questions + answers → Save. Answers are normalized (trimmed/lowercased) and hashed. Saving replaces the previous set. |
| 3 | UC-6 now works for this account. |

---

## UC-9 — Signing Out / Losing a Device

**Actor:** User

| # | Step |
|---|------|
| 1 | Click **Sign out** → local token wiped → login gate returns on that device. |
| 2 | Other devices stay logged in (tokens independent per device). |
| 3 | Lost device? Change your password (UC-7) — old buckets become invalid, forcing re-auth everywhere. |

---

## Traceability Matrix (use case ↔ requirements)

| Use Case | Functional Requirements | Docs |
|---|---|---|
| UC-1 | FR-1 … FR-11, FR-24, FR-29, FR-30 | docs/02 §2 |
| UC-2 | FR-12 … FR-17 | docs/02 §3 |
| UC-3 | FR-26 … FR-28 | docs/02 §5 |
| UC-4 | FR-23, FR-32 … FR-38 | docs/02 §4 |
| UC-5 | FR-22 | docs/02 §5 |
| UC-6, UC-7, UC-8 | FR-18 … FR-21 | docs/03 §B |
| UC-9 | FR-16, FR-38 | docs/03 §B |
