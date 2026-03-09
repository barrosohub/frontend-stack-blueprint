---
title: "Why Neon"
updated: "2026-03-09"
tier: 3
---

# Why Neon

## Decision

Use Neon as the recommended optional managed Postgres provider when a project needs a relational database.

## Reasons

1. **Managed Postgres fit** — Neon provides standard PostgreSQL rather than a proprietary database model.
2. **Developer workflow** — Branching and copy-on-write database workflows fit preview environments, testing, and agent-driven iteration well.
3. **Modern runtime support** — Neon provides an official JavaScript/serverless driver that fits serverless and edge-heavy stacks when direct JS access is needed.
4. **Operational ergonomics** — Autoscaling and managed infrastructure reduce the default ops burden for teams that primarily care about product delivery.
5. **AI-friendliness** — The docs are explicit about connection strings, drivers, framework integrations, and CLI-based setup.

## Trade-offs

- Neon is still a provider choice, so billing, regions, networking, and operational policies remain external dependencies
- Projects still need to choose migrations, schema tooling, and backend access patterns
- Direct browser access is not the default; privileged database access must stay server-side

## Alternatives Considered

| Alternative | Why Not |
| ----------- | ------- |
| Self-hosted Postgres | Adds operational burden beyond the default blueprint scope |
| Managed Postgres on hyperscalers | Usually increases admin surface without matching Neon's branching-first developer workflow |
| SQLite/libSQL-style defaults | Different operational profile; not the default when full Postgres capability is required |

## Rule

If a project needs managed Postgres, recommend Neon first. If it does not need Postgres, do not add a database provider by default.

## Status

⭐ Recommended optional layer.
