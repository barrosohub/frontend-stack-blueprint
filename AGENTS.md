# Frontend Stack Blueprint

> Canonical frontend stack for any new project. Platform-agnostic.
> Deployment targets (Electron, Tauri, PWA) are optional add-ons.

## Stack (ALL projects)

TypeScript ≥5.9 strict · React ≥19.2 · TanStack Router ≥1 (or React Router ≥7.1)
Vite ≥7 (Node.js >=20.19 or >=22.12) · Vitest ≥3.2 · Husky + lint-staged + ESLint + Prettier
Radix UI · shadcn/ui (recommended) · Floating UI · Embla · cmdk
Tailwind CSS ≥4 + clsx + tailwind-merge · Motion (`import from 'motion/react'`)
React Hook Form + Zod · date-fns ≥4.1 (+@date-fns/tz)
Zustand · TanStack Query ≥5.60 (TanStack Store replaces Zustand at v1 GA)
Lexical (primary) · ProseMirror (fallback) · Shiki
Format.js · react-intl · Sentry · OpenTelemetry · Statsig
Icons: Lucide (default) | Phosphor | Tabler

## Architecture (MANDATORY)

Feature-based modules · Strong typing (no `any`) · DRY · KISS · YAGNI
Composition > inheritance · Logic in hooks · Tests required (Vitest)
Husky pre-commit required · React Compiler when available
Always cn() for Tailwind classes · Always `@/*` path aliases

## Universal Foundations (MANDATORY)

- ALWAYS define and honor one source of truth for rules/versions
- ALWAYS keep machine-readable manifests and human docs synchronized
- ALWAYS classify changes by impact/risk before implementation
- ALWAYS use explicit dates and absolute versions for temporal claims
- NEVER silently remove consolidated decisions — deprecate with rationale + migration path
- NEVER create multiple terms for the same rule — keep canonical terminology
- If context is ambiguous or conflicting, ASK before implementing

## Rules

- ALWAYS structure by feature (`src/features/`), NEVER by file type
- ALWAYS setup Husky + lint-staged on project init
- ALWAYS write tests (Vitest) for hooks and utils
- ALWAYS run verification gate before merge (`typecheck`, `test`, `lint`, `build`)
- ALWAYS use cn() helper for conditional Tailwind classes
- ALWAYS use path aliases (`@/*` → `src/*`), never ../../../
- ALWAYS use React Hook Form + Zod for forms with 2+ fields
- ALWAYS use Radix/shadcn primitives before building custom
- ALWAYS use TanStack Query for async/server state
- ALWAYS use Zustand for client state
- NEVER use `any` — use `unknown` + type guards
- NEVER put business logic in components — extract to hooks
- NEVER install packages outside this stack without asking

## Banned

redux · mobx · styled-components · emotion · jest · moment · dayjs
formik · yup · class components · CSS-in-JS · deep relative imports

## Targets (optional)

Browser → default · Electron → targets/electron.md
Tauri → targets/tauri.md · PWA → targets/pwa.md

## References

- Full spec: stack/STACK.md
- Architecture: stack/architecture.md
- Versions: stack.yaml
- New project: guides/new-project-setup.md
