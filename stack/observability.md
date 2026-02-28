---
title: "Observability"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Observability

## Sentry

| Attribute | Value                              |
| --------- | ---------------------------------- |
| Role      | Error tracking and crash reporting |
| Status    | ✅ Core                            |
| Install   | `npm install @sentry/react`        |

### When to Use

- Runtime error capture and alerting
- Performance monitoring (Core Web Vitals)
- Session replay for debugging
- Release tracking

### Setup

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
});
```

---

## OpenTelemetry

| Attribute | Value                                                         |
| --------- | ------------------------------------------------------------- |
| Role      | Distributed tracing and metrics                               |
| Status    | ✅ Core                                                       |
| Install   | `npm install @opentelemetry/api @opentelemetry/sdk-trace-web` |

### When to Use

- End-to-end request tracing (frontend → backend)
- Performance metrics collection
- Custom instrumentation
- Vendor-neutral observability

### Rules

- Use OpenTelemetry for tracing, Sentry for error tracking
- They complement each other — not alternatives
- Custom spans for critical user flows

---

## Statsig

| Attribute | Value                                 |
| --------- | ------------------------------------- |
| Role      | Feature flags and experimentation     |
| Status    | ✅ Core                               |
| Install   | `npm install @statsig/react-bindings` |

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

| Concern           | Tool          | Purpose               |
| ----------------- | ------------- | --------------------- |
| Errors & Crashes  | Sentry        | Capture, alert, debug |
| Tracing & Metrics | OpenTelemetry | E2E performance       |
| Feature Flags     | Statsig       | Controlled rollouts   |

All three are complementary. Set up all three on project init.
