---
title: "Core — TypeScript, React, Routing"
version: "2.0.0"
updated: "2026-07-30"
tier: 1
---

# Core — TypeScript, React, Routing

## TypeScript ≥7

| Attribute   | Value                                |
| ----------- | ------------------------------------ |
| Role        | Primary language for ALL source code |
| Min Version | ≥7.0                                 |
| Status      | ✅ Core                              |
| Install     | `pnpm add -D typescript`             |

### Rules

- `strict: true` in tsconfig — non-negotiable
- `any` is **PROHIBITED** — use `unknown` + type guards
- Exported/public boundaries and complex functions require explicit types;
  allow clear local inference
- Use `interface` for object shapes, `type` for unions/intersections
- Use `as const` for literal values
- Use discriminated unions for complex state

### tsconfig Essentials

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2025",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "types": ["vite/client"],
    "paths": { "@/*": ["./src/*"] },
  },
}
```

See [templates/tsconfig.json.md](../templates/tsconfig.json.md) for full config.

---

## React ≥19.2

| Attribute   | Value                                       |
| ----------- | ------------------------------------------- |
| Role        | UI rendering framework                      |
| Min Version | ≥19.2                                       |
| Status      | ✅ Core                                     |
| Install     | `pnpm add react react-dom`                  |
| Types       | `pnpm add -D @types/react @types/react-dom` |

> **⚠️ Security note (React Server Components):** RSC has had critical CVEs
> in late 2025 ([denial-of-service, source code exposure](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)).
> If using RSC, use the current patched React 19 line (19.2.8 for this release)
> (currently pinned at 19.2.8 in `stack.yaml`). Monitor React security
> advisories regularly.

### Rules

- Product UI uses function components and Hooks
- A class component is permitted only where React still requires it, notably an
  Error Boundary using `getDerivedStateFromError` or `componentDidCatch`
- Hooks for ALL logic reuse
- Props with explicit interfaces
- Error Boundaries for fault tolerance
- React Compiler 1.x is stable and MAY be enabled incrementally after compatibility
  checks; do not remove measured memoization blindly

### Patterns

```typescript
// ✅ CORRECT — functional component with typed props
interface DashboardProps {
  userId: string;
  variant: 'compact' | 'full';
}

export function Dashboard({ userId, variant }: DashboardProps): JSX.Element {
  const { data } = useUserData(userId);
  return <DashboardView data={data} variant={variant} />;
}

// ❌ WRONG for product UI — class component
class Dashboard extends React.Component { ... }
```

---

## Routing

### TanStack Router ≥1 (Default)

| Attribute | Value                                                       |
| --------- | ----------------------------------------------------------- |
| Role      | Type-safe client-side routing                               |
| Status    | ✅ Core (default)                                           |
| Install   | `pnpm add @tanstack/react-router @tanstack/router-devtools` |

**Why default:** Superior type-safety, native integration with TanStack
Query/Store, file-based route generation, built-in search params validation.

### React Router ≥8 (Alternative)

| Attribute | Value                                 |
| --------- | ------------------------------------- |
| Role      | Client-side routing with data loaders |
| Status    | ✅ Core (alternative)                 |
| Install   | `pnpm add react-router`               |

React Router 8 is ESM-only and requires Node.js ≥22.22.0 and React ≥19.2.7.

**When to use:** Teams already experienced with React Router, or projects
requiring SSR via Remix/React Router framework mode.

### Agent Behavior

- If developer doesn't specify → use **TanStack Router**
- If developer specifies React Router → use React Router
- If context is ambiguous → **ASK the developer**
- Never mix both routers in the same project

See [rationale/why-tanstack-router.md](../rationale/why-tanstack-router.md) for detailed comparison.
