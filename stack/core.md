---
title: "Core — TypeScript, React, Routing"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Core — TypeScript, React, Routing

## TypeScript ≥5.9

| Attribute   | Value                                |
| ----------- | ------------------------------------ |
| Role        | Primary language for ALL source code |
| Min Version | ≥5.9                                 |
| Status      | ✅ Core                              |
| Install     | `npm install -D typescript`          |

### Rules

- `strict: true` in tsconfig — non-negotiable
- `any` is **PROHIBITED** — use `unknown` + type guards
- All function parameters and return types must be explicit
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
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "paths": {
      "@/*": ["./src/*"],
    },
  },
}
```

See [templates/tsconfig.json.md](../templates/tsconfig.json.md) for full config.

---

## React ≥19.2

| Attribute   | Value                                          |
| ----------- | ---------------------------------------------- |
| Role        | UI rendering framework                         |
| Min Version | ≥19.2                                          |
| Status      | ✅ Core                                        |
| Install     | `npm install react react-dom`                  |
| Types       | `npm install -D @types/react @types/react-dom` |

> **⚠️ Security note (React Server Components):** RSC has had critical CVEs
> in late 2025 ([denial-of-service, source code exposure](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)).
> If using RSC, ensure you are on the latest patched React version
> (currently pinned at 19.2.4 in `stack.yaml`). Monitor React security
> advisories regularly.

### Rules

- **Functional components only** — no class components, ever
- Hooks for ALL logic reuse
- Props with explicit interfaces
- Error Boundaries for fault tolerance
- React Compiler → use when available (removes manual memo needs)

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

// ❌ WRONG — class component
class Dashboard extends React.Component { ... }
```

---

## Routing

### TanStack Router ≥1 (Default)

| Attribute | Value                                                          |
| --------- | -------------------------------------------------------------- |
| Role      | Type-safe client-side routing                                  |
| Status    | ✅ Core (default)                                              |
| Install   | `npm install @tanstack/react-router @tanstack/router-devtools` |

**Why default:** Superior type-safety, native integration with TanStack
Query/Store, file-based route generation, built-in search params validation.

### React Router ≥7.1 (Alternative)

| Attribute | Value                                 |
| --------- | ------------------------------------- |
| Role      | Client-side routing with data loaders |
| Status    | ✅ Core (alternative)                 |
| Install   | `npm install react-router`            |

**When to use:** Teams already experienced with React Router, or projects
requiring SSR via Remix/React Router framework mode.

### Agent Behavior

- If developer doesn't specify → use **TanStack Router**
- If developer specifies React Router → use React Router
- If context is ambiguous → **ASK the developer**
- Never mix both routers in the same project

See [rationale/why-tanstack-router.md](../rationale/why-tanstack-router.md) for detailed comparison.
