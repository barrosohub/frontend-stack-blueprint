# 🏗️ Frontend Stack Blueprint

> **The canonical frontend stack reference for AI coding agents.**

[![Version](https://img.shields.io/badge/version-1.9.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![LLM-Friendly](https://img.shields.io/badge/LLM-friendly-purple.svg)](llms.txt)

---

## What Is This?

A **public repository** that serves as the **single source of truth** for modern frontend technology decisions. Designed from the ground up to be **read and applied by AI coding agents** (Claude Code, GitHub Copilot, Codex, Cursor, Gemini) when bootstrapping or contributing to **any new frontend project**.

### ✅ What It IS

- Specification of the recommended frontend stack for any new project
- Prescriptive, versioned documentation optimized for LLMs
- Architectural principles and quality rules that agents must follow
- An evolving reference with semantic versioning

### ❌ What It Is NOT

- Not a boilerplate/template with executable code
- Not specific to web OR desktop — it's for both and more
- Not documentation for any single technology

---

## The Stack at a Glance

```
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND STACK BLUEPRINT                   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  LANGUAGE       TypeScript ≥5.9 (strict, no `any`)          │
│  UI FRAMEWORK   React ≥19.2 (functional only)               │
│  ROUTING        TanStack Router ≥1 (default)                │
│                 React Router ≥7.1 (alternative)              │
│  TOOLING        pnpm (priority) · Bun ≥1 (runtime alt)      │
│  BUILD          Vite ≥7 (Node.js >=20.19 or >=22.12)          │
│  TEST           Vitest ≥3.2 · Playwright ≥1.61              │
│  QUALITY        CI merge gate · Husky · ESLint · Prettier   │
│  RELIABILITY    WCAG 2.2 AA · Web Vitals · rollback         │
│  SECURITY       typed env · supply chain · CSP              │
│                                                              │
│  COMPONENTS     Radix UI · Floating UI · Embla · cmdk        │
│  UI PRE-STYLED  shadcn/ui (recommended)                      │
│  STYLING        Tailwind CSS ≥4 + clsx + tailwind-merge      │
│  ANIMATION      Motion (`import from 'motion/react'`)        │
│  DESIGN (opt)   DESIGN.md contract (alpha, provisional)      │
│                                                              │
│  FORMS          React Hook Form + Zod                        │
│  DATA ACCESS    Prisma ≥6 (optional)                         │
│  AUTH (opt)     Better Auth ≥1                               │
│  MANAGED (opt)  Neon Postgres · Cloudflare D1                │
│                 Cloudflare R2 · Cloudflare KV · Resend       │
│  DATES          date-fns ≥4.1 (+@date-fns/tz)               │
│  STATE          Zustand                                      │
│  SERVER STATE   TanStack Query ≥5.60                         │
│                                                              │
│  RICH TEXT      Lexical (primary) · ProseMirror (fallback)   │
│  SYNTAX         Shiki                                        │
│  ADVANCED (opt) Markdown · Tables · Charts · Mermaid         │
│                 CodeMirror · Terminal · Yjs · PDF.js         │
│  I18N           Format.js + react-intl                       │
│                                                              │
│  OBSERVABILITY  Sentry · OpenTelemetry · Statsig (gated)     │
│  ICONS          Lucide (default) | Phosphor | Tabler         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  TARGETS (opt)  Browser · Cloudflare Pages · Vercel          │
│                 Electron · Tauri · PWA                       │
└──────────────────────────────────────────────────────────────┘
```

---

## For AI Agents

This repository provides multiple entry points optimized for different coding agents:

| File                                                                                       | Agent           | Purpose                               |
| ------------------------------------------------------------------------------------------ | --------------- | ------------------------------------- |
| [`CLAUDE.md`](CLAUDE.md)                                                                   | Claude Code     | Full entry point with deep-dive links |
| [`AGENTS.md`](AGENTS.md)                                                                   | Universal       | AGENTS.md standard (compact)          |
| [`.cursor/rules/frontend-stack-blueprint.mdc`](.cursor/rules/frontend-stack-blueprint.mdc) | Cursor IDE      | Cursor rules (modern format)          |
| [`.cursorrules`](.cursorrules)                                                             | Cursor (legacy) | Legacy format (kept for compat)       |
| [`llms.txt`](llms.txt)                                                                     | Any LLM         | Structured index                      |
| [`llms-full.txt`](llms-full.txt)                                                           | Any LLM         | Complete stack in one file            |
| [`stack.yaml`](stack.yaml)                                                                 | Tooling         | Machine-readable manifest             |
| [`.github/copilot-instructions.md`](.github/copilot-instructions.md)                       | GitHub Copilot  | Repository-level instructions         |

The agent-native contract is not a project generator. It adds validated schemas,
capability profiles, a consumer skill, conformance reports, and golden evals so an
agent can apply this contextual guide without guessing or blanket-installing the
catalog. Start with [`guides/agent-consumption.md`](guides/agent-consumption.md).

### How to Use in Your Project

**Claude Code** — Add to your project's `CLAUDE.md`:

```
@../frontend-stack-blueprint/CLAUDE.md
```

**GitHub Copilot** — The repo includes `.github/copilot-instructions.md` which Copilot reads automatically. You can also reference `AGENTS.md`.

**Cursor** — The repo includes `.cursor/rules/*.mdc` (modern) and `.cursorrules` (legacy). Cursor auto-reads project rules from `.cursor/rules/`.

**Any Agent** — Point the agent to `llms-full.txt` for complete context, or load
[`skills/apply-frontend-blueprint/SKILL.md`](skills/apply-frontend-blueprint/SKILL.md)
to inspect a project, select profiles, and verify conformance.

### Agent Installation Policy

- **Official CLI-First:** if official docs recommend a CLI, agents must
  prefer that CLI over manual scaffolding.
- **Impact Preflight:** before any official CLI execution, agents must
  evaluate file changes, overwrite risk, structural conflicts, and config
  compatibility.
- If impact is non-trivial or uncertain, agents must ask for developer
  confirmation before running the CLI.

---

## Documentation Structure

```
frontend-stack-blueprint/
│
├── 📋 Entry Points (Tier 0)
│   ├── CLAUDE.md / AGENTS.md / .cursor/rules/*.mdc
│   ├── .cursorrules (legacy) / .github/copilot-instructions.md
│   ├── llms.txt / llms-full.txt
│   ├── stack.yaml / agent-contract.json
│   └── schemas/ / profiles/ / blueprint.config.example.json
│
├── 🤖 Agent Execution
│   ├── skills/apply-frontend-blueprint/  Consumer workflow
│   ├── scripts/check-project-conformance.mjs
│   ├── scripts/generate-agent-entrypoints.mjs
│   └── evals/                           Golden scenarios and scorer
│
├── 📦 stack/ (Tier 1 — The Stack)
│   ├── STACK.md          Full manifesto
│   ├── architecture.md   Mandatory principles
│   ├── core.md           TypeScript, React, Routing
│   ├── tooling.md        pnpm, Node.js, Bun
│   ├── build-and-test.md Vite, Vitest, Quality
│   ├── reliability.md    Production Definition of Done
│   ├── security.md       Environment, browser, supply chain
│   ├── api-boundaries.md Fetch, validation, cancellation, MSW
│   ├── ui.md             Radix, shadcn/ui, Floating UI
│   ├── forms.md          RHF + Zod
│   ├── data-access.md    Data Access (optional)
│   ├── auth.md           Better Auth (optional)
│   ├── managed-services.md Managed Services (optional)
│   ├── styling.md        Tailwind, Motion
│   ├── design-system.md  DESIGN.md visual contract (optional)
│   ├── state-and-data.md Zustand + TanStack Query
│   ├── dates.md          date-fns
│   ├── content.md        Lexical, ProseMirror, Shiki
│   ├── advanced-capabilities.md Capability-gated workbench surfaces
│   ├── i18n.md           Format.js
│   ├── observability.md  Sentry, OTel, Statsig
│   └── icons.md          Lucide, Phosphor, Tabler
│
├── 🎯 targets/ (Tier 2 — Optional)
│   ├── browser.md / cloudflare-pages.md / vercel.md
│   └── electron.md / tauri.md / pwa.md
│
├── 📖 guides/ (Tier 2)
│   ├── new-project-setup.md
│   ├── package-versions.md
│   ├── project-structure.md
│   ├── agent-consumption.md
│   └── migration-paths.md
│
├── 🔧 templates/ (Tier 2)
│   ├── tsconfig / vite / vitest / Playwright / CI configs
│   ├── env / API boundary / performance budgets
│   ├── Dependabot supply-chain updates
│   ├── cn-utility.md / zod-form-example.md
│   └── DESIGN.example.md
│
├── 💡 rationale/ (Tier 3 — Why Each Choice)
│   ├── why-pnpm.md / why-bun-runtime.md
│   ├── cloudflare-pages-vs-vercel.md
│   ├── why-prisma.md / why-cloudflare-d1.md / why-cloudflare-kv.md
│   ├── why-neon.md / why-cloudflare-r2.md / why-resend.md
│   ├── why-advanced-capabilities.md
│   ├── why-design-md.md
│   ├── why-production-reliability.md
│   ├── why-agent-native-contracts.md
│   └── why-*.md files for every technology
│
└── 🔮 backlog/ (Tier 4 — Evolution)
    ├── ROADMAP.md / under-evaluation.md / deprecated.md
```

---

## Versioning

| Type      | Bump  | Examples                                      |
| --------- | ----- | --------------------------------------------- |
| **MAJOR** | X.0.0 | Swap core tech (React → other), new principle |
| **MINOR** | 1.X.0 | New lib, new target, new category             |
| **PATCH** | 1.0.X | Version bump, docs fix                        |

See [`CHANGELOG.md`](CHANGELOG.md) for history.

---

## Contributing

See [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md) for guidelines on proposing additions, removals, and upgrades.

> **⚠️ Note on entry point sync:** Multiple files duplicate stack rules
> (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules/*.mdc`, `llms-full.txt`). When
> updating rules, ensure all entry points are updated consistently.

---

## License

MIT — see [LICENSE](LICENSE) for details.
