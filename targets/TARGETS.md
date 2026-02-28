---
title: "Deployment Targets — Overview"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# Deployment Targets

## Concept

The stack (defined in `stack/`) is the **core**. It works standalone for
any browser project. When the project requires a specific runtime or
packaging, attach a **deployment target**.

## Agent Instructions

```
1. ALWAYS start with the stack core
2. ONLY consult targets/ if the project requires it
3. Project doesn't specify where it runs → browser by default
4. Project asks for desktop/mobile/PWA → consult relevant target
5. Ambiguous context → ASK the developer. NEVER guess.
```

## Available Targets

| Target                | When to Use                               | Adds                                    |
| --------------------- | ----------------------------------------- | --------------------------------------- |
| **Browser** (default) | Every web project                         | Nothing — stack core is sufficient      |
| **Electron**          | Desktop, JS-only team, max compat         | + Electron ≥33, Forge, electron-updater |
| **Tauri**             | Desktop lightweight, minimal bundle, Rust | + Tauri ≥2.10, Rust, Tauri plugins      |
| **PWA**               | Web with offline capability               | + vite-plugin-pwa                       |

## Quick Comparison: Electron vs Tauri

| Dimension   | Electron           | Tauri v2            |
| ----------- | ------------------ | ------------------- |
| Bundle size | 80–150 MB          | 3–10 MB             |
| RAM idle    | 200–300 MB         | 30–40 MB            |
| Startup     | 1–2 sec            | <500 ms             |
| Backend     | Node.js            | Rust                |
| UI engine   | Chromium bundled   | Native WebView      |
| Consistency | Pixel-perfect      | May vary            |
| Mobile      | ❌                 | ✅                  |
| Security    | Permissive default | Restrictive default |
| Maturity    | 10+ years          | Stable since 2024   |

If desktop is required but target not specified → agent MUST present
this comparison and **ask the developer**.

## Details

- [Electron](electron.md)
- [Tauri](tauri.md)
- [PWA](pwa.md)
