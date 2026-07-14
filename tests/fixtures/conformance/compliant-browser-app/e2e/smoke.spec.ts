import { expect, test } from "@playwright/test";

test("renders the application shell", async ({ page }) => {
  await page.setContent("<main><h1>Frontend Blueprint</h1></main>");
  await expect(page.getByRole("heading")).toHaveText("Frontend Blueprint");
});
