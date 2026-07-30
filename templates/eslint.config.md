---
title: "Template: ESLint Flat Config"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
---

# eslint.config.js Template

```javascript
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
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
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
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
- ESLint 10 flat config with `typescript-eslint` type-aware rules
- React Hooks 7.1 and React Refresh 0.5 recommended Vite rules
- `strictTypeChecked` — maximum type safety
- `no-explicit-any: 'error'` — Enforces the "no any" rule
- `explicit-function-return-type` — Aligns with strong typing principle
- `ignores` — excludes build output and configuration files
