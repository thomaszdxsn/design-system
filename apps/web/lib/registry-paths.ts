/**
 * Registry Path Guards and Utilities
 * Enforces component roots and prevents manual writes to public/registry
 */

import { join, resolve } from "node:path";

const COMPONENT_ROOTS = ["ui", "magic", "blocks"] as const;
const REGISTRY_OUTPUT_DIR = "apps/web/public/registry";

export type ComponentRoot = (typeof COMPONENT_ROOTS)[number];

/**
 * Get the absolute path to the components directory
 */
export function getComponentsDir(): string {
  return resolve(process.cwd(), "apps/web/components");
}

/**
 * Get the absolute path to a specific component root
 */
export function getComponentRoot(root: ComponentRoot): string {
  return join(getComponentsDir(), root);
}

/**
 * Get the absolute path to the registry output directory
 */
export function getRegistryOutputDir(): string {
  return resolve(process.cwd(), REGISTRY_OUTPUT_DIR);
}

/**
 * Validate that a path is within allowed component directories
 */
export function isValidComponentPath(path: string): boolean {
  const componentsDir = getComponentsDir();
  const absolutePath = resolve(path);

  return (
    absolutePath.startsWith(componentsDir) &&
    COMPONENT_ROOTS.some((root) => absolutePath.startsWith(getComponentRoot(root)))
  );
}

/**
 * Validate that a path is NOT in the registry output directory
 * (to prevent manual edits)
 */
export function isRegistryPath(path: string): boolean {
  const registryDir = getRegistryOutputDir();
  const absolutePath = resolve(path);

  return absolutePath.startsWith(registryDir);
}

/**
 * Guard against manual writes to registry directory
 */
export function guardRegistryWrite(path: string): void {
  if (isRegistryPath(path)) {
    throw new Error(
      `Manual writes to ${REGISTRY_OUTPUT_DIR} are forbidden. Use 'bun run build:registry' instead.`,
    );
  }
}

export { COMPONENT_ROOTS };
