import type { Meta, StoryObj } from "@storybook/react";
import { GridPattern } from "./grid-pattern";

const meta: Meta<typeof GridPattern> = {
  title: "Magic UI/Backgrounds/GridPattern",
  component: GridPattern,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: { type: "number", min: 10, max: 100 },
      description: "Width of each grid cell",
    },
    height: {
      control: { type: "number", min: 10, max: 100 },
      description: "Height of each grid cell",
    },
    x: {
      control: { type: "number", min: -50, max: 50 },
      description: "X offset of the pattern",
    },
    y: {
      control: { type: "number", min: -50, max: 50 },
      description: "Y offset of the pattern",
    },
    strokeDasharray: {
      control: "text",
      description: "SVG stroke dash array for dashed lines",
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
type Story = StoryObj<typeof GridPattern>;

export const Default: Story = {
  args: {},
};

export const SmallGrid: Story = {
  args: {
    width: 20,
    height: 20,
  },
};

export const LargeGrid: Story = {
  args: {
    width: 80,
    height: 80,
  },
};

export const DashedLines: Story = {
  args: {
    strokeDasharray: "4 4",
  },
};

export const WithHighlightedSquares: Story = {
  args: {
    squares: [
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 1],
      [5, 2],
    ],
    className: "fill-blue-500/20 stroke-blue-500/30",
  },
};

export const CustomColor: Story = {
  args: {
    className: "fill-purple-500/20 stroke-purple-500/40",
  },
};

export const DottedGrid: Story = {
  args: {
    strokeDasharray: "1 8",
    width: 30,
    height: 30,
  },
};
