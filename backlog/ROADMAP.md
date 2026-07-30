---
title: "Roadmap"
version: "2.0.0"
updated: "2026-07-30"
tier: 4
---

# Roadmap

## Current: v2.0.0 (2026-07-30)

The blueprint baseline now targets TypeScript 7, React 19.2.8, Vite 8,
Vitest 4, Node.js 24 LTS, pnpm 11, React Router 8, Prisma 7, ESLint 10,
Tailwind CSS 4.3, and current production-test tooling.
Zustand remains the primary client state manager. TanStack Store reaching
v1 will trigger an evidence-based review, not an automatic replacement.
Official CLI-First and Impact Preflight are now mandatory governance rules.
Better Auth is now the recommended optional authentication layer.
Data access defaults now cover Prisma for optional ORM-backed server-side access.
Managed services defaults now cover Neon Postgres, Cloudflare D1, Cloudflare R2, Cloudflare KV, and Resend.
pnpm is now the priority package manager, Bun is the alternative runtime,
and Workers Static Assets is the default for new Cloudflare projects;
Cloudflare Pages and Vercel remain supported alternatives.
Drizzle ORM remains under evaluation until it reaches v1 GA.
Advanced technical surfaces now have capability-gated defaults for Markdown,
tables, charts, diagrams, code editing, terminal UI/PTY hosting,
collaboration, and PDF viewing. The Electron target now defines a hardened
process, IPC, packaging, and release boundary. Blueprint drift is checked in CI.
The provisional DESIGN.md Design Contract now provides an opt-in, agent-readable
source of visual intent and design tokens, with a pinned pre-1.0 CLI, Tailwind 4
export, template, and drift validation guidance.

Production Reliability now defines when the approved stack is ready to ship:
protected deterministic CI, Playwright critical journeys, WCAG 2.2 AA evaluation,
field and lab performance budgets, typed environment and API boundaries, MSW
network scenarios, explicit browser support, supply-chain controls, preview smoke,
release identity, rollout, and rollback. Observability and component-platform
tooling are capability-gated instead of blanket project-init dependencies.

Agent-Native Consumption now adds validated machine contracts, composable project
profiles, a consumer skill, generated entry-point parity, local conformance reports,
and golden agent scenarios while preserving the repository as contextual guidance
rather than executable application boilerplate.

## Planned

### v2.1.0 — Extended Targets

- [ ] Mobile WebView target documentation
- [ ] React Native / Expo evaluation
- [ ] Capacitor evaluation

### Continuous Maintenance

- [ ] Add field evidence and migration guidance as browser/runtime support changes
- [ ] Re-verify pinned GitHub Actions and reliability package versions quarterly
- [ ] Expand provider-specific preview, rollout, and rollback examples

### Future evidence gates

- [ ] Re-evaluate Zustand against TanStack Store after v1 GA and migration evidence
- [ ] Make React Compiler default only after compatibility and performance validation
- [ ] Replace ESLint + Prettier with Biome only after rule-parity validation
- [ ] Add TanStack Start only for a proven full-stack use case
- [ ] Replace date-fns with Temporal only after required browser support

## Principles for Evolution

1. **Conservative updates** — Don't chase trends. Wait for stability.
2. **Semantic versioning** — Breaking changes = MAJOR, new tech = MINOR, fixes = PATCH.
3. **Evidence-based** — Only add technology with proven production track record.
4. **One at a time** — Evaluate one candidate technology at a time.
