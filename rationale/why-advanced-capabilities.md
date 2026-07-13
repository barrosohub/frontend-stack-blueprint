---
title: "Why Capability-Gated Advanced Frontend Libraries"
version: "1.6.0"
updated: "2026-07-13"
tier: 3
---

# Why Capability-Gated Advanced Frontend Libraries

## Decision

Approve a set of specialized, optional defaults for Markdown, data tables,
charts, diagrams, code editing, terminal rendering, collaboration, and PDF
viewing. None of them become part of the mandatory base install.

## Why This Layer Exists

The core blueprint is intentionally small, but mature browser and desktop
products often grow into workbenches that render technical content, inspect
files, visualize data, edit structured text, or coordinate concurrent state.
Without an approved decision path, agents either invent custom solutions or
choose overlapping libraries inconsistently.

The capability gate preserves YAGNI while giving agents a production-oriented
default after the need is demonstrated.

## Selection Rationale

| Capability    | Selection                | Reason                                                                                |
| ------------- | ------------------------ | ------------------------------------------------------------------------------------- |
| Markdown      | react-markdown ecosystem | React-native rendering, extensible unified pipeline, documented sanitization boundary |
| Tables        | TanStack Table           | Headless, type-safe, React 19 compatible, fits existing TanStack choices              |
| Charts        | Recharts                 | React-composable standard charts with accessibility support                           |
| Diagrams      | Mermaid                  | Text-defined, versionable technical diagrams with strict/sandbox security modes       |
| Code editing  | CodeMirror 6             | Modular editor architecture and language packages without forcing an IDE-sized bundle |
| Terminal UI   | xterm.js + node-pty      | Clear renderer/PTY separation and established Electron integration pattern            |
| Collaboration | Yjs                      | Mature CRDT primitives, editor bindings, presence, and offline workflows              |
| PDF viewing   | PDF.js                   | Browser-standard PDF parsing/rendering maintained by Mozilla                          |

## Rejected Alternatives and Boundaries

- **Copying an entire dependency list:** package inventories reveal capability,
  not architectural intent or which feature owns each package.
- **Installing all approved packages:** violates YAGNI and increases attack,
  update, and bundle surfaces.
- **Using Shiki as an editor:** Shiki is read-only highlighting, not an editing
  engine.
- **Running PTYs in the renderer:** breaks Electron's privilege boundary.
- **Treating Yjs as general client/server state:** CRDT documents solve
  concurrent shared state, not routine UI state or HTTP caching.
- **Adding D3 as the default chart layer:** Recharts covers standard product
  charts with a smaller abstraction burden; custom visualization engines need a
  separate, evidence-backed decision.
- **Approving better-sqlite3 globally:** local SQLite can be valuable in Electron,
  but native ABI/prebuild compatibility must be evaluated against the exact
  Electron release matrix before approval.

## Security Consequences

- Markdown, Mermaid, PDFs, PTYs, and file inputs are explicit trust boundaries.
- Privileged desktop operations stay behind narrow, typed IPC contracts.
- Sanitization and sandbox policies become part of the feature definition.
- Native modules require OS/architecture release-matrix testing.

## Operational Consequences

- Advanced packages are lazy-loaded where practical.
- Each capability owns its disposal and resource limits.
- State ownership remains explicit across Query, Zustand, editors, Yjs, and
  privileged host processes.
- The blueprint can evolve individual capabilities without bloating the core.

## Evidence

- [react-markdown security guidance](https://github.com/remarkjs/react-markdown#security)
- [TanStack Table docs](https://tanstack.com/table/latest/docs/introduction)
- [Recharts docs](https://recharts.github.io/)
- [Mermaid security configuration](https://mermaid.js.org/config/usage.html)
- [CodeMirror system guide](https://codemirror.net/docs/guide/)
- [xterm.js](https://github.com/xtermjs/xterm.js)
- [node-pty Electron example](https://github.com/microsoft/node-pty/tree/main/examples/electron)
- [Yjs introduction](https://docs.yjs.dev/)
- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Electron security checklist](https://www.electronjs.org/docs/latest/tutorial/security)
