---
title: "Roadmap"
version: "1.5.0"
updated: "2026-03-09"
tier: 4
---

# Roadmap

## Current: v1.5.0 (2026-03-09)

The complete frontend stack blueprint is defined and documented.
Zustand is the primary client state manager. TanStack Store succession
plan is in place for when it reaches v1 GA.
Official CLI-First and Impact Preflight are now mandatory governance rules.
Better Auth is now the recommended optional authentication layer.
Data access defaults now cover Prisma for optional ORM-backed server-side access.
Managed services defaults now cover Neon Postgres, Cloudflare D1, Cloudflare R2, Cloudflare KV, and Resend.
pnpm is now the priority package manager, Bun is the alternative runtime,
and Cloudflare Pages / Vercel are approved cloud frontend targets.
Drizzle ORM remains under evaluation until it reaches v1 GA.

## Planned

### v1.6.0 — Quality of Life

- [ ] Add E2E testing guidance (Playwright)
- [ ] Add accessibility testing patterns
- [ ] Add performance budgets template
- [ ] Expand migration paths (more legacy stack coverage)

### v1.7.0 — Extended Targets

- [ ] Mobile WebView target documentation
- [ ] React Native / Expo evaluation
- [ ] Capacitor evaluation

### v2.0.0 — Potential Major Changes

- [ ] TanStack Store replaces Zustand as primary state manager (when v1 GA ships)
- [ ] React Compiler becomes default (remove manual memo guidance)
- [ ] Biome replaces ESLint + Prettier (if plugin ecosystem matures)
- [ ] TanStack Start as framework option (when v1 stable)
- [ ] Temporal API replaces date-fns (when cross-browser ready)

## Principles for Evolution

1. **Conservative updates** — Don't chase trends. Wait for stability.
2. **Semantic versioning** — Breaking changes = MAJOR, new tech = MINOR, fixes = PATCH.
3. **Evidence-based** — Only add technology with proven production track record.
4. **One at a time** — Evaluate one candidate technology at a time.
