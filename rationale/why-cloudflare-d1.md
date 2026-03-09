---
title: "Why Cloudflare D1"
updated: "2026-03-09"
tier: 3
---

# Why Cloudflare D1

## Decision

Use Cloudflare D1 as the optional Cloudflare-specific serverless SQL
database when a project already operates in the Cloudflare runtime
ecosystem and SQLite semantics are acceptable.

## Reasons

1. **Cloudflare-native fit** — D1 aligns naturally with Workers and other Cloudflare edge runtime patterns.
2. **SQL capability** — It provides SQL data storage without changing the blueprint into a Postgres-only worldview.
3. **Operational coherence** — Teams already using Cloudflare hosting or edge runtime can keep more of the provider surface in one ecosystem.
4. **Official tooling path** — Cloudflare documents D1 setup and operations through Wrangler, which fits the blueprint CLI policy.
5. **AI-friendliness** — The official docs clearly define setup, bindings, and runtime integration expectations.

## Trade-offs

- D1 has SQLite semantics and is not a drop-in replacement for Postgres
- It only fits projects that actually have worker, function, or edge runtime in scope
- Provider-specific database workflows require more caution than a generic relational database recommendation

## Alternatives Considered

| Alternative | Why Not |
| ----------- | ------- |
| Neon Postgres | Remains the default when the requirement is managed Postgres rather than Cloudflare-native SQL |
| Cloudflare KV | Not relational SQL storage |
| Cloudflare R2 | Object storage, not database storage |

## Rule

If a project needs Cloudflare-native serverless SQL, recommend D1. If it needs Postgres, recommend Neon instead.

## Status

⭐ Recommended optional Cloudflare-specific managed service.
