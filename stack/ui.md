---
title: "UI Components"
version: "1.4.0"
updated: "2026-03-09"
tier: 1
---

# UI Components

## Headless Components

### Radix UI

| Attribute | Value                                     |
| --------- | ----------------------------------------- |
| Role      | Accessible headless UI primitives         |
| Status    | ✅ Core                                   |
| Install   | `pnpm add @radix-ui/react-<primitive>`    |

Install primitives individually as needed:

- `@radix-ui/react-dialog` — Modals
- `@radix-ui/react-popover` — Popovers
- `@radix-ui/react-select` — Selects
- `@radix-ui/react-tabs` — Tab navigation
- `@radix-ui/react-tooltip` — Tooltips
- `@radix-ui/react-dropdown-menu` — Dropdown menus
- `@radix-ui/react-accordion` — Accordions

**Rules:**

- ALWAYS check if a Radix primitive exists before building custom
- ALWAYS use Radix for: Dialog, Select, Tabs, Tooltip, Dropdown
- Radix handles accessibility (ARIA, keyboard nav) automatically

### Floating UI

| Attribute | Value                                |
| --------- | ------------------------------------ |
| Role      | Tooltip/popover/dropdown positioning |
| Status    | ✅ Core                              |
| Install   | `pnpm add @floating-ui/react`        |

Use for custom positioning logic when Radix primitives don't cover the case.

### Embla Carousel

| Attribute | Value                              |
| --------- | ---------------------------------- |
| Role      | Carousels and sliders              |
| Status    | ✅ Core                            |
| Install   | `pnpm add embla-carousel-react`    |

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

| Attribute | Value                           |
| --------- | ------------------------------- |
| Role      | Radix + Tailwind implementation |
| Status    | ⭐ Recommended                  |
| Init      | `pnpm dlx shadcn@latest init`   |

**Important:** shadcn/ui is NOT an npm dependency — it's a collection of
copy-paste components that combine Radix UI + Tailwind CSS. Components
live in YOUR codebase, giving you full ownership and customization.

**When to use:** 80%+ of projects will benefit from shadcn/ui as the
starting point for UI. It provides pre-styled, accessible components
out of the box.

**Agent behavior:**

- Suggest shadcn/ui **by default** for new projects
- If developer declines → fall back to raw Radix + Tailwind
- Follow **Official CLI-First**: use official shadcn CLI for base setup
- Run **Impact Preflight** before CLI (overwrite + structural compatibility checks)
- If impact is non-trivial or uncertain, ask developer confirmation before running CLI
- Never manually recreate shadcn base setup that `pnpm dlx shadcn@latest init` can generate
- NEVER install a competing UI library (Material UI, Ant Design, Chakra)

**Setup:**

```bash
pnpm dlx shadcn@latest init
# Then add components as needed:
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add input
```
