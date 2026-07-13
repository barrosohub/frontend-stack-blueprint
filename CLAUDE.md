# Frontend Stack Blueprint v1.8.0

This repository defines the canonical frontend stack for any new
frontend project. It is platform-agnostic — the same stack applies
whether the project targets browser, desktop, or anything else.

## The Stack (use for EVERY project)

- **Language:** TypeScript ≥5.9 (strict mode, no `any`)
- **UI:** React ≥19.2 (functional components only)
- **Routing:** TanStack Router ≥1 (default) or React Router ≥7.1
- **Tooling:** pnpm (priority package manager), Node.js >=20.19 or >=22.12, Bun ≥1 (alternative runtime)
- **Build:** Vite ≥7 (Node.js >=20.19 or >=22.12)
- **Test:** Vitest ≥3.2; Playwright ≥1.61 for user-facing deployed applications
- **Quality:** protected CI merge gate + Husky + lint-staged + ESLint + Prettier
- **Components:** Radix UI, Floating UI, Embla Carousel, cmdk
- **Pre-styled UI:** shadcn/ui (recommended — Radix + Tailwind)
- **Styling:** Tailwind CSS ≥4 + clsx + tailwind-merge (no CSS-in-JS ever)
- **Animations:** Motion (formerly Framer Motion) — `import from 'motion/react'`
- **DESIGN.md Design Contract (provisional, optional):** root `DESIGN.md` for product visual intent and source tokens
- **Forms:** React Hook Form + Zod
- **Data Access (optional):** Prisma ≥6
- **Authentication (optional):** Better Auth ≥1
- **Managed Services (optional):** Neon Postgres, Cloudflare D1, Cloudflare R2, Cloudflare KV, Resend
- **Dates:** date-fns ≥4.1 (+@date-fns/tz for timezones)
- **State:** Zustand (no Redux, MobX) — TanStack Store replaces Zustand at v1 GA
- **Server State:** TanStack Query ≥5.60
- **Rich Text:** Lexical (primary), ProseMirror (fallback only)
- **Syntax:** Shiki
- **Advanced Capabilities (optional):** secure Markdown, TanStack Table, Recharts, Mermaid, CodeMirror, xterm.js/node-pty, Yjs, PDF.js
- **i18n:** Format.js + react-intl
- **Observability:** Sentry, OpenTelemetry, and Statsig only when their operational capability applies
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
- Apply **Official CLI-First** when official docs recommend a CLI.
- Run **Impact Preflight** before any official CLI execution.
- Never silently remove consolidated decisions; deprecate with rationale and migration path.
- Use explicit dates and absolute versions when documenting temporal changes.
- Keep terminology canonical and stable across all agent entry points.
- If context is ambiguous, ask the developer instead of guessing.

## Production Reliability (MANDATORY by applicable profile)

- CI is authoritative: frozen lockfile, typecheck, lint, unit/integration, production build, and critical E2E
- Target WCAG 2.2 AA with axe automation plus manual keyboard, focus, zoom/reflow, and screen-reader evaluation
- Track field LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at p75; enforce route-aware asset budgets
- Use Baseline Widely Available by default and document the actual browser/runtime matrix and fallbacks
- Networked products use typed environment config, fetch cancellation/timeout, Zod responses, and MSW degraded scenarios
- Production releases require preview smoke, immutable release identity, telemetry/privacy ownership, rollout, and rollback

## Rules

- ALWAYS setup Husky + lint-staged on project init
- ALWAYS write tests (Vitest) for hooks and utils
- ALWAYS run the applicable Production Reliability gate before merge
- ALWAYS structure code by feature (`src/features/`)
- ALWAYS use cn() helper for conditional Tailwind classes
- ALWAYS use path aliases (`@/*` → `src/*`), never ../../../
- ALWAYS use React Hook Form + Zod for forms with 2+ fields
- ALWAYS use Radix primitives (shadcn/ui) before building custom
- ALWAYS use Prisma ≥6 when the project needs ORM-backed server-side or edge relational data access
- ALWAYS use Better Auth ≥1 when the project needs authentication
- ALWAYS use the managed-service defaults when the project needs them: Neon Postgres, Cloudflare D1, Cloudflare R2, Cloudflare KV, Resend
- ALWAYS use pnpm as the default package manager unless the developer explicitly overrides it
- ALWAYS treat Bun as an alternative runtime only; it does not replace pnpm as package manager default
- ALWAYS prefer official docs-recommended CLI over manual scaffolding
- ALWAYS ask developer confirmation before running CLI when Impact Preflight is non-trivial/uncertain
- ALWAYS use TanStack Query for async/server state
- ALWAYS validate environment configuration and external API data at runtime
- ALWAYS cancel or safely ignore obsolete async work and provide recovery states
- ALWAYS document browser/runtime support, performance budgets, and rollback before production
- ALWAYS use Zustand for client state
- NEVER use `any` — use `unknown` + type guards
- NEVER put business logic in components — extract to hooks
- NEVER install packages outside this stack without asking
- ONLY install Advanced Capabilities when an explicit product requirement activates them
- WHEN root `DESIGN.md` exists, ALWAYS read it before UI work, update it before intentional token changes, and regenerate `design-tokens.css`

## Banned Technologies

redux, mobx, styled-components, emotion, jest, moment, dayjs,
formik, yup, class components, CSS-in-JS, deep relative imports

## Deployment Targets (ONLY if the project needs one)

The stack above works as-is for browser projects.

- Desktop (Electron): @targets/electron.md
- Desktop (Tauri): @targets/tauri.md
- Cloud frontend (default): @targets/cloudflare-pages.md
- Cloud frontend (secondary): @targets/vercel.md
- PWA: @targets/pwa.md
- If desktop needed but target unclear → ASK the developer.

## Deep Dive

- Full spec: @stack/STACK.md
- Tooling: @stack/tooling.md
- Data access: @stack/data-access.md
- Authentication: @stack/auth.md
- Managed Services: @stack/managed-services.md
- Advanced Capabilities: @stack/advanced-capabilities.md
- DESIGN.md Design Contract: @stack/design-system.md
- Production Reliability: @stack/reliability.md
- Frontend Security: @stack/security.md
- API Boundaries: @stack/api-boundaries.md
- Browser target: @targets/browser.md
- Targets overview: @targets/TARGETS.md
- Architecture: @stack/architecture.md
- Build & test: @stack/build-and-test.md
- Machine-readable versions: @stack.yaml
- New project: @guides/new-project-setup.md
