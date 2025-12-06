import type { Meta, StoryObj } from "@storybook/react";

import { ComponentDisplay } from "./component-display";

const sampleComponent = {
  id: "button",
  name: "Button",
  files: [
    {
      path: "components/ui/button.tsx",
      content: "<Button>Example</Button>",
    },
  ],
  registryDependencies: ["utils"],
  npmDependencies: ["clsx", "tailwind-merge"],
  copyCommand: {
    npm: "npm dlx shadcn@latest add https://example.com/registry/button.json",
    pnpm: "pnpm dlx shadcn@latest add https://example.com/registry/button.json",
    bun: "bunx shadcn@latest add https://example.com/registry/button.json",
  },
  checksum: "deadbeef",
  updatedAt: new Date().toISOString(),
};

const meta: Meta<typeof ComponentDisplay> = {
  title: "Blocks/ComponentDisplay",
  component: ComponentDisplay,
};

export default meta;

type Story = StoryObj<typeof ComponentDisplay>;

export const Default: Story = {
  args: {
    component: sampleComponent,
  },
};

