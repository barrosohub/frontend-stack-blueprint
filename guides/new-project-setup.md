---
title: "New Project Setup"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# New Project Setup

> Step-by-step guide to bootstrap a new project using the Frontend Stack Blueprint.

## Prerequisites

- **Node.js >=20.19 or >=22.12** (required by Vite 7)
- npm (comes with Node.js)

## Step 1: Scaffold with Vite

```bash
node --version  # Verify >=20.19 or >=22.12
npm create vite@latest my-project -- --template react-ts
cd my-project
```

## Step 2: Install Core Dependencies

```bash
# Core
npm install react react-dom
npm install -D typescript @types/react @types/react-dom

# Routing (choose one)
npm install @tanstack/react-router @tanstack/router-devtools
# OR: npm install react-router

# State & Data
npm install zustand
npm install @tanstack/react-query @tanstack/react-query-devtools

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-select
npm install @floating-ui/react embla-carousel-react cmdk

# Styling
npm install -D tailwindcss @tailwindcss/vite
npm install clsx tailwind-merge motion

# Forms
npm install react-hook-form zod @hookform/resolvers

# Dates
npm install date-fns @date-fns/tz

# Icons
npm install lucide-react
```

## Step 3: Quality Gate

```bash
# ESLint + Prettier
npm install -D eslint @eslint/js typescript-eslint prettier

# Husky + lint-staged
npm install -D husky lint-staged
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

## Step 4: Configure TypeScript

See [templates/tsconfig.json.md](../templates/tsconfig.json.md) — ensure `strict: true` and path aliases.

## Step 5: Configure Vite

See [templates/vite.config.md](../templates/vite.config.md) — add `@/` alias and Tailwind plugin.

## Step 6: Configure Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

See [templates/vitest.config.md](../templates/vitest.config.md).

## Step 7: Create cn() Utility

Create `src/shared/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

## Step 8: Set Up Project Structure

```
src/
  features/           # Feature modules (co-located)
  shared/
    components/       # Shared UI components
    hooks/            # Shared hooks
    utils/
      cn.ts           # cn() utility
    types/            # Global types
  App.tsx
  main.tsx
```

See [guides/project-structure.md](project-structure.md) for full details.

## Step 9: shadcn/ui (Recommended)

```bash
npx shadcn@latest init
npx shadcn@latest add button input dialog
```

## Step 10: Verify Setup

```bash
npm run dev        # Should start without errors
npm run build      # Should build without errors
npx vitest --run   # Tests should pass
```

## Optional: Deployment Target

Only if needed:

- Desktop → see [targets/electron.md](../targets/electron.md) or [targets/tauri.md](../targets/tauri.md)
- PWA → see [targets/pwa.md](../targets/pwa.md)
