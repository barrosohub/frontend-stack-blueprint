# ADR-025: Production Reliability as a Verifiable Contract

- **Status:** Accepted
- **Date:** 2026-07-13
- **Decision type:** Architecture and delivery policy

## Context

The blueprint selected a strong implementation stack but left production readiness
implicit. A project could follow every library recommendation while still shipping
without critical-path E2E, accessibility evidence, performance budgets, typed runtime
configuration, dependency gates, an explicit browser policy, or a rollback path.

Local pre-commit hooks also carried too much authority. They provide fast feedback,
but they do not prove a clean lockfile install, a production build, browser behavior,
or repository security policy.

Finally, the previous observability guidance required Sentry, OpenTelemetry, and
Statsig on every project. That contradicted YAGNI and created unnecessary cost,
privacy, and operational surface.

## Decision

Adopt **Production Reliability** as a profile-based contract:

1. Every project has deterministic install and a protected CI gate.
2. Deployed user-facing applications use Playwright for critical journeys and
   automated accessibility checks against the production artifact.
3. WCAG 2.2 Level AA is the default accessibility target, with manual evaluation.
4. Production services define route budgets and field Core Web Vitals targets.
5. Browser projects default to Baseline Widely Available and document exceptions.
6. Networked products use a typed fetch boundary, cancellation, Zod validation,
   error taxonomy, bounded retry, and MSW scenarios.
7. Production releases define preview smoke, immutable identity, rollout, and rollback.
8. Sentry, OpenTelemetry, Statsig, Storybook, and other operational tools remain
   capability-gated.

## Why These Defaults

- **Playwright:** one runner covers major browser engines, actionability, traces,
  accessibility integration, and production-artifact journeys.
- **WCAG 2.2 AA:** current testable W3C target, including focus, target size,
  dragging alternatives, and accessible authentication improvements.
- **Core Web Vitals:** shared user-centered field vocabulary for loading,
  responsiveness, and visual stability.
- **Baseline:** replaces ambiguous “modern browsers” with an evidence-backed
  platform availability policy while allowing product analytics to override it.
- **Platform fetch + Zod:** keeps the transport dependency surface small while
  preserving runtime trust boundaries.
- **MSW:** models transport behavior at the network boundary across Node.js and browser tests.

## Alternatives Considered

### Keep quality guidance limited to Vitest and Husky

Rejected. It cannot validate navigation, browser integration, accessibility states,
production assets, deployment behavior, or recovery flows.

### Make every reliability tool mandatory on every repository

Rejected. Libraries, static sites, desktop targets, and networked applications have
different evidence needs. Profiles retain rigor without blanket dependencies.

### Require Storybook and a managed visual-regression service

Rejected as a universal default. They are valuable for component platforms but add
maintenance and service coupling to small products. Storybook and Chromatic remain
explicit capabilities.

### Keep all three observability providers as core

Rejected. Telemetry without an owner, response process, privacy policy, and budget is
instrumentation debt. Tools activate only with an operational capability.

## Consequences

### Positive

- “Production-ready” becomes reviewable and machine-verifiable.
- Browser, accessibility, performance, and degraded-network failures move earlier.
- Supply-chain and public-configuration risks become explicit.
- Release failures have a documented recovery path.
- Projects avoid unnecessary observability and component-platform dependencies.

### Costs

- CI time and browser installation increase for deployed applications.
- Teams must maintain deterministic fixtures, browser policy, budgets, and runbooks.
- Accessibility and performance still require human judgment and field data.
- Capability profiles require deliberate activation instead of blind scaffolding.

## Official Evidence

- [Playwright CI](https://playwright.dev/docs/ci-intro)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Baseline Widely Available](https://web-platform-dx.github.io/web-features-explorer/widely-available/)
- [Vite environment variables](https://vite.dev/guide/env-and-mode)
- [GitHub supply-chain security](https://docs.github.com/code-security/supply-chain-security/understanding-your-software-supply-chain/about-supply-chain-security)
- [Mock Service Worker](https://mswjs.io/docs/)
