import type { Preview } from "@storybook/react";

import "../styles/globals.css";
import { cn } from "../lib/utils";

const preview: Preview = {
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Light or dark theme",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.theme === "dark";
      return (
        <div
          className={cn(
            "min-h-screen bg-background text-foreground",
            isDark ? "dark" : undefined,
          )}
          data-theme={context.globals.theme}
        >
        <Story />
      </div>
      );
    },
  ],
};

export default preview;

