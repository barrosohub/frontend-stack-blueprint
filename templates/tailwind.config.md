---
title: "Template: Tailwind CSS v4"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# Tailwind CSS v4 Configuration

## Setup

Tailwind CSS v4 uses CSS-first configuration. No `tailwind.config.js` needed.

### Install

```bash
npm install -D tailwindcss @tailwindcss/vite
```

### Vite Plugin

Already included in `vite.config.ts`:

```typescript
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### CSS Entry Point

```css
/* src/app/app.css */
@import "tailwindcss";
```

## Customization (v4 way)

Tailwind CSS v4 uses `@theme` directive in CSS instead of a config file:

```css
/* src/app/app.css */
@import "tailwindcss";

@theme {
  --color-brand: #3b82f6;
  --color-brand-dark: #1d4ed8;
  --font-sans: "Inter", sans-serif;
  --breakpoint-3xl: 1920px;
}
```

## Key Changes from v3

- No `tailwind.config.js` — configuration lives in CSS
- No `@tailwind base/components/utilities` — use `@import "tailwindcss"`
- Theme customization via `@theme` directive
- Automatic content detection (no `content` array needed)
- Vite plugin replaces PostCSS plugin
