---
title: "Template: vite.config.ts"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# vite.config.ts Template

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: "ES2022",
    sourcemap: true,
  },
});
```

## Key Points

- `react()` — Official React plugin (handles JSX transform, Fast Refresh)
- `tailwindcss()` — Tailwind CSS v4 Vite plugin
- `resolve.alias` — Must match tsconfig `paths` for `@/*`
- `build.target: 'ES2022'` — Match tsconfig target
- `build.sourcemap: true` — Required for Sentry error tracking
