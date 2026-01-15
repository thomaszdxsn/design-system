import type { Meta, StoryObj } from "@storybook/react";
import { Particles } from "./particles";

const meta: Meta<typeof Particles> = {
  title: "Magic UI/Backgrounds/Particles",
  component: Particles,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    quantity: {
      control: { type: "number", min: 10, max: 500 },
      description: "Number of particles",
    },
    staticity: {
      control: { type: "number", min: 10, max: 200 },
      description: "How static the particles are (higher = less reactive to mouse)",
    },
    ease: {
      control: { type: "number", min: 10, max: 200 },
      description: "Easing factor for particle movement",
    },
    size: {
      control: { type: "number", min: 0.1, max: 3 },
      description: "Base size of particles",
    },
    color: {
      control: "color",
      description: "Color of particles",
    },
    vx: {
      control: { type: "number", min: -2, max: 2, step: 0.1 },
      description: "Horizontal velocity",
    },
    vy: {
      control: { type: "number", min: -2, max: 2, step: 0.1 },
      description: "Vertical velocity",
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] w-full bg-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Particles>;

export const Default: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 100,
    color: "#ffffff",
  },
};

export const HighDensity: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 300,
    color: "#ffffff",
  },
};

export const LowDensity: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 30,
    size: 1,
    color: "#ffffff",
  },
};

export const BlueParticles: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 100,
    color: "#3b82f6",
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] w-full bg-slate-900">
        <Story />
      </div>
    ),
  ],
};

export const GoldParticles: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 150,
    color: "#fbbf24",
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] w-full bg-slate-900">
        <Story />
      </div>
    ),
  ],
};

export const FloatingUp: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 100,
    color: "#ffffff",
    vy: -0.5,
  },
};

export const DriftingRight: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 100,
    color: "#ffffff",
    vx: 0.3,
  },
};

export const LargeParticles: Story = {
  args: {
    className: "absolute inset-0",
    quantity: 50,
    size: 2,
    color: "#a855f7",
  },
  decorators: [
    (Story) => (
      <div className="relative h-[400px] w-full bg-slate-900">
        <Story />
      </div>
    ),
  ],
};
