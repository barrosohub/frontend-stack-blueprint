---
title: "Why Vitest"
updated: "2026-02-28"
tier: 3
---

# Why Vitest

## Decision

Vitest ≥3.2 (4.x recommended) as the test runner.

## Reasons

1. **Native Vite integration** — Shares transforms, resolvers, and plugins with Vite. One config for both build and test.
2. **Jest-compatible API** — Drop-in replacement. `describe`, `it`, `expect` work identically.
3. **Speed** — Parallel execution, native ESM, smart re-runs make it significantly faster than Jest.
4. **Built-in features** — Code coverage, watch mode, concurrent testing, snapshot testing all built in.
5. **TypeScript first** — No `ts-jest` configuration needed.

## Alternatives Considered

| Alternative           | Why Not                                          |
| --------------------- | ------------------------------------------------ |
| Jest                  | Slower, requires extra config for ESM/TypeScript |
| Testing Library alone | Not a test runner                                |
| Playwright Test       | For E2E, not unit/integration                    |

## Status

✅ Core — Jest is explicitly banned.
