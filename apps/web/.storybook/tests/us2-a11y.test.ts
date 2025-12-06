import { expect, test } from "@storybook/test-runner";

test("button story renders without obvious a11y regressions", async ({ page }) => {
  await page.goto("http://localhost:6006/?path=/story/ui-button--default");
  const button = page.getByRole("button", { name: /button/i });
  await expect(button).toBeVisible();
});

