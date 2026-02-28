---
title: "Electron vs Tauri"
updated: "2026-02-28"
tier: 3
---

# Electron vs Tauri

## Comparison Matrix

| Dimension             | Electron          | Tauri v2                 |
| --------------------- | ----------------- | ------------------------ |
| Bundle size           | 80–150 MB         | 3–10 MB                  |
| RAM idle              | 200–300 MB        | 30–40 MB                 |
| Startup               | 1–2 sec           | <500 ms                  |
| Backend               | Node.js           | Rust                     |
| UI engine             | Chromium bundled  | Native WebView           |
| Rendering consistency | Pixel-perfect     | May vary per OS          |
| Mobile support        | ❌                | ✅ (iOS, Android)        |
| Security default      | Permissive        | Restrictive              |
| Maturity              | 10+ years         | Stable since 2024        |
| Learning curve        | Easy (JS/TS only) | Moderate (Rust required) |
| Native module access  | Full via Node.js  | Via Tauri plugins/Rust   |

## Choose Electron When

- Team is 100% JavaScript/TypeScript (no Rust)
- Pixel-perfect rendering across OS is critical
- Deep Node.js or native module integration needed
- Mature ecosystem and community support prioritized

## Choose Tauri When

- Bundle size and RAM footprint are priorities
- Team has or wants to learn Rust
- Future mobile deployment is planned
- Security-first approach is preferred
- Fast startup time matters

## Agent Behavior

If the project needs desktop but hasn't specified a target:

1. Present this comparison to the developer
2. **ASK** which target to use
3. NEVER guess — the trade-offs are significant

## Status

Both are approved deployment targets. Neither is default — the developer must choose.
