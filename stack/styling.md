---
title: "Styling & Animation"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Styling & Animation

## Tailwind CSS ≥4

| Attribute   | Value                                          |
| ----------- | ---------------------------------------------- |
| Role        | Utility-first CSS framework                    |
| Min Version | ≥4.0                                           |
| Status      | ✅ Core                                        |
| Install     | `npm install -D tailwindcss @tailwindcss/vite` |

### Rules

- Tailwind is the ONLY styling solution — no CSS-in-JS, ever
- No styled-components, no Emotion, no CSS modules for components
- Use Tailwind utility classes directly in JSX
- Always combine conditional classes with `cn()` (see below)

## clsx + tailwind-merge (cn() utility)

| Technology         | Role                                     | Install                      |
| ------------------ | ---------------------------------------- | ---------------------------- |
| **clsx**           | Conditional class concatenation          | `npm install clsx`           |
| **tailwind-merge** | Smart Tailwind class conflict resolution | `npm install tailwind-merge` |

### cn() Helper — Required in Every Project

Every project MUST have `src/shared/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### Usage

```typescript
// ✅ CORRECT — use cn() for conditional classes
<div className={cn(
  "rounded-lg border p-4",
  isActive && "border-blue-500 bg-blue-50",
  isDisabled && "opacity-50 cursor-not-allowed"
)} />

// ✅ CORRECT — cn() resolves conflicts automatically
<div className={cn("px-4 py-2", className)} />
// If className="px-8", result is "py-2 px-8" (px-4 removed)

// ❌ WRONG — template literal concatenation
<div className={`rounded-lg ${isActive ? 'bg-blue-50' : ''}`} />

// ❌ WRONG — string concatenation
<div className={"rounded-lg " + (isActive ? "bg-blue-50" : "")} />
```

This is the shadcn/ui ecosystem standard pattern. Agents MUST use `cn()`
whenever combining Tailwind classes conditionally.

---

## Motion (formerly Framer Motion)

| Attribute | Value                                   |
| --------- | --------------------------------------- |
| Role      | Declarative animations and gestures     |
| Status    | ✅ Core                                 |
| Package   | `motion` (successor to `framer-motion`) |
| Install   | `npm install motion`                    |

> **Migration note:** The official package was renamed from `framer-motion`
> to `motion`. New projects should use `motion` with imports from
> `motion/react`. See [motion.dev/docs/react-upgrade-guide](https://motion.dev/docs/react-upgrade-guide).

### When to Use

- Page transitions
- Component enter/exit animations
- Gesture-based interactions (drag, swipe)
- Layout animations
- Scroll-linked animations

### Pattern

```typescript
import { motion } from 'motion/react';

export function FadeIn({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

### Rules

- Use Motion for ALL animations — no raw CSS animations for
  complex interactions
- Simple hover/focus states → Tailwind transitions are fine
- Complex enter/exit, layout shifts, gestures → Motion
- Import from `motion/react`, NOT from `framer-motion`
