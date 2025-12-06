import { expect, test } from "@storybook/test-runner";

test("loads sidebar and renders default story", async ({ page }) => {
  await page.goto("http://localhost:6006");

  const sidebar = page.getByRole("navigation");
  await expect(sidebar).toBeVisible();

  const canvas = page.getByTestId("storybook-preview-iframe");
  await expect(canvas).toBeVisible();
});

