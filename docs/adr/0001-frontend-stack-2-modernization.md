# ADR-027: Frontend Stack Blueprint 2.0 Modernization

- Status: Accepted
- Date: 2026-07-30

## Context

The 1.9 baseline combined current architectural guidance with obsolete runtime,
tool, and UI assumptions. Several upgrades are breaking: TypeScript 7 removes
legacy configuration paths, React Router 8 raises its Node/React baseline, Vite 8
changes its build engine, Prisma 7 changes generated-client architecture, and
new shadcn projects no longer default exclusively to Radix UI.

## Decision

Adopt the versions and compatibility rules in `stack.yaml` as the 2.0 baseline.
Use Node.js 24 LTS by default with Node.js 22.22 as the minimum. Promote Workers
Static Assets for new Cloudflare projects, Base UI for new shadcn projects, and
private-only production source maps. Preserve supported alternatives and provide
incremental migrations rather than forcing rewrites.

## Consequences

- Consumers need an explicit migration instead of a blind lockfile refresh.
- Node.js 20 and legacy TypeScript/Vite configurations are no longer compliant.
- Existing Radix UI and Cloudflare Pages projects remain valid.
- React Compiler, Biome, TanStack Store, Drizzle, and Temporal remain decisions
  gated by project evidence or ecosystem readiness, not scheduled replacements.

## Evidence

See `docs/research/2026-07-stack-refresh.md` for the primary-source research and
`docs/specs/2.0-modernization.md` for the implementation requirements.
