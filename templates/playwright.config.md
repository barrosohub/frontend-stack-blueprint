# Playwright Configuration Template

Install the production E2E and automated accessibility tooling:

```bash
pnpm add -D @playwright/test @axe-core/playwright
pnpm exec playwright install
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

const webServerCommand = process.env.CI
  ? "pnpm preview --host 127.0.0.1"
  : "pnpm build && pnpm preview --host 127.0.0.1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "on-first-retry",
  },
  webServer: {
    command: webServerCommand,
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
```

Adjust projects to the documented target matrix. Electron uses its pinned
Chromium runtime; Tauri additionally needs the operating-system WebViews it ships.

## Accessibility Smoke Example

```typescript
// e2e/accessibility.spec.ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home has no automatically detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("main")).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

Do not add broad exclusions to make the test pass. A temporary exception needs
an owner, WCAG criterion, reason, scope, and expiry. Automated checks do not
replace keyboard, zoom/reflow, focus, and screen-reader verification.

## Test Rules

- Prefer `getByRole`, `getByLabel`, and visible names over CSS selectors.
- Keep test data deterministic and independent between tests.
- Use web-first assertions; do not add arbitrary sleeps.
- Treat repeated flakiness as a defect even when retries pass.
- Preserve traces/reports from CI without uploading credentials or sensitive data.
