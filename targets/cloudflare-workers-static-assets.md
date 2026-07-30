---
title: "Cloudflare Workers Static Assets Target"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
target: "cloudflare-workers-static-assets"
---

# Cloudflare Workers Static Assets Target

> Default target for new frontend projects deployed to Cloudflare.

## When to Use

- A new project needs Cloudflare-hosted static assets
- The frontend may later need a Worker request handler, routing, or bindings
- One deployment should own both static assets and optional edge behavior

## Stack Addition

| Technology            | Status                                 | Usage                                       |
| --------------------- | -------------------------------------- | ------------------------------------------- |
| Workers Static Assets | ⭐ Default for new Cloudflare projects | Serve Vite `dist/` assets                   |
| Wrangler              | Required deployment CLI                | Build, preview, deploy, and manage bindings |

## Baseline Configuration

Create `wrangler.jsonc`:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-frontend",
  "compatibility_date": "2026-07-30",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application",
  },
}
```

Use `pnpm build`, then `pnpm exec wrangler deploy`. Pin Wrangler in the
project's development dependencies; do not depend on an unpinned global install.

## Rules

- A static-only project does not need a Worker entry point
- Add a Worker handler only when request-time behavior is required
- Validate SPA fallback behavior and cache headers in preview before production
- D1, KV, R2, and other bindings are optional capabilities, never implicit defaults
- Keep environment-specific names, routes, and bindings out of shared baseline config

## Migration from Pages

Migration is optional. First inventory redirects, headers, environment variables,
Functions, custom domains, and preview behavior. Create a parallel preview,
exercise critical routes, then switch traffic with a documented rollback.
