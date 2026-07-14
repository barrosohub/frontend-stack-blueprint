# GitHub Actions Production CI Template

Use this baseline for user-facing applications. Remove a capability-specific
step only when the project documents why that reliability profile does not apply.

The action references below are pinned to full commit SHAs verified on
2026-07-13. Dependabot must keep GitHub Actions references current.

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
  push:
    branches: [main]

concurrency:
  group: ci-${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

permissions:
  contents: read

jobs:
  quality:
    name: Production quality gate
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Checkout
        uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0

      - name: Set up pnpm
        uses: pnpm/action-setup@b906affcce14559ad1aafd4ab0e942779e9f58b1 # v4
        with:
          version: 10
          run_install: false

      - name: Set up Node.js
        uses: actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e # v6.4.0
        with:
          node-version-file: .nvmrc
          cache: pnpm

      - name: Install from lockfile
        run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Unit and integration tests
        run: pnpm test:unit

      - name: Production build
        run: pnpm build

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps

      - name: Critical E2E and accessibility journeys
        run: pnpm test:e2e

      - name: Upload Playwright report
        if: ${{ !cancelled() }}
        uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02 # v4
        with:
          name: playwright-report
          path: playwright-report/
          if-no-files-found: ignore
          retention-days: 7

  dependency-review:
    name: Dependency review
    if: ${{ github.event_name == 'pull_request' }}
    runs-on: ubuntu-latest
    permissions:
      contents: read

    steps:
      - name: Checkout
        uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0

      - name: Reject vulnerable dependency changes
        uses: actions/dependency-review-action@2031cfc080254a8a887f58cffee85186f0e49e48 # v4.9.0
```

Expected `package.json` scripts:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "eslint . --max-warnings=0",
    "test:unit": "vitest run",
    "build": "vite build",
    "test:e2e": "playwright test",
    "verify": "pnpm typecheck && pnpm lint && pnpm test:unit && pnpm build && pnpm test:e2e"
  }
}
```

Repository configuration outside the workflow:

1. Protect `main` and require the applicable jobs above.
2. Enable Dependabot alerts, security updates, and weekly version updates for
   `npm` and `github-actions` ecosystems.
3. Enable CodeQL default setup and secret scanning/push protection where available.
4. Grant the workflow token read-only access by default.
5. Never expose production secrets to pull requests from untrusted forks.
