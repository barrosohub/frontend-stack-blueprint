---
title: "Package Versions"
version: "1.9.0"
updated: "2026-07-13"
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

## Production Reliability

| Capability              | Package                                           | Policy                                                     | Current (2026-07-13) |
| ----------------------- | ------------------------------------------------- | ---------------------------------------------------------- | -------------------- |
| E2E                     | `@playwright/test`                                | Required for user-facing deployed apps                     | 1.61.1               |
| Automated accessibility | `@axe-core/playwright`                            | Required with Playwright                                   | 4.12.1               |
| Network mocks           | `msw`                                             | Required when deterministic API scenarios apply            | 2.15.0               |
| Field Web Vitals        | `web-vitals`                                      | Optional when the telemetry provider does not collect them | 5.3.0                |
| Lab performance         | `@lhci/cli`                                       | Optional CI implementation for documented budgets          | 0.15.1               |
| Component platform      | `@storybook/react-vite` + `@storybook/addon-a11y` | Optional, capability-gated                                 | 10.5.0               |

Playwright, axe, MSW, and performance tooling are development dependencies.
Storybook is activated only for a shared design system, reusable component
platform, or complex state matrix. See
[Production Reliability](../stack/reliability.md).

## Tooling

| Tool    | Policy              | Notes                                                          |
| ------- | ------------------- | -------------------------------------------------------------- |
| pnpm    | Priority            | Default package manager; provision with `corepack enable pnpm` |
| Node.js | Default runtime     | `>=20.19` or `>=22.12`                                         |
| Bun     | Alternative runtime | Approved runtime alternative only                              |

## UI

| Package        | Install                             |
| -------------- | ----------------------------------- |
| Radix UI       | `@radix-ui/react-*` (per primitive) |
| shadcn/ui      | `pnpm dlx shadcn@latest init`       |
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

## Design Contract (provisional, optional)

| Package             | Spec  | Current (2026-07-13) | Install                   |
| ------------------- | ----- | -------------------- | ------------------------- |
| `@google/design.md` | alpha | 0.3.0                | `@google/design.md@0.3.0` |

Pin this tooling exactly while the specification is alpha. Use the
cross-platform `designmd` binary and install it only when the project activates
a root `DESIGN.md`. See [DESIGN.md Design Contract](../stack/design-system.md).

## Data Access

| Package    | Min Version | Current | Install                 |
| ---------- | ----------- | ------- | ----------------------- |
| Prisma ORM | ≥6.0        | 6.18.0  | `prisma @prisma/client` |

> **Note:** Prisma is approved only for projects that actually have
> backend, server-side, or edge runtime. Drizzle ORM remains under
> evaluation until it reaches v1 GA.

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

| Package       | Policy                                             | Install                                           |
| ------------- | -------------------------------------------------- | ------------------------------------------------- |
| Sentry        | Recommended when production error operations apply | `@sentry/react`                                   |
| OpenTelemetry | Capability-gated distributed tracing               | `@opentelemetry/api @opentelemetry/sdk-trace-web` |
| Statsig       | Capability-gated rollouts/experiments              | `@statsig/react-bindings`                         |

Do not install all three during base setup. Activate only the operational
capability the product owns, with sampling, privacy, retention, and cost policy.

## Advanced Capabilities (optional)

Install only the row required by an explicit product capability.

| Capability    | Package                 | Min | Current (2026-07-13)      |
| ------------- | ----------------------- | --- | ------------------------- |
| Markdown      | `react-markdown`        | ≥10 | 10.1.0                    |
| GFM           | `remark-gfm`            | ≥4  | 4.0.1                     |
| Sanitization  | `rehype-sanitize`       | ≥6  | 6.0.0                     |
| Data tables   | `@tanstack/react-table` | ≥8  | 8.21.3                    |
| Charts        | `recharts`              | ≥3  | 3.9.2                     |
| Diagrams      | `mermaid`               | ≥11 | 11.16.0                   |
| Code editor   | `@codemirror/*`         | ≥6  | `@codemirror/view` 6.43.6 |
| Terminal UI   | `@xterm/xterm`          | ≥6  | 6.0.0                     |
| PTY host      | `node-pty`              | ≥1  | 1.1.0                     |
| Collaboration | `yjs`                   | ≥13 | 13.6.31                   |
| PDF viewing   | `pdfjs-dist`            | ≥6  | 6.1.200                   |

See [Advanced Capabilities](../stack/advanced-capabilities.md) for activation
gates and security/runtime boundaries.

## Icons

| Package          | Install                 |
| ---------------- | ----------------------- |
| Lucide (default) | `lucide-react`          |
| Phosphor         | `@phosphor-icons/react` |
| Tabler           | `@tabler/icons-react`   |

## Updating Versions

1. Check `stack.yaml` for current minimums
2. Run `pnpm outdated` in your project
3. Update to latest within the minimum range
4. Run tests to verify compatibility
5. If a library update breaks something, pin and report
