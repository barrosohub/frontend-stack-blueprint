---
title: "Why pnpm"
updated: "2026-03-09"
tier: 3
---

# Why pnpm

## Decision

Use `pnpm` as the default package manager for the blueprint.

## Reasons

1. **Deterministic installs** — `pnpm` enforces stricter dependency resolution and keeps dependency graphs more explicit.
2. **Performance** — The content-addressable store and efficient linking model improve install speed and disk reuse.
3. **Workspace fit** — `pnpm` scales cleanly from single-package apps to monorepos without changing the blueprint default.
4. **CLI mapping** — Official `npm` and `npx` examples translate cleanly to `pnpm add`, `pnpm exec`, and `pnpm dlx`.
5. **AI-friendliness** — The command surface is explicit enough for agents to convert official package-install and CLI flows consistently.

## Trade-offs

- Some third-party docs still present `npm` first, so agents must translate examples deliberately
- Teams need Corepack or an explicit `pnpm` installation path in local environments
- A few ecosystem tools still document `npm` scripts first even when they work fine with `pnpm`

## Alternatives Considered

| Alternative | Why Not |
| ----------- | ------- |
| npm | Compatible, but no longer the priority package manager in this blueprint |
| Bun package manager | Bun is approved only as an alternative runtime, not as the default package manager |
| Yarn | Valid in some ecosystems, but not the chosen default for this blueprint |

## Rule

Use `pnpm` as the primary package manager in blueprint instructions. Keep `npm` as compatibility fallback, not as the primary path.

## Status

⭐ Default tooling choice.
