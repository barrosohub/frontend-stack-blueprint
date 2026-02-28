---
title: "Package Versions"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# Package Versions

> Canonical version reference. For machine-readable format, see `stack.yaml`.

## Core

| Package         | Min Version     | Current | Install                  |
| --------------- | --------------- | ------- | ------------------------ |
| TypeScript      | ≥5.9            | 5.9.3   | `typescript`             |
| React           | ≥19.2           | 19.2.4  | `react react-dom`        |
| TanStack Router | ≥1.x            | latest  | `@tanstack/react-router` |
| React Router    | ≥7.1            | latest  | `react-router`           |
| Vite            | ≥7.x            | 7.3.1   | `vite`                   |
| Vitest          | ≥3.2 (4.x rec.) | latest  | `vitest`                 |

## UI

| Package        | Install                             |
| -------------- | ----------------------------------- |
| Radix UI       | `@radix-ui/react-*` (per primitive) |
| shadcn/ui      | `npx shadcn@latest init`            |
| Floating UI    | `@floating-ui/react`                |
| Embla Carousel | `embla-carousel-react`              |
| cmdk           | `cmdk`                              |

## Styling

| Package        | Min Version | Install                         |
| -------------- | ----------- | ------------------------------- |
| Tailwind CSS   | ≥4.x        | `tailwindcss @tailwindcss/vite` |
| clsx           | latest      | `clsx`                          |
| tailwind-merge | latest      | `tailwind-merge`                |
| Motion         | latest      | `motion`                        |

## Data & State

| Package         | Min Version | Install                                                |
| --------------- | ----------- | ------------------------------------------------------ |
| Zustand         | latest      | `zustand`                                              |
| TanStack Query  | ≥5.60       | `@tanstack/react-query @tanstack/react-query-devtools` |
| React Hook Form | latest      | `react-hook-form`                                      |
| Zod             | latest      | `zod @hookform/resolvers`                              |
| date-fns        | ≥4.1        | `date-fns`                                             |
| @date-fns/tz    | latest      | `@date-fns/tz`                                         |

> **Note:** TanStack Store (alpha v0.x) is under evaluation. When it
> reaches v1 GA, it will become the priority state manager.

## Content

| Package     | Install                                                |
| ----------- | ------------------------------------------------------ |
| Lexical     | `lexical @lexical/react`                               |
| ProseMirror | `prosemirror-state prosemirror-view prosemirror-model` |
| Shiki       | `shiki`                                                |

## Observability

| Package       | Install                                           |
| ------------- | ------------------------------------------------- |
| Sentry        | `@sentry/react`                                   |
| OpenTelemetry | `@opentelemetry/api @opentelemetry/sdk-trace-web` |
| Statsig       | `@statsig/react-bindings`                         |

## Icons

| Package          | Install                 |
| ---------------- | ----------------------- |
| Lucide (default) | `lucide-react`          |
| Phosphor         | `@phosphor-icons/react` |
| Tabler           | `@tabler/icons-react`   |

## Updating Versions

1. Check `stack.yaml` for current minimums
2. Run `npm outdated` in your project
3. Update to latest within the minimum range
4. Run tests to verify compatibility
5. If a library update breaks something, pin and report
