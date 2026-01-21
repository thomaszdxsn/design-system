import type { Meta, StoryObj } from "@storybook/react";
import { PulsatingButton } from "./pulsating-button";

const meta: Meta<typeof PulsatingButton> = {
  title: "Magic UI/Buttons/PulsatingButton",
  component: PulsatingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    pulseColor: {
      control: "color",
      description: "Color of the pulse effect",
    },
    duration: {
      control: "text",
      description: "Duration of the pulse animation",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PulsatingButton>;

export const Default: Story = {
  args: {
    children: "Pulsating Button",
  },
};

export const CustomPulseColor: Story = {
  args: {
    children: "Custom Pulse",
    pulseColor: "#ff6b6b",
  },
};

export const FastPulse: Story = {
  args: {
    children: "Fast Pulse",
    duration: "0.8s",
  },
};

export const SlowPulse: Story = {
  args: {
    children: "Slow Pulse",
    duration: "3s",
  },
};

export const LargeButton: Story = {
  args: {
    children: "Large Pulsating Button",
    className: "px-8 py-4 text-lg",
  },
};
