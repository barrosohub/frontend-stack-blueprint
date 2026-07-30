---
title: "Frontend Stack Blueprint — Complete Manifesto"
version: "2.0.0"
updated: "2026-07-30"
tier: 1
tokens: "~3000"
---

# Frontend Stack Blueprint — Complete Manifesto

> This document is the **complete reference** for the frontend stack.
> It combines all layers into a single document. For individual layers,
> see the dedicated files in this directory.

## Philosophy

This stack is the **reusable base** for any frontend project. It defines:

1. **How to write** — language, typing, code principles
2. **How to install and run** — package manager and runtime defaults
3. **How to build UI** — framework, components, styling, animation
4. **How to manage state and data** — client state, server state, cache
5. **How to preserve design intent** — optional DESIGN.md visual contract and token flow
6. **How to authenticate** — session lifecycle and auth boundary when needed
7. **How to access application data** — ORM and relational data access when needed
8. **How to connect managed services** — database, key-value, object storage, email when needed
9. **How to prove production readiness** — CI, E2E, accessibility, performance, recovery
10. **How to secure boundaries** — environment, supply chain, browser, API contracts
11. **How to build and test** — build tool, test runners, quality gates
12. **How to handle content** — rich text, syntax, i18n
13. **How to add advanced surfaces** — capability-gated tables, charts,
    diagrams, editors, terminals, collaboration, and document viewers
14. **How to observe** — capability-gated errors, tracing, feature flags
15. **How agents consume it** — validated profiles, generated contracts, conformance, and evals
16. **How to extend** — icons and future complements

What this stack **does NOT define** (project-dependent):

- Where the frontend runs (browser, Electron, Tauri, mobile webview)
- Whether it needs SSR/SSG
- Which backend/API it consumes
- Which hosting/deploy to use unless a deployment target is explicitly in scope

Those are **deployment targets** — optional layers in `targets/`.
When a project has backend, server-side, or edge runtime needs, this
blueprint may recommend optional ORM and managed-service providers
without prescribing the surrounding backend architecture.
For a new Cloudflare-hosted project, this blueprint recommends Workers Static
Assets. Existing Pages projects remain supported, and Vercel remains an explicit
alternative, without making cloud hosting part of the mandatory core stack.

## Stack Overview

| Layer                                      | Technology                                                               | Version                | Status                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------ | ---------------------- | -------------------------------------------------------------------- |
| Language                                   | TypeScript                                                               | ≥7.0                   | ✅ Core                                                              |
| UI Framework                               | React                                                                    | ≥19.2                  | ✅ Core                                                              |
| Routing (default)                          | TanStack Router                                                          | ≥1.x                   | ✅ Core                                                              |
| Routing (alt)                              | React Router                                                             | ≥8.0                   | ✅ Core                                                              |
| Package Manager                            | pnpm                                                                     | ≥11.18                 | ⭐ Default                                                           |
| Runtime (default)                          | Node.js                                                                  | 24 LTS; ≥22.22         | ✅ Core                                                              |
| Runtime (alt)                              | Bun                                                                      | ≥1.0                   | ✅ Alternative                                                       |
| Build                                      | Vite                                                                     | ≥8.x                   | ✅ Core                                                              |
| Unit/integration test                      | Vitest                                                                   | ≥4.0                   | ✅ Core                                                              |
| Production E2E                             | Playwright                                                               | ≥1.61                  | ✅ Required for deployed user-facing apps                            |
| Accessibility                              | WCAG 2.2 AA + axe + manual evaluation                                    | current standard       | ✅ Required by applicable profile                                    |
| Quality                                    | Protected CI + Husky + lint-staged + ESLint + Prettier                   | policy                 | ✅ Core                                                              |
| Browser policy                             | Baseline Widely Available + explicit exceptions                          | current baseline       | ✅ Core                                                              |
| API boundary                               | fetch + AbortSignal + Zod + MSW                                          | capability-gated       | ✅ Required when networked                                           |
| Performance                                | Core Web Vitals + route budgets                                          | field + lab            | ✅ Required for production services                                  |
| Security                                   | Typed env + supply-chain gates + CSP                                     | policy                 | ✅ Core                                                              |
| UI (headless)                              | Base UI                                                                  | ≥1.6                   | ⭐ New-project default                                               |
| UI (headless alternatives)                 | Radix UI / React Aria Components                                         | current                | ✅ Supported                                                         |
| UI (headless)                              | Floating UI                                                              | 0.27.20                | ✅ Core                                                              |
| UI (headless)                              | Embla Carousel                                                           | 8.6.0                  | ✅ Core                                                              |
| UI (headless)                              | cmdk                                                                     | 1.1.1                  | ✅ Core                                                              |
| UI (pre-styled)                            | shadcn/ui CLI                                                            | 4.16.0                 | ⭐ Recommended                                                       |
| Styling                                    | Tailwind CSS                                                             | ≥4.x                   | ✅ Core                                                              |
| Styling                                    | clsx + tailwind-merge                                                    | 2.1.1 / 3.6.0          | ✅ Core                                                              |
| Animation                                  | Motion (`motion`)                                                        | 12.43.0                | ✅ Core                                                              |
| Design contract (optional)                 | DESIGN.md                                                                | pre-1.0 / CLI 0.4.0    | 🧪 Provisional                                                       |
| Forms                                      | React Hook Form                                                          | 7.83.0                 | ✅ Core                                                              |
| Validation                                 | Zod                                                                      | 4.4.3                  | ✅ Core                                                              |
| Data Access (optional)                     | Prisma                                                                   | ≥7.0                   | ⭐ Recommended when ORM/server-side relational data access is needed |
| Authentication (optional)                  | Better Auth                                                              | ≥1.0                   | ⭐ Recommended when authentication is needed                         |
| Managed DB (optional)                      | Neon Postgres                                                            | Managed service        | ⭐ Recommended when Postgres is needed                               |
| Managed DB (optional, Cloudflare-specific) | Cloudflare D1                                                            | Managed service        | ⭐ Recommended when Cloudflare-native serverless SQL is needed       |
| Object Storage (optional)                  | Cloudflare R2                                                            | Managed service        | ⭐ Recommended when object storage is needed                         |
| Key-Value Storage (optional)               | Cloudflare KV                                                            | Managed service        | ⭐ Recommended when key-value storage is needed                      |
| Email (optional)                           | Resend                                                                   | Managed service        | ⭐ Recommended when transactional/marketing email is needed          |
| Dates                                      | date-fns                                                                 | ≥4.1                   | ✅ Core                                                              |
| Dates (tz)                                 | @date-fns/tz                                                             | 1.5.0                  | ✅ Core (when needed)                                                |
| Client State                               | Zustand                                                                  | 5.0.14                 | ✅ Core                                                              |
| Server State                               | TanStack Query                                                           | ≥5                     | ✅ Core                                                              |
| Rich Text                                  | Lexical                                                                  | 0.49.0                 | ✅ Core                                                              |
| Rich Text                                  | ProseMirror                                                              | state 1.4.4            | ⚠️ Secondary                                                         |
| Syntax                                     | Shiki                                                                    | 4.3.1                  | ✅ Core                                                              |
| Advanced capabilities                      | Markdown, tables, charts, diagrams, editor, terminal, collaboration, PDF | capability-gated       | ✅ Optional                                                          |
| i18n                                       | Format.js + react-intl                                                   | 10.1.18                | ✅ Core                                                              |
| Error Tracking                             | Sentry                                                                   | 10.69.0                | ⭐ Recommended when operated                                         |
| Tracing                                    | OpenTelemetry                                                            | API 1.9.1 / SDK 2.10.0 | ✅ Capability-gated                                                  |
| Feature Flags                              | Statsig                                                                  | 3.33.3                 | ✅ Capability-gated                                                  |
| Icons (default)                            | Lucide                                                                   | 1.28.0                 | ⭐ Default                                                           |
| Icons (alt)                                | Phosphor                                                                 | 2.1.10                 | ✅ Alternative                                                       |
| Icons (alt)                                | Tabler                                                                   | 3.46.0                 | ✅ Alternative                                                       |

## Detailed Specs

Each layer has its own document:

- [Architecture](architecture.md) — Mandatory principles
- [Core](core.md) — TypeScript, React, Routing
- [Tooling](tooling.md) — pnpm, Node.js, Bun
- [Build & Test](build-and-test.md) — Vite, Vitest, Quality
- [Production Reliability](reliability.md) — Definition of Done, E2E, accessibility, performance, release recovery
- [Frontend Security](security.md) — Environment, supply chain, CSP, privacy
- [API Boundaries](api-boundaries.md) — fetch, runtime validation, cancellation, retry, MSW
- [UI](ui.md) — Radix, shadcn/ui, Floating UI, Embla, cmdk
- [Forms](forms.md) — React Hook Form + Zod
- [Data Access](data-access.md) — Prisma when ORM-backed server-side or edge data access is required
- [Authentication](auth.md) — Better Auth when login/session management is required
- [Managed Services](managed-services.md) — Neon, Cloudflare D1, Cloudflare R2, Cloudflare KV, and Resend when those capabilities are required
- [Styling](styling.md) — Tailwind, cn(), Motion
- [DESIGN.md Design Contract](design-system.md) — Optional visual intent and token source
- [State & Data](state-and-data.md) — Zustand + TanStack Query
- [Dates](dates.md) — date-fns + timezone handling
- [Content](content.md) — Lexical, ProseMirror, Shiki
- [Advanced Capabilities](advanced-capabilities.md) — Capability-gated technical and workbench surfaces
- [i18n](i18n.md) — Format.js + react-intl
- [Observability](observability.md) — Sentry, OTel, Statsig
- [Icons](icons.md) — Lucide, Phosphor, Tabler

## Production Reliability Contract

- CI is the authoritative merge gate; local hooks are fast feedback only.
- User-facing deployed applications test critical journeys against the production artifact.
- WCAG 2.2 AA is the accessibility target, with automation plus manual evaluation.
- Field targets are LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at the 75th percentile.
- Networked products validate external data, cancel obsolete requests, and test degraded states.
- Browser/runtime support, preview smoke, release identity, rollout, and rollback are explicit.
- Sentry, OpenTelemetry, Statsig, Storybook, MSW, and similar tools are activated
  only when their product capability applies.

## Agent-Native Consumption Contract

- `stack.yaml` and its JSON Schema define the canonical machine-readable stack.
- `agent-contract.json` generates the shared block in all seven agent entry points.
- `core` applies universally; optional profiles activate only from explicit evidence.
- Consumers record profiles and expiring waivers in `blueprint.config.json`.
- The local checker reports file, package, script, and evidence conformance as JSON
  or Markdown without modifying the target project.
- The `apply-frontend-blueprint` skill requires inspection, Impact Preflight,
  authorized changes, project verification, and a post-change conformance report.
- Golden scenarios detect profile-selection and capability-safety regressions.

See [Agent-Native Consumption](../guides/agent-consumption.md).

## Installation Policy (Official CLI-First + Impact Preflight)

- **Official CLI-First:** if an official CLI exists and official docs
  recommend it, agents MUST prefer that CLI over manual scaffolding.
- **Impact Preflight:** before running any official CLI, agents MUST
  evaluate:
  - files likely to be created or modified
  - overwrite risk
  - structural conflicts with current architecture rules
  - compatibility with current config/tooling scripts
- If impact is non-trivial or uncertain, agents MUST ask the developer
  for confirmation before running the CLI.
- Never manually recreate baseline setup that an official CLI already
  generates (example: shadcn/ui base setup).

## Banned Technologies

| Banned                      | Use Instead                                             |
| --------------------------- | ------------------------------------------------------- |
| `any` (type)                | `unknown` + type guards                                 |
| Redux                       | Zustand                                                 |
| MobX                        | Zustand                                                 |
| styled-components           | Tailwind CSS                                            |
| Emotion                     | Tailwind CSS                                            |
| Jest                        | Vitest                                                  |
| Moment.js                   | date-fns                                                |
| Day.js                      | date-fns                                                |
| Formik                      | React Hook Form + Zod                                   |
| Yup                         | Zod                                                     |
| Product UI class components | Function components; class Error Boundaries are allowed |
| CSS-in-JS (any)             | Tailwind CSS                                            |
| Deep relative imports       | Path aliases (@/\*)                                     |
