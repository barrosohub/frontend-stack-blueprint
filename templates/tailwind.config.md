---
title: "Template: Tailwind CSS v4"
version: "1.7.0"
updated: "2026-07-13"
tier: 2
---

# Tailwind CSS v4 Configuration

## Setup

Tailwind CSS v4 uses CSS-first configuration. No `tailwind.config.js` needed.

### Install

```bash
pnpm add -D tailwindcss @tailwindcss/vite
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

## With an Active DESIGN.md Contract

When the project has a root `DESIGN.md`, generate the `@theme` block instead of
maintaining it by hand:

```bash
pnpm design:lint
pnpm design:tokens
```

```css
/* src/app/app.css */
@import "tailwindcss";
@import "./design-tokens.css";
```

`src/app/design-tokens.css` is generated from `DESIGN.md` and must not be
hand-edited. See [DESIGN.md Design Contract](../stack/design-system.md).

## Key Changes from v3

- No `tailwind.config.js` — configuration lives in CSS
- No `@tailwind base/components/utilities` — use `@import "tailwindcss"`
- Theme customization via `@theme` directive
- Automatic content detection (no `content` array needed)
- Vite plugin replaces PostCSS plugin
