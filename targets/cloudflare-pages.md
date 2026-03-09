---
title: "Cloudflare Pages Target"
version: "1.4.0"
updated: "2026-03-09"
tier: 2
target: "cloudflare-pages"
---

# Cloudflare Pages Target

> Priority cloud frontend target when a project needs managed frontend hosting in the cloud.

## When to Use

- The project needs cloud frontend hosting and no provider has been specified
- The team wants git-connected deployments with global edge delivery
- The project already benefits from the broader Cloudflare ecosystem
- Static assets and preview environments are the primary requirement

## Stack Addition

| Technology | Status | Usage |
| ---------- | ------ | ----- |
| Cloudflare Pages | ⭐ Priority cloud target | Git integration or direct deployment of `dist/` |
| Wrangler | Optional CLI | `pnpm dlx wrangler@latest pages deploy dist` |

## Deployment Pattern

- Build with the stack default command: `pnpm build`
- Deploy the generated `dist/` output
- Prefer git-connected Pages projects for continuous deployment
- Use Wrangler for explicit CLI-driven deploys or scripted automation

## Key Considerations

- Cloudflare Pages is a deployment target, not a replacement for the stack core
- Frontend hosting does not force a backend architecture
- Environment variables, preview environments, and custom domains should be configured per project
- If the project also uses Cloudflare R2, Pages keeps the provider surface more consistent

## Agent Rule

If the project needs cloud frontend hosting and does not specify a provider, use Cloudflare Pages first. If project constraints make Pages a poor fit, present Vercel as the secondary option.
