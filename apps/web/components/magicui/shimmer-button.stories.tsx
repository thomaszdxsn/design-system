import type { Meta, StoryObj } from "@storybook/react";
import { ShimmerButton } from "./shimmer-button";

const meta: Meta<typeof ShimmerButton> = {
  title: "Magic UI/Buttons/ShimmerButton",
  component: ShimmerButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    shimmerColor: {
      control: "color",
      description: "Color of the shimmer effect",
    },
    shimmerSize: {
      control: "text",
      description: "Size of the shimmer cut",
    },
    borderRadius: {
      control: "text",
      description: "Border radius of the button",
    },
    shimmerDuration: {
      control: "text",
      description: "Duration of the shimmer animation",
    },
    background: {
      control: "color",
      description: "Background color of the button",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShimmerButton>;

export const Default: Story = {
  args: {
    children: "Shimmer Button",
  },
};

export const CustomColors: Story = {
  args: {
    children: "Custom Shimmer",
    shimmerColor: "#ff6b6b",
    background: "rgba(30, 30, 30, 1)",
  },
};

export const FastAnimation: Story = {
  args: {
    children: "Fast Shimmer",
    shimmerDuration: "1s",
  },
};

export const RoundedSquare: Story = {
  args: {
    children: "Square Button",
    borderRadius: "8px",
  },
};

export const LargeButton: Story = {
  args: {
    children: "Large Shimmer Button",
    className: "px-8 py-4 text-lg",
  },
};
