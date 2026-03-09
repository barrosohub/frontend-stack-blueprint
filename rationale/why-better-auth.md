---
title: "Why Better Auth"
updated: "2026-03-09"
tier: 3
---

# Why Better Auth

## Decision

Use Better Auth as the recommended optional authentication layer when a project needs login, sessions, OAuth, passkeys, or auth plugins.

## Reasons

1. **Stable v1 line** — Better Auth is on a stable `v1` release track, which satisfies the blueprint minimum for stack inclusion.
2. **Framework fit** — It integrates with TypeScript and modern React clients while remaining compatible with multiple server runtimes.
3. **Feature coverage** — Email/password, social auth, passkeys, organizations, admin flows, and plugin-based extensions are available from one ecosystem.
4. **Client ergonomics** — The React client exposes first-party session APIs and hooks, reducing the need for custom auth plumbing.
5. **AI-friendliness** — The docs are structured, current, and explicit about installation, client setup, handlers, adapters, and CLI workflows.

## Trade-offs

- Better Auth is not a frontend-only library; it requires a server-side runtime/auth handler
- Most real-world setups also require database adapters or persistence decisions
- CLI support exists, but the official `init` flow is still framework-specific rather than universal for every Vite-based app

## Alternatives Considered

| Alternative         | Why Not                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| Build auth manually | Too much security-sensitive boilerplate and too much duplicated logic    |
| Auth.js             | Less aligned with this blueprint's platform-agnostic baseline           |
| Clerk / managed SaaS | Adds stronger vendor coupling than the default blueprint should assume |

## Rule

If a project needs authentication, recommend Better Auth first. If a project does not need authentication, do not install an auth stack by default.

## Status

⭐ Recommended optional layer.
