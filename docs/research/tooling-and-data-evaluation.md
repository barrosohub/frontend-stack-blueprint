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

## Candidate questions and promotion gates

| Candidate        | Intended benefit                                 | Evidence required before promotion                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tsrs             | Faster TypeScript checking and reduced memory    | Diagnostic parity against the project's pinned TypeScript version; project references, strict flags, declaration files, supported OS/architectures, and editor behavior. Official documentation marks it experimental.              |
| Oxlint and Oxfmt | Faster linting and formatting                    | Inventory every enabled ESLint, TypeScript, React, accessibility, import, and project-specific rule; test parity, plugins, fix behavior, file formats, editor and CI integration; review formatting churn.                          |
| Vite+            | Unified toolchain and command experience         | Test coexistence with pnpm, existing Vite plugins, lockfile, scripts, CI, debugging, deployment targets, reproducibility, upgrades and exit path. Verify which type checker and checks actually run.                                |
| fate             | Composed data requirements and normalized cache  | Exercise existing REST/OpenAPI contracts and any server adapters needed; test identity, cache consistency, pagination, invalidation, optimistic updates, errors, permissions, offline behavior, integration cost and observability. |
| Void             | Vite-based full-stack development and deployment | Demonstrate a concrete full-stack requirement; evaluate server boundaries, SSR, runtime compatibility, provider-specific integrations, hosting portability, security, rollback, operations and migration away.                      |

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
6. Document the evidence, decision and revisit trigger in the evaluation
   backlog. A default change requires the repository's normal decision,
   versioning, migration, machine-contract and agent-entry-point workflow.

For tsrs specifically, run it as an additional, non-authoritative check during
evaluation. Retain the existing TypeScript check as the merge gate until parity
and the normal approval process justify a change. Vendor benchmarks are
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

- [Oxc: tsrs type checker](https://oxc.rs/docs/guide/usage/typechecker.html)
- [VoidZero: tsrs and tooling update](https://voidzero.dev/posts/whats-new-oct-2026)
- [Vite+: check](https://viteplus.dev/guide/check)
- [fate: design rationale](https://fate.technology/guide/why-fate)
- [Void: framework and platform](https://void.cloud/guide/)
- [Vite: features](https://vite.dev/guide/features)
