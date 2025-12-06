import type { Meta, StoryObj } from "@storybook/react";

import { ButtonShowcase } from "./button-showcase";

const meta: Meta<typeof ButtonShowcase> = {
  title: "Blocks/ButtonShowcase",
  component: ButtonShowcase,
};

export default meta;

type Story = StoryObj<typeof ButtonShowcase>;

export const Gallery: Story = {};

