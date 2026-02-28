---
title: "Roadmap"
version: "1.1.0"
updated: "2026-02-28"
tier: 4
---

# Roadmap

## Current: v1.1.0 (2026-02-28)

The complete frontend stack blueprint is defined and documented.
Zustand is the primary client state manager. TanStack Store succession
plan is in place for when it reaches v1 GA.

## Planned

### v1.2.0 — Quality of Life

- [ ] Add E2E testing guidance (Playwright)
- [ ] Add accessibility testing patterns
- [ ] Add performance budgets template
- [ ] Expand migration paths (more legacy stack coverage)

### v1.3.0 — Extended Targets

- [ ] Mobile WebView target documentation
- [ ] React Native / Expo evaluation
- [ ] Capacitor evaluation

### v2.0.0 — Potential Major Changes

- [ ] TanStack Store replaces Zustand as primary state manager (when v1 GA ships)
- [ ] React Compiler becomes default (remove manual memo guidance)
- [ ] Biome replaces ESLint + Prettier (if plugin ecosystem matures)
- [ ] TanStack Start as framework option (when v1 stable)
- [ ] Temporal API replaces date-fns (when cross-browser ready)

## Principles for Evolution

1. **Conservative updates** — Don't chase trends. Wait for stability.
2. **Semantic versioning** — Breaking changes = MAJOR, new tech = MINOR, fixes = PATCH.
3. **Evidence-based** — Only add technology with proven production track record.
4. **One at a time** — Evaluate one candidate technology at a time.
