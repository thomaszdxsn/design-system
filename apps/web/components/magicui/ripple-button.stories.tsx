import type { Meta, StoryObj } from "@storybook/react";
import { RippleButton } from "./ripple-button";

const meta: Meta<typeof RippleButton> = {
  title: "Magic UI/Buttons/RippleButton",
  component: RippleButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rippleColor: {
      control: "color",
      description: "Color of the ripple effect",
    },
    duration: {
      control: "text",
      description: "Duration of the ripple animation",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RippleButton>;

export const Default: Story = {
  args: {
    children: "Click for Ripple",
  },
};

export const CustomRippleColor: Story = {
  args: {
    children: "Blue Ripple",
    rippleColor: "#3b82f6",
  },
};

export const FastRipple: Story = {
  args: {
    children: "Fast Ripple",
    duration: "300ms",
  },
};

export const SlowRipple: Story = {
  args: {
    children: "Slow Ripple",
    duration: "1200ms",
  },
};

export const LargeButton: Story = {
  args: {
    children: "Large Ripple Button",
    className: "px-8 py-4 text-lg",
  },
};

export const RedRipple: Story = {
  args: {
    children: "Red Ripple",
    rippleColor: "#ef4444",
  },
};
