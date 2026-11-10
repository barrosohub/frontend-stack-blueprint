---
title: "Under Evaluation"
version: "2.0.0"
updated: "2026-11-10"
tier: 4
---

# Under Evaluation

Technologies being actively evaluated for potential inclusion in the stack.

| Technology                  | Scope                                                        | Blocker                                                                                           | ETA      |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------- |
| **React Compiler adoption** | Default-on auto-memoization                                  | Stable 1.x exists; prove library compatibility, diagnostics, and measured value before defaulting | Watching |
| **Biome**                   | Replace ESLint + Prettier (Husky stays)                      | Confirm required type-aware and React ecosystem rule parity                                       | Watching |
| **tsrs**                    | Experimental TypeScript type checker                         | Diagnostic and project-reference parity, platforms, editor support, and representative benchmarks | Watching |
| **Oxlint + Oxfmt**          | Potential lint and format alternative                        | Prove React, accessibility, type-aware rule and format parity against existing CI                 | Watching |
| **Vite+**                   | Integrated development toolchain                             | Validate pnpm interoperability, CI equivalence, migration and independent exit paths              | Watching |
| **fate**                    | Normalized server-state alternative                          | Validate API integration, cache correctness, operational maturity, and migration cost             | Watching |
| **Void**                    | Vite-based full-stack and deployment platform                | Validate hosting portability, security boundaries, operational maturity, and project need         | Watching |
| **TanStack Start**          | Full-stack framework (SSR/streaming with TanStack Router)    | Production evidence and a clear use case beyond the client blueprint                              | Watching |
| **TanStack Store**          | Priority successor to Zustand (reactive, framework-agnostic) | Reach v1 GA (currently alpha v0.x)                                                                | Watching |
| **Drizzle ORM**             | TypeScript ORM / SQL-first data access                       | Reach v1 GA (official docs still indicate pre-v1 track)                                           | Watching |
| **Temporal API**            | Replace date-fns with native date handling                   | Baseline/cross-browser support, especially Safari, plus migration evidence                        | Watching |
| **Signals (TC39)**          | Potential reactive primitive for state management            | Specification stage                                                                               | Watching |
| **better-sqlite3**          | Electron-local SQLite persistence                            | Native ABI/prebuild compatibility must be proven for the exact Electron release matrix            | Watching |
| **DESIGN.md**               | Promotion from provisional to recommended design contract    | Alpha specification and pre-1.0 CLI must demonstrate migration compatibility                      | Watching |

See [Tooling and data evaluation protocol](../docs/research/tooling-and-data-evaluation.md)
for evidence requirements, comparisons, and the current decision.

## Evaluation Criteria

For a technology to be added to the stack, it must:

1. **Solve a real problem** — Address a gap or significantly improve over current solution
2. **Be stable** — At least v1.0 with production track record
3. **Be maintained** — Active development, responsive to issues
4. **Have ecosystem support** — Works with rest of the stack
5. **Be AI-friendly** — Sufficient training data for LLMs to generate quality code
6. **Not duplicate** — Doesn't overlap with existing stack technology

## How to Propose

See [.github/ISSUE_TEMPLATE/propose-addition.md](../.github/ISSUE_TEMPLATE/propose-addition.md).
