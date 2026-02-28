---
title: "Why React Hook Form + Zod"
updated: "2026-02-28"
tier: 3
---

# Why React Hook Form + Zod

## Decision

React Hook Form for form state. Zod for schema validation. Together via `@hookform/resolvers/zod`.

## Reasons

1. **Performance** — RHF uses uncontrolled inputs by default. Minimal re-renders even in complex forms.
2. **Type inference** — Zod schemas generate TypeScript types automatically via `z.infer<>`. Single source of truth.
3. **Composable validation** — Zod schemas are composable, reusable, and work beyond forms (API responses, URL params, env vars).
4. **Developer experience** — `register()`, `handleSubmit()`, `formState.errors` — clean, minimal API.
5. **Ecosystem standard** — Most popular form + validation combo in React ecosystem.

## Alternatives Considered

| Alternative       | Why Not                                         |
| ----------------- | ----------------------------------------------- |
| Formik            | More re-renders, larger bundle, less maintained |
| Formik + Yup      | Yup has weaker TypeScript inference than Zod    |
| Native form state | Too much boilerplate for complex forms          |

## Rule

Any form with 2+ fields MUST use React Hook Form + Zod.

## Status

✅ Core — Formik is explicitly banned.
