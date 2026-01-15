import type { Meta, StoryObj } from "@storybook/react";

import { NumberTicker } from "./number-ticker";

const meta: Meta<typeof NumberTicker> = {
  title: "Magic UI/Text Animation/Number Ticker",
  component: NumberTicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number" },
    },
    startValue: {
      control: { type: "number" },
    },
    direction: {
      control: "select",
      options: ["up", "down"],
    },
    delay: {
      control: { type: "number", min: 0, max: 5, step: 0.5 },
    },
    decimalPlaces: {
      control: { type: "number", min: 0, max: 4, step: 1 },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberTicker>;

export const Default: Story = {
  args: {
    value: 1000,
    className: "text-4xl font-bold",
  },
};

export const CountUp: Story = {
  args: {
    value: 5000,
    startValue: 0,
    direction: "up",
    className: "text-4xl font-bold text-blue-600",
  },
};

export const CountDown: Story = {
  args: {
    value: 0,
    startValue: 1000,
    direction: "down",
    className: "text-4xl font-bold text-red-600",
  },
};

export const WithDelay: Story = {
  args: {
    value: 999,
    startValue: 0,
    delay: 1,
    className: "text-4xl font-bold text-green-600",
  },
};

export const Decimal: Story = {
  args: {
    value: 99.99,
    startValue: 0,
    decimalPlaces: 2,
    className: "text-3xl font-bold text-purple-600",
  },
};

export const LargeNumber: Story = {
  args: {
    value: 1000000,
    startValue: 0,
    className: "text-3xl font-bold text-indigo-600",
  },
};

export const Percentage: Story = {
  args: {
    value: 100,
    startValue: 0,
    className: "text-3xl font-bold text-orange-600",
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <NumberTicker {...args} />
      <span className="text-3xl font-bold text-orange-600">%</span>
    </div>
  ),
};

export const Currency: Story = {
  args: {
    value: 9999.99,
    startValue: 0,
    decimalPlaces: 2,
    className: "text-3xl font-bold text-green-600",
  },
  render: (args) => (
    <div className="flex items-center gap-1">
      <span className="text-3xl font-bold text-green-600">$</span>
      <NumberTicker {...args} />
    </div>
  ),
};

export const MultipleCounters: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">Users:</span>
        <NumberTicker value={50000} className="text-2xl font-bold text-blue-600" />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">Revenue:</span>
        <span className="text-2xl font-bold text-green-600">$</span>
        <NumberTicker
          value={250000}
          decimalPlaces={2}
          className="text-2xl font-bold text-green-600"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">Growth:</span>
        <NumberTicker value={150} className="text-2xl font-bold text-purple-600" />
        <span className="text-2xl font-bold text-purple-600">%</span>
      </div>
    </div>
  ),
};
