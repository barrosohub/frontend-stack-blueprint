---
title: "Under Evaluation"
version: "1.1.0"
updated: "2026-02-28"
tier: 4
---

# Under Evaluation

Technologies being actively evaluated for potential inclusion in the stack.

| Technology         | Scope                                                        | Blocker                            | ETA      |
| ------------------ | ------------------------------------------------------------ | ---------------------------------- | -------- |
| **React Compiler** | Auto-memoization (eliminates useMemo/useCallback)            | Stability in production            | Q2 2026  |
| **Biome**          | Replace ESLint + Prettier (Husky stays)                      | Plugin ecosystem maturity          | Q2 2026  |
| **TanStack Start** | Full-stack framework (SSR/streaming with TanStack Router)    | v1 RC → stable                     | Q2 2026  |
| **TanStack Store** | Priority successor to Zustand (reactive, framework-agnostic) | Reach v1 GA (currently alpha v0.x) | Watching |
| **Temporal API**   | Replace date-fns with native date handling                   | Safari support + polyfill maturity | Q3 2026  |
| **Signals (TC39)** | Potential reactive primitive for state management            | Specification stage                | Watching |

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
