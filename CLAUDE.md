# Frontend Stack Blueprint v1.1.0

This repository defines the canonical frontend stack for any new
frontend project. It is platform-agnostic — the same stack applies
whether the project targets browser, desktop, or anything else.

## The Stack (use for EVERY project)

- **Language:** TypeScript ≥5.9 (strict mode, no `any`)
- **UI:** React ≥19.2 (functional components only)
- **Routing:** TanStack Router ≥1 (default) or React Router ≥7.1
- **Build:** Vite ≥7 (Node.js >=20.19 or >=22.12)
- **Test:** Vitest ≥3.2 (4.x recommended)
- **Quality:** Husky + lint-staged + ESLint + Prettier
- **Components:** Radix UI, Floating UI, Embla Carousel, cmdk
- **Pre-styled UI:** shadcn/ui (recommended — Radix + Tailwind)
- **Styling:** Tailwind CSS ≥4 + clsx + tailwind-merge (no CSS-in-JS ever)
- **Animations:** Motion (formerly Framer Motion) — `import from 'motion/react'`
- **Forms:** React Hook Form + Zod
- **Dates:** date-fns ≥4.1 (+@date-fns/tz for timezones)
- **State:** Zustand (no Redux, MobX) — TanStack Store replaces Zustand at v1 GA
- **Server State:** TanStack Query ≥5.60
- **Rich Text:** Lexical (primary), ProseMirror (fallback only)
- **Syntax:** Shiki
- **i18n:** Format.js + react-intl
- **Observability:** Sentry + OpenTelemetry + Statsig
- **Icons:** Lucide (default), Phosphor or Tabler as alternatives

## Architecture (MANDATORY — apply to ALL code)

- MODULAR: Structure by feature/domain, NEVER by file type.
- EXTENSIBLE: Composition over inheritance. Hooks for logic reuse.
- STRONG TYPING: strict, no `any`, explicit types, Zod for extern data.
- DRY: Extract patterns. Don't abstract prematurely.
- KISS: Simplest solution. Components ≤150 lines. Functions ≤30 lines.
- YAGNI: No speculative features or abstractions.
- REACT COMPILER: Use when available. Removes need for manual memo.

## Universal Governance Protocol (technology-agnostic)

- Define one canonical source of truth for rules and versions.
- Keep machine-readable config/manifests and narrative docs synchronized.
- Classify change impact/risk before editing.
- Never silently remove consolidated decisions; deprecate with rationale and migration path.
- Use explicit dates and absolute versions when documenting temporal changes.
- Keep terminology canonical and stable across all agent entry points.
- If context is ambiguous, ask the developer instead of guessing.

## Rules

- ALWAYS setup Husky + lint-staged on project init
- ALWAYS write tests (Vitest) for hooks and utils
- ALWAYS run verification gate before merge (`typecheck`, `test`, `lint`, `build`)
- ALWAYS structure code by feature (`src/features/`)
- ALWAYS use cn() helper for conditional Tailwind classes
- ALWAYS use path aliases (`@/*` → `src/*`), never ../../../
- ALWAYS use React Hook Form + Zod for forms with 2+ fields
- ALWAYS use Radix primitives (shadcn/ui) before building custom
- ALWAYS use TanStack Query for async/server state
- ALWAYS use Zustand for client state
- NEVER use `any` — use `unknown` + type guards
- NEVER put business logic in components — extract to hooks
- NEVER install packages outside this stack without asking

## Deployment Targets (ONLY if the project needs one)

The stack above works as-is for browser projects.

- Desktop (Electron): @targets/electron.md
- Desktop (Tauri): @targets/tauri.md
- PWA: @targets/pwa.md
- If desktop needed but target unclear → ASK the developer.

## Deep Dive

- Full spec: @stack/STACK.md
- Architecture: @stack/architecture.md
- Build & test: @stack/build-and-test.md
- Machine-readable versions: @stack.yaml
- New project: @guides/new-project-setup.md
