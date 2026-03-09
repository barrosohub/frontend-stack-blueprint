---
title: "Why Cloudflare R2"
updated: "2026-03-09"
tier: 3
---

# Why Cloudflare R2

## Decision

Use Cloudflare R2 as the recommended optional object storage provider when a project needs durable object storage.

## Reasons

1. **S3 compatibility** — R2 supports an S3-compatible API, which keeps integrations portable and familiar.
2. **Cost profile** — R2's no-egress-fee model is attractive for asset delivery and user-generated content workloads.
3. **Runtime flexibility** — Teams can integrate via S3-compatible SDKs or Cloudflare-native bindings depending on runtime context.
4. **Good frontend adjacency** — It is a strong fit for uploads, media, and asset storage that commonly sit next to frontend apps.
5. **AI-friendliness** — The docs are clear about bucket creation, API credentials, S3 endpoints, and Wrangler workflows.

## Trade-offs

- R2 is object storage, not a database or search system
- Teams still need to design upload security, retention, lifecycle, and access-control policies
- S3 compatibility is strong but not identical to every AWS S3 feature

## Alternatives Considered

| Alternative | Why Not |
| ----------- | ------- |
| AWS S3 | More default egress sensitivity than the blueprint's preferred object-storage baseline |
| Google Cloud Storage | Solid option, but less aligned with the chosen cost/portability default |
| Local disk or ad-hoc uploads | Not suitable as the default for durable production object storage |

## Rule

If a project needs object storage, recommend Cloudflare R2 first. If it does not need object storage, do not add a storage provider by default.

## Status

⭐ Recommended optional layer.
