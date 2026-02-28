---
title: "Why Radix UI"
updated: "2026-02-28"
tier: 3
---

# Why Radix UI

## Decision

Radix UI as the headless component primitive library.

## Reasons

1. **Accessibility built-in** — ARIA attributes, keyboard navigation, focus management handled automatically.
2. **Unstyled/headless** — Full control over styling via Tailwind. No fighting framework CSS.
3. **Composable API** — Compound component pattern for flexible composition.
4. **Production-proven** — Used by Vercel, Linear, and thousands of production apps.
5. **shadcn/ui foundation** — shadcn/ui is built on Radix, making them complementary.

## Alternatives Considered

| Alternative | Why Not                                     |
| ----------- | ------------------------------------------- |
| Headless UI | Fewer primitives, Tailwind Labs-specific    |
| React Aria  | More verbose API, steeper learning curve    |
| Material UI | Opinionated styling conflicts with Tailwind |
| Ant Design  | Heavy, opinionated, conflicts with stack    |
| Chakra UI   | Runtime CSS-in-JS, conflicts with Tailwind  |

## Status

✅ Core — Foundation for all interactive UI components.
