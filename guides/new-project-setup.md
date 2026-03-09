---
title: "New Project Setup"
version: "1.4.0"
updated: "2026-03-09"
tier: 2
---

# New Project Setup

> Step-by-step guide to bootstrap a new project using the Frontend Stack Blueprint.

## Prerequisites

- **Node.js >=20.19 or >=22.12** (required by Vite 7)
- `pnpm` as the default package manager (provision with Corepack)
- Bun is optional and runtime-only; Node.js remains the default runtime

## Step 1: Scaffold with Vite

```bash
node --version  # Verify >=20.19 or >=22.12
corepack enable pnpm
pnpm --version
pnpm create vite my-project --template react-ts
cd my-project
pnpm install
```

## Step 2: Add Blueprint Dependencies

```bash
# The Vite React + TypeScript template already includes React, TypeScript, and Vite.
# Add the rest of the blueprint stack:

# Routing (choose one)
pnpm add @tanstack/react-router @tanstack/router-devtools
# OR: pnpm add react-router

# State & Data
pnpm add zustand
pnpm add @tanstack/react-query @tanstack/react-query-devtools

# UI Components
pnpm add @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-select
pnpm add @floating-ui/react embla-carousel-react cmdk

# Styling
pnpm add -D tailwindcss @tailwindcss/vite
pnpm add clsx tailwind-merge motion

# Forms
pnpm add react-hook-form zod @hookform/resolvers

# Dates
pnpm add date-fns @date-fns/tz

# Icons
pnpm add lucide-react
```

## Step 3: Quality Gate

```bash
# ESLint + Prettier
pnpm add -D eslint @eslint/js typescript-eslint prettier

# Husky + lint-staged
pnpm add -D husky lint-staged
pnpm exec husky init
printf "pnpm exec lint-staged\n" > .husky/pre-commit
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
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
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

## Step 9: Official CLI-First + Impact Preflight

Before running any official CLI, apply this mandatory checklist:

1. Confirm the official docs recommend the CLI for setup/installation
2. Identify files likely to be created/modified
3. Evaluate overwrite risk on existing files/config
4. Evaluate structural conflicts with blueprint architecture rules
5. Evaluate compatibility with current scripts/tooling config
6. If impact is non-trivial or uncertain, ask developer confirmation first

## Step 10: shadcn/ui (Recommended)

Use the official CLI for baseline setup. Do not manually recreate base
files the CLI already generates.

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input dialog
```

## Step 11: Verify Setup

```bash
pnpm dev              # Should start without errors
pnpm build            # Should build without errors
pnpm exec vitest --run  # Tests should pass
```

## Step 12: If the Project Needs Authentication

Use Better Auth as the default auth layer only when the project needs login/session management.

- See [stack/auth.md](../stack/auth.md) for the canonical auth rules
- Install `better-auth` with `pnpm add better-auth` only in projects that actually need authentication
- Better Auth requires a server-side runtime/auth handler; do not add it to purely static apps
- If client and server are separate, install Better Auth in both parts as directed by the official docs
- Apply **Official CLI-First + Impact Preflight** before any Better Auth CLI command

## Step 13: If the Project Needs Managed Services

Use managed services only when the project actually needs database, object storage, or email delivery capabilities.

- See [stack/managed-services.md](../stack/managed-services.md) for the canonical provider rules
- Use Neon when the project needs managed Postgres
- Use Cloudflare R2 when the project needs object storage
- Use Resend when the project needs transactional email or audience/broadcast workflows
- Keep provider SDKs, service tokens, and privileged operations out of the base frontend install unless the capability is in scope
- Apply **Official CLI-First + Impact Preflight** before Neon or Wrangler commands that modify infrastructure

## Step 14: If the Project Needs Bun Runtime

- Bun is approved as an alternative runtime only; Node.js remains the default runtime baseline
- Keep `pnpm` as the package manager even when the runtime is Bun
- Validate CLI, dependency, and deployment compatibility before switching runtime assumptions
- See [stack/tooling.md](../stack/tooling.md) for the canonical tooling policy

## Optional: Deployment Target

Only if needed:

- Cloud frontend hosting (default) → see [targets/cloudflare-pages.md](../targets/cloudflare-pages.md)
- Cloud frontend hosting (secondary) → see [targets/vercel.md](../targets/vercel.md)
- Desktop → see [targets/electron.md](../targets/electron.md) or [targets/tauri.md](../targets/tauri.md)
- PWA → see [targets/pwa.md](../targets/pwa.md)
