import type { Meta, StoryObj } from "@storybook/react";
import { BorderBeam } from "./border-beam";

const meta: Meta<typeof BorderBeam> = {
  title: "Magic UI/Effects/BorderBeam",
  component: BorderBeam,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="relative h-32 w-64 rounded-xl border bg-background p-4">
        <p className="text-sm text-muted-foreground">Card with border beam</p>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BorderBeam>;

export const Default: Story = {
  args: {},
};

export const CustomColors: Story = {
  args: {
    colorFrom: "#00ff88",
    colorTo: "#0088ff",
  },
};

export const SlowAnimation: Story = {
  args: {
    duration: 12,
  },
};

export const FastAnimation: Story = {
  args: {
    duration: 3,
  },
};

export const Reversed: Story = {
  args: {
    reverse: true,
  },
};

export const LargeBeam: Story = {
  args: {
    size: 100,
  },
};

export const ThickBorder: Story = {
  args: {
    borderWidth: 2,
  },
};
