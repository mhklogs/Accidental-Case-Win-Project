# Accidental-Case-Win-Project — Architecture Summary

> Generated from static analysis on 2026-09-28.

## Components

| Layer | Present | Evidence |
| --- | --- | --- |
| Presentation / UI | yes | 15 route module(s), 17 component file(s) |
| API / server | yes | 14 handler(s), entrypoints: none |
| Domain / business logic | unclear | no dedicated layer detected |
| Persistence | yes | @supabase/supabase-js |
| Authentication | no | none detected |

## Detected frameworks and libraries

| Package | Purpose (inferred) |
| --- | --- |
| `@supabase/supabase-js` | Supabase |
| `@types/node` | dependency |
| `@types/react` | dependency |
| `@types/react-dom` | dependency |
| `@vercel/analytics` | dependency |
| `@vercel/kv` | dependency |
| `autoprefixer` | dependency |
| `lucide-react` | dependency |
| `next` | Next.js |
| `postcss` | dependency |
| `react` | React |
| `react-dom` | React |
| `tailwindcss` | Tailwind CSS |
| `typescript` | dependency |
| `xlsx` | dependency |

## Runtime and delivery

| Concern | Finding |
| --- | --- |
| Language mix | TypeScript, JavaScript, Shell, CSS |
| Package manager | npm |
| Container | none |
| Serverless / PaaS | not configured for Vercel |
| CI | none detected |
| Tests | present |
| Type safety | TypeScript |

## Environment variables referenced

- `ADMIN_PASSWORD`
- `ADMIN_USERNAME`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TRUSTEDFORM_API_KEY`
