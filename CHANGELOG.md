# Changelog

All notable changes to the Frontend Stack Blueprint will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] — 2026-02-28

### Changed

- **State:** Zustand is now the primary client state manager (replaces TanStack Store which is alpha v0.x)
- **Animation:** Motion (successor to Framer Motion) — package `motion`, import from `motion/react`
- **Cursor IDE:** `.cursor/rules/*.mdc` replaces deprecated `.cursorrules` as modern entry point
- **Node.js:** Vite 7 requires Node.js >=20.19 or >=22.12 (documented across all entry points)
- **TanStack Store:** Moved to `backlog/under-evaluation.md` — designated priority successor to Zustand at v1 GA

### Added

- `.github/copilot-instructions.md` for GitHub Copilot onboarding
- `.claude/skills/blueprint-maintenance/` internal maintenance skill (with cross-agent symlinks)
- React Server Components (RSC) security advisory in `stack/core.md`
- Entry point drift warning in `README.md`
- TanStack Store succession plan documented across `state-and-data.md`, `rationale/why-tanstack.md`, `stack.yaml`
- Universal governance protocol blocks across agent entry points (`AGENTS.md`, `CLAUDE.md`, Cursor, Copilot, `llms.txt`, `llms-full.txt`)
- Drift-audit and tech-agnostic invariants added to `.claude/skills/blueprint-maintenance/SKILL.md`

### Fixed

- Path alias escaping (`@/*`) in agent-facing files
- Broken relative links in `.github/CONTRIBUTING.md`
- `react-intl` date formatting accuracy in `stack/i18n.md`
- Consumer boundary clarified: external agents consume `llms*`; local maintenance is delegated to `SKILL.md`

## [1.0.0] — 2026-02-28

### Added

- **Core Stack:** TypeScript ≥5.9, React ≥19.2, TanStack Router ≥1, React Router ≥7.1
- **Build & Test:** Vite ≥7, Vitest ≥3.2, Husky, lint-staged, ESLint, Prettier
- **UI Components:** Radix UI, shadcn/ui (recommended), Floating UI, Embla Carousel, cmdk
- **Styling & Animation:** Tailwind CSS ≥4, clsx, tailwind-merge (cn() utility), Framer Motion
- **Forms & Validation:** React Hook Form + Zod
- **Dates & Time:** date-fns ≥4.1, @date-fns/tz
- **State & Data:** TanStack Store (client), TanStack Query ≥5.60 (server)
- **Content & Editing:** Lexical (primary), ProseMirror (fallback), Shiki
- **Internationalization:** Format.js, react-intl
- **Observability:** Sentry, OpenTelemetry, Statsig
- **Icons:** Lucide (default), Phosphor, Tabler
- **Deployment Targets:** Browser (default), Electron ≥33, Tauri ≥2.10, PWA
- **Architecture Principles:** Modular by feature, Strong typing, DRY, KISS, YAGNI, React Compiler
- **Agent Entry Points:** CLAUDE.md, AGENTS.md, .cursorrules, llms.txt, llms-full.txt, stack.yaml
- **Guides:** New project setup, package versions, project structure, migration paths
- **Templates:** tsconfig, vite, vitest, tailwind, eslint, husky, cn-utility, zod-form
- **Rationale:** Why docs for every major technology decision
- **Backlog:** Roadmap, under evaluation, deprecated
