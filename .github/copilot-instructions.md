# GitHub Copilot Custom Instructions

> These instructions guide GitHub Copilot when working on projects that
> reference this Frontend Stack Blueprint repository.

## Stack Reference

This project follows the **Frontend Stack Blueprint** — a canonical
frontend stack for any new project. For the complete reference, see:

- Full spec: [AGENTS.md](../AGENTS.md)
- Machine-readable versions: [stack.yaml](../stack.yaml)
- Complete single-file reference: [llms-full.txt](../llms-full.txt)

## Key Rules for Copilot

1. Use TypeScript ≥5.9 with `strict: true` — no `any`
2. Use React ≥19.2 functional components only
3. Use pnpm as the default package manager
4. Use Vite ≥7 with Node.js >=20.19 or >=22.12
5. Treat Bun ≥1 as an alternative runtime only
6. Structure by feature (`src/features/`), never by file type
7. Use `@/*` path aliases, never `../../../`
8. Use `cn()` utility for conditional Tailwind classes
9. Use React Hook Form + Zod for forms with 2+ fields
10. If the project needs ORM-backed server-side or edge relational data access, use Prisma ≥6; do not add ORM to purely static apps
11. If the project needs authentication, use Better Auth ≥1; do not assume auth is mandatory
12. If the project needs managed services, prefer Neon Postgres, Cloudflare D1, Cloudflare R2, Cloudflare KV, and Resend by capability; do not assume they are mandatory
13. If the project needs cloud frontend hosting and no provider is specified, prefer Cloudflare Pages; use Vercel when explicitly requested or when Pages is not a fit
14. Use TanStack Query for server state
15. Use Zustand for client state (no Redux, MobX). TanStack Store replaces Zustand at v1 GA
16. Use Motion (import from `motion/react`) for animations
17. Use date-fns ≥4.1 + @date-fns/tz for dates and timezones (no Moment, no Day.js)
18. Use Radix/shadcn primitives before building custom components
19. Write tests with Vitest; use Playwright for critical deployed-UI journeys
20. Never install packages outside this stack without asking
21. Use [Advanced Capabilities](../stack/advanced-capabilities.md) only when an explicit product requirement activates Markdown, tables, charts, diagrams, code editing, terminal, collaboration, or PDF viewing
22. If root `DESIGN.md` exists, treat it as the provisional DESIGN.md Design Contract: read it before UI work and regenerate Tailwind tokens after intentional changes
23. Apply **Official CLI-First** when official docs recommend a CLI
24. Run **Impact Preflight** before any official CLI execution; ask confirmation if non-trivial/uncertain
25. Apply [Production Reliability](../stack/reliability.md): authoritative CI, WCAG 2.2 AA, Core Web Vitals budgets, browser matrix, preview smoke, and rollback
26. Validate public environment and API responses at runtime; use fetch cancellation/timeout and MSW degraded scenarios when networked
27. Activate Sentry, OpenTelemetry, Statsig, and Storybook only when their operational capability applies

## Universal Governance Protocol (technology-agnostic)

1. Define one source of truth for rules and versions, then follow it.
2. Keep machine-readable config and human docs synchronized.
3. Classify change impact/risk before implementation.
4. Apply **Official CLI-First** when official docs recommend a CLI.
5. Run **Impact Preflight** before any official CLI execution.
6. If Impact Preflight is non-trivial or uncertain, ask developer confirmation before running CLI.
7. Never silently remove consolidated decisions; deprecate with migration path.
8. Use explicit dates and absolute versions for temporal claims.
9. Run the applicable Production Reliability gate before merge.

## Production Reliability

- CI uses the frozen lockfile and verifies typecheck, lint, unit/integration, production build, and critical E2E.
- Accessibility targets WCAG 2.2 AA with automation plus manual evaluation.
- Field targets are LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at p75 with route-aware budgets.
- Browser support defaults to Baseline Widely Available with an explicit tested matrix and fallbacks.
- Production releases define immutable identity, privacy/telemetry ownership, rollout, and rollback.

## Banned

redux, mobx, styled-components, emotion, jest, moment, dayjs,
formik, yup, class components, CSS-in-JS, deep relative imports

<!-- BEGIN GENERATED: AGENT CONTRACT -->
## Agent-Native Contract (generated)

Blueprint `1.9.0`. Canonical machine sources:
`stack.yaml`, `agent-contract.json`, `schemas/`, and `profiles/`.

Foundations:

- Inspect the consuming repository before proposing dependencies or file changes.
- Run Impact Preflight before official CLIs or non-trivial writes.
- Activate only profiles and capabilities supported by explicit project evidence.
- Run the applicable project checks and the conformance checker after changes.

Profile activation:

- The core profile applies to every consuming frontend project.
- Browser, networked, production, component-platform, Electron, and PWA profiles are capability-gated.
- Create or enforce root DESIGN.md only when the product has explicit visual intent or source tokens.
- Document temporary exceptions with an owner, reason, and expiry date.

Prohibited behavior:

- Do not install the full catalog by default.
- Do not place secrets in client-visible environment variables or generated reports.
- Do not infer optional profiles from preference alone.
- Do not edit generated agent blocks manually; regenerate them from this contract.

Apply or audit the contract with `skills/apply-frontend-blueprint/SKILL.md` and
`node scripts/check-project-conformance.mjs --project <path> --format json`.
<!-- END GENERATED: AGENT CONTRACT -->
