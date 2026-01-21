import type { Meta, StoryObj } from "@storybook/react";
import { Ripple } from "./ripple";

const meta: Meta<typeof Ripple> = {
  title: "Magic UI/Backgrounds/Ripple",
  component: Ripple,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    mainCircleSize: {
      control: { type: "number", min: 50, max: 400 },
      description: "Size of the main (innermost) circle in pixels",
    },
    mainCircleOpacity: {
      control: { type: "number", min: 0, max: 1, step: 0.05 },
      description: "Opacity of the main circle",
    },
    numCircles: {
      control: { type: "number", min: 1, max: 15 },
      description: "Number of ripple circles",
    },
  },
  decorators: [
    (Story) => (
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Ripple>;

export const Default: Story = {
  args: {},
};

export const SmallRipple: Story = {
  args: {
    mainCircleSize: 100,
    numCircles: 5,
  },
};

export const LargeRipple: Story = {
  args: {
    mainCircleSize: 300,
    numCircles: 10,
  },
};

export const ManyCircles: Story = {
  args: {
    mainCircleSize: 150,
    numCircles: 12,
  },
};

export const FewCircles: Story = {
  args: {
    mainCircleSize: 200,
    numCircles: 4,
  },
};

export const HighOpacity: Story = {
  args: {
    mainCircleOpacity: 0.5,
    numCircles: 6,
  },
};

export const SubtleRipple: Story = {
  args: {
    mainCircleOpacity: 0.1,
    numCircles: 10,
  },
};

export const WithContent: Story = {
  args: {
    mainCircleSize: 180,
    numCircles: 8,
  },
  decorators: [
    (Story) => (
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-background">
        <Story />
        <div className="z-10 text-center">
          <h2 className="text-2xl font-bold">Ripple Effect</h2>
          <p className="text-muted-foreground">Content over ripple background</p>
        </div>
      </div>
    ),
  ],
};
