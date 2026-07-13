---
title: "Frontend Security & Supply Chain"
version: "1.8.0"
updated: "2026-07-13"
tier: 1
scope: "mandatory"
---

# Frontend Security & Supply Chain

> Browser code is public code. Treat every client-delivered value as observable
> and every external response as untrusted.

## Environment Contract

- Validate public configuration once in `src/config/env.ts` and export a typed object.
- Fail at startup/build when required configuration is absent or malformed.
- In Vite, every `VITE_*` value can be exposed in the client bundle. It MUST NOT
  contain secrets, private keys, service-role tokens, or privileged credentials.
- Keep server/edge configuration in a separate server-only module and validate it there.
- Never read ad hoc environment variables throughout features.
- Maintain `.env.example` with names and safe example values only.

Use [templates/env-contract.md](../templates/env-contract.md) as the baseline.

## Dependency and Build Integrity

Every maintained production repository MUST:

1. Commit exactly one package-manager lockfile.
2. Install with `pnpm install --frozen-lockfile` in CI.
3. Enable the dependency graph, Dependabot alerts and scheduled version updates.
4. Run Dependency Review on pull requests that change dependencies.
5. Enable CodeQL or an equivalent code-scanning gate for the repository's threat model.
6. Enable secret scanning and push protection where the GitHub plan supports them.
7. Pin GitHub Actions to verified full commit SHAs and grant minimum job permissions.
8. Review install scripts, newly added maintainers, transitive growth, licenses, and
   native binaries for high-impact dependencies.
9. Generate provenance/SBOM artifacts when publishing reusable packages or desktop binaries.

Start scheduled updates from
[templates/dependabot.yml.md](../templates/dependabot.yml.md).

Automated update pull requests MUST pass the same tests as human-authored changes.
Do not auto-merge major upgrades or security-sensitive runtime packages without review.

## Browser Security Baseline

- Escape by default and avoid DOM injection sinks such as `innerHTML`.
- Sanitize untrusted rich content with an allowlist; never rely on regex sanitization.
- Start Content Security Policy in report-only mode, remove violations, then enforce it.
- Avoid `unsafe-inline` and `unsafe-eval`; use nonces or hashes when inline code is unavoidable.
- Adopt Trusted Types for DOM XSS-sensitive applications when the declared browser
  matrix supports it, with progressive enhancement for older clients.
- Restrict frames, connections, workers, media, forms, and navigation to required origins.
- Validate `postMessage` origin and payload. Never use `*` for privileged messages.
- Set security headers at the hosting/runtime layer, not in React components.

Desktop targets add their own process, IPC, navigation, permission, and update rules.

## Credentials, Sessions, and Storage

- Prefer server-managed `HttpOnly`, `Secure`, appropriately `SameSite` cookies for web sessions.
- Never persist service credentials or privileged tokens in localStorage, IndexedDB,
  Zustand persistence, source code, build arguments, or telemetry.
- Treat browser storage as user-controlled and readable after XSS.
- Require CSRF protection where cookie-based authenticated mutations cross trust boundaries.
- Keep authorization on the trusted server; hiding UI is not authorization.

## Telemetry and Privacy

- Define allowed event fields and prohibited PII before enabling telemetry.
- Scrub URLs, headers, request bodies, user text, and identifiers before export.
- Session replay is opt-in, sampled, masked, and subject to product/legal approval.
- Honor consent and regional requirements before analytics or experimentation initialization.
- Document retention, access, sampling, data region, and deletion ownership.
- Never upload source maps publicly; send them to the provider during release and remove them
  from public artifacts when the deployment model requires it.

## Security Review Triggers

Require an explicit threat review when a change introduces authentication, payments,
untrusted HTML/Markdown, file upload/download, cross-origin messaging, browser extensions,
desktop IPC, native modules, cryptography, new third-party scripts, or privileged APIs.

## Official References

- [Vite environment variables](https://vite.dev/guide/env-and-mode)
- [GitHub supply-chain security](https://docs.github.com/code-security/supply-chain-security/understanding-your-software-supply-chain/about-supply-chain-security)
- [Secure use of GitHub Actions](https://docs.github.com/en/actions/reference/security/secure-use)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API)
