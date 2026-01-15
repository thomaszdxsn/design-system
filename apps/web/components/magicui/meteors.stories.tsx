import type { Meta, StoryObj } from "@storybook/react";
import { Meteors } from "./meteors";

const meta: Meta<typeof Meteors> = {
  title: "Magic UI/Backgrounds/Meteors",
  component: Meteors,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    number: {
      control: { type: "number", min: 1, max: 50 },
      description: "Number of meteors",
    },
    minDelay: {
      control: { type: "number", min: 0, max: 5, step: 0.1 },
      description: "Minimum animation delay in seconds",
    },
    maxDelay: {
      control: { type: "number", min: 0, max: 5, step: 0.1 },
      description: "Maximum animation delay in seconds",
    },
    minDuration: {
      control: { type: "number", min: 1, max: 20 },
      description: "Minimum animation duration in seconds",
    },
    maxDuration: {
      control: { type: "number", min: 1, max: 20 },
      description: "Maximum animation duration in seconds",
    },
    angle: {
      control: { type: "number", min: 0, max: 360 },
      description: "Angle of meteor trajectory in degrees",
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-[500px] w-full overflow-hidden bg-slate-950">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Meteors>;

export const Default: Story = {
  args: {
    number: 20,
  },
};

export const FewMeteors: Story = {
  args: {
    number: 5,
  },
};

export const ManyMeteors: Story = {
  args: {
    number: 40,
  },
};

export const FastMeteors: Story = {
  args: {
    number: 20,
    minDuration: 1,
    maxDuration: 3,
  },
};

export const SlowMeteors: Story = {
  args: {
    number: 15,
    minDuration: 8,
    maxDuration: 15,
  },
};

export const SteepAngle: Story = {
  args: {
    number: 20,
    angle: 250,
  },
};

export const ShallowAngle: Story = {
  args: {
    number: 20,
    angle: 180,
  },
};

export const WithContent: Story = {
  args: {
    number: 15,
  },
  decorators: [
    (Story) => (
      <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-slate-950">
        <Story />
        <div className="z-10 text-center text-white">
          <h2 className="text-3xl font-bold">Meteor Shower</h2>
          <p className="mt-2 text-slate-400">Watch the stars fall</p>
        </div>
      </div>
    ),
  ],
};

export const CustomColor: Story = {
  args: {
    number: 20,
    className: "bg-blue-400",
  },
};
