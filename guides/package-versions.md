---
title: "Package Versions"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
---

# Package Versions

> Canonical version reference. For machine-readable format, see `stack.yaml`.

## Core

| Package         | Min Version | Current  | Install                  |
| --------------- | ----------- | -------- | ------------------------ |
| TypeScript      | ≥7.0        | 7.0.2    | `typescript`             |
| React           | ≥19.2.7     | 19.2.8   | `react react-dom`        |
| TanStack Router | ≥1.x        | 1.170.18 | `@tanstack/react-router` |
| React Router    | ≥8.0        | 8.3.0    | `react-router`           |
| Vite            | ≥8.0        | 8.2.0    | `vite`                   |
| Vitest          | ≥4.0        | 4.1.10   | `vitest`                 |

## Production Reliability

| Capability              | Package                                           | Policy                                                     | Current (2026-07-30) |
| ----------------------- | ------------------------------------------------- | ---------------------------------------------------------- | -------------------- |
| E2E                     | `@playwright/test`                                | Required for user-facing deployed apps                     | 1.62.1               |
| Automated accessibility | `@axe-core/playwright`                            | Required with Playwright                                   | 4.12.1               |
| Network mocks           | `msw`                                             | Required when deterministic API scenarios apply            | 2.15.0               |
| Field Web Vitals        | `web-vitals`                                      | Optional when the telemetry provider does not collect them | 6.0.1                |
| Lab performance         | `@lhci/cli`                                       | Optional CI implementation for documented budgets          | 0.15.1               |
| Component platform      | `@storybook/react-vite` + `@storybook/addon-a11y` | Optional, capability-gated                                 | 10.5.5               |

Playwright, axe, MSW, and performance tooling are development dependencies.
Storybook is activated only for a shared design system, reusable component
platform, or complex state matrix. See
[Production Reliability](../stack/reliability.md).

## Tooling

| Tool    | Policy              | Notes                                                |
| ------- | ------------------- | ---------------------------------------------------- |
| pnpm    | Priority            | ≥11.18; provision explicitly when Corepack is absent |
| Node.js | Default runtime     | 24 LTS; minimum `>=22.22`                            |
| Bun     | Alternative runtime | Approved runtime alternative only                    |

## UI

| Package        | Current | Install                                           |
| -------------- | ------- | ------------------------------------------------- |
| Base UI        | 1.6.0   | `@base-ui/react` or shadcn `--base base`          |
| Radix Dialog   | 1.1.23  | `@radix-ui/react-dialog` or shadcn `--base radix` |
| React Aria     | 1.19.0  | `react-aria-components` or shadcn `--base aria`   |
| shadcn/ui CLI  | 4.16.0  | `pnpm dlx shadcn@4.16.0 init --base base`         |
| Floating UI    | 0.27.20 | `@floating-ui/react`                              |
| Embla Carousel | 8.6.0   | `embla-carousel-react`                            |
| cmdk           | 1.1.1   | `cmdk`                                            |

## Styling

| Package        | Min Version | Install                         |
| -------------- | ----------- | ------------------------------- |
| Tailwind CSS   | ≥4.x        | `tailwindcss @tailwindcss/vite` |
| clsx           | 2.1.1       | `clsx`                          |
| tailwind-merge | 3.6.0       | `tailwind-merge`                |
| Motion         | 12.43.0     | `motion`                        |

## Design Contract (provisional, optional)

| Package             | Spec    | Current (2026-07-30) | Install                   |
| ------------------- | ------- | -------------------- | ------------------------- |
| `@google/design.md` | pre-1.0 | 0.4.0                | `@google/design.md@0.4.0` |

Pin this tooling exactly while the specification is pre-1.0. Use the
cross-platform `designmd` binary and install it only when the project activates
a root `DESIGN.md`. See [DESIGN.md Design Contract](../stack/design-system.md).

## Data Access

| Package    | Min Version | Current | Install                 |
| ---------- | ----------- | ------- | ----------------------- |
| Prisma ORM | ≥7.0        | 7.9.1   | `prisma @prisma/client` |

> **Note:** Prisma is approved only for projects that actually have
> backend, server-side, or edge runtime. Drizzle ORM remains under
> evaluation until it reaches v1 GA.

## Data & State

| Package         | Min Version | Install                                                |
| --------------- | ----------- | ------------------------------------------------------ |
| Zustand         | 5.0.14      | `zustand`                                              |
| TanStack Query  | ≥5.60       | `@tanstack/react-query @tanstack/react-query-devtools` |
| React Hook Form | 7.83.0      | `react-hook-form`                                      |
| Zod             | 4.4.3       | `zod @hookform/resolvers`                              |
| date-fns        | ≥4          | `date-fns`                                             |
| @date-fns/tz    | 1.5.0       | `@date-fns/tz`                                         |

> **Note:** TanStack Store (pre-1.0) is under evaluation. v1 GA triggers
> a new decision; it does not automatically replace Zustand.

## Content

| Package     | Current     | Install                                                |
| ----------- | ----------- | ------------------------------------------------------ |
| Lexical     | 0.49.0      | `lexical @lexical/react`                               |
| ProseMirror | state 1.4.4 | `prosemirror-state prosemirror-view prosemirror-model` |
| Shiki       | 4.3.1       | `shiki`                                                |

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

| Capability    | Package                 | Min | Current (2026-07-30)      |
| ------------- | ----------------------- | --- | ------------------------- |
| Markdown      | `react-markdown`        | ≥10 | 10.1.0                    |
| GFM           | `remark-gfm`            | ≥4  | 4.0.1                     |
| Sanitization  | `rehype-sanitize`       | ≥6  | 6.0.0                     |
| Data tables   | `@tanstack/react-table` | ≥8  | 8.21.3                    |
| Charts        | `recharts`              | ≥3  | 3.10.1                    |
| Diagrams      | `mermaid`               | ≥11 | 11.16.0                   |
| Code editor   | `@codemirror/*`         | ≥6  | `@codemirror/view` 6.43.7 |
| Terminal UI   | `@xterm/xterm`          | ≥6  | 6.0.0                     |
| PTY host      | `node-pty`              | ≥1  | 1.1.0                     |
| Collaboration | `yjs`                   | ≥13 | 13.6.31                   |
| PDF viewing   | `pdfjs-dist`            | ≥6  | 6.2.108                   |

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
3. Update within the validated major and record the exact tested version
4. Run tests to verify compatibility
5. If a library update breaks something, pin and report
