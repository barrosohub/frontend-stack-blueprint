---
title: "Template: Vite 8 configuration"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
---

# `vite.config.ts`

```typescript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: "baseline-widely-available",
    sourcemap: false,
  },
});
```

## Key points

- Vite 8 uses Rolldown for development and production bundling and Oxc for its
  transformation/minification pipeline.
- `resolve.tsconfigPaths` keeps aliases aligned with TypeScript without
  duplicating them or relying on CommonJS `__dirname`.
- `baseline-widely-available` follows Vite's default modern-browser policy.
- Production source maps are disabled by default. If Sentry or another
  observability provider requires them, generate hidden maps, upload them
  privately, and remove them from the public artifact after upload.
- React Compiler is a separate, capability-gated opt-in. Follow the current
  `@vitejs/plugin-react` integration rather than adding Babel to every project.
