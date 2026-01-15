import type { Meta, StoryObj } from "@storybook/react";
import { InteractiveHoverButton } from "./interactive-hover-button";

const meta: Meta<typeof InteractiveHoverButton> = {
  title: "Magic UI/Buttons/InteractiveHoverButton",
  component: InteractiveHoverButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveHoverButton>;

export const Default: Story = {
  args: {
    children: "Hover me",
  },
};

export const GetStarted: Story = {
  args: {
    children: "Get Started",
  },
};

export const LearnMore: Story = {
  args: {
    children: "Learn More",
  },
};

export const CustomStyle: Story = {
  args: {
    children: "Custom Button",
    className: "bg-blue-50 border-blue-200 text-blue-700",
  },
};

export const LargeButton: Story = {
  args: {
    children: "Large Interactive Button",
    className: "px-8 py-3 text-lg",
  },
};
