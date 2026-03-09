---
title: "Managed Services (optional)"
version: "1.5.0"
updated: "2026-03-09"
tier: 1
---

# Managed Services (optional)

This layer recommends providers only when the project needs the
capability and already has the required backend, server-side, or edge
runtime surface. These services are optional and do not make the
blueprint backend-first.

## Database (optional): Neon Postgres

| Attribute | Value |
| --------- | ----- |
| Role      | Managed Postgres database |
| Engine    | PostgreSQL |
| Status    | ⭐ Recommended optional |
| Tooling   | `pnpm dlx neonctl@latest <command>` |

### When to Use

- Use Neon when the project needs managed Postgres with branching-friendly workflows
- Prefer it for apps that benefit from serverless or edge-friendly Postgres connectivity
- Do NOT add it to projects that do not need a relational database

### Boundary

- Neon is the database provider, not an ORM or app-state solution
- Keep privileged connection strings server-side
- If JavaScript, serverless, or edge code must connect directly, `@neondatabase/serverless` is the preferred integration
- TanStack Query remains the frontend standard for fetching app data; Neon is the backing database, not a replacement for query/cache patterns

### Official CLI-First + Impact Preflight

- Neon provides an official CLI via `neonctl`
- Apply Impact Preflight before Neon CLI setup or project-generation flows
- If impact is non-trivial or uncertain, ask the developer before running the CLI

## Database (optional, Cloudflare-specific): Cloudflare D1

| Attribute | Value |
| --------- | ----- |
| Role      | Cloudflare-native serverless SQL database |
| Engine    | SQLite semantics |
| Status    | ⭐ Recommended optional |
| Tooling   | `pnpm dlx wrangler@latest <command>` |

### When to Use

- Use Cloudflare D1 when the project needs SQL data storage in the Cloudflare Workers or edge ecosystem
- Prefer it when the runtime is already Cloudflare-native and SQLite semantics are acceptable
- Do NOT use it as the default answer when the actual requirement is managed Postgres
- Do NOT add it to purely static frontend apps with no server-side or edge runtime

### Boundary

- D1 is a database provider, not an ORM or frontend state solution
- D1 has SQLite semantics; it does not replace Neon when the need is Postgres
- Keep schema management, migrations, and privileged access in trusted backend, worker, or edge code
- If using Prisma with D1, follow the official Prisma + D1 guide and do not treat `Prisma Migrate` as the default D1 workflow

### Official CLI-First + Impact Preflight

- Cloudflare documents D1 setup and operations through `wrangler`
- Apply Impact Preflight before Wrangler commands that create, bind, or modify D1 databases
- If impact is non-trivial or uncertain, ask the developer before running the CLI

## Object Storage (optional): Cloudflare R2

| Attribute | Value |
| --------- | ----- |
| Role      | Managed object storage |
| Access    | S3-compatible API or Cloudflare bindings |
| Status    | ⭐ Recommended optional |
| Tooling   | `pnpm dlx wrangler@latest <command>` |

### When to Use

- Use Cloudflare R2 when the project needs object storage for uploads, assets, backups, or user-generated content
- Prefer it when S3-compatible tooling or egress-sensitive delivery matters
- Do NOT add it to projects that do not need object storage

### Boundary

- R2 stores objects; it does not replace a relational database
- Prefer server-side uploads, signed URLs, or controlled upload endpoints instead of exposing privileged credentials in the browser
- Use the S3-compatible API for portable integrations, or Cloudflare bindings when the runtime already lives in the Cloudflare ecosystem

### Official CLI-First + Impact Preflight

- Cloudflare documents `wrangler` for bucket creation, listing, and related setup
- Apply Impact Preflight before Wrangler commands that create or bind buckets
- If impact is non-trivial or uncertain, ask the developer before running the CLI

## Key-Value Storage (optional): Cloudflare KV

| Attribute | Value |
| --------- | ----- |
| Role      | Key-value storage for read-heavy workloads |
| Access    | Workers / bindings / Cloudflare API |
| Status    | ⭐ Recommended optional |
| Tooling   | `pnpm dlx wrangler@latest <command>` |

### When to Use

- Use Cloudflare KV when the project needs key-value storage for read-heavy, globally distributed, or eventually consistent workloads
- Prefer it for cache-like data, configuration lookups, flags, or other non-relational key-value access patterns
- Do NOT use it as a relational database, strongly consistent transactional store, or object storage replacement
- Do NOT add it to purely static frontend apps with no server-side or edge runtime

### Boundary

- KV is key-value storage, not a relational database
- KV is eventually consistent and optimized for read-heavy patterns
- Keep writes, credentials, and privileged operations in trusted backend, worker, or edge code
- TanStack Query remains the frontend data-fetching standard; KV is the backing store, not a client-state substitute

### Official CLI-First + Impact Preflight

- Cloudflare documents KV namespace creation and binding through `wrangler`
- Apply Impact Preflight before Wrangler commands that create, bind, or modify KV namespaces
- If impact is non-trivial or uncertain, ask the developer before running the CLI

## Email (optional): Resend

| Attribute | Value |
| --------- | ----- |
| Role      | Transactional email and audience/broadcast workflows |
| Integration | API-first; `resend` SDK is the usual backend integration |
| Status    | ⭐ Recommended optional |

### When to Use

- Use Resend when the project needs transactional email, contact audiences, or marketing broadcasts
- Prefer it when the team wants a developer-oriented email API with straightforward backend integration
- Do NOT add it to projects that do not send email

### Boundary

- Resend should be called from trusted server-side code, workers, or backend functions
- Domain setup, deliverability, unsubscribe handling, and webhook processing remain application responsibilities
- Resend is the email delivery layer; it does not replace product-level messaging rules or user preference models

### Official CLI-First + Impact Preflight

- Resend does not define a mandatory CLI-first setup path in the same way as Neon or Wrangler-driven R2 flows
- Prefer the official API/SDK docs for integration and apply Impact Preflight before any provider-specific automation that changes domains, webhooks, or sending configuration

### Rules

- Recommend these providers only when the matching capability is required
- Do not install provider SDKs by default in every frontend project
- Keep secrets, service tokens, and privileged operations out of client-side presentation code
- Cloudflare D1, Cloudflare KV, and Cloudflare R2 should only be added when the project also has worker, function, or other server-side/edge runtime in scope

### References

- Neon docs: [Connect Neon to your stack](https://neon.com/docs/get-started-with-neon/connect-neon)
- Cloudflare docs: [D1 get started](https://developers.cloudflare.com/d1/get-started/)
- Cloudflare docs: [R2 S3 API](https://developers.cloudflare.com/r2/get-started/s3/)
- Cloudflare docs: [Workers KV](https://developers.cloudflare.com/kv/)
- Resend docs: [Introduction](https://resend.com/docs/introduction)
