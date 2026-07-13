---
title: "Advanced Capabilities (optional)"
version: "1.6.0"
updated: "2026-07-13"
tier: 1
scope: "optional-capability-gated"
---

# Advanced Capabilities (optional)

> Mature frontends often need specialized surfaces beyond the core stack.
> This layer defines approved defaults for those capabilities without making
> them baseline dependencies for every project.

## Activation Gate

Agents MUST add packages from this file only when the requested product
actually needs the corresponding capability. Package presence in another
large application is evidence worth evaluating, not a reason to copy its
entire dependency graph.

Before installation:

1. Identify the user-facing capability.
2. Confirm that the core stack or a browser API does not already solve it.
3. Select only the smallest package set for that capability.
4. Define security, accessibility, performance, and test boundaries.
5. Run Impact Preflight and document any native/runtime constraints.

## Capability Matrix

| Capability            | Approved default                | Add only when                                                               |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------- |
| Markdown              | `react-markdown` + `remark-gfm` | Rendering user- or system-produced Markdown                                 |
| Markdown sanitization | `rehype-sanitize`               | Plugins, custom elements, or untrusted Markdown are involved                |
| Data tables           | `@tanstack/react-table`         | Sorting, filtering, selection, pagination, or virtualization is needed      |
| Business charts       | `recharts`                      | Numeric comparisons or trends materially improve comprehension              |
| Technical diagrams    | `mermaid`                       | Text-defined flow, sequence, state, ER, or architecture diagrams are needed |
| Code editor           | CodeMirror 6 (`@codemirror/*`)  | Users need to edit code or structured text interactively                    |
| Terminal UI           | `@xterm/xterm`                  | A product exposes a real terminal session                                   |
| PTY host              | `node-pty`                      | A trusted desktop/server runtime must back an xterm session                 |
| Collaboration         | `yjs`                           | Concurrent/offline-first shared state is an explicit requirement            |
| PDF viewing           | `pdfjs-dist`                    | The product must parse and render PDFs in-app                               |

## Markdown & Technical Content

Install the baseline only when Markdown rendering is required:

```bash
pnpm add react-markdown remark-gfm rehype-sanitize
```

Rules:

- Keep raw HTML disabled by default.
- Treat custom URL transforms, plugins, and components as code-execution or
  XSS review boundaries.
- Use `rehype-sanitize` after any plugin that can introduce HTML nodes.
- Maintain an explicit allowlist for links, images, embeds, and custom tags.
- Render code blocks with Shiki; do not introduce a second syntax highlighter.
- Test malicious URLs, inline HTML, oversized input, and malformed Markdown.

## Tables & Charts

### TanStack Table

Use `@tanstack/react-table` for interactive data tables. It is headless, so
Radix/shadcn and Tailwind remain responsible for markup and styling.

Rules:

- Keep remote data, pagination, and filtering in TanStack Query.
- Keep shareable table state in the URL when practical.
- Use stable column and data references.
- Virtualize only after measuring a real rendering bottleneck.
- Preserve semantic table markup and full keyboard navigation.

### Recharts

Use Recharts for standard React dashboards and business visualizations.

Rules:

- Include a title, units, legends, and an accessible textual summary.
- Never communicate status by color alone.
- Validate empty, loading, error, negative, null, and extreme-value states.
- Prefer a table when exact values matter more than visual pattern recognition.
- Escalate to a custom visualization library only when Recharts cannot express
  a documented requirement.

## Mermaid Diagrams

Use Mermaid when a diagram is naturally represented as text and benefits from
being version-controlled.

Rules:

- Use `securityLevel: "strict"` for trusted application content.
- Use `securityLevel: "sandbox"` for untrusted or externally supplied diagrams.
- Disable interactive links and callbacks for untrusted diagrams.
- Render asynchronously and isolate parse failures from the rest of the page.
- Provide the source or a textual alternative for accessibility.

## Code Editing

Use CodeMirror 6 for interactive code or structured-text editing. Continue to
use Shiki for read-only highlighted output.

```bash
pnpm add @codemirror/state @codemirror/view @codemirror/commands @codemirror/language
```

Rules:

- Install language packages only for languages the product supports.
- Load heavy language extensions lazily.
- Dispose `EditorView` instances and subscriptions on unmount.
- Keep document state outside React render loops; bridge only the state the UI
  needs.
- Test IME composition, screen-reader labels, keyboard-only use, large files,
  undo/redo, and malformed input.

## Terminal Surfaces

`@xterm/xterm` is the renderer-side terminal emulator. It does not start a
shell. A real session requires a separately authorized PTY host such as
`node-pty` in a trusted Electron main/utility process or backend service.

Rules:

- NEVER expose `node-pty`, `child_process`, arbitrary command execution, or
  unrestricted IPC directly to a browser/Electron renderer.
- Use typed, narrow messages for create, input, resize, output, and dispose.
- Validate working directories, environment variables, dimensions, and session
  identifiers at the privileged boundary.
- Enforce lifecycle cleanup, output backpressure, resource ceilings, and audit
  events.
- Treat native-module compatibility with the chosen Electron/Node ABI as a
  release gate on every supported OS and architecture.

See [Electron Target](../targets/electron.md) for the process and security model.

## Collaborative State

Use Yjs only when concurrent or offline-first collaboration is a product
requirement. Yjs complements rather than replaces Zustand, TanStack Query, or
the chosen editor.

Rules:

- Choose and document the transport/provider separately.
- Treat awareness/presence as ephemeral; do not persist it as document state.
- Define authorization, document identity, retention, schema evolution, and
  reconnect behavior before shipping.
- Persist and compact updates deliberately; test offline edits and conflict-free
  reconciliation.
- Bind Yjs to Lexical, ProseMirror, or CodeMirror through a maintained adapter;
  do not hand-roll a CRDT bridge without a concrete need.

## PDF Viewing

Use `pdfjs-dist` when an in-app PDF viewer is required.

Rules:

- Run parsing/rendering through the PDF.js worker path.
- Set file-size, page-count, memory, and time limits.
- Revoke object URLs and dispose document/worker resources.
- Keep downloads explicit and validate remote URLs against an allowlist.
- Test password-protected, malformed, very large, and textless/scanned PDFs.

## State Boundaries

| State                               | Owner                            |
| ----------------------------------- | -------------------------------- |
| Remote records and cache            | TanStack Query                   |
| Local UI preferences                | Zustand                          |
| Table filters encoded in navigation | Router/URL                       |
| Editor document model               | Editor instance / feature domain |
| Collaborative document              | Yjs document                     |
| Terminal process/session            | Trusted host process             |

Do not mirror the same source of truth across these systems. Expose derived,
serializable projections to React components instead.

## Official References

- [react-markdown security guidance](https://github.com/remarkjs/react-markdown#security)
- [TanStack Table introduction](https://tanstack.com/table/latest/docs/introduction)
- [Recharts documentation](https://recharts.github.io/)
- [Mermaid security configuration](https://mermaid.js.org/config/usage.html)
- [CodeMirror documentation](https://codemirror.net/docs/)
- [xterm.js](https://github.com/xtermjs/xterm.js)
- [node-pty Electron example](https://github.com/microsoft/node-pty/tree/main/examples/electron)
- [Yjs documentation](https://docs.yjs.dev/)
- [PDF.js documentation](https://mozilla.github.io/pdf.js/)
