import { expect, test } from "@storybook/test-runner";

test("docs page renders and theme toolbar exists", async ({ page }) => {
  await page.goto("http://localhost:6006");
  await page.getByRole("button", { name: /docs/i }).click();
  const toolbar = page.getByRole("button", { name: /theme/i });
  await expect(toolbar).toBeVisible();
});

