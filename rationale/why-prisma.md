---
title: "Why Prisma"
updated: "2026-03-09"
tier: 3
---

# Why Prisma

## Decision

Use Prisma as the recommended optional TypeScript ORM when a project
needs ORM-backed relational data access from backend, server-side, or
edge code.

## Reasons

1. **Stable release line** — Prisma is on a stable `v6` track, which satisfies the blueprint requirement for approved stack additions.
2. **TypeScript fit** — Schema-driven models and the generated client fit TypeScript-heavy teams well.
3. **Ecosystem coverage** — Prisma has mature documentation, broad adapter/database coverage, and common framework integration patterns.
4. **Operational clarity** — The official docs are explicit about schema, generate, introspection, and deployment workflows.
5. **AI-friendliness** — Prisma has enough ecosystem depth and documentation clarity for agents to generate high-quality integration code.

## Trade-offs

- Prisma only makes sense when a project has backend, server-side, or edge runtime
- Generated client and schema workflows add structure that some teams may consider heavier than lower-level SQL-first tools
- Cloudflare D1 support is provider-specific and should follow the official D1 guide rather than generic migration assumptions

## Alternatives Considered

| Alternative | Why Not |
| ----------- | ------- |
| Manual SQL only | Too low-level as the default ORM recommendation for the blueprint |
| Drizzle ORM | Still on a pre-`v1` track in the official docs, so it remains under evaluation |

## Rule

If a project needs ORM-backed relational data access, recommend Prisma first. If the project is purely static or has no trusted runtime for data access, do not add an ORM.

## Status

⭐ Recommended optional layer.
