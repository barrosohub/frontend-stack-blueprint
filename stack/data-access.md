---
title: "Data Access (optional)"
version: "2.0.0"
updated: "2026-07-30"
tier: 1
---

# Data Access (optional)

This layer applies only when the project has backend, server-side, or
edge runtime and needs ORM-backed relational data access. It is not part
of the mandatory frontend stack.

## Prisma ORM ≥7

| Attribute   | Value                                    |
| ----------- | ---------------------------------------- |
| Role        | TypeScript ORM and generated data client |
| Min Version | ≥7.0                                     |
| Current     | 7.9.1                                    |
| Status      | ⭐ Recommended optional                  |
| Install     | `pnpm add prisma @prisma/client`         |
| Tooling     | `pnpm exec prisma <command>`             |

### When to Use

- Use Prisma when the project needs ORM-backed relational data access from backend, server-side, or edge code
- Prefer it when the team wants schema-driven models, generated client APIs, and broad ecosystem support
- Do NOT install it in purely static frontend apps with no backend or edge runtime

### Boundary

- Prisma is a data-access layer, not a frontend state-management solution
- Keep Prisma client usage in trusted backend, worker, API route, or other server-side/edge code
- TanStack Query remains the frontend standard for fetching app data; Prisma does not replace query/cache patterns in the UI layer
- Keep generated client setup, schema files, migrations, and connection credentials outside presentation components
- Use the ESM-first `prisma-client` generator with an explicit output path
- Configure a database driver adapter; Prisma 7 no longer treats the Rust query
  engine as the default client architecture
- Keep `prisma.config.ts` responsible for CLI configuration and environment loading

### Cloudflare D1 Caveat

- Prisma officially documents support for Cloudflare D1
- If the project uses D1 with Prisma, follow the official Prisma + D1 guide
- Do NOT document `Prisma Migrate` as the default D1 workflow in this blueprint
- Treat D1-specific schema and deployment steps as provider-specific setup, not as the generic default Prisma workflow

### Prisma vs Drizzle ORM

- Prisma is approved on its stable `v7` release line
- Drizzle ORM remains under evaluation until it reaches `v1 GA`
- This blueprint does not promote Drizzle into the approved stack yet

### Official CLI-First + Impact Preflight

- Prisma has an official CLI for initialization, client generation, schema introspection, and related workflows
- Apply Impact Preflight before Prisma CLI commands that initialize schema, generate clients, or alter database state
- If impact is non-trivial or uncertain, ask the developer before running the CLI

### References

- Prisma docs: [Why Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/why-prisma)
- Prisma docs: [Cloudflare D1 guide](https://www.prisma.io/docs/guides/cloudflare-d1)
- Drizzle docs: [Overview](https://orm.drizzle.team/docs/overview)
