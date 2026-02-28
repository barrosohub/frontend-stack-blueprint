---
title: "Why shadcn/ui"
updated: "2026-02-28"
tier: 3
---

# Why shadcn/ui

## Decision

shadcn/ui as the recommended pre-styled component system.

## Reasons

1. **Own your code** — Copy-paste model means components live in your codebase. Full ownership, full customization. No vendor lock-in.
2. **Radix + Tailwind** — Built on Radix UI primitives styled with Tailwind CSS. Aligns perfectly with the stack.
3. **Accessibility** — Inherits Radix's accessibility foundations.
4. **AI-friendly** — Components are simple, well-documented, and widely used in LLM training data. Agents generate excellent shadcn/ui code.
5. **Ecosystem** — Large community, extensive component library, active development.
6. **cn() pattern** — Established the `cn()` utility pattern as ecosystem standard.

## Important Notes

- shadcn/ui is NOT an npm dependency — it's a code generation tool
- Components are added individually: `npx shadcn@latest add button`
- You can modify every line of every component
- 80%+ of projects benefit from shadcn/ui as starting point

## Status

⭐ Recommended — Strongly suggested but not mandatory. Teams can use raw Radix + Tailwind instead.
