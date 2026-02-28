---
title: "Why date-fns"
updated: "2026-02-28"
tier: 3
---

# Why date-fns

## Decision

date-fns ≥4.1 for all date manipulation. @date-fns/tz for timezones.

## Reasons

1. **Tree-shakable** — Import only functions you use. Smallest final bundle.
2. **Immutable** — Never mutates Date objects. Predictable behavior.
3. **No prototype pollution** — Unlike Moment.js, doesn't modify `Date.prototype`.
4. **Native timezone (v4)** — `@date-fns/tz` provides `TZDate` for timezone-aware operations. No separate library needed.
5. **Functional API** — Pure functions, easy to compose and test.

## Alternatives Considered

| Alternative | Why Not                                       |
| ----------- | --------------------------------------------- |
| Moment.js   | Deprecated, mutable, not tree-shakable        |
| Luxon       | Larger bundle for typical use cases           |
| Day.js      | date-fns tree-shakes better in most scenarios |

## Future

Temporal API (TC39 Stage 3) will replace date-fns when cross-browser
support is complete (tracking Safari). See backlog.

## Status

✅ Core — Moment.js is explicitly banned.
