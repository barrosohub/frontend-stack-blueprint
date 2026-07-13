---
title: "Electron Target"
version: "1.6.0"
updated: "2026-07-13"
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

| Technology       | Version | Install                           |
| ---------------- | ------- | --------------------------------- |
| Electron         | ≥33     | `pnpm add -D electron`            |
| Electron Forge   | latest  | `pnpm add -D @electron-forge/cli` |
| electron-updater | latest  | `pnpm add electron-updater`       |

## Project Structure

```
src/
  main/                  # Privileged Electron main process
    main.ts
    ipc/
    services/
  preload/               # Narrow, typed contextBridge surface
    index.ts
  utility/               # CPU-heavy, crash-prone, or isolated host work
  renderer/              # Unprivileged frontend (stack core applies here)
    features/
    shared/
    App.tsx
    main.tsx
```

## Required Process Boundary

- **Renderer:** Treat it as an untrusted browser. No Node.js globals, file-system
  APIs, shell access, secrets, database handles, or unrestricted IPC.
- **Preload:** Expose a narrow, typed API with `contextBridge`. Never expose
  `ipcRenderer` directly or accept arbitrary channel names.
- **Main:** Own window lifecycle, permissions, privileged APIs, and validation
  for every IPC request.
- **Utility process:** Prefer Electron `utilityProcess` for CPU-heavy,
  crash-prone, or separately isolated services instead of blocking the main
  process.

## Security Baseline

- Keep `contextIsolation: true`, `nodeIntegration: false`, and `sandbox: true`.
- Define a restrictive Content Security Policy; do not use `unsafe-eval` in
  production.
- Load local application content or explicitly allowlisted HTTPS origins only.
- Deny unexpected navigation, new windows, permission requests, and external
  protocols.
- Validate IPC sender, channel, payload, authorization, and return value.
- Expose one method per capability rather than a generic `send`/`invoke` bridge.
- Never pass filesystem paths, command strings, or URLs directly from renderer
  input to privileged APIs without normalization and allowlist checks.
- Keep Electron current within the supported release policy and review its
  security advisories before every release.

## Typed IPC Contract

Each privileged feature MUST define:

1. Request and response schemas validated with Zod at the process boundary.
2. Explicit error codes safe to return to the renderer.
3. Authorization and sender checks.
4. Cancellation, timeout, and disposal behavior.
5. Tests for malformed, oversized, stale, and unauthorized messages.

Do not share mutable service objects with the renderer. Return serializable
data-transfer objects only.

## Advanced Workbench Capabilities

For code editors, terminals, collaboration, diagrams, or PDF viewers, first
activate the corresponding optional layer in
[Advanced Capabilities](../stack/advanced-capabilities.md).

For terminal products:

- Run `@xterm/xterm` in the renderer.
- Run `node-pty` only in the main/utility process.
- Bridge create, input, resize, output, and dispose through narrow typed IPC.
- Validate native-module compatibility against the exact Electron ABI on every
  supported OS and architecture.

Local SQLite libraries such as `better-sqlite3` are not a blanket default.
They require an explicit persistence decision and native ABI/prebuild validation
for the chosen Electron release matrix.

## Packaging & Release

- Electron Forge handles platform packaging.
- Use `electron-updater` only with signed artifacts and a documented rollback
  strategy.
- Sign and notarize production builds where the platform supports it.
- Test install, update, rollback, deep links, protocol handlers, and uninstall on
  every supported OS.
- Keep source maps private and upload them to the configured error tracker.
- Exercise native dependencies in packaged builds; development success is not a
  sufficient release signal.

## Trade-offs

| Advantage                                   | Disadvantage          |
| ------------------------------------------- | --------------------- |
| Chromium = identical rendering everywhere   | 80–150 MB bundle      |
| Node.js access for file system, native APIs | 200–300 MB RAM idle   |
| Mature, battle-tested (10+ years)           | Slower startup (1–2s) |
| VS Code, Slack, Discord use it              | No mobile support     |

See [rationale/electron-vs-tauri.md](../rationale/electron-vs-tauri.md) for full analysis.

Official references:

- [Electron security checklist](https://www.electronjs.org/docs/latest/tutorial/security)
- [Electron process model](https://www.electronjs.org/docs/latest/tutorial/process-model)
