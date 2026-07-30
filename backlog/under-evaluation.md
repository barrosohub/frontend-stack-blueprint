---
title: "Under Evaluation"
version: "2.0.0"
updated: "2026-07-30"
tier: 4
---

# Under Evaluation

Technologies being actively evaluated for potential inclusion in the stack.

| Technology                  | Scope                                                        | Blocker                                                                                           | ETA      |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------- |
| **React Compiler adoption** | Default-on auto-memoization                                  | Stable 1.x exists; prove library compatibility, diagnostics, and measured value before defaulting | Watching |
| **Biome**                   | Replace ESLint + Prettier (Husky stays)                      | Confirm required type-aware and React ecosystem rule parity                                       | Watching |
| **TanStack Start**          | Full-stack framework (SSR/streaming with TanStack Router)    | Production evidence and a clear use case beyond the client blueprint                              | Watching |
| **TanStack Store**          | Priority successor to Zustand (reactive, framework-agnostic) | Reach v1 GA (currently alpha v0.x)                                                                | Watching |
| **Drizzle ORM**             | TypeScript ORM / SQL-first data access                       | Reach v1 GA (official docs still indicate pre-v1 track)                                           | Watching |
| **Temporal API**            | Replace date-fns with native date handling                   | Baseline/cross-browser support, especially Safari, plus migration evidence                        | Watching |
| **Signals (TC39)**          | Potential reactive primitive for state management            | Specification stage                                                                               | Watching |
| **better-sqlite3**          | Electron-local SQLite persistence                            | Native ABI/prebuild compatibility must be proven for the exact Electron release matrix            | Watching |
| **DESIGN.md**               | Promotion from provisional to recommended design contract    | Alpha specification and pre-1.0 CLI must demonstrate migration compatibility                      | Watching |

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
