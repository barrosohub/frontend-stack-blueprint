---
title: "Observability"
version: "1.9.0"
updated: "2026-07-13"
tier: 1
---

# Observability

## Sentry

| Attribute | Value                                                               |
| --------- | ------------------------------------------------------------------- |
| Role      | Error tracking and crash reporting                                  |
| Status    | ⭐ Recommended when a production application needs error operations |
| Install   | `pnpm add @sentry/react`                                            |

### When to Use

- Runtime error capture and alerting
- Performance monitoring (Core Web Vitals)
- Session replay for debugging
- Release tracking

### Setup

```typescript
import * as Sentry from "@sentry/react";

import { env } from "@/config/env";

Sentry.init({
  dsn: env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
  release: env.VITE_APP_RELEASE,
});
```

---

## OpenTelemetry

| Attribute | Value                                                      |
| --------- | ---------------------------------------------------------- |
| Role      | Distributed tracing and metrics                            |
| Status    | ⭐ Capability-gated                                        |
| Install   | `pnpm add @opentelemetry/api @opentelemetry/sdk-trace-web` |

### When to Use

- End-to-end request tracing (frontend → backend)
- Performance metrics collection
- Custom instrumentation
- Vendor-neutral observability
- A backend or collector can preserve cross-service trace context

### Rules

- Use OpenTelemetry for vendor-neutral tracing when distributed correlation is required
- Do not add it only to duplicate telemetry already owned by another approved provider
- Custom spans for critical user flows
- Apply sampling and attribute allowlists before export

---

## Statsig

| Attribute | Value                              |
| --------- | ---------------------------------- |
| Role      | Feature flags and experimentation  |
| Status    | ⭐ Capability-gated                |
| Install   | `pnpm add @statsig/react-bindings` |

### When to Use

- Feature flags (gradual rollouts)
- A/B testing and experimentation
- Dynamic configuration
- User segmentation

### Pattern

```typescript
import { useGateValue, useExperiment } from '@statsig/react-bindings';

function FeatureComponent(): JSX.Element | null {
  const showNewUI = useGateValue('new_dashboard_ui');
  const experiment = useExperiment('onboarding_flow');
  const variant = experiment.get('variant', 'control');

  if (!showNewUI) return null;

  return <NewDashboard variant={variant} />;
}
```

## Observability Strategy

| Capability          | Default       | Activate When                                                             |
| ------------------- | ------------- | ------------------------------------------------------------------------- |
| Errors & crashes    | Sentry        | A deployed application needs alerting, diagnosis, and release correlation |
| Distributed tracing | OpenTelemetry | Frontend spans must correlate with backend/edge services                  |
| Feature flags       | Statsig       | The product needs staged rollout, experiments, or dynamic configuration   |

These tools may complement one another, but **none is installed merely because a
project was initialized**. Apply YAGNI and activate only the capability the product
will operate.

## Operational Contract

Every activated telemetry tool MUST define:

- immutable release identifier and deployment environment
- owner, alert thresholds, escalation path, and dashboard/runbook link
- sampling strategy and cost ceiling
- allowed attributes and explicit PII/secrets denylist
- retention, region, access, and deletion policy
- behavior when consent is absent or the provider is unavailable

Session replay is separately opt-in. It requires masking, low sampling, product/legal
approval, and verification that user text, credentials, and sensitive screens cannot
be captured.

Core Web Vitals field collection follows [Production Reliability](reliability.md).
Security and privacy requirements live in [Frontend Security](security.md).
