import type { Meta, StoryObj } from "@storybook/react";
import { SparklesText } from "./sparkles-text";

const meta: Meta<typeof SparklesText> = {
  title: "Magic UI/Effects/Sparkles Text",
  component: SparklesText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    sparklesCount: {
      control: { type: "number", min: 1, max: 30 },
    },
    colors: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SparklesText>;

export const Default: Story = {
  args: {
    children: "Sparkles",
  },
};

export const CustomColors: Story = {
  args: {
    children: "Magic",
    colors: {
      first: "#FFD700",
      second: "#FF6B6B",
    },
  },
};

export const MoreSparkles: Story = {
  args: {
    children: "Shiny",
    sparklesCount: 20,
  },
};

export const BlueTheme: Story = {
  args: {
    children: "Ocean",
    colors: {
      first: "#00D4FF",
      second: "#0066FF",
    },
    sparklesCount: 15,
  },
};

export const GreenTheme: Story = {
  args: {
    children: "Nature",
    colors: {
      first: "#00FF88",
      second: "#00CC66",
    },
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Styled",
    className: "text-4xl text-purple-600",
  },
};
