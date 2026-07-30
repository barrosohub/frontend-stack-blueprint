---
title: "Cloudflare Workers Static Assets vs Pages vs Vercel"
updated: "2026-07-30"
tier: 3
---

# Cloudflare Workers Static Assets vs Pages vs Vercel

## Decision

Use Workers Static Assets for new Cloudflare frontend projects. Keep Cloudflare
Pages supported for existing projects and explicit Git-integrated static flows.
Keep Vercel as an approved alternative.

## Reasons

1. **Current platform path** — Workers Static Assets serves static Vite output
   and can add request-time Worker behavior without changing deployment products.
2. **Migration restraint** — Existing Pages projects are supported; a default
   change is not sufficient reason to migrate a healthy production site.
3. **Capability boundaries** — Neither Cloudflare target implies D1, KV, or R2.
4. **CLI and Git flows** — Wrangler owns Cloudflare preview/deployment; Pages
   remains available for teams that explicitly want its Git flow.
5. **Provider flexibility** — Vercel remains approved when requested or when its
   operational model is a better fit.

## Comparison Matrix

| Dimension | Workers Static Assets | Cloudflare Pages | Vercel |
| --- | --- | --- | --- |
| Blueprint status | New Cloudflare default | Existing/explicit supported | Alternative |
| Optional request runtime | Worker | Pages Functions | Vercel Functions |
| CLI path | Wrangler | Wrangler | Vercel CLI |
| Use when explicitly requested | ✅ | ✅ | ✅ |

## Agent Behavior

If the project needs cloud frontend hosting:

1. Use Workers Static Assets for a new Cloudflare project
2. Keep an existing Pages project unless migration has an approved benefit
3. Use Pages or Vercel when the developer explicitly requests them
4. Keep all choices in `targets/`, not in the mandatory core stack

## Status

Workers Static Assets is the new-project Cloudflare default. Pages and Vercel
remain approved, supported targets.
