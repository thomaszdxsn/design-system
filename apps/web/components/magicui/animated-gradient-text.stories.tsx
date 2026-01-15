import type { Meta, StoryObj } from "@storybook/react";

import { AnimatedGradientText } from "./animated-gradient-text";

const meta: Meta<typeof AnimatedGradientText> = {
  title: "Magic UI/Text Animation/Animated Gradient Text",
  component: AnimatedGradientText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    speed: {
      control: { type: "number", min: 0.5, max: 3, step: 0.5 },
    },
    colorFrom: {
      control: "color",
    },
    colorTo: {
      control: "color",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AnimatedGradientText>;

export const Default: Story = {
  args: {
    children: "Animated Gradient Text",
    className: "text-4xl font-bold",
  },
};

export const FastAnimation: Story = {
  args: {
    children: "Fast Gradient Animation",
    className: "text-4xl font-bold",
    speed: 2,
  },
};

export const SlowAnimation: Story = {
  args: {
    children: "Slow Gradient Animation",
    className: "text-4xl font-bold",
    speed: 0.5,
  },
};

export const BlueToGreen: Story = {
  args: {
    children: "Blue to Green Gradient",
    className: "text-4xl font-bold",
    colorFrom: "#0066ff",
    colorTo: "#00ff88",
  },
};

export const PurpleToPink: Story = {
  args: {
    children: "Purple to Pink Gradient",
    className: "text-4xl font-bold",
    colorFrom: "#9c40ff",
    colorTo: "#ff40a0",
  },
};

export const RedToYellow: Story = {
  args: {
    children: "Red to Yellow Gradient",
    className: "text-4xl font-bold",
    colorFrom: "#ff0000",
    colorTo: "#ffff00",
  },
};

export const LargeText: Story = {
  args: {
    children: "Large Gradient Text",
    className: "text-6xl font-bold",
  },
};

export const SmallText: Story = {
  args: {
    children: "Small gradient text",
    className: "text-lg font-semibold",
  },
};

export const LongText: Story = {
  args: {
    children: "This is a longer text with animated gradient effect applied",
    className: "text-2xl font-bold",
  },
};

export const MultipleLines: Story = {
  render: () => (
    <div className="space-y-4">
      <AnimatedGradientText className="text-2xl font-bold">
        First line gradient
      </AnimatedGradientText>
      <AnimatedGradientText className="text-2xl font-bold" colorFrom="#ff0000" colorTo="#00ff00">
        Second line gradient
      </AnimatedGradientText>
      <AnimatedGradientText className="text-2xl font-bold" colorFrom="#0000ff" colorTo="#ffff00">
        Third line gradient
      </AnimatedGradientText>
    </div>
  ),
};
