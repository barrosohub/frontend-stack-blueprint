# Architecture Decision Records

This document summarizes the major technology decisions made for the
Frontend Stack Blueprint. Each decision has a detailed rationale in
the `rationale/` directory.

## Active Decisions

| #       | Decision                               | Date       | Rationale                                                                    |
| ------- | -------------------------------------- | ---------- | ---------------------------------------------------------------------------- |
| ADR-001 | React as UI framework                  | 2026-02-28 | [why-react.md](rationale/why-react.md)                                       |
| ADR-002 | Vite as build tool                     | 2026-02-28 | [why-vite.md](rationale/why-vite.md)                                         |
| ADR-003 | Vitest as test runner                  | 2026-02-28 | [why-vitest.md](rationale/why-vitest.md)                                     |
| ADR-004 | Zustand + TanStack Query for state     | 2026-02-28 | [why-tanstack.md](rationale/why-tanstack.md)                                 |
| ADR-005 | TanStack Router as default router      | 2026-02-28 | [why-tanstack-router.md](rationale/why-tanstack-router.md)                   |
| ADR-006 | Radix UI for headless components       | 2026-02-28 | [why-radix.md](rationale/why-radix.md)                                       |
| ADR-007 | shadcn/ui as recommended pre-styled UI | 2026-02-28 | [why-shadcn-ui.md](rationale/why-shadcn-ui.md)                               |
| ADR-008 | Tailwind CSS for styling               | 2026-02-28 | [why-tailwind.md](rationale/why-tailwind.md)                                 |
| ADR-009 | React Hook Form + Zod for forms        | 2026-02-28 | [why-rhf-zod.md](rationale/why-rhf-zod.md)                                   |
| ADR-010 | date-fns for date manipulation         | 2026-02-28 | [why-date-fns.md](rationale/why-date-fns.md)                                 |
| ADR-011 | Lexical over ProseMirror (primary)     | 2026-02-28 | [why-lexical-over-prosemirror.md](rationale/why-lexical-over-prosemirror.md) |
| ADR-012 | Electron vs Tauri comparison           | 2026-02-28 | [electron-vs-tauri.md](rationale/electron-vs-tauri.md)                       |

## Principles

- Detailed rationale files live in `rationale/`
- New decisions follow the same format
- Changes to decisions require a MINOR or MAJOR version bump
