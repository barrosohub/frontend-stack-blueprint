---
title: "Frontend Stack Blueprint — Complete Manifesto"
version: "1.4.0"
updated: "2026-03-09"
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
5. **How to authenticate** — session lifecycle and auth boundary when needed
6. **How to connect managed services** — database, object storage, email when needed
7. **How to build and test** — build tool, test runner, quality gates
8. **How to handle content** — rich text, syntax, i18n
9. **How to observe** — errors, tracing, feature flags
10. **How to extend** — icons and future complements

What this stack **does NOT define** (project-dependent):

- Where the frontend runs (browser, Electron, Tauri, mobile webview)
- Whether it needs SSR/SSG
- Which backend/API it consumes
- Which hosting/deploy to use unless a deployment target is explicitly in scope

Those are **deployment targets** — optional layers in `targets/`.
When a project needs managed database, object storage, or email, this
blueprint may recommend optional providers without prescribing the
backend architecture around them.
When a project needs cloud frontend hosting and the provider is not
specified, this blueprint recommends Cloudflare Pages first and Vercel
second, without making cloud hosting part of the mandatory core stack.

## Stack Overview

| Layer             | Technology                              | Version | Status                |
| ----------------- | --------------------------------------- | ------- | --------------------- |
| Language          | TypeScript                              | ≥5.9    | ✅ Core               |
| UI Framework      | React                                   | ≥19.2   | ✅ Core               |
| Routing (default) | TanStack Router                         | ≥1.x    | ✅ Core               |
| Routing (alt)     | React Router                            | ≥7.1    | ✅ Core               |
| Package Manager   | pnpm                                    | priority | ⭐ Default            |
| Runtime (default) | Node.js                                 | ≥20.19 or ≥22.12 | ✅ Core     |
| Runtime (alt)     | Bun                                     | ≥1.0    | ✅ Alternative        |
| Build             | Vite                                    | ≥7.x    | ✅ Core               |
| Test              | Vitest                                  | ≥3.2    | ✅ Core               |
| Quality           | Husky + lint-staged + ESLint + Prettier | latest  | ✅ Core               |
| UI (headless)     | Radix UI                                | latest  | ✅ Core               |
| UI (headless)     | Floating UI                             | latest  | ✅ Core               |
| UI (headless)     | Embla Carousel                          | latest  | ✅ Core               |
| UI (headless)     | cmdk                                    | latest  | ✅ Core               |
| UI (pre-styled)   | shadcn/ui                               | latest  | ⭐ Recommended        |
| Styling           | Tailwind CSS                            | ≥4.x    | ✅ Core               |
| Styling           | clsx + tailwind-merge                   | latest  | ✅ Core               |
| Animation         | Motion (`motion`)                       | latest  | ✅ Core               |
| Forms             | React Hook Form                         | latest  | ✅ Core               |
| Validation        | Zod                                     | latest  | ✅ Core               |
| Authentication (optional) | Better Auth                    | ≥1.0    | ⭐ Recommended when authentication is needed |
| Managed DB (optional) | Neon Postgres                      | Managed service | ⭐ Recommended when Postgres is needed |
| Object Storage (optional) | Cloudflare R2                  | Managed service | ⭐ Recommended when object storage is needed |
| Email (optional)  | Resend                                  | Managed service | ⭐ Recommended when transactional/marketing email is needed |
| Dates             | date-fns                                | ≥4.1    | ✅ Core               |
| Dates (tz)        | @date-fns/tz                            | latest  | ✅ Core (when needed) |
| Client State      | Zustand                                 | latest  | ✅ Core               |
| Server State      | TanStack Query                          | ≥5.60   | ✅ Core               |
| Rich Text         | Lexical                                 | latest  | ✅ Core               |
| Rich Text         | ProseMirror                             | latest  | ⚠️ Secondary          |
| Syntax            | Shiki                                   | latest  | ✅ Core               |
| i18n              | Format.js + react-intl                  | latest  | ✅ Core               |
| Error Tracking    | Sentry                                  | latest  | ✅ Core               |
| Tracing           | OpenTelemetry                           | latest  | ✅ Core               |
| Feature Flags     | Statsig                                 | latest  | ✅ Core               |
| Icons (default)   | Lucide                                  | latest  | ⭐ Default            |
| Icons (alt)       | Phosphor                                | latest  | ✅ Alternative        |
| Icons (alt)       | Tabler                                  | latest  | ✅ Alternative        |

## Detailed Specs

Each layer has its own document:

- [Architecture](architecture.md) — Mandatory principles
- [Core](core.md) — TypeScript, React, Routing
- [Tooling](tooling.md) — pnpm, Node.js, Bun
- [Build & Test](build-and-test.md) — Vite, Vitest, Quality
- [UI](ui.md) — Radix, shadcn/ui, Floating UI, Embla, cmdk
- [Forms](forms.md) — React Hook Form + Zod
- [Authentication](auth.md) — Better Auth when login/session management is required
- [Managed Services](managed-services.md) — Neon, Cloudflare R2, and Resend when those capabilities are required
- [Styling](styling.md) — Tailwind, cn(), Motion
- [State & Data](state-and-data.md) — Zustand + TanStack Query
- [Dates](dates.md) — date-fns + timezone handling
- [Content](content.md) — Lexical, ProseMirror, Shiki
- [i18n](i18n.md) — Format.js + react-intl
- [Observability](observability.md) — Sentry, OTel, Statsig
- [Icons](icons.md) — Lucide, Phosphor, Tabler

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

| Banned                | Use Instead             |
| --------------------- | ----------------------- |
| `any` (type)          | `unknown` + type guards |
| Redux                 | Zustand                 |
| MobX                  | Zustand                 |
| styled-components     | Tailwind CSS            |
| Emotion               | Tailwind CSS            |
| Jest                  | Vitest                  |
| Moment.js             | date-fns                |
| Day.js                | date-fns                |
| Formik                | React Hook Form + Zod   |
| Yup                   | Zod                     |
| Class components      | Functional components   |
| CSS-in-JS (any)       | Tailwind CSS            |
| Deep relative imports | Path aliases (@/\*)     |
