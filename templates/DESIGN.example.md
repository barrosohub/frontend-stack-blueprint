---
version: alpha
name: Replace With Product Design System
description: Starter contract; replace the visual direction and tokens before implementation.
colors:
  primary: "#1D4ED8"
  on-primary: "#FFFFFF"
  secondary: "#E2E8F0"
  surface: "#FFFFFF"
  on-surface: "#0F172A"
  error: "#B91C1C"
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.25
rounded:
  sm: 0.25rem
  md: 0.5rem
  lg: 0.75rem
  full: 9999px
spacing:
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 0.75rem
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: 0.75rem
  surface-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 1rem
  validation-error:
    textColor: "{colors.error}"
    typography: "{typography.label-md}"
---

# Replace With Product Design System

> Template only. Replace this direction with a concrete, product-specific
> visual reference before implementing UI.

## Overview

Describe a specific visual world, target audience, product personality, and
desired emotional response. Avoid relying only on generic adjectives such as
"clean", "modern", or "premium".

## Colors

Explain the role and scarcity of each palette. State where the primary color
may appear, how surfaces establish hierarchy, and which combinations are
forbidden. Update the starter values in the frontmatter before use.

## Typography

Define the voice, hierarchy, reading density, and roles for each typography
token. Confirm font availability and provide an intentional fallback strategy.

## Layout

Describe the responsive grid, content width, density, spacing rhythm, and
containment strategy. Explain how the layout changes at narrow viewports.

## Elevation & Depth

State whether hierarchy uses borders, tonal layers, shadows, or another method.
Avoid mixing several depth systems without a product reason.

## Shapes

Explain the corner, border, and silhouette language. Use the rounded token scale
consistently across interactive elements and containers.

## Components

Document visual behavior for the product's most important primitives and their
states. Radix UI and shadcn/ui remain responsible for accessible structure and
interaction behavior.

## Do's and Don'ts

- Do replace every placeholder narrative with product-specific intent.
- Do keep normal text contrast at WCAG AA or better.
- Do use tokens before introducing one-off visual values.
- Don't ship this starter palette or typography without product approval.
- Don't invent gradients, glass effects, shadows, or motion without guidance.
- Don't hand-edit generated `src/app/design-tokens.css`.

## Accessibility

Accessibility requirements override aesthetic preferences. Preserve visible
focus, usable target sizes, reduced-motion behavior, semantic structure, and
contrast in every component state.

## Motion

Define duration, easing, and reduced-motion behavior only when motion is part of
the product identity. Otherwise prefer restrained state transitions.
