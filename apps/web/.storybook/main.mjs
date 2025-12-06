import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { mergeConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storyContentGlobs = [
  path.resolve(__dirname, "../components/**/*.{ts,tsx,mdx}"),
  path.resolve(__dirname, "./**/*.{ts,tsx,mdx}"),
];

// 直接定义 tailwind 配置，避免动态导入
const storybookTailwindConfig = {
  darkMode: ["class"],
  content: storyContentGlobs,
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

/** @type {import('@storybook/react-vite').StorybookConfig} */
const config = {
  stories: [
    "../components/**/*.stories.@(ts|tsx|mdx)",
    "../components/**/*.mdx",
  ],
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
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
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
      css: {
        postcss: {
          plugins: [
            tailwindcss(storybookTailwindConfig),
            autoprefixer(),
            ...(viteConfig.css?.postcss?.plugins ?? []),
          ],
        },
      },
    }),
};

export default config;
