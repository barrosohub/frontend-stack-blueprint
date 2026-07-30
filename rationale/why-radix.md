---
title: "Why Radix UI"
updated: "2026-07-30"
tier: 3
---

# Why Radix UI

## Decision

Radix UI as a supported headless component primitive library, especially for
existing Radix/shadcn codebases. Base UI is the default for new shadcn projects.

## Reasons

1. **Accessibility foundation** — Primitives provide ARIA, keyboard, and focus
   behavior, but product-level names, contrast, composition, and flows still require testing.
2. **Unstyled/headless** — Full control over styling via Tailwind. No fighting framework CSS.
3. **Composable API** — Compound component pattern for flexible composition.
4. **Production-proven** — Used by Vercel, Linear, and thousands of production apps.
5. **shadcn/ui support** — shadcn can still generate Radix-based components through an explicit base choice.

## Alternatives Considered

| Alternative | Why Not                                                                         |
| ----------- | ------------------------------------------------------------------------------- |
| Headless UI | Fewer primitives, Tailwind Labs-specific                                        |
| React Aria  | Supported alternative when its interaction model is preferred                   |
| Base UI     | Default for new shadcn projects; migration is not forced on existing Radix code |
| Material UI | Opinionated styling conflicts with Tailwind                                     |
| Ant Design  | Heavy, opinionated, conflicts with stack                                        |
| Chakra UI   | Runtime CSS-in-JS, conflicts with Tailwind                                      |

## Status

✅ Supported alternative — Select explicitly with `--base radix`; do not force
existing projects to migrate solely because the new-project default changed.
