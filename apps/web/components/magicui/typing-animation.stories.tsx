import type { Meta, StoryObj } from "@storybook/react";

import { TypingAnimation } from "./typing-animation";

const meta: Meta<typeof TypingAnimation> = {
  title: "Magic UI/Text Animation/Typing Animation",
  component: TypingAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    duration: {
      control: { type: "number", min: 10, max: 500, step: 10 },
    },
    typeSpeed: {
      control: { type: "number", min: 10, max: 500, step: 10 },
    },
    deleteSpeed: {
      control: { type: "number", min: 10, max: 500, step: 10 },
    },
    pauseDelay: {
      control: { type: "number", min: 100, max: 3000, step: 100 },
    },
    delay: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
    },
    loop: {
      control: "boolean",
    },
    showCursor: {
      control: "boolean",
    },
    blinkCursor: {
      control: "boolean",
    },
    cursorStyle: {
      control: "select",
      options: ["line", "block", "underscore"],
    },
    startOnView: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TypingAnimation>;

export const Default: Story = {
  args: {
    children: "Welcome to Magic UI",
    className: "text-2xl font-bold",
  },
};

export const MultipleWords: Story = {
  args: {
    words: ["React", "TypeScript", "Tailwind CSS", "Magic UI"],
    className: "text-3xl font-bold",
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 40,
    pauseDelay: 1500,
  },
};

export const FastTyping: Story = {
  args: {
    children: "Fast typing animation",
    className: "text-xl font-semibold",
    typeSpeed: 30,
    deleteSpeed: 15,
  },
};

export const SlowTyping: Story = {
  args: {
    children: "Slow and deliberate typing",
    className: "text-xl font-semibold",
    typeSpeed: 150,
    deleteSpeed: 75,
  },
};

export const WithoutCursor: Story = {
  args: {
    children: "No cursor animation",
    className: "text-xl font-semibold",
    showCursor: false,
  },
};

export const BlockCursor: Story = {
  args: {
    children: "Block cursor style",
    className: "text-xl font-semibold",
    cursorStyle: "block",
  },
};

export const UnderscoreCursor: Story = {
  args: {
    children: "Underscore cursor style",
    className: "text-xl font-semibold",
    cursorStyle: "underscore",
  },
};

export const WithDelay: Story = {
  args: {
    children: "This animation starts after a delay",
    className: "text-xl font-semibold",
    delay: 1000,
  },
};
