import { describe, expect, test } from "vitest";

import { validateRegistryEntry } from "@/lib/validate-registry";
import type { RegistryEntry } from "@/lib/registry-schema";

describe("registry contract", () => {
  test("registry entry matches contract requirements", () => {
    const entry: RegistryEntry = {
      name: "button",
      title: "Button",
      files: [{ path: "components/ui/button.tsx", content: "<Button />" }],
      registryDependencies: [],
      npmDependencies: ["clsx"],
      copy: [
        { id: "button-install", kind: "install", content: "pnpm dlx add", description: "install" },
        { id: "button-import", kind: "import", content: "import { Button } from \"@/components/ui/button\";" },
      ],
      tailwind: { config: "@design-system/config/tailwind.config" },
      copyCommand: { npm: "npm x add", pnpm: "pnpm dlx add", bun: "bunx add" },
    };

    const validation = validateRegistryEntry(entry);
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });
});

