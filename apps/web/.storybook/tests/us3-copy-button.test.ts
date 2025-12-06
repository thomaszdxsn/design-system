import { expect, test } from "@storybook/test-runner";

test("copy button story renders and can be clicked", async ({ page }) => {
  await page.goto("http://localhost:6006/?path=/story/ui-copybutton--default");
  const button = page.getByRole("button");
  await expect(button).toBeVisible();
  await button.click();
});

