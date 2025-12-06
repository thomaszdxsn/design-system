import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { CopyButton, type CopyButtonProps } from "./copy-button";

const meta: Meta<CopyButtonProps> = {
  title: "UI/CopyButton",
  component: CopyButton,
};

export default meta;

type Story = StoryObj<CopyButtonProps>;

export const Default: Story = {
  args: {
    value: "pnpm dlx shadcn@latest add https://example.com/registry/button.json",
    children: "复制指令",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: /复制指令/i });
    await userEvent.click(button);
  },
};

