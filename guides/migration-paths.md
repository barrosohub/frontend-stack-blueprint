---
title: "Migration Paths"
version: "1.4.0"
updated: "2026-03-09"
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

## Migration Strategy

1. **One thing at a time** — migrate one technology per sprint
2. **Tests first** — ensure tests exist before migrating
3. **Feature by feature** — migrate feature modules individually
4. **Kill the old** — remove old dependencies after migration complete
