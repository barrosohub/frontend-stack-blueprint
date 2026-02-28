---
title: "Icons"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Icons

## Lucide (Default)

| Attribute | Value                               |
| --------- | ----------------------------------- |
| Role      | Icon library — clean, minimal style |
| Status    | ⭐ Default                          |
| Install   | `npm install lucide-react`          |
| Best for  | Professional apps, dashboards, SaaS |

### Usage

```typescript
import { Search, Settings, User, ChevronRight } from 'lucide-react';

function Sidebar(): JSX.Element {
  return (
    <nav>
      <Search size={20} />
      <Settings size={20} />
      <User size={20} />
    </nav>
  );
}
```

**Agent behavior:** If the developer doesn't specify an icon library,
use Lucide. It's the default for all projects.

---

## Phosphor (Alternative)

| Attribute | Value                                      |
| --------- | ------------------------------------------ |
| Role      | Flexible icon library — 6 weight variants  |
| Status    | ✅ Alternative                             |
| Install   | `npm install @phosphor-icons/react`        |
| Best for  | Design systems with weight variation needs |

### When to Use Instead of Lucide

- Project needs multiple icon weights (thin, light, regular, bold, fill, duotone)
- Design system requires weight consistency across icons
- Brand aesthetics favor Phosphor's style

---

## Tabler (Alternative)

| Attribute | Value                                         |
| --------- | --------------------------------------------- |
| Role      | Large icon catalog — 5400+ stroke-based icons |
| Status    | ✅ Alternative                                |
| Install   | `npm install @tabler/icons-react`             |
| Best for  | Projects needing maximum icon variety         |

### When to Use Instead of Lucide

- Project needs an icon that Lucide doesn't have
- Breadth of catalog is more important than minimalism

---

## Decision Flow for Agents

```
Developer specifies icon library?
  → YES: Use what they specified
  → NO: Use Lucide (default)

Need multiple icon weights?
  → YES: Suggest Phosphor
  → NO: Stay with Lucide

Lucide missing a specific icon?
  → Check Tabler catalog
  → Do NOT mix multiple icon libraries unless necessary
```

## Rules

- One icon library per project (prefer consistency)
- If mixing is unavoidable, document why in the project README
- Always use React components, not SVG strings
- Size prop for consistent sizing — don't use CSS width/height
