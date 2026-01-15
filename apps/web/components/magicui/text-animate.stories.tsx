import type { Meta, StoryObj } from "@storybook/react";

import { TextAnimate } from "./text-animate";

const meta: Meta<typeof TextAnimate> = {
  title: "Magic UI/Text Animation/Text Animate",
  component: TextAnimate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    by: {
      control: "select",
      options: ["text", "word", "character", "line"],
    },
    animation: {
      control: "select",
      options: [
        "fadeIn",
        "blurIn",
        "blurInUp",
        "blurInDown",
        "slideUp",
        "slideDown",
        "slideLeft",
        "slideRight",
        "scaleUp",
        "scaleDown",
      ],
    },
    duration: {
      control: { type: "number", min: 0.1, max: 1, step: 0.1 },
    },
    delay: {
      control: { type: "number", min: 0, max: 1, step: 0.1 },
    },
    startOnView: {
      control: "boolean",
    },
    once: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextAnimate>;

export const Default: Story = {
  args: {
    children: "Animated text with fade in effect",
    className: "text-2xl font-bold",
    animation: "fadeIn",
    by: "word",
  },
};

export const FadeInAnimation: Story = {
  args: {
    children: "This text fades in smoothly",
    className: "text-2xl font-bold",
    animation: "fadeIn",
    by: "word",
  },
};

export const BlurInAnimation: Story = {
  args: {
    children: "Blur in animation effect",
    className: "text-2xl font-bold text-blue-600",
    animation: "blurIn",
    by: "word",
  },
};

export const BlurInUpAnimation: Story = {
  args: {
    children: "Blur in from bottom animation",
    className: "text-2xl font-bold text-purple-600",
    animation: "blurInUp",
    by: "word",
  },
};

export const SlideUpAnimation: Story = {
  args: {
    children: "Slide up animation effect",
    className: "text-2xl font-bold text-green-600",
    animation: "slideUp",
    by: "word",
  },
};

export const SlideDownAnimation: Story = {
  args: {
    children: "Slide down animation effect",
    className: "text-2xl font-bold text-pink-600",
    animation: "slideDown",
    by: "word",
  },
};

export const ScaleUpAnimation: Story = {
  args: {
    children: "Scale up animation effect",
    className: "text-2xl font-bold text-indigo-600",
    animation: "scaleUp",
    by: "word",
  },
};

export const CharacterAnimation: Story = {
  args: {
    children: "Character by character animation",
    className: "text-xl font-bold text-orange-600",
    animation: "fadeIn",
    by: "character",
  },
};

export const LineAnimation: Story = {
  args: {
    children: "First line\nSecond line\nThird line",
    className: "text-lg font-bold text-red-600",
    animation: "slideLeft",
    by: "line",
  },
};

export const WithDelay: Story = {
  args: {
    children: "Animation with delay",
    className: "text-2xl font-bold",
    animation: "fadeIn",
    by: "word",
    delay: 0.3,
  },
};

export const FastAnimation: Story = {
  args: {
    children: "Fast animation speed",
    className: "text-2xl font-bold",
    animation: "fadeIn",
    by: "word",
    duration: 0.15,
  },
};

export const SlowAnimation: Story = {
  args: {
    children: "Slow animation speed",
    className: "text-2xl font-bold",
    animation: "fadeIn",
    by: "word",
    duration: 0.6,
  },
};
