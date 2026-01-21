import type { Meta, StoryObj } from "@storybook/react";

import { AnimatedShinyText } from "./animated-shiny-text";

const meta: Meta<typeof AnimatedShinyText> = {
  title: "Magic UI/Text Animation/Animated Shiny Text",
  component: AnimatedShinyText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    shimmerWidth: {
      control: { type: "number", min: 50, max: 300, step: 10 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AnimatedShinyText>;

export const Default: Story = {
  args: {
    children: "Shiny animated text effect",
    className: "text-2xl font-bold",
  },
};

export const LargeText: Story = {
  args: {
    children: "Large Shiny Text",
    className: "text-4xl font-bold",
  },
};

export const SmallText: Story = {
  args: {
    children: "Small shiny text",
    className: "text-sm font-semibold",
  },
};

export const WideShimmer: Story = {
  args: {
    children: "Wide shimmer effect",
    className: "text-2xl font-bold",
    shimmerWidth: 200,
  },
};

export const NarrowShimmer: Story = {
  args: {
    children: "Narrow shimmer effect",
    className: "text-2xl font-bold",
    shimmerWidth: 50,
  },
};

export const LongText: Story = {
  args: {
    children: "This is a longer text with animated shiny effect",
    className: "text-lg font-semibold",
  },
};

export const MultipleLines: Story = {
  render: () => (
    <div className="space-y-4">
      <AnimatedShinyText className="text-xl font-bold">First line with shine</AnimatedShinyText>
      <AnimatedShinyText className="text-xl font-bold">Second line with shine</AnimatedShinyText>
      <AnimatedShinyText className="text-xl font-bold">Third line with shine</AnimatedShinyText>
    </div>
  ),
};

export const WithCustomWidth: Story = {
  args: {
    children: "Custom shimmer width",
    className: "text-2xl font-bold",
    shimmerWidth: 150,
  },
};
