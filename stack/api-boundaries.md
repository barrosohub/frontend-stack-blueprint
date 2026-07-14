---
title: "API & Network Boundaries"
version: "1.9.0"
updated: "2026-07-13"
tier: 1
scope: "mandatory when the product consumes network APIs"
---

# API & Network Boundaries

> TypeScript types disappear at runtime. All network data is untrusted until it
> passes runtime validation.

## Default

Use the platform `fetch` API behind a small project-owned boundary. Do not add
Axios or another request client unless a concrete requirement cannot be met by
`fetch`, `AbortSignal`, and the approved stack.

The boundary owns transport concerns only:

- base URL and public client identification
- request/response serialization
- timeout and cancellation
- normalized transport errors
- runtime response validation
- safe observability metadata

TanStack Query owns server-state caching, deduplication, invalidation, mutation
lifecycle, and UI-facing retry policy. Do not duplicate those responsibilities
inside the request client.

See [templates/api-client.md](../templates/api-client.md).

## Runtime Contracts

- Validate every external response with Zod before it reaches domain code.
- Validate requests at the trusted server boundary as well; client validation is UX,
  not security.
- Generate types/clients from OpenAPI only when the upstream specification is canonical,
  versioned, and checked for drift. Generated TypeScript alone does not validate runtime data.
- Keep transport DTOs separate from domain models when normalization is required.
- Never silently coerce malformed success payloads into empty domain values.

## Error Taxonomy

Expose a discriminated error kind so UI and telemetry can distinguish:

| Kind        | Meaning                                        | Typical UI action                  |
| ----------- | ---------------------------------------------- | ---------------------------------- |
| `cancelled` | Work became obsolete or user navigated away    | No error toast                     |
| `timeout`   | Request exceeded the declared deadline         | Retry or continue offline          |
| `network`   | No valid HTTP response                         | Connectivity guidance              |
| `http`      | Server returned a non-success status           | Status/domain-specific recovery    |
| `decode`    | Response did not match its runtime schema      | Safe fallback and defect telemetry |
| `domain`    | Valid response represents a business rejection | Explain the actionable rule        |

Do not log credentials, authorization headers, raw bodies, or user-provided text by default.

## Cancellation and Lifecycle

- Every request accepts an `AbortSignal`.
- Apply a documented timeout; no request may wait forever.
- Cancel obsolete searches, route loaders, and superseded mutations where safe.
- Treat cancellation as expected control flow, not a user-visible failure.
- Prevent stale responses from overwriting newer state.

## Retry Policy

- Retry only idempotent operations by default.
- Use bounded exponential backoff with jitter and honor `Retry-After`.
- Do not retry authentication/authorization failures, validation failures, or most 4xx responses.
- Mutations require an explicit idempotency contract before automatic retry.
- Bound retries by attempt count and total elapsed time.
- Keep retry ownership in one layer, normally TanStack Query.

## Contract Mocking with MSW

Activate MSW when the product consumes HTTP or GraphQL APIs. Reuse handlers in
Vitest integration tests, isolated component development, and deterministic browser tests.

Handlers MUST cover relevant variants:

- representative success and empty payloads
- slow response and cancellation
- unauthenticated and unauthorized responses
- not found, conflict, rate limit, and server failure
- malformed success payload for runtime-validation coverage

Mocks document expected behavior but do not prove server compatibility. Add provider/consumer
contract checks or staging smoke tests when independent API releases make drift likely.

## Official References

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)
- [Mock Service Worker](https://mswjs.io/docs/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
