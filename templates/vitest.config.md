---
title: "Template: vitest.config.ts"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# vitest.config.ts Template

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/test/**", "src/**/*.d.ts", "src/main.tsx"],
    },
  },
});
```

## Test Setup File

```typescript
// src/test/setup.ts
import "@testing-library/jest-dom/vitest";
```

## Key Points

- `globals: true` — Use `describe`, `it`, `expect` without imports
- `environment: 'jsdom'` — DOM environment for React component tests
- `setupFiles` — Load Testing Library matchers
- Path aliases must match tsconfig and vite config
- Coverage uses V8 provider (faster than Istanbul)
