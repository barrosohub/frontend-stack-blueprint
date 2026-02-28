---
title: "Project Structure"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# Project Structure

> Feature-based structure reference. This is the ONLY accepted pattern.

## Full Structure

```
my-project/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/                        # App-level setup
│   │   ├── App.tsx                 # Root component
│   │   ├── providers.tsx           # Provider composition
│   │   ├── router.tsx              # Route definitions
│   │   └── app.css                 # Global styles (Tailwind imports)
│   │
│   ├── features/                   # ⭐ Feature modules (core pattern)
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   └── AuthGuard.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useSession.ts
│   │   │   ├── utils/
│   │   │   │   └── token.ts
│   │   │   ├── types.ts
│   │   │   ├── auth.test.ts
│   │   │   └── index.ts            # Barrel file
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── index.ts
│   │
│   ├── shared/                     # Shared across features
│   │   ├── components/
│   │   │   ├── ui/                 # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   └── input.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── hooks/
│   │   │   ├── useMediaQuery.ts
│   │   │   └── useDebounce.ts
│   │   ├── utils/
│   │   │   ├── cn.ts               # ⭐ cn() utility (required)
│   │   │   └── api.ts
│   │   └── types/
│   │       └── common.ts
│   │
│   ├── i18n/                       # Translations
│   │   ├── en.json
│   │   └── pt.json
│   │
│   ├── test/                       # Test setup
│   │   └── setup.ts
│   │
│   └── main.tsx                    # Entry point
│
├── .husky/
│   └── pre-commit
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.js
├── .prettierrc
├── package.json
└── README.md
```

## Rules

1. **`features/`** — Each feature is a self-contained module
2. **`shared/`** — Only code used by 2+ features
3. **Co-location** — Tests, types, hooks live next to their feature
4. **Barrel files** — Every feature has `index.ts` with named exports
5. **Path aliases** — `@/features/auth`, `@/shared/utils/cn`
6. **No orphans** — Every file belongs to a feature or shared

## Import Examples

```typescript
// ✅ CORRECT
import { useAuth } from "@/features/auth";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/components/ui/button";

// ❌ WRONG
import { useAuth } from "../../../features/auth/hooks/useAuth";
import { cn } from "../../shared/utils/cn";
```
