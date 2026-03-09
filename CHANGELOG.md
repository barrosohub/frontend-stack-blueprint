# Changelog

All notable changes to the Frontend Stack Blueprint will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] — 2026-03-09

### Added

- **Managed Services:** Neon Postgres, Cloudflare R2, and Resend added as recommended optional providers for database, object storage, and email capabilities
- **Stack docs:** new `stack/managed-services.md` Tier 1 specification for managed-service boundaries, provider-first policy, and CLI guidance
- **Rationale:** `rationale/why-neon.md`, `rationale/why-cloudflare-r2.md`, `rationale/why-resend.md`, plus `ADR-014` through `ADR-016`

### Changed

- **Machine-readable manifest:** `stack.yaml` now includes `managed_services` and blueprint version `1.3.0`
- **Manifest philosophy:** `stack/STACK.md` now explicitly allows optional provider recommendations without prescribing backend architecture
- **Entry points:** synced `AGENTS.md`, `CLAUDE.md`, Cursor rules, `llms.txt`, `llms-full.txt`, Copilot instructions, and `README.md` with the new optional managed-services layer
- **Setup guide:** `guides/new-project-setup.md` now includes an explicit optional managed-services step without making providers part of the base install

## [1.2.0] — 2026-03-09

### Added

- **Authentication:** Better Auth added as the recommended optional authentication layer when a project needs login/session management
- **Stack docs:** new `stack/auth.md` Tier 1 specification for authentication boundary, React client usage, and Better Auth CLI guidance
- **Rationale:** `rationale/why-better-auth.md` and `ADR-013` documenting the Better Auth decision

### Changed

- **Machine-readable manifest:** `stack.yaml` now includes `auth.better_auth` and blueprint version `1.2.0`
- **Entry points:** synced `AGENTS.md`, `CLAUDE.md`, Cursor rules, `llms.txt`, `llms-full.txt`, Copilot instructions, and `README.md` with the new optional auth layer
- **Setup guide:** `guides/new-project-setup.md` now includes an explicit optional authentication step without making auth part of the base install

## [1.1.1] — 2026-03-01

### Added

- **Governance:** `Official CLI-First` policy across core docs and all agent entry points
- **Safety:** `Impact Preflight` mandatory checks before official CLI execution
- **Guidance:** explicit preflight checklist in `guides/new-project-setup.md`

### Changed

- **shadcn/ui behavior:** agents must use official CLI baseline setup (`npx shadcn@latest init`) and must not manually recreate CLI-generated base files
- **Agent contracts:** added confirmation requirement when Impact Preflight indicates non-trivial or uncertain risk
- **Release metadata:** blueprint bumped to `1.1.1` with date `2026-03-01`

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
