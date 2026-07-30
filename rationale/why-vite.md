---
title: "Why Vite"
updated: "2026-07-30"
tier: 3
---

# Why Vite

## Decision

Vite ≥8 as the build tool for all projects.

## Reasons

1. **Instant dev server** — Native ESM means no bundling during development. Hot Module Replacement is near-instant even in large projects.
2. **Optimized production builds** — Rolldown-based output and Oxc transforms provide an integrated Rust-powered toolchain.
3. **First-class TypeScript** — Zero configuration needed for TypeScript support.
4. **Plugin ecosystem** — Official plugins for React, Tailwind CSS, PWA, and hundreds of community plugins.
5. **Universal adoption** — De facto standard for new React projects. Vite templates are the recommended starting point.
6. **Vitest integration** — Sharing config between build and test tools reduces complexity.

## Alternatives Considered

| Alternative | Why Not                                                                      |
| ----------- | ---------------------------------------------------------------------------- |
| Webpack     | Slower, more complex configuration                                           |
| Turbopack   | Still maturing, Vercel-focused                                               |
| Rspack      | Strong alternative, but Vite offers the selected plugin and test integration |
| esbuild     | Builder only, no dev server ecosystem                                        |

## Status

✅ Core — Standard build tool for the ecosystem.
