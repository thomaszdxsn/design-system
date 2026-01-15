import type { Meta, StoryObj } from "@storybook/react";
import { MagicCard } from "./magic-card";

const meta: Meta<typeof MagicCard> = {
  title: "Magic UI/Effects/MagicCard",
  component: MagicCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MagicCard>;

export const Default: Story = {
  args: {
    children: (
      <div className="flex h-40 w-64 flex-col items-center justify-center rounded-xl p-6">
        <h3 className="text-lg font-semibold">Magic Card</h3>
        <p className="text-sm text-muted-foreground">Hover to see the effect</p>
      </div>
    ),
    className: "rounded-xl",
  },
};

export const CustomGradient: Story = {
  args: {
    children: (
      <div className="flex h-40 w-64 flex-col items-center justify-center rounded-xl p-6">
        <h3 className="text-lg font-semibold">Custom Colors</h3>
        <p className="text-sm text-muted-foreground">Green to blue gradient</p>
      </div>
    ),
    className: "rounded-xl",
    gradientFrom: "#00ff88",
    gradientTo: "#0088ff",
  },
};

export const LargeGradient: Story = {
  args: {
    children: (
      <div className="flex h-40 w-64 flex-col items-center justify-center rounded-xl p-6">
        <h3 className="text-lg font-semibold">Large Gradient</h3>
        <p className="text-sm text-muted-foreground">300px gradient size</p>
      </div>
    ),
    className: "rounded-xl",
    gradientSize: 300,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="flex gap-4">
      <MagicCard className="rounded-xl">
        <div className="flex h-32 w-48 flex-col items-center justify-center p-4">
          <h3 className="font-semibold">Card 1</h3>
        </div>
      </MagicCard>
      <MagicCard className="rounded-xl" gradientFrom="#ff6b6b" gradientTo="#feca57">
        <div className="flex h-32 w-48 flex-col items-center justify-center p-4">
          <h3 className="font-semibold">Card 2</h3>
        </div>
      </MagicCard>
      <MagicCard className="rounded-xl" gradientFrom="#48dbfb" gradientTo="#ff9ff3">
        <div className="flex h-32 w-48 flex-col items-center justify-center p-4">
          <h3 className="font-semibold">Card 3</h3>
        </div>
      </MagicCard>
    </div>
  ),
};
