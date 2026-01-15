import path from "node:path";

import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import { mergeConfig } from "vite";
import type { UserConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx|mdx)", "../components/**/*.mdx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-measure",
  ],
  staticDirs: [
    { from: path.resolve(__dirname, "../public"), to: "/" },
    { from: path.resolve(__dirname, "../public/registry"), to: "/registry" },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (viteConfig: UserConfig) =>
    mergeConfig(viteConfig, {
      plugins: [tailwindcss()],
      resolve: {
        alias: [
          { find: "@", replacement: path.resolve(__dirname, "..") },
          { find: "~", replacement: path.resolve(__dirname, "..") },
          {
            find: /^@design-system\/utils/,
            replacement: path.resolve(__dirname, "../../packages/utils"),
          },
        ],
      },
    }),
};

export default config;
