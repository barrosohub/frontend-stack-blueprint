---
title: "Vercel Target"
version: "1.4.0"
updated: "2026-03-09"
tier: 2
target: "vercel"
---

# Vercel Target

> Secondary cloud frontend target for projects that explicitly want Vercel or are constrained away from Cloudflare Pages.

## When to Use

- The developer explicitly requests Vercel
- The team or organization is already standardized on Vercel
- Project workflows depend on Vercel-specific platform features
- Cloudflare Pages is not a good fit for the deployment constraints

## Stack Addition

| Technology | Status | Usage |
| ---------- | ------ | ----- |
| Vercel | ✅ Secondary cloud target | Git integration or dashboard-driven deployments |
| Vercel CLI | Optional CLI | `pnpm dlx vercel@latest` |

## Deployment Pattern

- Build with the stack default command: `pnpm build`
- Point the deployment to the generated frontend output when needed
- Prefer the platform integration that matches the team workflow: git import, dashboard, or CLI

## Key Considerations

- Vercel is approved, but it is not the default cloud target in this blueprint
- Use it when explicitly requested or when Cloudflare Pages is not the right operational fit
- Keep deployment-provider decisions outside the mandatory core stack unless the project scope requires them

## Agent Rule

If the project already has a Vercel preference, use Vercel. Otherwise prefer Cloudflare Pages as the default cloud frontend hosting target.
