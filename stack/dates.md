---
title: "Dates & Time"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Dates & Time

## date-fns ≥4.1

| Attribute   | Value                                                     |
| ----------- | --------------------------------------------------------- |
| Role        | Date manipulation (lightweight, tree-shakable, immutable) |
| Min Version | ≥4.1                                                      |
| Status      | ✅ Core                                                   |
| Install     | `npm install date-fns`                                    |

## @date-fns/tz

| Attribute | Value                               |
| --------- | ----------------------------------- |
| Role      | Native timezone handling via TZDate |
| Status    | ✅ Core (when timezone needed)      |
| Install   | `npm install @date-fns/tz`          |

## Why date-fns

- **Tree-shakable** — import only what you use
- **Immutable** — never mutates the original Date object
- **No prototype pollution** — unlike Moment.js
- **v4 brought native timezone** via `@date-fns/tz`
- **Smallest bundle** for typical usage vs Luxon and Day.js

## Rules

- date-fns is the standard — no Moment.js, no Luxon, no Day.js
- Import functions individually: `import { format } from 'date-fns'`
- For timezones: use `TZDate` from `@date-fns/tz`
- For UTC-only: use `UTCDateMini` (239 bytes)

## Patterns

```typescript
import { format, addDays, isAfter } from "date-fns";

// Basic formatting
const formatted = format(new Date(), "yyyy-MM-dd");

// Date arithmetic
const nextWeek = addDays(new Date(), 7);

// Comparison
const isPast = isAfter(new Date(), deadline);
```

### Timezone Handling

```typescript
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

// Create a timezone-aware date
const nyDate = new TZDate(2026, 2, 28, 12, 0, "America/New_York");
const formatted = format(nyDate, "yyyy-MM-dd HH:mm zzz");
```

## Future: Temporal API

The TC39 Temporal API (Stage 3) will eventually replace date-fns for
native date handling. Currently tracked in the backlog — waiting for
cross-browser support (Safari). See [backlog/under-evaluation.md](../backlog/under-evaluation.md).
