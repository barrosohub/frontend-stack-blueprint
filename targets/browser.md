---
title: "Browser Target"
version: "1.8.0"
updated: "2026-07-13"
tier: 2
---

# Browser Target

## Support Policy

Use **Baseline Widely Available** as the default web-platform feature policy.
Actual product analytics, contractual requirements, regulated users, and known
assistive-technology needs override this default.

Every browser project MUST document:

- supported browser families and minimum versions or a named Baseline policy
- mobile/desktop scope and embedded webviews, when applicable
- supported input modes, zoom/reflow expectations, locales, and assistive technology
- the analytics source and review cadence used to retire or add support

Do not use vague statements such as “modern browsers”.

## Limited-Availability Features

A feature outside the project's support policy requires all of the following:

1. feature detection rather than user-agent sniffing
2. progressive enhancement or an explicit fallback
3. tests for supported and fallback behavior
4. an evidence-backed reason to accept the compatibility cost
5. documentation in the project browser-support contract

Transpile syntax as needed, but do not assume transpilation polyfills missing Web APIs.
Load polyfills intentionally and measure their compatibility and performance cost.

## Test Matrix

For general browser applications, Playwright projects cover Chromium, Firefox,
and WebKit. Use the project's support contract to add device and version coverage.

Target-specific exceptions:

- Electron may use its pinned Chromium runtime plus Electron integration tests.
- Tauri must test the operating-system WebViews it ships against.
- PWA additionally tests installability, offline behavior, update flow, and storage limits.
- Embedded WebViews require the host application's actual engine/version matrix.

Run the critical compatibility suite on every pull request. Broader legacy/device
matrices may run on a schedule or release gate, but failures still need an owner.

## Production Requirements

- Serve hashed immutable assets and an explicitly non-immutable HTML entry point.
- Configure security headers, cache policy, redirects, and SPA fallbacks at the host.
- Provide a preview deployment per pull request when the hosting provider supports it.
- Run smoke tests against the preview and the final built artifact.
- Document rollback and verify it without relying on rebuilding old source.

## Official References

- [Baseline Widely Available](https://web-platform-dx.github.io/web-features-explorer/widely-available/)
- [Limited availability guidance](https://web-platform-dx.github.io/web-features-explorer/limited-availability/)
- [Playwright projects](https://playwright.dev/docs/test-projects)
