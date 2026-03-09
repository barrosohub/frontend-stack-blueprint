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
3. Use Vite ≥7 with Node.js >=20.19 or >=22.12
4. Structure by feature (`src/features/`), never by file type
5. Use `@/*` path aliases, never `../../../`
6. Use `cn()` utility for conditional Tailwind classes
7. Use React Hook Form + Zod for forms with 2+ fields
8. If the project needs authentication, use Better Auth ≥1; do not assume auth is mandatory
9. Use TanStack Query for server state
10. Use Zustand for client state (no Redux, MobX). TanStack Store replaces Zustand at v1 GA
11. Use Motion (import from `motion/react`) for animations
12. Use date-fns ≥4.1 + @date-fns/tz for dates and timezones (no Moment, no Day.js)
13. Use Radix/shadcn primitives before building custom components
14. Write tests with Vitest for hooks and utils
15. Never install packages outside this stack without asking
16. Apply **Official CLI-First** when official docs recommend a CLI
17. Run **Impact Preflight** before any official CLI execution; ask confirmation if non-trivial/uncertain

## Universal Governance Protocol (technology-agnostic)

1. Define one source of truth for rules and versions, then follow it.
2. Keep machine-readable config and human docs synchronized.
3. Classify change impact/risk before implementation.
4. Apply **Official CLI-First** when official docs recommend a CLI.
5. Run **Impact Preflight** before any official CLI execution.
6. If Impact Preflight is non-trivial or uncertain, ask developer confirmation before running CLI.
7. Never silently remove consolidated decisions; deprecate with migration path.
8. Use explicit dates and absolute versions for temporal claims.
9. Run verification gate before merge (`typecheck`, `test`, `lint`, `build`).

## Banned

redux, mobx, styled-components, emotion, jest, moment, dayjs,
formik, yup, class components, CSS-in-JS, deep relative imports
