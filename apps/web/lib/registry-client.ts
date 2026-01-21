/**
 * Registry Client
 * Fetches registry data from CDN endpoints
 */

import type { RegistryEntry, RegistryIndex } from "./registry-schema";

const REGISTRY_BASE_URL =
  process.env.REGISTRY_URL || "https://design-system-e2x.pages.dev/registry";

/**
 * Fetch the registry index
 */
export async function fetchRegistryIndex(): Promise<RegistryIndex> {
  const response = await fetch(`${REGISTRY_BASE_URL}/registry.json`);

  if (!response.ok) {
    throw new Error(`Failed to fetch registry index: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a specific component from the registry
 */
export async function fetchRegistryComponent(id: string): Promise<RegistryEntry> {
  const response = await fetch(`${REGISTRY_BASE_URL}/${id}.json`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Component "${id}" not found in registry`);
    }
    throw new Error(`Failed to fetch component: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get the local registry index (for development)
 */
export async function getLocalRegistryIndex(): Promise<RegistryIndex> {
  // In development, read from public/registry
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const registryPath = join(process.cwd(), "public/registry/registry.json");
  const content = await readFile(registryPath, "utf-8");

  return JSON.parse(content);
}

/**
 * Get a local registry component (for development)
 */
export async function getLocalRegistryComponent(id: string): Promise<RegistryEntry> {
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");

  const componentPath = join(process.cwd(), "public/registry", `${id}.json`);
  const content = await readFile(componentPath, "utf-8");

  return JSON.parse(content);
}
