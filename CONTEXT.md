# Repository Context

## Current State

Frontend Stack Blueprint 2.0 is a documentation-and-contract repository, not an
application starter. `stack.yaml` and `agent-contract.json` are canonical machine
surfaces; generated blocks in agent entry points must remain synchronized.

## Active Decisions

- Node.js 24 LTS is the new-project default; Node.js 22.22 is the minimum.
- TypeScript 7, React 19.2, Vite 8, Vitest 4, pnpm 11, and ESLint 10 form the
  baseline toolchain.
- TanStack Router remains the default; React Router 8 is the alternative.
- Base UI is the default primitive base for new shadcn projects. Radix UI and
  React Aria are supported explicit alternatives.
- Zustand remains the client-state default. TanStack Store v1 will trigger a
  review rather than an automatic replacement.
- Workers Static Assets is the default for new Cloudflare frontend deployments;
  existing Cloudflare Pages projects remain supported.

## Constraints

- Keep human documentation, schemas, fixtures, generated entry points, and
  version markers synchronized.
- Do not expose production source maps publicly.
- Do not add backend, observability, UI, or managed-service capabilities unless
  project evidence activates them.
- Historical changelog entries retain the versions and language of their release.

## Verification

Run `pnpm check` from a clean frozen install. The command validates schemas,
generated entry points, fixtures, conformance scenarios, evals, versions,
terminology, banned lists, required files, and internal links.
