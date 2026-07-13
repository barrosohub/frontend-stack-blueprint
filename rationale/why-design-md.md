---
title: "Why DESIGN.md"
version: "1.7.0"
updated: "2026-07-13"
tier: 3
---

# Why DESIGN.md

## Status

Accepted as a **provisional, optional convention** in ADR-024. The format and
CLI remain alpha and are not part of the base dependency set.

## Context

The blueprint defines how frontend projects are engineered, but it previously
had no portable contract for product-specific visual intent. Tailwind tokens
capture values, and component libraries capture implementation, yet neither
explains why a product should feel a certain way or which visual choices agents
must not invent.

AI-assisted UI work makes that gap visible: separate agents may produce valid
React and Tailwind while drifting in palette, density, typography, elevation,
and component treatment.

## Decision

Projects with an established visual direction may place a `DESIGN.md` at the
repository root. It becomes the source of truth for design intent and source
token values. Tailwind 4 tokens are generated from it, while Radix UI and
shadcn/ui continue to provide accessible component foundations.

The blueprint ships an example template and pins `@google/design.md` to `0.3.0`
when the convention is activated.

## Why It Fits

1. **Agent-readable:** prose carries rationale and negative constraints.
2. **Machine-readable:** YAML frontmatter provides exact design token values.
3. **Portable:** the CLI exports Tailwind 4 CSS and DTCG-compatible tokens.
4. **Reviewable:** visual intent and token changes live in normal Git history.
5. **Stack-compatible:** it complements Tailwind and shadcn/ui instead of
   replacing them.
6. **Optional:** projects without a defined visual identity incur no dependency
   or process cost.

## Alternatives Considered

| Alternative                | Why it is insufficient alone                                                           |
| -------------------------- | -------------------------------------------------------------------------------------- |
| Tailwind `@theme` only     | Stores executable values but not product rationale or negative constraints             |
| `tokens.json` only         | Portable tokens without human-readable visual intent                                   |
| Storybook only             | Excellent for implemented components, but not a compact agent-facing identity contract |
| Figma variables only       | Useful for design tooling, but not always available to repository-local agents         |
| Extra rules in `AGENTS.md` | Mixes engineering instructions with product-specific visual identity                   |
| Unstructured design notes  | Harder to validate, export, and consume consistently                                   |

## Why Provisional

The official specification declares `version: alpha`, and the current CLI is
pre-1.0. Component tokens and extension behavior are still evolving. Making it
mandatory would violate the blueprint's stability standard and could force
migrations on projects that do not need the convention.

The risk is bounded by:

- exact CLI version pinning;
- opt-in activation;
- a committed human-readable contract that remains useful without the CLI;
- generated-token drift checks;
- explicit re-evaluation before upgrades.

## Why This Repository Does Not Use a Root DESIGN.md

The Frontend Stack Blueprint is a generic technology specification rather than
a product with one visual identity. A root `DESIGN.md` here would imply that
consumer applications should inherit an arbitrary brand. The example therefore
lives under `templates/` and becomes active only after a consuming project
copies and customizes it at its own root.

If the blueprint later gains a branded documentation site, that site may adopt
its own root contract without changing the generic stack recommendation.

## Consequences

### Positive

- Agents receive durable, project-local design context.
- Token values can flow into Tailwind 4 without parallel hand-maintained themes.
- Design changes become explicit, diffable, and reviewable.
- Accessibility checks are incorporated into the authoring workflow.

### Tradeoffs

- Alpha schema and CLI changes require active version management.
- Teams must keep the narrative intentional rather than treating the file as a
  token dump.
- The exporter does not encode prose, component guidance, or every extension;
  projects may need a tested generation adapter for unsupported runtime tokens.
- Generated CSS adds a drift surface unless CI verifies it.
- The linter does not replace complete accessibility or visual regression tests.

## Promotion Gate

Promote the convention from provisional to recommended only after the format
reaches a stable specification or demonstrates acceptable compatibility across
multiple releases, including Tailwind 4 export and migration guidance.

## Official Sources

- [Google Labs announcement](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)
- [Format specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
- [CLI documentation and releases](https://github.com/google-labs-code/design.md)
