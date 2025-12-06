import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import { Button, type ButtonProps } from "./button";

const meta: Meta<ButtonProps> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "var(--background)" },
        { name: "dark", value: "hsl(var(--foreground))" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  args: { children: "Button" },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="default">
        Default
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link
      </Button>
    </div>
  ),
  args: { children: "Button" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="default">
        Default
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="icon" aria-label="Icon button">
        ⭐️
      </Button>
    </div>
  ),
  args: { children: "Button" },
};

export const Interactions: Story = {
  args: { children: "Click me" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", { name: /click me/i });
    await userEvent.click(button);
  },
};

