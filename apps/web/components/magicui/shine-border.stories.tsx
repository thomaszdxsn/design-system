import type { Meta, StoryObj } from "@storybook/react";
import { ShineBorder } from "./shine-border";

const meta: Meta<typeof ShineBorder> = {
  title: "Magic UI/Effects/ShineBorder",
  component: ShineBorder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative h-32 w-64 rounded-xl bg-background p-4">
        <p className="text-sm text-muted-foreground">Card with shine border</p>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ShineBorder>;

export const Default: Story = {
  args: {
    shineColor: "#9E7AFF",
  },
};

export const MultiColor: Story = {
  args: {
    shineColor: ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  },
};

export const FastAnimation: Story = {
  args: {
    shineColor: "#00ff88",
    duration: 7,
  },
};

export const SlowAnimation: Story = {
  args: {
    shineColor: "#ff6b6b",
    duration: 20,
  },
};

export const ThickBorder: Story = {
  args: {
    shineColor: "#0088ff",
    borderWidth: 3,
  },
};

export const RainbowColors: Story = {
  args: {
    shineColor: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#8b00ff"],
  },
};
