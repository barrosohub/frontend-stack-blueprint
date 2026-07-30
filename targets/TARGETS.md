---
title: "Deployment Targets — Overview"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
---

# Deployment Targets

## Concept

The stack (defined in `stack/`) is the **core**. It works standalone for
any browser project. When the project requires a specific runtime,
hosting, or packaging, attach a **deployment target**.

## Agent Instructions

```
1. ALWAYS start with the stack core
2. ONLY consult targets/ if the project requires it
3. Project doesn't specify where it runs → use the Browser target and document support policy
4. Every target inherits the applicable Production Reliability profile
5. New project needs Cloudflare frontend hosting → use Workers Static Assets
6. Existing Pages project MAY stay on Pages; do not force a migration without a runtime benefit
7. Project explicitly requests Vercel or Cloudflare is not a fit → use Vercel
8. Project asks for desktop/mobile/PWA → consult relevant target
9. Ambiguous context → ASK the developer. NEVER guess.
```

## Available Targets

| Target                               | When to Use                                                    | Adds                                                      |
| ------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------- |
| **Browser** (default)                | Every web project                                              | + Baseline policy, browser matrix, preview/smoke/rollback |
| **Cloudflare Workers Static Assets** | New Cloudflare frontend projects                               | + Static assets, optional Worker runtime, Wrangler        |
| **Cloudflare Pages**                 | Existing Pages projects or explicit Git-integrated static flow | + Pages hosting, Wrangler CLI                             |
| **Vercel**                           | Cloud frontend hosting, explicit preference or Pages mismatch  | + Vercel platform, optional Vercel CLI                    |
| **Electron**                         | Desktop, JS-only team, max compat                              | + Electron ≥33, Forge, electron-updater                   |
| **Tauri**                            | Desktop lightweight, minimal bundle, Rust                      | + Tauri ≥2.10, Rust, Tauri plugins                        |
| **PWA**                              | Web with offline capability                                    | + vite-plugin-pwa                                         |

## Quick Comparison: Cloudflare Workers vs Pages vs Vercel

| Dimension        | Workers Static Assets                                       | Cloudflare Pages                        | Vercel                     |
| ---------------- | ----------------------------------------------------------- | --------------------------------------- | -------------------------- |
| Blueprint status | Default for new Cloudflare projects                         | Supported for existing/static Git flows | Alternative cloud target   |
| Optional runtime | Worker in the same deployment                               | Pages Functions                         | Vercel Functions           |
| CLI path         | Wrangler                                                    | Wrangler                                | Vercel CLI                 |
| Best fit         | Static assets with a current, extensible Cloudflare runtime | Existing Pages projects                 | Explicit Vercel preference |

For a new Cloudflare-hosted frontend, use Workers Static Assets. Keep an existing
Pages project on Pages unless the team needs Worker-specific capabilities or has
approved a migration. Neither target implies D1, KV, or R2.

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

- [Browser](browser.md)
- [Cloudflare Workers Static Assets](cloudflare-workers-static-assets.md)
- [Cloudflare Pages](cloudflare-pages.md)
- [Vercel](vercel.md)
- [Electron](electron.md)
- [Tauri](tauri.md)
- [PWA](pwa.md)
