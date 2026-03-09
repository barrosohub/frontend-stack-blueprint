---
title: "Tooling"
version: "1.4.0"
updated: "2026-03-09"
tier: 1
---

# Tooling

This layer defines the default package manager and runtime posture for
the blueprint. It keeps the stack `pnpm`-first while preserving runtime
optionality.

## Package Manager: pnpm

| Attribute | Value |
| --------- | ----- |
| Role      | Priority Node.js package manager |
| Status    | ⭐ Default |
| Provision | `corepack enable pnpm` |
| Add       | `pnpm add <package>` |
| Add Dev   | `pnpm add -D <package>` |
| One-off CLI | `pnpm dlx <package>@latest <command>` |
| Local Bin | `pnpm exec <command>` |

### Rules

- `pnpm` is the primary package manager for blueprint instructions
- `npm` remains compatible, but it is not the primary instruction set
- If official docs show `npx <pkg>@latest ...`, translate that to `pnpm dlx <pkg>@latest ...`
- If the package is already installed locally, use `pnpm exec <bin>` instead of `pnpm dlx`
- Use Corepack on Node.js installations so `pnpm` is provisioned consistently

## Runtime (default): Node.js

| Attribute | Value |
| --------- | ----- |
| Role      | Default JavaScript runtime |
| Required  | `>=20.19.0 || >=22.12.0` |
| Status    | ✅ Core |

### Rules

- Node.js is the default runtime because Vite 7 requires `>=20.19` or `>=22.12`
- Default scripts, CI assumptions, and baseline compatibility should target Node.js first
- Runtime changes do not change the blueprint package manager default

## Runtime (alternative): Bun

| Attribute   | Value |
| ----------- | ----- |
| Role        | Alternative JavaScript runtime |
| Min Version | ≥1.0 |
| Status      | ✅ Alternative |

### When to Use

- The project explicitly wants Bun runtime support
- Runtime compatibility has been validated for the current toolchain
- Faster local script execution is desirable and the team accepts runtime-specific validation

### Rules

- Bun is an alternative runtime only; it is not the default
- `pnpm` remains the default package manager even when Bun is the runtime
- Do not assume Bun compatibility for every CLI, dependency tree, or deployment target without verification

## Command Mapping

| Intent | Use |
| ------ | --- |
| Add dependency | `pnpm add <package>` |
| Add dev dependency | `pnpm add -D <package>` |
| Remove dependency | `pnpm remove <package>` |
| Run project script | `pnpm <script>` |
| Run local package binary | `pnpm exec <command>` |
| Run temporary CLI package | `pnpm dlx <package>@latest <command>` |

## Official CLI-First + Impact Preflight

- With `pnpm` as default, prefer `pnpm dlx` or `pnpm exec` when official docs show `npx`
- Keep using official CLIs when recommended by the official documentation
- Run Impact Preflight before any CLI that may create, overwrite, or reconfigure files
- If impact is non-trivial or uncertain, ask the developer before running the CLI
