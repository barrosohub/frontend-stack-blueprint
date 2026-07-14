# ADR-026: Agent-Native Contracts for Blueprint Consumption

- **Status:** Accepted
- **Date:** 2026-07-13
- **Decision type:** Agent interoperability and governance

## Context

The blueprint had strong narrative guidance and seven agent entry points, but each
consumer still had to infer project shape, applicable requirements, and proof of
completion. That creates three failure modes: optional capabilities become blanket
dependencies, repeated instructions drift across tools, and agents report success
without verifiable repository evidence.

The repository is intentionally a guide rather than executable application
boilerplate. Agent friendliness therefore needs portable contracts and checks, not
a generator that owns a consuming project's architecture.

## Decision

Adopt an agent-native consumption layer:

1. Validate `stack.yaml` with JSON Schema.
2. Define composable, machine-readable project profiles with explicit activation.
3. Publish `agent-contract.json` as the canonical compact execution contract.
4. Generate a bounded contract block in every agent entry point.
5. Provide the `apply-frontend-blueprint` consumer skill.
6. Record consumer selections and expiring waivers in `blueprint.config.json`.
7. Produce deterministic conformance reports from repository evidence.
8. Maintain golden scenarios that score profile, capability, safety, and check
   selection.

`core` always applies. Every other profile and dependency remains capability-gated.
Project-local user instructions retain precedence; conflicts are surfaced rather
than silently overwritten.

## Alternatives Considered

### Keep prose-only entry points

Rejected. Prose is valuable for judgment but cannot independently prove structural
validity, entry-point parity, profile selection, or implementation evidence.

### Publish a full starter template

Rejected. A template would contradict the repository's contextual purpose, age
quickly, and force capabilities that many projects do not need.

### Install every approved library and tool

Rejected. The catalog spans browser, desktop, PWA, data, design-system, and
operational concerns. Blanket installation violates YAGNI and increases security,
maintenance, and agent reasoning surface.

### Make conformance a remote hosted service

Rejected for the baseline. A local, dependency-light checker is inspectable,
portable, and usable in private repositories without uploading source or metadata.

## Consequences

### Positive

- Agents receive a deterministic path from context to profiles, plan, changes, and
  verification.
- Optional capabilities stay explicit and reviewable.
- Seven entry points share a generated source instead of copy-pasted policy.
- Consumers can audit adoption incrementally with owned, expiring exceptions.
- Golden scenarios make interpretation regressions visible.

### Costs

- Schemas, profiles, fixtures, generators, and evals become maintained interfaces.
- File-presence conformance is evidence, not semantic proof; project tests and human
  review remain necessary.
- Consumers must select profiles deliberately and maintain their configuration.
- Changes to machine contracts require compatibility care in future releases.
