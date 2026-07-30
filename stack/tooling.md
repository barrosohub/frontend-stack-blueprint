---
title: "Tooling"
version: "2.0.0"
updated: "2026-07-30"
tier: 1
---

# Tooling

This layer defines the default package manager and runtime posture for
the blueprint. It keeps the stack `pnpm`-first while preserving runtime
optionality.

## Package Manager: pnpm

| Attribute   | Value                                                           |
| ----------- | --------------------------------------------------------------- |
| Role        | Priority Node.js package manager                                |
| Status      | ⭐ Default                                                      |
| Provision   | `pnpm/action-setup` in CI; Corepack only when bundled with Node |
| Add         | `pnpm add <package>`                                            |
| Add Dev     | `pnpm add -D <package>`                                         |
| One-off CLI | `pnpm dlx <package>@<validated-major> <command>`                |
| Local Bin   | `pnpm exec <command>`                                           |

### Rules

- `pnpm` is the primary package manager for blueprint instructions
- `npm` remains compatible, but it is not the primary instruction set
- If official docs show `npx <pkg>@<validated-major> ...`, translate that to `pnpm dlx <pkg>@<validated-major> ...`
- If the package is already installed locally, use `pnpm exec <bin>` instead of `pnpm dlx`
- Pin `packageManager` to `pnpm@11.18.0` and require pnpm ≥11.18
- Corepack is no longer bundled with Node.js 25+. If it is absent, install pnpm
  through the official standalone installer or `npm install --global pnpm@11.18.0`
- In GitHub Actions, use `pnpm/action-setup` before `actions/setup-node`

## Runtime (default): Node.js

| Attribute | Value                      |
| --------- | -------------------------- |
| Role      | Default JavaScript runtime |
| Default   | Node.js 24 LTS             |
| Required  | `>=22.22.0`                |
| Status    | ✅ Core                    |

### Rules

- Node.js 24 LTS is the default for new projects
- Node.js 22.22 is the compatibility floor shared by Vite 8 and React Router 8
- Node.js 20 is end-of-life and MUST NOT be selected for new projects
- Maintained Node.js 22, 24, and 26 lines MAY be used when the deployment target supports them
- Default scripts, CI assumptions, and baseline compatibility should target Node.js first
- Runtime changes do not change the blueprint package manager default

## Runtime (alternative): Bun

| Attribute   | Value                          |
| ----------- | ------------------------------ |
| Role        | Alternative JavaScript runtime |
| Min Version | ≥1.0                           |
| Status      | ✅ Alternative                 |

### When to Use

- The project explicitly wants Bun runtime support
- Runtime compatibility has been validated for the current toolchain
- Faster local script execution is desirable and the team accepts runtime-specific validation

### Rules

- Bun is an alternative runtime only; it is not the default
- `pnpm` remains the default package manager even when Bun is the runtime
- Do not assume Bun compatibility for every CLI, dependency tree, or deployment target without verification

## Command Mapping

| Intent                    | Use                                              |
| ------------------------- | ------------------------------------------------ |
| Add dependency            | `pnpm add <package>`                             |
| Add dev dependency        | `pnpm add -D <package>`                          |
| Remove dependency         | `pnpm remove <package>`                          |
| Run project script        | `pnpm <script>`                                  |
| Run local package binary  | `pnpm exec <command>`                            |
| Run temporary CLI package | `pnpm dlx <package>@<validated-major> <command>` |

## Official CLI-First + Impact Preflight

- With `pnpm` as default, prefer `pnpm dlx` or `pnpm exec` when official docs show `npx`
- Keep using official CLIs when recommended by the official documentation
- Run Impact Preflight before any CLI that may create, overwrite, or reconfigure files
- If impact is non-trivial or uncertain, ask the developer before running the CLI
