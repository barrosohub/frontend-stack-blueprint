---
title: "Template: cn() Utility"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# cn() Utility — clsx + tailwind-merge

## Install

```bash
npm install clsx tailwind-merge
```

## Implementation

Create `src/shared/utils/cn.ts`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

## Why This Pattern

1. **clsx** — Handles conditional class concatenation cleanly
2. **tailwind-merge** — Resolves Tailwind class conflicts intelligently
3. **Combined** — The standard pattern used by shadcn/ui and the Tailwind ecosystem

## Usage Examples

```typescript
import { cn } from '@/shared/utils/cn';

// Conditional classes
<div className={cn(
  "rounded-lg border p-4",
  isActive && "border-blue-500 bg-blue-50",
  isDisabled && "opacity-50 cursor-not-allowed",
)} />

// Component with className prop (conflict resolution)
interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
}

function Button({ className, variant = 'primary' }: ButtonProps): JSX.Element {
  return (
    <button className={cn(
      "px-4 py-2 rounded-md font-medium",
      variant === 'primary' && "bg-blue-600 text-white",
      variant === 'secondary' && "bg-gray-200 text-gray-800",
      className, // Consumer overrides win
    )} />
  );
}

// Conflict resolution in action:
<Button className="px-8" />
// Result: "py-2 rounded-md font-medium bg-blue-600 text-white px-8"
// Note: px-4 was replaced by px-8 automatically ✅
```

## Rules

- ALWAYS use `cn()` for conditional Tailwind classes
- NEVER use template literals for class concatenation
- NEVER use manual string concatenation
- The `cn()` file is **required** in every project
