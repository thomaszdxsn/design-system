import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { AnimatedCircularProgressBar } from "./animated-circular-progress-bar";

const meta: Meta<typeof AnimatedCircularProgressBar> = {
  title: "Magic UI/Utilities/AnimatedCircularProgressBar",
  component: AnimatedCircularProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AnimatedCircularProgressBar>;

export const Default: Story = {
  args: {
    value: 75,
    gaugePrimaryColor: "#3b82f6",
    gaugeSecondaryColor: "#e5e7eb",
  },
};

export const HighValue: Story = {
  args: {
    value: 90,
    gaugePrimaryColor: "#10b981",
    gaugeSecondaryColor: "#f3f4f6",
  },
};

export const LowValue: Story = {
  args: {
    value: 25,
    gaugePrimaryColor: "#ef4444",
    gaugeSecondaryColor: "#f9fafb",
  },
};

export const CustomColors: Story = {
  args: {
    value: 60,
    gaugePrimaryColor: "#8b5cf6",
    gaugeSecondaryColor: "#f3f4f6",
  },
};

export const GradientColors: Story = {
  args: {
    value: 80,
    gaugePrimaryColor: "url(#gradient)",
    gaugeSecondaryColor: "#f3f4f6",
  },
  render: (args) => (
    <div>
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      <AnimatedCircularProgressBar {...args} />
    </div>
  ),
};

export const CustomRange: Story = {
  args: {
    min: 0,
    max: 200,
    value: 150,
    gaugePrimaryColor: "#f59e0b",
    gaugeSecondaryColor: "#f3f4f6",
  },
};

export const SmallSize: Story = {
  args: {
    value: 65,
    gaugePrimaryColor: "#06b6d4",
    gaugeSecondaryColor: "#f3f4f6",
    className: "size-24 text-lg",
  },
};

export const LargeSize: Story = {
  args: {
    value: 85,
    gaugePrimaryColor: "#84cc16",
    gaugeSecondaryColor: "#f3f4f6",
    className: "size-60 text-4xl",
  },
};

const AnimatedDemo = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) return 0;
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <AnimatedCircularProgressBar
        value={value}
        gaugePrimaryColor="#3b82f6"
        gaugeSecondaryColor="#e5e7eb"
      />
      <p className="text-center text-sm text-muted-foreground">
        Automatically animating from 0 to 100
      </p>
    </div>
  );
};

export const Animated: Story = {
  render: () => <AnimatedDemo />,
};

const InteractiveDemo = () => {
  const [value, setValue] = useState(50);

  return (
    <div className="space-y-6">
      <AnimatedCircularProgressBar
        value={value}
        gaugePrimaryColor="#3b82f6"
        gaugeSecondaryColor="#e5e7eb"
      />
      <div className="space-y-2">
        <label htmlFor="progress-slider" className="text-sm font-medium">
          Progress Value: {value}%
        </label>
        <input
          id="progress-slider"
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
};

const MultipleProgressBars = () => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="text-center space-y-2">
        <AnimatedCircularProgressBar
          value={75}
          gaugePrimaryColor="#10b981"
          gaugeSecondaryColor="#f3f4f6"
          className="size-32 text-xl"
        />
        <p className="text-sm text-muted-foreground">Success Rate</p>
      </div>
      <div className="text-center space-y-2">
        <AnimatedCircularProgressBar
          value={45}
          gaugePrimaryColor="#f59e0b"
          gaugeSecondaryColor="#f3f4f6"
          className="size-32 text-xl"
        />
        <p className="text-sm text-muted-foreground">Completion</p>
      </div>
      <div className="text-center space-y-2">
        <AnimatedCircularProgressBar
          value={90}
          gaugePrimaryColor="#3b82f6"
          gaugeSecondaryColor="#f3f4f6"
          className="size-32 text-xl"
        />
        <p className="text-sm text-muted-foreground">Performance</p>
      </div>
      <div className="text-center space-y-2">
        <AnimatedCircularProgressBar
          value={30}
          gaugePrimaryColor="#ef4444"
          gaugeSecondaryColor="#f3f4f6"
          className="size-32 text-xl"
        />
        <p className="text-sm text-muted-foreground">Issues</p>
      </div>
    </div>
  );
};

export const Multiple: Story = {
  render: () => <MultipleProgressBars />,
};
