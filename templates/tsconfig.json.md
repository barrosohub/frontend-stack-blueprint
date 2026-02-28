---
title: "Template: tsconfig.json"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# tsconfig.json Template

```jsonc
{
  "compilerOptions": {
    // Strict typing — non-negotiable
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,

    // Module system
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    // JSX
    "jsx": "react-jsx",

    // Path aliases — required
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    },

    // Interop
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"],
}
```

## Key Points

- `strict: true` — Enables all strict type checking. NEVER disable.
- `noUncheckedIndexedAccess` — Array/object index access returns `T | undefined`
- `paths` with `@/*` — Required path aliases. Never use `../../../`
- `moduleResolution: "bundler"` — Optimized for Vite
- `noEmit: true` — Vite handles compilation; TypeScript only type-checks
