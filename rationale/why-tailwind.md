---
title: "Why Tailwind CSS"
updated: "2026-02-28"
tier: 3
---

# Why Tailwind CSS

## Decision

Tailwind CSS ≥4 as the sole styling solution. No CSS-in-JS.

## Reasons

1. **Utility-first** — Compose styles directly in markup. No context-switching between files.
2. **No runtime cost** — All CSS generated at build time. Zero JavaScript overhead.
3. **Design consistency** — Built-in design tokens (spacing, colors, typography) enforce consistency.
4. **AI-compatible** — LLMs generate excellent Tailwind code. Training data is abundant.
5. **v4 improvements** — CSS-first config, automatic content detection, faster builds.
6. **Ecosystem** — shadcn/ui, cn() pattern, community plugins.

## Alternatives Considered

| Alternative       | Why Not                                              |
| ----------------- | ---------------------------------------------------- |
| styled-components | Runtime JS overhead, conflicts with utility approach |
| Emotion           | Same runtime overhead as styled-components           |
| CSS Modules       | Extra files, no design tokens, more boilerplate      |
| Vanilla CSS       | No design system, inconsistent without discipline    |

## Status

✅ Core — CSS-in-JS libraries are explicitly banned.
