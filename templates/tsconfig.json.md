---
title: "Template: TypeScript 7 project references"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
---

# TypeScript 7 configuration templates

Use separate browser and tooling configurations so Node.js globals do not leak
into application code.

## `tsconfig.json`

```jsonc
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" },
  ],
}
```

## `tsconfig.app.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2025",
    "lib": ["ES2025", "DOM"],
    "types": ["vite/client"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,

    "paths": {
      "@/*": ["./src/*"],
    },

    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  },
  "include": ["src"],
}
```

## `tsconfig.node.json`

```jsonc
{
  "compilerOptions": {
    "target": "ES2025",
    "lib": ["ES2025"],
    "types": ["node"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true,
  },
  "include": ["vite.config.ts", "vitest.config.ts", "eslint.config.*"],
}
```

Install `@types/node` as a development dependency for the tooling config.

## TypeScript 7 notes

- Do not use `baseUrl`; it was deprecated in TypeScript 6 and removed from the
  supported TypeScript 7 configuration path.
- Declare `types` explicitly. TypeScript 7 does not implicitly load every
  package under `@types`.
- `DOM.Iterable` is no longer needed separately because iterable DOM types are
  included by `DOM`.
- Keep the browser/runtime matrix authoritative. Change `target` and `lib` only
  when the product's compatibility policy requires it.
