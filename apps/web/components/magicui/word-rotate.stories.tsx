import type { Meta, StoryObj } from "@storybook/react";

import { WordRotate } from "./word-rotate";

const meta: Meta<typeof WordRotate> = {
  title: "Magic UI/Text Animation/Word Rotate",
  component: WordRotate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "number", min: 500, max: 5000, step: 250 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof WordRotate>;

export const Default: Story = {
  args: {
    words: ["React", "TypeScript", "Tailwind CSS", "Magic UI"],
    className: "text-4xl font-bold",
  },
};

export const FastRotation: Story = {
  args: {
    words: ["Fast", "Quick", "Swift", "Rapid"],
    duration: 1000,
    className: "text-3xl font-bold text-blue-600",
  },
};

export const SlowRotation: Story = {
  args: {
    words: ["Slow", "Gradual", "Leisurely", "Unhurried"],
    duration: 4000,
    className: "text-3xl font-bold text-purple-600",
  },
};

export const TwoWords: Story = {
  args: {
    words: ["Hello", "World"],
    className: "text-4xl font-bold text-green-600",
  },
};

export const ManyWords: Story = {
  args: {
    words: ["Innovation", "Creativity", "Technology", "Design", "Development", "Excellence"],
    duration: 2000,
    className: "text-3xl font-bold text-indigo-600",
  },
};

export const CustomAnimation: Story = {
  args: {
    words: ["Slide", "In", "Smoothly"],
    duration: 2500,
    className: "text-3xl font-bold text-pink-600",
    motionProps: {
      initial: { opacity: 0, x: -100 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 100 },
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },
};
