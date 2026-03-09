---
title: "Cloudflare Pages vs Vercel"
updated: "2026-03-09"
tier: 3
---

# Cloudflare Pages vs Vercel

## Decision

Use Cloudflare Pages as the priority cloud frontend deployment target when a project needs cloud hosting and does not specify a provider. Keep Vercel as the approved secondary option.

## Reasons

1. **Priority default** — Cloudflare Pages is now the default cloud target when provider choice is otherwise unspecified.
2. **Ecosystem fit** — It aligns well with the broader Cloudflare platform, including the optional Cloudflare R2 recommendation already present in the blueprint.
3. **Frontend-first deployment** — Pages covers the common frontend-hosting need without forcing a backend or framework rewrite.
4. **CLI and Git flows** — The platform supports both git-connected deployment and direct CLI-driven deployment with Wrangler.
5. **Secondary flexibility** — Vercel remains approved for teams that already depend on it or explicitly prefer it.

## Comparison Matrix

| Dimension | Cloudflare Pages | Vercel |
| --------- | ---------------- | ------ |
| Blueprint status | Priority cloud target | Secondary cloud target |
| Default choice when unspecified | ✅ Yes | ❌ No |
| Git-connected deployments | ✅ | ✅ |
| CLI path | Wrangler | Vercel CLI |
| Ecosystem overlap with current blueprint | Strong with Cloudflare R2 | Strong with frontend hosting workflows |
| Use when explicitly requested | ✅ | ✅ |

## Agent Behavior

If the project needs cloud frontend hosting:

1. Use Cloudflare Pages when the provider is not specified
2. Use Vercel when the developer explicitly requests it
3. Use Vercel when Cloudflare Pages is not a good operational fit
4. Keep both choices in `targets/`, not in the mandatory core stack

## Status

Cloudflare Pages is the priority cloud target. Vercel remains approved as the secondary cloud target.
