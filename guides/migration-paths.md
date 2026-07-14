---
title: "Migration Paths"
version: "1.9.0"
updated: "2026-07-13"
tier: 2
---

# Migration Paths

> How to migrate from common legacy setups to the Frontend Stack Blueprint.

## From Create React App (CRA) → Vite

1. Remove `react-scripts`: `pnpm remove react-scripts`
2. Install Vite: `pnpm add -D vite @vitejs/plugin-react`
3. Create `vite.config.ts` (see [templates/vite.config.md](../templates/vite.config.md))
4. Move `public/index.html` → `index.html` (root)
5. Add `<script type="module" src="/src/main.tsx"></script>` to `index.html`
6. Update `package.json` scripts:
   ```json
   { "dev": "vite", "build": "vite build", "preview": "vite preview" }
   ```
7. Remove CRA-specific env vars (`REACT_APP_` → `VITE_`)

## From Jest → Vitest

1. Remove Jest: `pnpm remove jest @types/jest ts-jest`
2. Install Vitest: `pnpm add -D vitest`
3. Create `vitest.config.ts` (see [templates/vitest.config.md](../templates/vitest.config.md))
4. Update test files: replace `jest.fn()` → `vi.fn()`, `jest.mock()` → `vi.mock()`
5. Most `expect` matchers work identically
6. Update `package.json`: `"test": "vitest"`

## From Redux → Zustand + TanStack Query

1. Identify state types: server state vs client state
2. **Server state** (API data) → migrate to TanStack Query
3. **Client state** (UI, preferences) → migrate to Zustand
4. Migrate one slice at a time
5. Remove Redux after full migration

## From styled-components / Emotion → Tailwind CSS

1. Install Tailwind: `pnpm add -D tailwindcss @tailwindcss/vite`
2. Install utilities: `pnpm add clsx tailwind-merge`
3. Create cn() helper (see [templates/cn-utility.md](../templates/cn-utility.md))
4. Migrate components one by one:
   - Replace `styled.div` → JSX with `className={cn(...)}`
   - Replace theme tokens → Tailwind utility classes
5. Remove styled-components/Emotion after full migration

## From Moment.js → date-fns

1. Install: `pnpm add date-fns`
2. Replace imports:
   - `moment()` → `new Date()`
   - `moment().format('YYYY-MM-DD')` → `format(new Date(), 'yyyy-MM-dd')`
   - `moment().add(7, 'days')` → `addDays(new Date(), 7)`
3. For timezones: `pnpm add @date-fns/tz` and use `TZDate`
4. Remove Moment: `pnpm remove moment`

## From Formik → React Hook Form + Zod

1. Install: `pnpm add react-hook-form zod @hookform/resolvers`
2. Replace Formik components:
   - `<Formik>` → `useForm()`
   - `<Field>` → `register()`
   - `validationSchema` (Yup) → `resolver: zodResolver(schema)`
3. Migrate one form at a time
4. Remove Formik: `pnpm remove formik yup`

## From Cypress → Playwright

1. Preserve the stable Cypress suite while creating `playwright.config.ts` from
   [the template](../templates/playwright.config.md)
2. Migrate the smallest critical journey first and run it against the production build
3. Replace implementation selectors with role, label, and visible-name locators
4. Add Chromium, Firefox, and WebKit according to the documented browser target
5. Add axe checks and retain traces on first CI retry
6. Remove Cypress only after equivalent critical coverage passes reliably

## From Ad Hoc fetch/Axios Calls → Typed API Boundary

1. Inventory base URLs, headers, timeouts, retries, errors, and response assumptions
2. Create `src/shared/api/request.ts` from
   [templates/api-client.md](../templates/api-client.md)
3. Add Zod schemas at each external response boundary
4. Move caching, invalidation, and mutation lifecycle to TanStack Query
5. Add MSW scenarios for success, latency, cancellation, authorization, rate limit,
   server failure, and malformed payloads
6. Migrate one feature at a time; remove the old client only when no call sites remain

## From Raw import.meta.env → Typed Environment Contract

1. Inventory every environment variable and classify public versus server-only
2. Remove secrets from all `VITE_*` variables and rotate any previously exposed value
3. Create `src/config/env.ts` from
   [templates/env-contract.md](../templates/env-contract.md)
4. Replace feature-level `import.meta.env` reads with the typed `env` export
5. Add safe names/examples to `.env.example` and validate each deployment environment

## From Pre-Commit-Only Checks → Production CI

1. Keep Husky for local speed and add the
   [GitHub Actions CI baseline](../templates/github-actions-ci.md)
2. Make clean frozen install, typecheck, lint, unit/integration, and production build required
3. Add critical Playwright/accessibility journeys for deployed UI
4. Define route performance budgets and dependency review
5. Protect the default branch and preserve failure reports/traces
6. Add preview smoke, immutable release identity, rollout, and rollback before launch

## From “Modern Browsers” → Explicit Support Contract

1. Use Baseline Widely Available as the initial platform policy
2. Compare it with product analytics, contracts, WebViews, and assistive-technology needs
3. Document actual browser families/versions and the Playwright/runtime matrix
4. Add feature detection, progressive enhancement, fallbacks, and tests for exceptions
5. Review the policy on a scheduled cadence and before removing support

## Migration Strategy

1. **One thing at a time** — migrate one technology per sprint
2. **Tests first** — ensure tests exist before migrating
3. **Feature by feature** — migrate feature modules individually
4. **Kill the old** — remove old dependencies after migration complete
