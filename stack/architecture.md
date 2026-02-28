---
title: "Architecture Principles"
version: "1.1.0"
updated: "2026-02-28"
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

## Quality Gate: Husky Pre-Commit

```bash
# .husky/pre-commit
npx lint-staged
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
