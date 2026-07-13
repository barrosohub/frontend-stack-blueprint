---
title: "Production Reliability"
version: "1.8.0"
updated: "2026-07-13"
tier: 1
scope: "mandatory for user-facing production applications"
---

# Production Reliability

> A frontend is production-ready only when its behavior, accessibility,
> performance, security, compatibility, and recovery path are verifiable.
> Choosing the approved libraries is not sufficient.

## Reliability Profiles

| Profile                | Applies To                             | Required Evidence                                                                               |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **Core**               | Every project                          | Deterministic install, typecheck, lint, unit/integration tests, production build                |
| **Deployed UI**        | Browser, desktop, and PWA products     | Critical-path E2E, accessibility checks, explicit browser/runtime matrix, release identity      |
| **Networked UI**       | Products consuming APIs                | Typed API boundary, cancellation, error taxonomy, contract mocks, degraded-network tests        |
| **Production service** | Products operated for real users       | Performance budgets, telemetry/privacy policy, preview smoke test, rollout and rollback runbook |
| **Component platform** | Shared design systems and UI libraries | Isolated interaction, accessibility, and visual-regression coverage                             |

Do not install capability-specific tooling until the corresponding profile
applies. Once a profile applies, its evidence is part of the merge gate.

## Definition of Done

A production change MUST satisfy every applicable item:

1. `pnpm install --frozen-lockfile` succeeds in a clean environment.
2. `typecheck`, `lint`, unit/integration tests, and the production build pass.
3. Critical user journeys pass against the built artifact, not only the dev server.
4. New automated accessibility violations are blocked and the manual checklist is complete.
5. Performance stays within the project's documented budgets.
6. External data and environment configuration are validated at their boundaries.
7. The declared browser/runtime matrix is covered or an exception is documented.
8. Errors include a recovery state; async work can be cancelled or safely ignored.
9. The release is identifiable in telemetry and has an owner and rollback path.
10. Security and privacy checks appropriate to the change have passed.

The reference workflow and configs live in
[templates/github-actions-ci.md](../templates/github-actions-ci.md) and
[templates/playwright.config.md](../templates/playwright.config.md).

## CI Merge Gate

| Check            | Rule                                                                       |
| ---------------- | -------------------------------------------------------------------------- |
| Install          | Use the committed lockfile with `--frozen-lockfile`; never repair it in CI |
| Static           | Typecheck and lint run on the whole project, not only changed files        |
| Unit/integration | Vitest covers domain logic, hooks, components, and boundary behavior       |
| Build            | Produce the same artifact shape that will be deployed                      |
| E2E              | Exercise applicable critical journeys against that artifact                |
| Accessibility    | Run automated checks on representative pages and interactive states        |
| Security         | Review dependency changes and run configured code/secret scanning          |
| Artifacts        | Preserve useful reports and traces on failure without uploading secrets    |

Required checks MUST be protected by the repository branch policy. Husky is
fast local feedback; it is not a substitute for CI.

## End-to-End Testing

Use Playwright for user-facing applications.

### Minimum Journey Set

- Application boot and primary navigation
- Authentication and authorization transitions, when applicable
- The product's highest-value create/update/delete flow
- Validation, empty, loading, permission-denied, and recoverable-error states
- Deep links and page refresh on routed applications
- Keyboard-only completion of the primary journey
- Offline or degraded-network behavior when promised by the product

### Rules

- Prefer role, label, and visible-name locators; do not couple tests to CSS structure.
- Use deterministic fixtures. Do not depend on shared mutable production data.
- Set `forbidOnly` in CI and treat repeated flakiness as a defect.
- Retry only in CI and retain a trace on the first retry; retries must not hide a flaky test.
- Run Chromium, Firefox, and WebKit when the Browser target applies. Narrow the
  matrix only when another target defines a controlled engine.
- Keep the critical suite small enough to run on every pull request. Put broader
  compatibility and destructive scenarios in scheduled or pre-release suites.

## Accessibility Contract

The default conformance target is **WCAG 2.2 Level AA**.

- Use `@axe-core/playwright` on representative routes and component states.
- Block newly introduced automated violations; record any temporary exception
  with owner, rationale, affected criterion, and expiry date.
- Verify keyboard order, visible focus, focus restoration, dialogs, live regions,
  zoom/reflow, target size, reduced motion, and accessible authentication.
- Include manual screen-reader coverage for the primary journey before a major release.
- Do not claim WCAG conformance from automated tests alone.

## Performance Contract

Measure both field experience and repeatable laboratory regressions.

| Core Web Vital | Good threshold | Evaluation                                     |
| -------------- | -------------: | ---------------------------------------------- |
| LCP            |        ≤ 2.5 s | 75th percentile, mobile and desktop separately |
| INP            |       ≤ 200 ms | 75th percentile, mobile and desktop separately |
| CLS            |          ≤ 0.1 | 75th percentile, mobile and desktop separately |

Every production project MUST also document numeric, route-aware budgets for
initial JavaScript, total transfer size, images, fonts, and approved third-party
origins. Lab tooling detects regressions; field RUM determines whether users meet
the Core Web Vitals targets. A Lighthouse score alone is not an SLO.

See [templates/performance-budgets.md](../templates/performance-budgets.md).

## Visual and Component Reliability

- Use Playwright screenshots for a small set of stable, business-critical views.
- Activate Storybook when the project maintains a reusable component platform,
  complex state matrix, or design system; it is not a base dependency.
- When Storybook is activated, cover component interactions and accessibility in
  CI. Use Chromatic only when the project explicitly accepts the managed service.
- Review visual baseline changes intentionally; never auto-accept them in CI.

## Runtime Resilience

- Provide route/root error boundaries and a recoverable fallback.
- Model idle, loading, empty, success, stale, offline, and error states explicitly.
- Cancel obsolete requests and long-running work with `AbortSignal`.
- Retry only safe operations and preserve server idempotency semantics.
- Roll back optimistic updates when the server rejects the mutation.
- Avoid infinite spinners: every async state needs timeout, cancellation, or recovery.
- Test slow, offline, unauthorized, rate-limited, server-error, and malformed-data paths.

Network rules are defined in [api-boundaries.md](api-boundaries.md).

## Release and Recovery

Before production deployment:

1. Build once and test the resulting artifact.
2. Deploy a preview and run the critical smoke journey.
3. Associate source maps and telemetry with an immutable release identifier.
4. Define the rollout mode: immediate, staged, canary, or feature-flagged.
5. Document the rollback command/path, owner, verification step, and data caveats.
6. After deployment, verify availability, critical journey, errors, and field signals.

Feature flags are capability-gated operational controls. Remove stale flags after
rollout; they are not a permanent replacement for version control.

## Official References

- [Playwright CI](https://playwright.dev/docs/ci-intro)
- [Playwright accessibility testing](https://playwright.dev/docs/accessibility-testing)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [Storybook tests](https://storybook.js.org/docs/writing-tests)
