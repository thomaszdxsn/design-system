import type { Meta, StoryObj } from "@storybook/react";
import { CoolMode } from "./cool-mode";

const meta: Meta<typeof CoolMode> = {
  title: "Magic UI/Effects/Cool Mode",
  component: CoolMode,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CoolMode>;

export const Default: Story = {
  render: () => (
    <CoolMode>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Click and drag me!
      </button>
    </CoolMode>
  ),
};

export const WithEmoji: Story = {
  render: () => (
    <CoolMode options={{ particle: "🎉" }}>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Party Mode 🎉
      </button>
    </CoolMode>
  ),
};

export const WithStar: Story = {
  render: () => (
    <CoolMode options={{ particle: "⭐" }}>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Star Mode ⭐
      </button>
    </CoolMode>
  ),
};

export const CustomSpeed: Story = {
  render: () => (
    <CoolMode options={{ speedHorz: 5, speedUp: 15, particleCount: 30 }}>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Fast Particles
      </button>
    </CoolMode>
  ),
};

export const LargeParticles: Story = {
  render: () => (
    <CoolMode options={{ size: 40 }}>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Large Circles
      </button>
    </CoolMode>
  ),
};
