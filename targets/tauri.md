---
title: "Tauri Target"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
target: "tauri"
---

# Tauri Target

> Lightweight desktop (and mobile) applications using native WebView and Rust backend.

## When to Use

- Minimal bundle size is a priority (3–10 MB vs 80–150 MB)
- Low memory footprint matters
- Team has or is willing to learn Rust basics
- Future mobile support is desired (Tauri v2 supports iOS/Android)
- Security-first approach preferred (restrictive by default)

## Stack Addition

| Technology    | Version   | Notes                              |
| ------------- | --------- | ---------------------------------- |
| Tauri         | ≥2.10     | Core framework                     |
| Rust          | stable    | Required for Tauri backend (cargo) |
| Tauri plugins | as needed | File system, shell, dialog, etc.   |

## Prerequisites

- Rust toolchain (`rustup` + `cargo`)
- Platform-specific build tools:
  - **macOS:** Xcode Command Line Tools
  - **Windows:** Visual Studio Build Tools + WebView2
  - **Linux:** `webkit2gtk` + `libappindicator`

## Project Structure

```
src/                     # Frontend (stack core applies here)
  features/
  shared/
  App.tsx
  main.tsx
src-tauri/               # Tauri/Rust backend
  src/
    main.rs              # Entry point
    lib.rs               # Commands
  tauri.conf.json        # Tauri config
  Cargo.toml
```

## Key Considerations

- **Frontend is standard:** The `src/` directory is a normal Vite + React
  project. Stack core applies fully.
- **Tauri commands:** Backend logic in Rust, invoked from frontend via
  `invoke('command_name', { args })`
- **Security model:** Restrictive by default — explicitly allowlist APIs
  in `tauri.conf.json`
- **Plugin ecosystem:** Plugins for file system, shell, clipboard,
  notifications, deep links, auto-updater
- **Mobile:** Tauri v2 supports iOS and Android targets

## Trade-offs

| Advantage           | Disadvantage                     |
| ------------------- | -------------------------------- |
| 3–10 MB bundle      | Rust learning curve              |
| 30–40 MB RAM        | WebView rendering may vary       |
| <500ms startup      | Smaller ecosystem than Electron  |
| Mobile support (v2) | Debugging cross-platform nuances |
| Security-first      | Less mature (stable since 2024)  |

See [rationale/electron-vs-tauri.md](../rationale/electron-vs-tauri.md) for full analysis.
