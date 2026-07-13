---
title: "DESIGN.md Design Contract"
version: "1.7.0"
updated: "2026-07-13"
tier: 1
---

# DESIGN.md Design Contract

`DESIGN.md` is the provisional, project-level contract for visual identity.
It combines machine-readable design tokens in YAML frontmatter with
human-readable rationale and guardrails in Markdown.

The format comes from Google Labs' Stitch project and remains at specification
version `alpha`. It is therefore **optional and provisional**, not a core
dependency of every project.

## Activation Gate

Create a root `DESIGN.md` when at least one condition is true:

- the product has a defined brand or visual identity;
- several screens or contributors must remain visually consistent;
- coding or design agents will generate or modify UI;
- design tokens must move between Tailwind, Figma, Stitch, or DTCG tooling.

Do not create one merely to satisfy the blueprint. A small utility with no
agreed visual direction may defer it until product intent exists.

## Responsibilities and Sources of Truth

| Artifact                    | Responsibility                                                             |
| --------------------------- | -------------------------------------------------------------------------- |
| `stack.yaml`                | Technology and architecture decisions for the blueprint                    |
| Root `DESIGN.md`            | Product-specific visual intent, source token values, and design guardrails |
| `src/app/design-tokens.css` | Generated Tailwind 4 representation; never hand-edit                       |
| Tailwind CSS                | Runtime styling implementation                                             |
| Radix UI / shadcn/ui        | Accessible component structure and behavior                                |
| `AGENTS.md` or equivalent   | Engineering and repository rules                                           |

`DESIGN.md` does not replace Tailwind, component documentation, accessibility
requirements, or engineering instructions.

## Precedence

When guidance conflicts, use this order:

1. Explicit user requirements, security requirements, and accessibility rules
2. Machine-readable tokens in `DESIGN.md`
3. `DESIGN.md` prose and do/don't guardrails
4. Existing product components and established patterns
5. Agent-generated defaults

Within `DESIGN.md`, tokens are normative values and prose explains how they
should be applied. Agents must report contradictions rather than silently
choosing a new visual direction.

## File Rules

- The active contract MUST be named `DESIGN.md` at the project root.
- Start from [the blueprint template](../templates/DESIGN.example.md), but
  never ship the template unchanged.
- Use the canonical section order: Overview, Colors, Typography, Layout,
  Elevation & Depth, Shapes, Components, Do's and Don'ts.
- Preserve unknown sections and extension tokens. The alpha specification is
  intentionally extensible.
- Use concrete visual references and product-specific rationale instead of
  vague adjectives such as "modern" or "premium" by themselves.
- Document negative constraints. State what agents must not invent.
- Update `DESIGN.md` first when an intentional token or design rule changes.

## Tooling

Pin the alpha CLI exactly so validation does not change unexpectedly:

```bash
pnpm add -D @google/design.md@0.3.0
```

Use the cross-platform `designmd` binary in package scripts:

```json
{
  "scripts": {
    "design:lint": "designmd lint DESIGN.md",
    "design:tokens": "designmd export --format css-tailwind DESIGN.md > src/app/design-tokens.css",
    "design:check": "pnpm design:lint && pnpm design:tokens && git diff --exit-code -- src/app/design-tokens.css"
  }
}
```

The export command does not replace linting. Run `design:lint` before export,
and commit the generated CSS when the project commits build artifacts of this
kind.

The alpha exporter covers the token groups and properties it supports; it does
not turn prose, component guidance, or every custom extension into runtime CSS.
If the application needs an unsupported token, extend a tested generation step
instead of introducing an independently maintained handwritten copy. Review the
generated diff whenever the CLI version changes.

## Tailwind 4 Integration

The generated `src/app/design-tokens.css` contains a Tailwind 4 `@theme` block.
Load it from the application stylesheet:

```css
@import "tailwindcss";
@import "./design-tokens.css";
```

The data flow is one-way:

```text
DESIGN.md -> validate -> export -> design-tokens.css -> Tailwind utilities
```

Never maintain the same token independently in `DESIGN.md`, a handwritten
`@theme` block, and component classes.

## Agent Rules

When a root `DESIGN.md` exists, agents MUST:

1. Read it before creating, restyling, or reviewing UI.
2. Reuse its tokens and component guidance instead of inventing values.
3. Preserve its prose, extensions, and unknown sections during edits.
4. Make intentional visual changes in `DESIGN.md` before regenerating tokens.
5. Run `design:lint` and the token drift check before handoff.
6. Keep WCAG and product accessibility requirements authoritative even if the
   current contract is incomplete.

## CI Gate

Projects that activate the contract SHOULD run:

```bash
pnpm design:check
```

Treat linter errors and generated-token drift as blocking. Review warnings in
context because the alpha linter reports some advisory findings without a
non-zero exit code.

## Stability Policy

- Current verified CLI: `@google/design.md` `0.3.0` on 2026-07-13.
- Current format version: `alpha`.
- Do not use `latest` in CI or package scripts while the format is alpha.
- Re-evaluate the schema, exporter, and migration impact before every CLI bump.
- Promotion from provisional to recommended requires a stable specification or
  sufficient compatibility evidence across releases.

## Official Sources

- [Google announcement](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)
- [DESIGN.md specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
- [CLI and interoperability](https://github.com/google-labs-code/design.md)
