import type { Meta, StoryObj } from "@storybook/react";

import { HyperText } from "./hyper-text";

const meta: Meta<typeof HyperText> = {
  title: "Magic UI/Text Animation/Hyper Text",
  component: HyperText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "number", min: 200, max: 2000, step: 100 },
    },
    delay: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
    },
    animateOnHover: {
      control: "boolean",
    },
    startOnView: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof HyperText>;

export const Default: Story = {
  args: {
    children: "Hover to scramble",
    className: "text-4xl font-bold",
  },
};

export const FastAnimation: Story = {
  args: {
    children: "Fast Scramble",
    duration: 300,
    className: "text-3xl font-bold text-blue-600",
  },
};

export const SlowAnimation: Story = {
  args: {
    children: "Slow Scramble",
    duration: 1500,
    className: "text-3xl font-bold text-purple-600",
  },
};

export const WithDelay: Story = {
  args: {
    children: "Delayed Start",
    delay: 500,
    className: "text-3xl font-bold text-green-600",
  },
};

export const AutoStart: Story = {
  args: {
    children: "Auto Start",
    startOnView: true,
    animateOnHover: false,
    className: "text-3xl font-bold text-pink-600",
  },
};

export const NoHoverAnimation: Story = {
  args: {
    children: "No Hover",
    animateOnHover: false,
    className: "text-3xl font-bold text-indigo-600",
  },
};

export const LongText: Story = {
  args: {
    children: "This is a longer text to scramble",
    duration: 1000,
    className: "text-2xl font-bold text-orange-600",
  },
};
