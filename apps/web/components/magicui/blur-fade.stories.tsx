import type { Meta, StoryObj } from "@storybook/react";

import { BlurFade } from "./blur-fade";

const meta: Meta<typeof BlurFade> = {
  title: "Magic UI/Text Animation/Blur Fade",
  component: BlurFade,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "number", min: 0.1, max: 1, step: 0.1 },
    },
    delay: {
      control: { type: "number", min: 0, max: 1, step: 0.1 },
    },
    offset: {
      control: { type: "number", min: 0, max: 50, step: 5 },
    },
    direction: {
      control: "select",
      options: ["up", "down", "left", "right"],
    },
    blur: {
      control: "text",
    },
    inView: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BlurFade>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
        <h2 className="text-2xl font-bold">Blur Fade Effect</h2>
        <p className="mt-2">This content fades in with a blur effect</p>
      </div>
    ),
  },
};

export const FadeFromUp: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-blue-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Fade from Up</h2>
      </div>
    ),
    direction: "up",
  },
};

export const FadeFromDown: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-green-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Fade from Down</h2>
      </div>
    ),
    direction: "down",
  },
};

export const FadeFromLeft: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-purple-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Fade from Left</h2>
      </div>
    ),
    direction: "left",
  },
};

export const FadeFromRight: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-pink-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Fade from Right</h2>
      </div>
    ),
    direction: "right",
  },
};

export const FastAnimation: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-orange-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Fast Animation</h2>
      </div>
    ),
    duration: 0.2,
  },
};

export const SlowAnimation: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-indigo-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Slow Animation</h2>
      </div>
    ),
    duration: 0.8,
  },
};

export const WithDelay: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-red-500 p-8 text-white">
        <h2 className="text-2xl font-bold">With Delay</h2>
      </div>
    ),
    delay: 0.3,
  },
};

export const LargeOffset: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-cyan-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Large Offset</h2>
      </div>
    ),
    offset: 30,
  },
};

export const SmallOffset: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-lime-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Small Offset</h2>
      </div>
    ),
    offset: 2,
  },
};

export const StrongBlur: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-violet-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Strong Blur</h2>
      </div>
    ),
    blur: "12px",
  },
};

export const WeakBlur: Story = {
  args: {
    children: (
      <div className="rounded-lg bg-rose-500 p-8 text-white">
        <h2 className="text-2xl font-bold">Weak Blur</h2>
      </div>
    ),
    blur: "2px",
  },
};

export const TextContent: Story = {
  args: {
    children: (
      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Blur Fade Text</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is a text content that fades in with a blur effect. The animation creates a smooth
          and elegant entrance for the content.
        </p>
      </div>
    ),
  },
};
