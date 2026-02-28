---
title: "Template: ESLint Flat Config"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# eslint.config.js Template

```javascript
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Enforce explicit return types
      "@typescript-eslint/explicit-function-return-type": "warn",
      // No `any` — ever
      "@typescript-eslint/no-explicit-any": "error",
      // Prefer interfaces for object types
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      // Enforce consistent imports
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    ignores: ["dist/", "node_modules/", "*.config.*"],
  },
);
```

## Key Points

- Uses **flat config** format (`eslint.config.js`) — no legacy `.eslintrc`
- `strictTypeChecked` — Maximum type safety
- `no-explicit-any: 'error'` — Enforces the "no any" rule
- `explicit-function-return-type` — Aligns with strong typing principle
- `ignores` — Exclude build output and config files
