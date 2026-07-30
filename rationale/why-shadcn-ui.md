---
title: "Why shadcn/ui"
updated: "2026-07-30"
tier: 3
---

# Why shadcn/ui

## Decision

shadcn/ui as the recommended pre-styled component system.

## Reasons

1. **Own your code** — Copy-paste model means components live in your codebase. Full ownership, full customization. No vendor lock-in.
2. **Declared primitive base + Tailwind** — New projects default to Base UI; Radix UI and React Aria remain explicit alternatives.
3. **Accessibility foundations** — The selected base provides interaction primitives, while the product still verifies names, focus, keyboard behavior, and contrast.
4. **AI-friendly** — Components are simple, well-documented, and widely used in LLM training data. Agents generate excellent shadcn/ui code.
5. **Ecosystem** — Large community, extensive component library, active development.
6. **cn() pattern** — Established the `cn()` utility pattern as ecosystem standard.

## Important Notes

- shadcn/ui is NOT an npm dependency — it's a code generation tool
- Initialize explicitly: `pnpm dlx shadcn@4.16.0 init --base base`
- Components are added individually: `pnpm dlx shadcn@4.16.0 add button`
- You can modify every line of every component
- 80%+ of projects benefit from shadcn/ui as starting point

## Status

⭐ Recommended — Strongly suggested but not mandatory. Teams can use raw Base UI,
Radix UI, or React Aria Components with Tailwind instead.
