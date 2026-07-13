---
title: "Template: Project Structure"
version: "1.7.0"
updated: "2026-07-13"
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
│   │   ├── design-tokens.css    # Generated from DESIGN.md (optional)
│   │   └── app.css              # Tailwind + generated token imports
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
│   └── pre-commit               # pnpm exec lint-staged
│
├── DESIGN.md                     # Optional product design contract
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
- Root `DESIGN.md` is opt-in and must be customized before use
- `src/app/design-tokens.css` is generated and must not be hand-edited
