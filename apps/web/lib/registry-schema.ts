/**
 * Registry Schema Types
 * Based on data-model.md and contracts/openapi.yaml
 */

export type ComponentCategory = "ui" | "magic" | "blocks";

export interface RegistryFile {
  path: string;
  content: string;
}

export interface CopyCommand {
  npm: string;
  pnpm: string;
  bun: string;
}

export interface TailwindConfig {
  config?: string;
  css?: string;
}

export interface RegistryEntry {
  id: string;
  name: string;
  files: RegistryFile[];
  registryDependencies: string[];
  npmDependencies: string[];
  tailwind?: TailwindConfig;
  copyCommand: CopyCommand;
  checksum?: string;
  updatedAt?: string;
}

export interface RegistrySummary {
  id: string;
  name: string;
  category: ComponentCategory;
  version: string;
}

export interface RegistryIndex {
  components: RegistrySummary[];
}

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
