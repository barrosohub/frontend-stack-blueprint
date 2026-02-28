---
title: "State & Data"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# State & Data

## Zustand (Client State)

| Attribute | Value                   |
| --------- | ----------------------- |
| Role      | Client state management |
| Status    | ✅ Core                 |
| Install   | `npm install zustand`   |

### Why Zustand

- Minimal API — no boilerplate (no reducers, no actions, no dispatchers)
- Tiny bundle (~1KB)
- Type-safe with TypeScript out of the box
- No providers needed — stores work outside React tree
- Middleware ecosystem (persist, devtools, immer)
- Battle-tested in production (used by thousands of apps)
- Excellent LLM/AI agent training data

### Rules

- Use for UI state, user preferences, local app state
- NO Redux, NO MobX — Zustand is the standard
- Keep stores small and focused — one per feature/domain
- Stores live in `src/features/<feature>/store.ts`

### Pattern

```typescript
import { create } from 'zustand';

interface ThemeState {
  mode: 'light' | 'dark';
  accentColor: string;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  accentColor: '#3b82f6',
  toggleMode: () => set((s) => ({
    mode: s.mode === 'light' ? 'dark' : 'light',
  })),
}));

// In component:
function ThemeToggle(): JSX.Element {
  const { mode, toggleMode } = useThemeStore();
  return <button onClick={toggleMode}>{mode}</button>;
}
```

> **Succession plan:** TanStack Store is currently alpha (v0.x) and
> under evaluation. **When TanStack Store reaches v1 GA, it will
> become the priority client state manager**, replacing Zustand as the
> default choice. Its reactive, framework-agnostic design and tight
> integration with TanStack Query/Router make it the ideal long-term
> fit. See `backlog/under-evaluation.md` for tracking.

---

## TanStack Query ≥5.60 (Server State)

| Attribute   | Value                                                              |
| ----------- | ------------------------------------------------------------------ |
| Role        | Server state, cache, data fetching                                 |
| Min Version | ≥5.60                                                              |
| Status      | ✅ Core                                                            |
| Install     | `npm install @tanstack/react-query @tanstack/react-query-devtools` |

### Why TanStack Query

- Automatic caching and deduplication
- Background refetching
- Optimistic updates
- Infinite queries and pagination
- Devtools for debugging
- Type-safe with TypeScript

### Rules

- Use for ALL async/server state — API calls, data fetching
- NEVER store server data in client state (Zustand)
- Query keys must be consistent and descriptive
- Custom hooks wrap queries: `useUsers()`, not inline `useQuery()`
- Always handle loading, error, and success states

### Pattern

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Custom hook wrapping a query
export function useUsers(): UseQueryResult<User[]> {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });
}

// Mutation with cache invalidation
export function useCreateUser(): UseMutationResult<
  User,
  Error,
  CreateUserInput
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateUserInput) => api.createUser(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
```

### State Boundary

| Data Source                        | Solution                                |
| ---------------------------------- | --------------------------------------- |
| API responses, remote data         | TanStack Query                          |
| UI state, preferences, local flags | Zustand                                 |
| Form state                         | React Hook Form                         |
| URL state                          | Router (TanStack Router / React Router) |
