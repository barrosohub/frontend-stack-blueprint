# Changelog

All notable changes to the Frontend Stack Blueprint will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.9.0] — 2026-07-13

### Added

- **Machine contracts:** JSON Schemas validate `stack.yaml`, project profiles, the canonical agent contract, consumer configuration, and eval scenarios
- **Composable profiles:** core, browser, networked, production, component-platform, Electron, and PWA evidence contracts with explicit activation rules
- **Consumer skill:** `apply-frontend-blueprint` guides inspection, profile selection, Impact Preflight, authorized changes, verification, and waiver handling
- **Conformance:** a dependency-light checker reports project file, package, script, and evidence compliance as JSON or Markdown
- **Golden evals:** five realistic scenarios score profile precision, required capabilities, prohibited capabilities, and verification selection
- **Decision record:** ADR-026 documents why portable contracts preserve the repository's contextual purpose

### Changed

- **Generated entry points:** a compact block in all seven agent surfaces now derives from `agent-contract.json`
- **Integrity CI:** installs pinned repository tooling, validates all contracts, checks generated drift, self-tests evals, and runs the existing blueprint audit
- **Supply chain:** the integrity workflow and production CI template pin current Checkout and Setup Node releases to verified full commit SHAs
- **Roadmap:** agent-native consumption becomes v1.9.0 and Extended Targets moves to v1.10.0

## [1.8.0] — 2026-07-13

### Added

- **Production Reliability:** profile-based Definition of Done covering deterministic CI, critical-path E2E, accessibility, performance, compatibility, release identity, rollout, and rollback
- **Security and API boundaries:** typed public environment contract, supply-chain controls, CSP/Trusted Types guidance, fetch cancellation/timeout, Zod response validation, error taxonomy, retry rules, and MSW scenarios
- **Browser target:** Baseline Widely Available default with explicit engine matrix, progressive enhancement, preview smoke, cache/security headers, and rollback requirements
- **Templates:** production GitHub Actions CI, Playwright + axe, typed environment, typed fetch client, and field/lab performance budgets
- **Decision record:** ADR-025 documents the reliability profiles, selected defaults, alternatives, and operational tradeoffs

### Changed

- **Build and test:** Playwright ≥1.61 and WCAG 2.2 AA evidence join Vitest; CI is now authoritative while Husky remains local feedback
- **Observability:** Sentry, OpenTelemetry, and Statsig are capability-gated with privacy, sampling, retention, ownership, and cost requirements
- **Machine-readable manifest:** `stack.yaml` records reliability, security, API, browser, package, and activation policies and bumps the blueprint to 1.8.0
- **Agent entry points:** all seven surfaces now apply the Production Reliability contract and explicit trusted-boundary rules
- **Migration guide:** adds Cypress, request client, environment, CI, and browser-support migration paths
- **Roadmap:** Production Reliability replaces the former Quality of Life milestone; extended targets remain planned for 1.9.0

## [1.7.0] — 2026-07-13

### Added

- **DESIGN.md Design Contract:** provisional, opt-in guidance for project-level visual intent, machine-readable tokens, agent precedence, and lifecycle rules
- **Template:** `templates/DESIGN.example.md` provides a lintable starting point that consuming projects must customize before use
- **Decision record:** ADR-024 and `rationale/why-design-md.md` document the fit, alternatives, alpha risk, and promotion gate
- **Tailwind 4 flow:** pinned CLI guidance exports DESIGN.md tokens into generated `src/app/design-tokens.css`

### Changed

- **Machine-readable manifest:** `stack.yaml` now records `@google/design.md` 0.3.0 as provisional optional tooling and bumps the blueprint to 1.7.0
- **Agent entry points:** all seven surfaces now require agents to read a root `DESIGN.md` before UI work when the contract is present
- **Integrity CI:** the official pinned CLI validates the example contract, while the local integrity checker enforces file and terminology parity
- **Roadmap:** remaining quality-of-life work moves to 1.8.0 and extended targets to 1.9.0

## [1.6.0] — 2026-07-13

### Added

- **Advanced capabilities:** capability-gated defaults for secure Markdown, data tables, business charts, Mermaid diagrams, CodeMirror editing, xterm.js/node-pty terminals, Yjs collaboration, and PDF.js viewing
- **Decision record:** `rationale/why-advanced-capabilities.md` and `ADR-023` document the selection criteria, boundaries, and rejected blanket-install approach
- **Integrity CI:** dependency-free `scripts/check-blueprint.mjs` validates version markers, entry-point parity, banned-list parity, required files, and internal Markdown links
- **GitHub Actions:** `blueprint-integrity.yml` runs the drift audit on pull requests and pushes to `main`

### Changed

- **Electron target:** expanded process isolation, typed IPC, CSP/navigation/permission controls, native-module release gates, signed updates, and packaged-build validation
- **Machine-readable manifest:** `stack.yaml` now includes the optional `advanced_capabilities` decision matrix and version `1.6.0`
- **Entry points:** synchronized all agent-facing surfaces with the optional capability layer
- **Evaluation backlog:** `better-sqlite3` remains under evaluation until native Electron ABI/prebuild compatibility is proven for the chosen release matrix

## [1.5.0] — 2026-03-09

### Added

- **Data Access:** `Prisma` added as the recommended optional TypeScript ORM for projects that need ORM-backed server-side or edge data access
- **Managed Services:** `Cloudflare D1` and `Cloudflare KV` added as optional Cloudflare-specific managed data services
- **Stack docs:** new `stack/data-access.md` Tier 1 specification for ORM boundary, Prisma usage, and the D1-specific caveat
- **Rationale:** `rationale/why-prisma.md`, `rationale/why-cloudflare-d1.md`, `rationale/why-cloudflare-kv.md`, plus `ADR-020` through `ADR-022`

### Changed

- **Machine-readable manifest:** `stack.yaml` now includes `data_access`, `cloudflare_d1`, `cloudflare_kv`, and blueprint version `1.5.0`
- **Managed service policy:** `stack/managed-services.md` now distinguishes Neon as the default for Postgres, D1 as Cloudflare-specific serverless SQL, and KV as key-value storage rather than relational storage
- **Evaluation policy:** `Drizzle ORM` moved into `backlog/under-evaluation.md` instead of being promoted into the approved stack because it is still on a pre-`v1` track in the official docs
- **Cloudflare target guidance:** `targets/cloudflare-pages.md` and `targets/TARGETS.md` now explicitly separate frontend hosting from optional Cloudflare data services

## [1.4.0] — 2026-03-09

### Added

- **Tooling:** `pnpm` is now the priority package manager and `Bun` is documented as an alternative runtime in the new `stack/tooling.md` layer
- **Cloud targets:** `Cloudflare Pages` added as the priority cloud frontend deployment target and `Vercel` as the secondary cloud frontend deployment target
- **Rationale:** `rationale/why-pnpm.md`, `rationale/why-bun-runtime.md`, `rationale/cloudflare-pages-vs-vercel.md`, plus `ADR-017` through `ADR-019`

### Changed

- **Machine-readable manifest:** `stack.yaml` now includes the top-level `tooling` block, Cloudflare Pages and Vercel target metadata, and blueprint version `1.4.0`
- **Package manager policy:** operational docs and install guidance are now `pnpm`-first, with `pnpm dlx` / `pnpm exec` replacing `npx` as the primary CLI pattern
- **Entry points:** synced `AGENTS.md`, `CLAUDE.md`, Cursor rules, `llms.txt`, `llms-full.txt`, Copilot instructions, and `README.md` with tooling defaults and cloud deployment targets
- **Setup and target docs:** `guides/new-project-setup.md`, `targets/TARGETS.md`, and related operational guides now document Cloudflare Pages first, Vercel second, and Bun as runtime-only alternative

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
