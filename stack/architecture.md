---
title: "Architecture Principles"
version: "1.8.0"
updated: "2026-07-13"
tier: 1
scope: "mandatory"
---

# Architecture Principles

> These principles are **rules**, not suggestions. Every agent that
> generates code from this blueprint MUST apply them. Code that violates
> these principles is **wrong**.

## 1. Modular by Feature

Structure by **feature/domain**, NEVER by file type. Each feature
contains its components, hooks, utils, types, and tests — co-located.

```
✅ CORRECT (by feature):
src/
  features/
    auth/
      components/
      hooks/
      utils/
      types.ts
      auth.test.ts
      index.ts
    dashboard/
      ...
  shared/
    components/
    hooks/
    utils/
    types/

❌ WRONG (by file type):
src/
  components/
    AuthForm.tsx
    Dashboard.tsx
  hooks/
    useAuth.ts
    useDashboard.ts
```

Rules:

- Barrel files (`index.ts`) with named exports per module
- Each module importable and testable in isolation
- **Path aliases required:** `@/*` → `src/*` in tsconfig + vite config
- Never `../../../` — always `@/features/auth`

## 2. Strong Typing

- `strict: true` mandatory in tsconfig
- `any` is **PROHIBITED** — use `unknown` + type guards
- Props MUST have explicit interfaces/types
- Return types MUST be explicit
- Discriminated unions for complex states
- `as const` for literal values
- Zod for ALL external data validation

```typescript
// ✅ CORRECT
interface UserCardProps {
  user: User;
  variant: 'compact' | 'full';
  onAction?: (action: UserAction) => void;
}

type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User[] }
  | { status: 'error'; error: Error };

// ❌ WRONG
const UserCard = (props: any) => { ... }
const [state, setState] = useState<any>(null);
```

## 3. Composition Over Inheritance

- Components accept `children`, render props, or slots
- Hooks as primary mechanism for logic reuse
- Configurations externalized (never hardcoded)
- Open/Closed: add features without modifying existing code

## 4. DRY — Don't Repeat Yourself

- Pattern appears 2+ times → extract to util/hook/component
- Business logic NEVER duplicated
- Constants and configs in dedicated files
- **BUT:** don't abstract prematurely — wait for pattern confirmation

## 5. KISS — Keep It Simple, Stupid

- The simplest solution that solves the problem
- Components: single responsibility, max ~150 lines
- Functions: single responsibility, max ~30 lines
- Self-documenting names
- If you need a comment to explain _what_ it does → code is too complex

## 6. YAGNI — You Aren't Gonna Need It

- DO NOT build for the future
- DO NOT add libs "just in case"
- DO NOT create abstractions without concrete need
- Implement the minimum. Refactor when need arises.

## 7. React Compiler

- When available and stable → **use always**
- Eliminates need for `useMemo`, `useCallback`, `React.memo` manually
- The compiler optimizes automatically — cleaner code, less boilerplate
- Until adopted: manual memoization only when measurable benefit exists

## 8. Official CLI-First + Impact Preflight

- **Official CLI-First:** if an official CLI exists and official docs
  recommend it for setup/installation, agents MUST prefer that CLI
  over manual scaffolding
- **Impact Preflight (mandatory before CLI):**
  - Evaluate files likely to be created/modified
  - Evaluate overwrite risk
  - Evaluate structural conflicts with current architecture
  - Evaluate compatibility with current configs/scripts
- If impact is non-trivial or uncertain, agents MUST ask the developer
  for confirmation before running the CLI
- Never manually recreate baseline setup that an official CLI already
  generates (example: shadcn/ui base init)

## 9. Boundaries Validate at Runtime

- Validate environment configuration once and fail fast
- Validate every external API response before it reaches domain code
- Keep transport DTOs, domain models, and view models distinct when they differ
- Browser-delivered configuration is public; secrets stay in trusted runtimes
- Expose typed, feature-neutral boundaries from `src/config/` and `src/shared/api/`

See [security.md](security.md) and [api-boundaries.md](api-boundaries.md).

## 10. Async Work Has a Lifecycle

- Every network request accepts cancellation and a finite timeout
- Prevent obsolete responses from overwriting newer state
- Model idle, loading, empty, success, stale, offline, and error explicitly
- Retry only safe/idempotent operations with bounded backoff
- Roll back rejected optimistic updates
- Every error state provides a useful recovery path; never fail silently

## 11. Compatibility Is Explicit

- Document the browser/runtime support policy; never say only “modern browsers”
- Use Baseline Widely Available as the default web-platform policy
- Require feature detection, progressive enhancement, and fallback for exceptions
- Test the actual engine matrix defined by Browser, Electron, Tauri, PWA, or WebView targets

See [targets/browser.md](../targets/browser.md).

## 12. Production Readiness Is Evidence

- CI, not a developer workstation, is the authoritative merge gate
- Test the production artifact and the product's critical journeys
- Enforce accessibility, performance, security, and supply-chain policies
- Correlate releases with telemetry and document rollout and rollback
- Capability-specific tooling is required only after its profile applies

See [reliability.md](reliability.md).

## Rules for Agents (Summary)

1. **Structure by features** — never `components/`, `hooks/` at root
2. **Type everything** — explicit types on functions, hooks, components, state
3. **Extract logic** — zero business logic inline in components
4. **Name with intention** — `useAuthSession` not `useAuth`
5. **Clean exports** — barrel files with named exports
6. **Don't install without need** — native JS/TS solves it? Don't add a lib
7. **No empty abstractions** — no wrappers that only delegate
8. **Test** — Vitest on every module (hooks and utils at minimum)
9. **Validate inputs** — external data ALWAYS with Zod
10. **Handle errors** — Error Boundaries, try/catch, NEVER silent fail
11. **Use cn()** — always combine Tailwind classes with `cn()`, never template literals
12. **Use path aliases** — imports with `@/features/...`, never `../../../`
13. **Official CLI-First** — prefer official docs-recommended CLI over manual setup
14. **Impact Preflight** — evaluate overwrite/structure/config risk before CLI; if uncertain, ask the developer first
15. **Validate boundaries** — typed environment and runtime schemas for all external data
16. **Control async lifecycle** — cancellation, timeout, bounded retry, recovery
17. **Declare compatibility** — explicit browser/runtime matrix and fallbacks
18. **Prove production readiness** — CI, E2E, accessibility, performance, security, rollback

## Quality Gates

### Local: Husky Pre-Commit

```bash
# .husky/pre-commit
pnpm exec lint-staged
```

```jsonc
// lint-staged config
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"],
  },
}
```

Setup mandatory on project init. Code with lint errors **never enters the repo**.

### Authoritative: CI

Every applicable pull request MUST pass clean lockfile installation, typecheck,
lint, unit/integration tests, production build, critical E2E, automated
accessibility, dependency review, and documented performance budgets. Protect
the default branch with these checks. See [build-and-test.md](build-and-test.md).
