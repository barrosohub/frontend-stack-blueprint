---
title: "New Project Setup"
version: "1.8.0"
updated: "2026-07-13"
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

Create `.nvmrc` with a maintained Node.js release satisfying the Vite constraint
(for example `22.12`). CI reads this file instead of duplicating a Node version.

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
  config/
    env.ts              # Typed public environment contract
  features/           # Feature modules (co-located)
  shared/
    api/                # Network boundary (when applicable)
    components/       # Shared UI components
    hooks/            # Shared hooks
    utils/
      cn.ts           # cn() utility
    types/            # Global types
  App.tsx
  main.tsx
e2e/                    # Critical Playwright journeys
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

## Step 11: DESIGN.md Design Contract (Optional, Provisional)

Activate this step only when the product has an agreed visual identity, needs
cross-screen consistency, or will use agents to generate and modify UI.

1. Copy [the example contract](../templates/DESIGN.example.md) to the project
   root as `DESIGN.md`.
2. Replace the starter narrative and tokens with product-approved direction.
3. Pin the alpha CLI exactly:

```bash
pnpm add -D @google/design.md@0.3.0
```

4. Add scripts to `package.json`:

```json
{
  "scripts": {
    "design:lint": "designmd lint DESIGN.md",
    "design:tokens": "designmd export --format css-tailwind DESIGN.md > src/app/design-tokens.css",
    "design:check": "pnpm design:lint && pnpm design:tokens && git diff --exit-code -- src/app/design-tokens.css"
  }
}
```

5. Generate and import the Tailwind 4 tokens:

```bash
pnpm design:lint
pnpm design:tokens
```

```css
/* src/app/app.css */
@import "tailwindcss";
@import "./design-tokens.css";
```

Do not ship the example unchanged or hand-edit the generated token file. See
[stack/design-system.md](../stack/design-system.md) for precedence, agent rules,
CI guidance, and the alpha stability policy.

## Step 12: Configure Production Reliability

Apply the profiles in [stack/reliability.md](../stack/reliability.md).

### Typed Environment

Create `src/config/env.ts` from
[templates/env-contract.md](../templates/env-contract.md). Every `VITE_*` value
is public client configuration and MUST NOT contain a secret.

### E2E and Accessibility

For every user-facing deployed application:

```bash
pnpm add -D @playwright/test @axe-core/playwright
pnpm exec playwright install
```

Copy [templates/playwright.config.md](../templates/playwright.config.md), define
the browser/runtime matrix, and add the critical journeys before launch.

### Network Contract Mocks

When the project consumes an API:

```bash
pnpm add -D msw
```

Create the typed fetch boundary from
[templates/api-client.md](../templates/api-client.md) and reuse MSW handlers for
success, latency, cancellation, authorization, rate limit, server failure, and
malformed-payload scenarios.

### CI, Security, and Performance

- Start from [templates/github-actions-ci.md](../templates/github-actions-ci.md)
- Add [templates/dependabot.yml.md](../templates/dependabot.yml.md)
- Protect the default branch with applicable required checks
- Enable Dependabot, Dependency Review, CodeQL, and secret scanning where available
- Pin Actions to verified full commit SHAs with minimum permissions
- Complete [templates/performance-budgets.md](../templates/performance-budgets.md)
- Document browser support using [targets/browser.md](../targets/browser.md)
- Define preview smoke, release identity, rollout, and rollback before production

## Step 13: Verify Setup

```bash
pnpm typecheck   # Whole-project typecheck
pnpm lint        # Zero lint warnings/errors
pnpm test:unit   # Unit and integration tests
pnpm build       # Production artifact
pnpm test:e2e    # Critical journeys against the artifact
```

## Step 14: If the Project Needs Authentication

Use Better Auth as the default auth layer only when the project needs login/session management.

- See [stack/auth.md](../stack/auth.md) for the canonical auth rules
- Install `better-auth` with `pnpm add better-auth` only in projects that actually need authentication
- Better Auth requires a server-side runtime/auth handler; do not add it to purely static apps
- If client and server are separate, install Better Auth in both parts as directed by the official docs
- Apply **Official CLI-First + Impact Preflight** before any Better Auth CLI command

## Step 15: If the Project Needs Data Access / ORM

Use Prisma only when the project has backend, server-side, or edge runtime and actually needs ORM-backed relational data access.

- See [stack/data-access.md](../stack/data-access.md) for the canonical data-access rules
- Install Prisma with `pnpm add prisma @prisma/client` only when the project has trusted runtime for relational data access
- Do NOT add Prisma to purely static frontend apps
- If the project pairs Prisma with Cloudflare D1, follow the official Prisma + D1 guide and do not assume `prisma migrate dev` as the default workflow
- Apply **Official CLI-First + Impact Preflight** before Prisma CLI commands that initialize schema, generate clients, or alter database state

## Step 16: If the Project Needs Managed Services

Use managed services only when the project actually needs database, object storage, or email delivery capabilities.

- See [stack/managed-services.md](../stack/managed-services.md) for the canonical provider rules
- Use Neon when the project needs managed Postgres
- Use Cloudflare D1 when the project needs Cloudflare-native serverless SQL and SQLite semantics are acceptable
- Use Cloudflare R2 when the project needs object storage
- Use Cloudflare KV when the project needs key-value storage for read-heavy or eventually consistent workloads
- Use Resend when the project needs transactional email or audience/broadcast workflows
- Keep provider SDKs, service tokens, and privileged operations out of the base frontend install unless the capability is in scope
- D1, KV, and R2 should only be added when the project also has Functions, Workers, or another server-side/edge runtime surface
- Apply **Official CLI-First + Impact Preflight** before Neon, Prisma, or Wrangler commands that modify infrastructure or schema

## Step 17: If the Project Needs Bun Runtime

- Bun is approved as an alternative runtime only; Node.js remains the default runtime baseline
- Keep `pnpm` as the package manager even when the runtime is Bun
- Validate CLI, dependency, and deployment compatibility before switching runtime assumptions
- See [stack/tooling.md](../stack/tooling.md) for the canonical tooling policy

## Step 18: If the Project Needs Advanced Capabilities

Do not add workbench-style dependencies during the base setup. If the product
explicitly needs Markdown, interactive tables, charts, diagrams, code editing,
a terminal, collaborative state, or PDF viewing:

- Follow [stack/advanced-capabilities.md](../stack/advanced-capabilities.md)
- Install only the package set for the required capability
- Define its security, accessibility, performance, lifecycle, and test boundary
- For terminals or native modules, verify the exact desktop/server runtime and
  release matrix before installation

## Optional: Deployment Target

Only if needed:

- Cloud frontend hosting (default) → see [targets/cloudflare-pages.md](../targets/cloudflare-pages.md)
- Cloud frontend hosting (secondary) → see [targets/vercel.md](../targets/vercel.md)
- Cloudflare Pages alone does not imply D1, KV, or R2 for purely static frontend hosting
- Desktop → see [targets/electron.md](../targets/electron.md) or [targets/tauri.md](../targets/tauri.md)
- PWA → see [targets/pwa.md](../targets/pwa.md)
