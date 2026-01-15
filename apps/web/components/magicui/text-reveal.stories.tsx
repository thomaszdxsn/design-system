import type { Meta, StoryObj } from "@storybook/react";

import { TextReveal } from "./text-reveal";

const meta: Meta<typeof TextReveal> = {
  title: "Magic UI/Text Animation/Text Reveal",
  component: TextReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof TextReveal>;

export const Default: Story = {
  args: {
    children:
      "Scroll down to reveal the text. This component uses scroll progress to animate the opacity of each word, creating a beautiful reveal effect as you scroll through the page.",
  },
};

export const ShortText: Story = {
  args: {
    children: "Magic UI Text Reveal",
  },
};

export const LongText: Story = {
  args: {
    children:
      "The TextReveal component creates an engaging scroll-based animation where text gradually becomes visible as you scroll down the page. Each word fades in individually, creating a smooth and elegant reveal effect that enhances the reading experience and draws attention to important content.",
  },
};
