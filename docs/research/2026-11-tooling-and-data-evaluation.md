---
title: "Tooling and Data Evaluation Protocol"
version: "2.0.0"
updated: "2026-11-10"
tier: 3
---

# Tooling and Data Evaluation Protocol

## Decision and scope

The candidates below are **under evaluation**, not approved dependencies or
defaults. Keep TypeScript, pnpm, Vite, Vitest, ESLint, Prettier, TanStack
Query, Zustand, and the existing reliability gates. Do not automatically
install candidates in consuming projects or change hosting as a result of this
document. This record provides a reproducible evaluation plan; it reports no
blueprint benchmark or production trial.

Sources were consulted on 2026-11-10. Candidate state on that date, as stated by
the cited official sources:

| Candidate        | State on 2026-11-10                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| tsrs             | Experimental (no stable release number published); aims for 100% conformance with TypeScript 7.1                            |
| Oxlint and Oxfmt | Oxfmt 0.73 (pre-1.0); Oxlint version not stated in the cited sources; tsrs-powered type-aware linting announced as upcoming |
| Vite+            | 1.2                                                                                                                         |
| fate             | Version not stated in the cited sources; record it when the evaluation starts                                               |
| Void             | 1.5; SDK, CLI and self-hostable platform open source                                                                        |

The blueprint pins `typescript` 7.0.2 in `stack.yaml`. Re-check every version
against its official source when an evaluation starts; do not reuse this table
as current state.

## Sequence and dependencies

[ROADMAP](../../backlog/ROADMAP.md) principle 4 limits the blueprint to one
promotion decision at a time. The candidates overlap, so evaluate them in this
order instead of as independent tracks:

1. **tsrs** — evaluate in isolation first. It has no dependency on the other
   candidates, and Oxlint's type-aware rules are expected to build on it.
2. **Oxlint and Oxfmt** — compare together with the existing **Biome** entry,
   since both target the same "replace ESLint + Prettier" decision. Record one
   lint/format decision covering both alternatives.
3. **Vite+** — evaluate only after the Oxlint and Oxfmt result is recorded,
   because Vite+ bundles Oxlint, Oxfmt and tsgolint; its lint and format
   behavior cannot be judged before that baseline exists.
4. **fate** and **Void** — evaluate only when a consuming project presents a
   concrete use case (normalized server-state needs beyond TanStack Query, or a
   full-stack requirement). Without one, they stay in watching status.

Earlier results feed later steps; a later evaluation must not reach a promotion
decision that depends on an unfinished earlier one.

## Candidate questions and promotion gates

| Candidate        | Intended benefit                                 | Evidence required before promotion                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tsrs             | Faster TypeScript checking and reduced memory    | Diagnostic parity against the project's pinned TypeScript version and the TypeScript version tsrs targets; project references, strict flags, declaration files, supported OS/architectures, and editor behavior. Official documentation marks it experimental. |
| Oxlint and Oxfmt | Faster linting and formatting                    | Inventory every enabled ESLint, TypeScript, React, accessibility, import, and project-specific rule; test parity, plugins, fix behavior, file formats, editor and CI integration; review formatting churn.                                                     |
| Vite+            | Unified toolchain and command experience         | Test coexistence with pnpm, existing Vite plugins, lockfile, scripts, CI, debugging, deployment targets, reproducibility, upgrades and exit path. Verify which type checker and checks actually run.                                                           |
| fate             | Composed data requirements and normalized cache  | Exercise existing REST/OpenAPI contracts and any server adapters needed; test identity, cache consistency, pagination, invalidation, optimistic updates, errors, permissions, offline behavior, integration cost and observability.                            |
| Void             | Vite-based full-stack development and deployment | Demonstrate a concrete full-stack requirement; evaluate server boundaries, SSR, runtime compatibility, provider-specific integrations, hosting portability, security, rollback, operations and migration away.                                                 |

For all candidates assess maintenance, licensing, security, release stability,
accessibility impact, documentation quality, agent reliability, team learning,
and operational cost. Compare with the existing solution and document a
decision with evidence. A benchmark alone cannot authorize a default change.

## Reproducible experiment

1. Select at least one representative small project and one larger project or
   fixture, including existing TS/TSX, strict settings, tests, a realistic
   dependency graph, and the applicable browser and deployment targets. Keep
   real data and secrets out of fixtures and reports.
2. Record source revision, pinned versions, OS, CPU, RAM, Node and pnpm versions,
   configuration, lockfile, commands, worker counts and environment. Compare
   equivalent coverage and settings; separate installation and cache setup.
3. Measure cold and warm installation where relevant, clean and incremental
   typecheck, lint, format check, unit tests, build, and representative agent
   feedback loops. Record elapsed time and peak memory. Run repeated trials,
   report sample count, median and spread, and identify cache state and hardware.
4. Compare diagnostics, exit codes and coverage, including intentionally invalid
   samples. Investigate missing or extra findings and categorize version or
   configuration differences. For formatters, inspect the diff and idempotence.
5. Run the existing full CI gate and any applicable E2E, accessibility, API,
   security and production-build checks. Include migration, rollback and
   dependency-removal costs. Record limitations and unresolved differences.
6. Document the evidence and decision in this research record, and the revisit
   trigger in the Revisit trigger column of the
   [evaluation backlog](../../backlog/under-evaluation.md). A default change
   requires the repository's normal decision, versioning, migration,
   machine-contract and agent-entry-point workflow.

For tsrs specifically, run it as an additional, non-authoritative check during
evaluation. On 2026-11-10 tsrs targets TypeScript 7.1 while the blueprint pins
`typescript` 7.0.2. Compare tsrs diagnostics against both the pinned `tsc` and a
`tsc` of the TypeScript version tsrs targets; attribute differences that also
appear between the two `tsc` versions to the version gap (step 4), not to tsrs.
Retain the existing TypeScript check as the merge gate until parity and the
normal approval process justify a change. Vendor benchmarks are
directional, not a substitute for these measurements.

For fate, compare the same UI and API scenarios with TanStack Query. Measure
network requests and transferred bytes as well as implementation complexity;
test that updates to shared entities, permissions and list membership remain
correct. GraphQL is not a prerequisite in the product's design, but compatibility
with a specific existing REST backend must be proven, including any server-side
integration or adapter required.

## Agent feedback-loop evaluation

Using the same set of tasks, prompts, repository snapshot, agent settings and
validation commands, compare task completion, correctness, total elapsed time,
number of tool calls, recovery from errors and human intervention. Include
co-located feature changes and changes spanning shared boundaries. Repeat across
multiple tasks and runs; label any model-dependent result and do not generalize
from a single demonstration. Never trade away the authoritative quality gates
for faster feedback.

## Sources

All sources consulted on 2026-11-10.

- [Oxc: tsrs type checker](https://oxc.rs/docs/guide/usage/typechecker.html)
- [VoidZero: Tales from the Void, October 2026 Recap (2026-11-05)](https://voidzero.dev/posts/whats-new-oct-2026)
- [Vite+: check](https://viteplus.dev/guide/check)
- [fate: design rationale](https://fate.technology/guide/why-fate)
- [Void: framework and platform](https://void.cloud/guide/)
- [Vite: features](https://vite.dev/guide/features)
