import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["**/*.test.ts", "**/__tests__/**/*.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "dist/",
        "**/*.config.ts",
        "**/*.d.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./apps/web"),
    },
  },
});
