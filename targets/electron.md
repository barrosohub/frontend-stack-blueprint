---
title: "Electron Target"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
target: "electron"
---

# Electron Target

> Desktop applications with full Chromium engine and Node.js backend.

## When to Use

- Team is JavaScript/TypeScript only (no Rust experience)
- Pixel-perfect cross-platform UI consistency is critical
- Project needs deep Node.js/native module integration
- Mature ecosystem with extensive community resources needed

## Stack Addition

| Technology       | Version | Install                              |
| ---------------- | ------- | ------------------------------------ |
| Electron         | ≥33     | `npm install -D electron`            |
| Electron Forge   | latest  | `npm install -D @electron-forge/cli` |
| electron-updater | latest  | `npm install electron-updater`       |

## Project Structure

```
src/
  main/                  # Electron main process
    main.ts
    preload.ts
  renderer/              # Frontend (stack core applies here)
    features/
    shared/
    App.tsx
    main.tsx
```

## Key Considerations

- **Main vs Renderer:** Keep the frontend (renderer) identical to a browser
  project. The stack core applies fully to the renderer process.
- **IPC Communication:** Use contextBridge + ipcRenderer for main ↔ renderer communication
- **Security:** Enable contextIsolation, disable nodeIntegration in renderer
- **Auto-updates:** Use electron-updater for production distribution
- **Packaging:** Electron Forge handles builds for Windows, macOS, Linux

## Trade-offs

| Advantage                                   | Disadvantage          |
| ------------------------------------------- | --------------------- |
| Chromium = identical rendering everywhere   | 80–150 MB bundle      |
| Node.js access for file system, native APIs | 200–300 MB RAM idle   |
| Mature, battle-tested (10+ years)           | Slower startup (1–2s) |
| VS Code, Slack, Discord use it              | No mobile support     |

See [rationale/electron-vs-tauri.md](../rationale/electron-vs-tauri.md) for full analysis.
