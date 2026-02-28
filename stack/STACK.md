---
title: "Frontend Stack Blueprint — Complete Manifesto"
version: "1.1.0"
updated: "2026-02-28"
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
2. **How to build UI** — framework, components, styling, animation
3. **How to manage state and data** — client state, server state, cache
4. **How to build and test** — build tool, test runner, quality gates
5. **How to handle content** — rich text, syntax, i18n
6. **How to observe** — errors, tracing, feature flags
7. **How to extend** — icons and future complements

What this stack **does NOT define** (project-dependent):

- Where the frontend runs (browser, Electron, Tauri, mobile webview)
- Whether it needs SSR/SSG
- Which backend/API it consumes
- Which hosting/deploy to use

Those are **deployment targets** — optional layers in `targets/`.

## Stack Overview

| Layer             | Technology                              | Version | Status                |
| ----------------- | --------------------------------------- | ------- | --------------------- |
| Language          | TypeScript                              | ≥5.9    | ✅ Core               |
| UI Framework      | React                                   | ≥19.2   | ✅ Core               |
| Routing (default) | TanStack Router                         | ≥1.x    | ✅ Core               |
| Routing (alt)     | React Router                            | ≥7.1    | ✅ Core               |
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
- [Build & Test](build-and-test.md) — Vite, Vitest, Quality
- [UI](ui.md) — Radix, shadcn/ui, Floating UI, Embla, cmdk
- [Forms](forms.md) — React Hook Form + Zod
- [Styling](styling.md) — Tailwind, cn(), Motion
- [State & Data](state-and-data.md) — Zustand + TanStack Query
- [Dates](dates.md) — date-fns + timezone handling
- [Content](content.md) — Lexical, ProseMirror, Shiki
- [i18n](i18n.md) — Format.js + react-intl
- [Observability](observability.md) — Sentry, OTel, Statsig
- [Icons](icons.md) — Lucide, Phosphor, Tabler

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
