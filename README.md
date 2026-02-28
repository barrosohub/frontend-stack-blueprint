# 🏗️ Frontend Stack Blueprint

> **The canonical frontend stack reference for AI coding agents.**

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](CHANGELOG.md)
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
│  BUILD          Vite ≥7 (Node.js >=20.19 or >=22.12)          │
│  TEST           Vitest ≥3.2 (4.x recommended)               │
│  QUALITY        Husky + lint-staged + ESLint + Prettier      │
│                                                              │
│  COMPONENTS     Radix UI · Floating UI · Embla · cmdk        │
│  UI PRE-STYLED  shadcn/ui (recommended)                      │
│  STYLING        Tailwind CSS ≥4 + clsx + tailwind-merge      │
│  ANIMATION      Motion (`import from 'motion/react'`)        │
│                                                              │
│  FORMS          React Hook Form + Zod                        │
│  DATES          date-fns ≥4.1 (+@date-fns/tz)               │
│  STATE          Zustand                                      │
│  SERVER STATE   TanStack Query ≥5.60                         │
│                                                              │
│  RICH TEXT      Lexical (primary) · ProseMirror (fallback)   │
│  SYNTAX         Shiki                                        │
│  I18N           Format.js + react-intl                       │
│                                                              │
│  OBSERVABILITY  Sentry · OpenTelemetry · Statsig             │
│  ICONS          Lucide (default) | Phosphor | Tabler         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  TARGETS (opt)  Browser · Electron · Tauri · PWA             │
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

### How to Use in Your Project

**Claude Code** — Add to your project's `CLAUDE.md`:

```
@../frontend-stack-blueprint/CLAUDE.md
```

**GitHub Copilot** — The repo includes `.github/copilot-instructions.md` which Copilot reads automatically. You can also reference `AGENTS.md`.

**Cursor** — The repo includes `.cursor/rules/*.mdc` (modern) and `.cursorrules` (legacy). Cursor auto-reads project rules from `.cursor/rules/`.

**Any Agent** — Point the agent to `llms-full.txt` for complete context.

---

## Documentation Structure

```
frontend-stack-blueprint/
│
├── 📋 Entry Points (Tier 0)
│   ├── CLAUDE.md / AGENTS.md / .cursor/rules/*.mdc
│   ├── .cursorrules (legacy) / .github/copilot-instructions.md
│   ├── llms.txt / llms-full.txt
│   └── stack.yaml
│
├── 📦 stack/ (Tier 1 — The Stack)
│   ├── STACK.md          Full manifesto
│   ├── architecture.md   Mandatory principles
│   ├── core.md           TypeScript, React, Routing
│   ├── build-and-test.md Vite, Vitest, Quality
│   ├── ui.md             Radix, shadcn/ui, Floating UI
│   ├── forms.md          RHF + Zod
│   ├── styling.md        Tailwind, Motion
│   ├── state-and-data.md Zustand + TanStack Query
│   ├── dates.md          date-fns
│   ├── content.md        Lexical, ProseMirror, Shiki
│   ├── i18n.md           Format.js
│   ├── observability.md  Sentry, OTel, Statsig
│   └── icons.md          Lucide, Phosphor, Tabler
│
├── 🎯 targets/ (Tier 2 — Optional)
│   ├── electron.md / tauri.md / pwa.md
│
├── 📖 guides/ (Tier 2)
│   ├── new-project-setup.md
│   ├── package-versions.md
│   ├── project-structure.md
│   └── migration-paths.md
│
├── 🔧 templates/ (Tier 2)
│   ├── tsconfig / vite / vitest / tailwind / eslint configs
│   ├── cn-utility.md / zod-form-example.md
│
├── 💡 rationale/ (Tier 3 — Why Each Choice)
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
