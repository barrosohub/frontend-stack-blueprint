---
title: "Template: Project Structure"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# Project Structure Template

## Scaffold

```
my-project/
│
├── public/
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── App.tsx              # Root component
│   │   ├── providers.tsx        # QueryClient, IntlProvider, etc.
│   │   ├── router.tsx           # Route tree
│   │   └── app.css              # @import "tailwindcss" + @theme
│   │
│   ├── features/                # One folder per domain
│   │   └── <feature>/
│   │       ├── components/      # UI for this feature
│   │       ├── hooks/           # Logic for this feature
│   │       ├── utils/           # Helpers for this feature
│   │       ├── types.ts         # Types for this feature
│   │       ├── <feature>.test.ts
│   │       └── index.ts         # Barrel exports
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── hooks/               # Cross-feature hooks
│   │   ├── utils/
│   │   │   └── cn.ts            # Required cn() utility
│   │   └── types/               # Global types
│   │
│   ├── i18n/                    # Translation files
│   │   ├── en.json
│   │   └── pt.json
│   │
│   ├── test/
│   │   └── setup.ts             # Test setup
│   │
│   └── main.tsx                 # Entry point
│
├── .husky/
│   └── pre-commit               # npx lint-staged
│
├── index.html
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── eslint.config.js
├── .prettierrc
├── package.json
└── README.md
```

## Rules

- Feature modules are **self-contained** — tests, types, hooks co-located
- `shared/` only contains code used by **2+ features**
- Every feature has an `index.ts` barrel file
- All imports use `@/` path aliases
- `cn.ts` is always at `src/shared/utils/cn.ts`
