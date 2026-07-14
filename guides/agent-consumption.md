---
title: "Agent-Native Consumption"
version: "1.9.0"
updated: "2026-07-13"
tier: 2
---

# Agent-Native Consumption

This repository is a contextual specification, not application boilerplate. Its
agent-native layer makes interpretation reproducible without turning the blueprint
into a project generator.

## Contract Layers

1. `stack.yaml` is the version and technology source of truth and validates against
   `schemas/stack.schema.json`.
2. `agent-contract.json` contains the compact execution and safety rules shared by
   all agent entry points.
3. `profiles/*.json` declares evidence expected from different project shapes.
4. A consuming repository records selected profiles and temporary waivers in
   `blueprint.config.json`.
5. `scripts/check-project-conformance.mjs` compares the selected profiles with
   repository evidence and returns Markdown or JSON.
6. `evals/scenarios.json` measures whether an agent selects profiles and checks
   conservatively.

## Apply to a Repository

Copy and customize the example configuration:

```sh
cp <blueprint>/blueprint.config.example.json <project>/blueprint.config.json
```

Select only profiles supported by product requirements or repository evidence.
`core` is inherited automatically. Then run:

```sh
node <blueprint>/scripts/check-project-conformance.mjs \
  --project <project> --format markdown
```

For automation, use `--format json`. Exit code `0` means all error-severity
requirements pass or have an active waiver; `1` means conformance failed; `2`
means the checker could not run.

The checker validates the consuming `blueprint.config.json` against its JSON
Schema before honoring profiles or waivers. File evidence must be a non-empty
regular file; individual requirements may also declare content sentinels or an
exact match count when presence alone would be ambiguous.

## Waivers

Waivers are temporary controls, not deletion of requirements. Each waiver must name
the exact requirement ID and include a reason, accountable owner, and ISO date.
Expired waivers fail again automatically. Never include credentials, tokens, user
data, or other secrets in a waiver or report.

## Agent Workflow

Use [`skills/apply-frontend-blueprint/SKILL.md`](../skills/apply-frontend-blueprint/SKILL.md)
when the client can load repository skills. Otherwise give the agent
`agent-contract.json`, the selected profiles, and this guide. In both cases the
agent must inspect first, present Impact Preflight, preserve project-local rules,
apply only authorized changes, and rerun both project checks and conformance.

Generated sections in the seven agent entry points are owned by
`agent-contract.json`. Update the contract and run `pnpm generate:agents`; do not
edit those blocks by hand.

## Evaluate an Agent

Run `pnpm eval:self-test` to verify the scorer. Supply real agent selections with
`pnpm eval -- --results <file>` as documented in [`evals/README.md`](../evals/README.md).
Golden scenarios are regression tests for the blueprint's interpretation, not a
substitute for testing code produced by the agent.
