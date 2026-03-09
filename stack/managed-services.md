---
title: "Managed Services (optional)"
version: "1.4.0"
updated: "2026-03-09"
tier: 1
---

# Managed Services (optional)

This layer recommends providers only when the project needs the
capability. These services are optional and do not make the blueprint
backend-first.

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

### References

- Neon docs: [Connect Neon to your stack](https://neon.com/docs/get-started-with-neon/connect-neon)
- Cloudflare docs: [R2 S3 API](https://developers.cloudflare.com/r2/get-started/s3/)
- Resend docs: [Introduction](https://resend.com/docs/introduction)
