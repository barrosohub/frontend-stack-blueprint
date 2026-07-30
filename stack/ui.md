---
title: "UI Components"
version: "2.0.0"
updated: "2026-07-30"
tier: 1
---

# UI Components

## Headless Components

### Base UI (default)

| Attribute | Value                                                |
| --------- | ---------------------------------------------------- |
| Role      | Accessible, unstyled React components                |
| Status    | ⭐ Default primitive base for new shadcn/ui projects |
| Install   | Prefer `pnpm dlx shadcn@4.16.0 init --base base`     |

Use the official shadcn CLI when shadcn owns component setup. Install
`@base-ui/react` directly only for projects that intentionally use raw primitives.

### Supported alternatives

| Base       | Select when                                          | shadcn initialization                      |
| ---------- | ---------------------------------------------------- | ------------------------------------------ |
| Radix UI   | Existing Radix codebase or primitive/API preference  | `pnpm dlx shadcn@4.16.0 init --base radix` |
| React Aria | Team prefers Adobe's interaction/accessibility model | `pnpm dlx shadcn@4.16.0 init --base aria`  |

Declare the primitive base explicitly. Do not mix implementations casually
inside one design system, and test accessible names, focus, keyboard interaction,
and portal behavior regardless of the library.

### Floating UI

| Attribute | Value                                |
| --------- | ------------------------------------ |
| Role      | Tooltip/popover/dropdown positioning |
| Status    | ✅ Core                              |
| Install   | `pnpm add @floating-ui/react`        |

Use for custom positioning logic when Radix primitives don't cover the case.

### Embla Carousel

| Attribute | Value                           |
| --------- | ------------------------------- |
| Role      | Carousels and sliders           |
| Status    | ✅ Core                         |
| Install   | `pnpm add embla-carousel-react` |

Lightweight, extensible, and accessible carousel engine. Use for any
horizontal scrolling, card sliders, or image galleries.

### cmdk

| Attribute | Value                |
| --------- | -------------------- |
| Role      | Command palette (⌘K) |
| Status    | ✅ Core              |
| Install   | `pnpm add cmdk`      |

Use for command palette / search overlay patterns. Accessible, composable,
and integrates well with Radix.

---

## Pre-Styled Components (Recommended)

### shadcn/ui

| Attribute | Value                                                           |
| --------- | --------------------------------------------------------------- |
| Role      | Owned component source generated from a declared primitive base |
| Status    | ⭐ Recommended                                                  |
| Init      | `pnpm dlx shadcn@4.16.0 init --base base`                       |

**Important:** shadcn/ui is NOT an npm dependency — it's a collection of
copy-paste components that combine the selected primitive base + Tailwind CSS. Components
live in YOUR codebase, giving you full ownership and customization.

**When to use:** 80%+ of projects will benefit from shadcn/ui as the
starting point for UI. It provides pre-styled, accessible components
out of the box.

**Agent behavior:**

- Suggest shadcn/ui **by default** for new projects
- Default new projects to Base UI; keep Radix and React Aria as explicit alternatives
- Follow **Official CLI-First**: use official shadcn CLI for base setup
- Run **Impact Preflight** before CLI (overwrite + structural compatibility checks)
- If impact is non-trivial or uncertain, ask developer confirmation before running CLI
- Never manually recreate shadcn base setup that `pnpm dlx shadcn@4.16.0 init` can generate
- NEVER install a competing UI library (Material UI, Ant Design, Chakra)

**Setup:**

```bash
pnpm dlx shadcn@4.16.0 init --base base
# Then add components as needed:
pnpm dlx shadcn@4.16.0 add button
pnpm dlx shadcn@4.16.0 add dialog
pnpm dlx shadcn@4.16.0 add input
```
