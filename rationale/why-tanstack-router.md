---
title: "Why TanStack Router"
updated: "2026-02-28"
tier: 3
---

# Why TanStack Router

## Decision

TanStack Router ≥1 as the default router. React Router ≥7.1 as alternative.

## Reasons for Default

1. **Type-safe routing** — Route params, search params, and loaders are fully typed. Typos in paths are caught at compile time.
2. **Integrated search params** — First-class search param validation via Zod. No manual parsing.
3. **TanStack ecosystem** — Seamless integration with TanStack Query and Store.
4. **File-based routes** — Optional file-based route generation reduces boilerplate.
5. **Built-in devtools** — Visual route tree for debugging.

## When React Router 7 Instead

- Team already experienced with React Router
- Project requires SSR via Remix / React Router framework mode
- Migration from React Router 6 (minimal changes)

## Agent Behavior

- Developer doesn't specify → **TanStack Router**
- Developer specifies React Router → React Router
- Ambiguous → **ASK**
- Never mix both in the same project

## Status

✅ Core — Both routers are approved. TanStack Router is the default.
