---
title: "Build & Test"
version: "1.9.0"
updated: "2026-07-13"
tier: 1
---

# Build & Test

## Vite ≥7

| Attribute   | Value                                   |
| ----------- | --------------------------------------- |
| Role        | Dev server + production build           |
| Min Version | ≥7.0                                    |
| Requires    | Node.js >=20.19 or >=22.12              |
| Status      | ✅ Core                                 |
| Install     | `pnpm add -D vite @vitejs/plugin-react` |

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

| Attribute   | Value                                                                 |
| ----------- | --------------------------------------------------------------------- |
| Role        | Unit + integration testing                                            |
| Min Version | ≥3.2 (4.x recommended)                                                |
| Status      | ✅ Core                                                               |
| Install     | `pnpm add -D vitest @testing-library/react @testing-library/jest-dom` |

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

## Playwright

| Attribute   | Value                                                              |
| ----------- | ------------------------------------------------------------------ |
| Role        | Production E2E, browser compatibility, accessibility, visual smoke |
| Min Version | ≥1.61                                                              |
| Status      | ✅ Required for user-facing deployed applications                  |
| Install     | `pnpm add -D @playwright/test @axe-core/playwright`                |

### Why Playwright

- Exercises Chromium, Firefox, and WebKit through one runner
- Auto-waits for actionable elements and provides web-first assertions
- Captures traces, screenshots, video, and HTML reports for CI diagnosis
- Tests the production build and critical browser behavior
- Integrates automated axe accessibility scans without inventing a second E2E stack

### Rules

- Cover critical journeys, not every implementation branch
- Test the built artifact through `vite preview`
- Use role, label, and visible-name locators instead of CSS structure
- Retry only in CI; preserve the trace on first retry
- Treat repeated flakiness as a defect
- Match Playwright projects to the declared target/browser matrix

See [templates/playwright.config.md](../templates/playwright.config.md).

---

## Network Contract Testing

Use MSW when a project consumes network APIs.

| Attribute | Value                                                    |
| --------- | -------------------------------------------------------- |
| Role      | Deterministic network mocks in browser and Node.js tests |
| Status    | ⭐ Capability-gated                                      |
| Install   | `pnpm add -D msw`                                        |

Reuse canonical handlers across Vitest integration tests, isolated component
development, and deterministic browser scenarios. Cover success, empty, slow,
cancelled, unauthorized, rate-limited, server-error, and malformed responses.
Mocks do not replace staging smoke tests or provider/consumer contract checks.

See [api-boundaries.md](api-boundaries.md).

---

## Component and Visual Testing

Storybook is optional. Activate it for a shared design system, a reusable
component platform, or a large interactive state matrix.

- Run interaction and accessibility checks in CI when activated.
- Use Playwright screenshots for a small set of stable critical views.
- Chromatic is an optional managed-service decision, never a base requirement.
- Review visual baseline updates explicitly; do not auto-accept them.

---

## Quality Gate

### Husky (Git Hooks)

| Attribute | Value                  |
| --------- | ---------------------- |
| Role      | Pre-commit gate        |
| Install   | `pnpm add -D husky`    |
| Init      | `pnpm exec husky init` |

Setup is **mandatory on project init**. No exceptions.

### lint-staged

| Attribute | Value                            |
| --------- | -------------------------------- |
| Role      | Run linters only on staged files |
| Install   | `pnpm add -D lint-staged`        |

### ESLint (Flat Config)

| Attribute | Value                                             |
| --------- | ------------------------------------------------- |
| Role      | Code linting                                      |
| Install   | `pnpm add -D eslint @eslint/js typescript-eslint` |

Use flat config format (`eslint.config.js`). No legacy `.eslintrc`.

### Prettier

| Attribute | Value                  |
| --------- | ---------------------- |
| Role      | Code formatting        |
| Install   | `pnpm add -D prettier` |

### Pre-Commit Pipeline

```bash
# .husky/pre-commit
pnpm exec lint-staged
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

### Production CI Pipeline

Husky provides fast local feedback. The authoritative merge gate runs in a clean
CI environment and MUST include every applicable command:

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test:unit
pnpm build
pnpm test:e2e
```

Protect the default branch with required checks. Upload diagnostic artifacts on
failure without leaking secrets. The reference workflow is
[templates/github-actions-ci.md](../templates/github-actions-ci.md).

### Accessibility Gate

- Default conformance target: WCAG 2.2 Level AA
- Block new automated axe violations on representative routes and states
- Manually verify keyboard, focus, zoom/reflow, reduced motion, and a screen-reader
  primary journey before major release
- Never claim WCAG conformance from automated tests alone

### Performance Gate

- Enforce route-aware transfer budgets on the production artifact
- Track field LCP ≤2.5 s, INP ≤200 ms, and CLS ≤0.1 at the 75th percentile
- Use lab measurements as regression signals and RUM/CrUX as field truth
- Require rationale and owner for any intentional budget increase

See [Production Reliability](reliability.md) and
[templates/performance-budgets.md](../templates/performance-budgets.md).

## Compatibility Note

The blueprint is `pnpm`-first. `npm` remains compatible, but `pnpm`
commands are the primary instructions across all setup and maintenance
docs.
