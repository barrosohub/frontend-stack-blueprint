---
title: "Deprecated / Decided Against"
version: "1.1.0"
updated: "2026-02-28"
tier: 4
---

# Deprecated / Decided Against

Technologies that were evaluated and explicitly rejected from the stack.

| Technology            | Reason                                                | Use Instead           |
| --------------------- | ----------------------------------------------------- | --------------------- |
| **Redux**             | Excessive boilerplate, over-engineered for most apps  | Zustand + Query       |
| **MobX**              | Magic-heavy, harder to debug and reason about         | Zustand               |
| **styled-components** | Runtime JS overhead, conflicts with Tailwind approach | Tailwind CSS          |
| **Emotion**           | Same runtime overhead issues as styled-components     | Tailwind CSS          |
| **Jest**              | Slower, requires extra config for ESM/TypeScript      | Vitest                |
| **Moment.js**         | Deprecated by maintainers, mutable, not tree-shakable | date-fns              |
| **Day.js**            | date-fns tree-shakes better in most scenarios         | date-fns              |
| **Formik**            | More re-renders, larger bundle, less maintained       | React Hook Form + Zod |
| **Yup**               | Weaker TypeScript inference than Zod                  | Zod                   |

## Rules

- Technologies on this list are **banned** from new projects
- If an existing project uses them, see [guides/migration-paths.md](../guides/migration-paths.md)
- Agents MUST NOT suggest or install banned technologies
- Reversal requires RFC + MAJOR version bump
