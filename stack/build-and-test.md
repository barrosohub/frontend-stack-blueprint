---
title: "Build & Test"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Build & Test

## Vite ≥7

| Attribute   | Value                                      |
| ----------- | ------------------------------------------ |
| Role        | Dev server + production build              |
| Min Version | ≥7.0                                       |
| Requires    | Node.js >=20.19 or >=22.12                 |
| Status      | ✅ Core                                    |
| Install     | `npm install -D vite @vitejs/plugin-react` |

### Why Vite

- Native ESM dev server — instant hot reload
- Rollup-based production builds — optimized output
- First-class TypeScript support
- Official React plugin
- Rich plugin ecosystem

### Config Essentials

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
```

See [templates/vite.config.md](../templates/vite.config.md) for full config.

---

## Vitest ≥3.2

| Attribute   | Value                                                                    |
| ----------- | ------------------------------------------------------------------------ |
| Role        | Unit + integration testing                                               |
| Min Version | ≥3.2 (4.x recommended)                                                   |
| Status      | ✅ Core                                                                  |
| Install     | `npm install -D vitest @testing-library/react @testing-library/jest-dom` |

### Why Vitest

- Native Vite integration — shared config, same transforms
- Jest-compatible API — minimal learning curve
- Lightning fast — parallel execution, native ESM
- Built-in code coverage
- Watch mode with smart re-runs

### Rules

- Every module MUST have tests (hooks and utils at minimum)
- Use `describe` / `it` / `expect` pattern
- Use React Testing Library for component tests
- Test behavior, not implementation details
- Descriptive test names: `it('should redirect unauthenticated users')`

### Config Essentials

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

See [templates/vitest.config.md](../templates/vitest.config.md) for full config.

---

## Quality Gate

### Husky (Git Hooks)

| Attribute | Value                  |
| --------- | ---------------------- |
| Role      | Pre-commit gate        |
| Install   | `npm install -D husky` |
| Init      | `npx husky init`       |

Setup is **mandatory on project init**. No exceptions.

### lint-staged

| Attribute | Value                            |
| --------- | -------------------------------- |
| Role      | Run linters only on staged files |
| Install   | `npm install -D lint-staged`     |

### ESLint (Flat Config)

| Attribute | Value                                                |
| --------- | ---------------------------------------------------- |
| Role      | Code linting                                         |
| Install   | `npm install -D eslint @eslint/js typescript-eslint` |

Use flat config format (`eslint.config.js`). No legacy `.eslintrc`.

### Prettier

| Attribute | Value                     |
| --------- | ------------------------- |
| Role      | Code formatting           |
| Install   | `npm install -D prettier` |

### Pre-Commit Pipeline

```bash
# .husky/pre-commit
npx lint-staged
```

```jsonc
// package.json or .lintstagedrc
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"],
  },
}
```

**Code with lint errors NEVER enters the repository.**
