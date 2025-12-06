import type { Meta, StoryObj } from "@storybook/react";

import { Spotlight, type SpotlightProps } from "./spotlight";

const meta: Meta<SpotlightProps> = {
  title: "Magic/Spotlight",
  component: Spotlight,
  argTypes: {
    accent: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<SpotlightProps>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Hover anywhere inside the card.</p>
        <p className="text-base font-semibold">Dynamic spotlight follows cursor.</p>
      </div>
    ),
  },
};

