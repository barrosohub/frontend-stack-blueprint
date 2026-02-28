---
title: "Why TanStack"
updated: "2026-02-28"
tier: 3
---

# Why TanStack (Query) + Zustand

## Decision

Zustand for client state. TanStack Query ≥5.60 for server state.

## Reasons

1. **Clear state boundary** — Client state and server state are fundamentally different concerns. Using purpose-built solutions for each prevents confusion.
2. **Zustand** — Minimal, reactive, type-safe. No boilerplate (actions, reducers, dispatchers). ~1KB bundle. Battle-tested in thousands of production apps.
3. **TanStack Query** — Industry-leading solution for server state: automatic caching, deduplication, background refetching, optimistic updates, pagination.
4. **Zustand works outside React** — Stores can be used in non-React code (tests, utilities). No providers needed.
5. **TanStack Router + Query** — TanStack Router and Query form a cohesive ecosystem for routing + data fetching with excellent TypeScript support.
6. **Devtools** — TanStack Query Devtools provide deep visibility into cache state, queries, and mutations. Zustand has devtools middleware.

## Alternatives Considered

| Alternative       | Why Not                                                        |
| ----------------- | -------------------------------------------------------------- |
| TanStack Store    | Designated successor — alpha (v0.x), becomes priority at v1 GA |
| Redux + RTK Query | Excessive boilerplate, over-engineered for most apps           |
| MobX              | Magic-heavy, harder to debug                                   |
| Jotai/Recoil      | Atomic model adds complexity without clear benefit             |
| SWR               | TanStack Query has more features and better TypeScript         |

## Status

✅ Core — Zustand for client state, TanStack Query for server state.
Redux and MobX are explicitly banned.

**Succession plan:** TanStack Store is the designated priority successor
to Zustand. When TanStack Store reaches v1 GA, it will replace Zustand
as the default client state manager. Tracked in `backlog/under-evaluation.md`.
