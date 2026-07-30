---
title: "Cloudflare Pages Target"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
target: "cloudflare-pages"
---

# Cloudflare Pages Target

> Supported target for existing Pages projects and explicit Git-integrated static deployments.

## When to Use

- The project already deploys through Cloudflare Pages
- The team explicitly prefers the Pages Git integration for a static site
- The team wants git-connected deployments with global edge delivery
- The project already benefits from the broader Cloudflare ecosystem
- Static assets and preview environments are the primary requirement

## Stack Addition

| Technology       | Status              | Usage                                           |
| ---------------- | ------------------- | ----------------------------------------------- |
| Cloudflare Pages | ✅ Supported target | Git integration or direct deployment of `dist/` |
| Wrangler         | Optional CLI        | `pnpm dlx wrangler@4 pages deploy dist`         |

## Deployment Pattern

- Build with the stack default command: `pnpm build`
- Deploy the generated `dist/` output
- Prefer git-connected Pages projects for continuous deployment
- Use Wrangler for explicit CLI-driven deploys or scripted automation
- For new Cloudflare projects, compare this flow with
  [Workers Static Assets](cloudflare-workers-static-assets.md), the blueprint default

## Key Considerations

- Cloudflare Pages is a deployment target, not a replacement for the stack core
- Frontend hosting does not force a backend architecture
- Environment variables, preview environments, and custom domains should be configured per project
- If the project also uses Cloudflare R2, Pages keeps the provider surface more consistent
- Cloudflare D1, Cloudflare KV, and Cloudflare R2 remain optional service choices; do not infer them for purely static Pages projects
- Only add Cloudflare data services when the project also has Functions, Workers, or other server-side/edge runtime needs

## Agent Rule

Do not migrate a healthy Pages project automatically. For a new Cloudflare
project, default to Workers Static Assets. Use Pages when the developer explicitly
selects its Git deployment model.
