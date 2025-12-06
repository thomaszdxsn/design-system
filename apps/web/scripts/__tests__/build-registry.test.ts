/**
 * Registry Builder Tests
 * Tests for the registry build process
 */

import { describe, it, expect } from "vitest";
import { validateRegistryEntry } from "../../lib/validate-registry";
import type { RegistryEntry } from "../../lib/registry-schema";

describe("Registry Validation", () => {
  it("should validate a complete registry entry", () => {
    const entry: RegistryEntry = {
      id: "button",
      name: "Button",
      files: [
        {
          path: "components/ui/button.tsx",
          content: "export const Button = () => null;",
        },
      ],
      registryDependencies: [],
      npmDependencies: ["react"],
      copyCommand: {
        npm: "npx shadcn add button",
        pnpm: "pnpm dlx shadcn add button",
        bun: "bunx shadcn add button",
      },
      checksum: "abc123",
      updatedAt: new Date().toISOString(),
    };

    const result = validateRegistryEntry(entry);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("should fail validation for missing required fields", () => {
    const entry = {
      id: "button",
      // missing name
      files: [],
    };

    const result = validateRegistryEntry(entry);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("should fail validation for empty files array", () => {
    const entry = {
      id: "button",
      name: "Button",
      files: [], // empty
      registryDependencies: [],
      npmDependencies: [],
      copyCommand: {
        npm: "test",
        pnpm: "test",
        bun: "test",
      },
    };

    const result = validateRegistryEntry(entry);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.field === "files")).toBe(true);
  });

  it("should fail validation for incomplete copyCommand", () => {
    const entry = {
      id: "button",
      name: "Button",
      files: [{ path: "test.tsx", content: "test" }],
      registryDependencies: [],
      npmDependencies: [],
      copyCommand: {
        npm: "test",
        // missing pnpm and bun
      },
    };

    const result = validateRegistryEntry(entry);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.field === "copyCommand")).toBe(true);
  });
});
