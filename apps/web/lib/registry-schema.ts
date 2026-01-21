/**
 * Registry Schema Types
 * Compatible with shadcn CLI v2+ registry format
 * @see https://ui.shadcn.com/schema/registry.json
 */

export type ComponentCategory = "ui" | "magic" | "magicui" | "blocks";

/**
 * Registry item types supported by shadcn CLI v2+
 */
export type RegistryItemType =
  | "registry:ui"
  | "registry:component"
  | "registry:hook"
  | "registry:lib"
  | "registry:block"
  | "registry:page"
  | "registry:file"
  | "registry:style"
  | "registry:theme";

/**
 * File entry with type annotation for shadcn CLI v2+
 */
export interface RegistryFile {
  path: string;
  type: RegistryItemType;
  content: string;
  target?: string;
}

export interface CopyCommand {
  npm: string;
  pnpm: string;
  bun: string;
}

export interface CopyCommandEntry {
  id: string;
  kind: "install" | "import" | "usage";
  content: string;
  description?: string;
  componentId?: string;
}

export interface TailwindConfig {
  config?: Record<string, unknown>;
  css?: string;
}

/**
 * Full registry entry (individual component JSON file)
 * Compatible with shadcn CLI v2+ registry-item.json schema
 */
export interface RegistryEntry {
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: RegistryFile[];
  tailwind?: TailwindConfig;
  cssVars?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  // Extended fields for our registry
  meta?: {
    copy?: CopyCommandEntry[];
    copyCommand?: CopyCommand;
    checksum?: string;
    updatedAt?: string;
  };
}

/**
 * Index item (summary for index.json items array)
 * Contains only metadata, not full file contents
 */
export interface RegistryIndexItem {
  name: string;
  type: RegistryItemType;
  title?: string;
  description?: string;
  categories?: string[];
}

/**
 * Root index.json structure for shadcn CLI v2+
 */
export interface RegistryIndex {
  $schema: string;
  name: string;
  homepage: string;
  items: RegistryIndexItem[];
}

/**
 * Legacy types for backward compatibility during migration
 * @deprecated Will be removed in future versions
 */
export interface ComponentSource {
  id: string;
  path: string;
  category: ComponentCategory;
  dependencies: string[];
  registryDependencies: string[];
  tailwindConfig?: TailwindConfig;
  examplePath: string;
  owner: string;
  schemaVersion: string;
}
