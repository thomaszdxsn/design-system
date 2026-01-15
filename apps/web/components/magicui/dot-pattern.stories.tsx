import type { Meta, StoryObj } from "@storybook/react";
import { DotPattern } from "./dot-pattern";

const meta: Meta<typeof DotPattern> = {
  title: "Magic UI/Backgrounds/DotPattern",
  component: DotPattern,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number", min: 8, max: 64 },
      description: "The horizontal spacing between dots",
    },
    height: {
      control: { type: "number", min: 8, max: 64 },
      description: "The vertical spacing between dots",
    },
    cx: {
      control: { type: "number", min: 0, max: 10 },
      description: "The x-offset of individual dots",
    },
    cy: {
      control: { type: "number", min: 0, max: 10 },
      description: "The y-offset of individual dots",
    },
    cr: {
      control: { type: "number", min: 0.5, max: 5 },
      description: "The radius of each dot",
    },
    glow: {
      control: "boolean",
      description: "Whether dots should have a glowing animation effect",
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] w-full bg-white dark:bg-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DotPattern>;

export const Default: Story = {
  args: {},
};

export const WithGlow: Story = {
  args: {
    glow: true,
  },
};

export const DensePattern: Story = {
  args: {
    width: 10,
    height: 10,
    cr: 0.8,
  },
};

export const SparsePattern: Story = {
  args: {
    width: 32,
    height: 32,
    cr: 2,
  },
};

export const LargeDots: Story = {
  args: {
    width: 24,
    height: 24,
    cr: 3,
  },
};

export const CustomColor: Story = {
  args: {
    className: "text-blue-500/50",
  },
};

export const GlowingLargeDots: Story = {
  args: {
    width: 24,
    height: 24,
    cr: 2,
    glow: true,
    className: "text-purple-500/80",
  },
};
