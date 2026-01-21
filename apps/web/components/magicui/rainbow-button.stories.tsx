import type { Meta, StoryObj } from "@storybook/react";
import { RainbowButton } from "./rainbow-button";

const meta: Meta<typeof RainbowButton> = {
  title: "Magic UI/Buttons/RainbowButton",
  component: RainbowButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
      description: "Button variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Button size",
    },
    asChild: {
      control: "boolean",
      description: "Render as child component",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RainbowButton>;

export const Default: Story = {
  args: {
    children: "Rainbow Button",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Rainbow",
    variant: "outline",
  },
};

export const Small: Story = {
  args: {
    children: "Small Rainbow",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large Rainbow Button",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    children: "🌈",
    size: "icon",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Rainbow",
    disabled: true,
  },
};
