/**
 * Registry Builder
 * Generates shadcn CLI v2+ compatible registry JSON files
 * @see https://ui.shadcn.com/schema/registry.json
 */

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { type ComponentRoot, getComponentRoot } from "../apps/web/lib/registry-paths";
import type {
  ComponentCategory,
  RegistryEntry,
  RegistryIndex,
  RegistryIndexItem,
  RegistryItemType,
} from "../apps/web/lib/registry-schema";
import { validateRegistryEntry, validateRegistryIndex } from "../apps/web/lib/validate-registry";

const REGISTRY_SCHEMA_URL = "https://ui.shadcn.com/schema/registry.json";
const REGISTRY_NAME = "@ds";
const REGISTRY_HOMEPAGE = "https://design-system-e2x.pages.dev";
const BUILD_BUDGET_MS = 1000; // SC-002
const DEFAULT_DEV_OUT = "apps/web/public/registry";
const DEFAULT_BUILD_OUT = "apps/web/storybook-static/registry";

interface ComponentMetadata {
  id: string;
  name: string;
  category: ComponentCategory;
  path: string;
  content: string;
}

/**
 * Map component category to registry item type
 */
function getRegistryType(category: ComponentCategory): RegistryItemType {
  switch (category) {
    case "ui":
    case "magic":
    case "magicui":
      return "registry:ui";
    case "blocks":
      return "registry:block";
    default:
      return "registry:ui";
  }
}

/**
 * Get file path in shadcn style (e.g., "ui/button.tsx")
 */
function getShadcnStylePath(category: ComponentCategory, id: string): string {
  // Map our categories to shadcn-style paths
  const categoryPath = category === "magicui" ? "magicui" : category;
  return `${categoryPath}/${id}.tsx`;
}

/**
 * Scan a component directory and extract metadata
 */
async function scanComponentDirectory(root: ComponentRoot): Promise<ComponentMetadata[]> {
  const rootPath = getComponentRoot(root);
  const components: ComponentMetadata[] = [];

  try {
    const files = await readdir(rootPath, { recursive: false });

    for (const file of files) {
      // Skip story files - they are not installable components
      if (file.includes(".stories.")) {
        continue;
      }
      if (file.endsWith(".tsx") || file.endsWith(".ts")) {
        const filePath = join(rootPath, file);
        const content = await readFile(filePath, "utf-8");
        const id = basename(file, file.endsWith(".tsx") ? ".tsx" : ".ts");
        const name = id
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        components.push({
          id,
          name,
          category: root,
          path: filePath,
          content,
        });
      }
    }
  } catch (error) {
    // Directory might not exist yet
    console.warn(`⚠ Could not scan ${root}:`, (error as Error).message);
  }

  return components;
}

/**
 * Extract dependencies from component content
 */
function extractDependencies(content: string): {
  npm: string[];
  registry: string[];
} {
  const npmDeps: Set<string> = new Set();
  const registryDeps: Set<string> = new Set();

  // Extract npm dependencies from imports
  const importRegex = /import\s+.*?\s+from\s+["']([^"']+)["']/g;
  let match: RegExpExecArray | null = importRegex.exec(content);

  while (match !== null) {
    const importPath = match[1];

    // Handle @/lib/utils - this requires clsx and tailwind-merge
    if (importPath === "@/lib/utils") {
      npmDeps.add("clsx");
      npmDeps.add("tailwind-merge");
      match = importRegex.exec(content);
      continue;
    }

    // Skip relative imports and other local imports
    if (importPath.startsWith(".") || importPath.startsWith("@/")) {
      // Check if it's a registry dependency (other components)
      if (importPath.includes("/components/")) {
        const componentName = importPath.split("/").pop();
        if (componentName) {
          registryDeps.add(componentName);
        }
      }
      match = importRegex.exec(content);
      continue;
    }

    // Skip workspace packages
    if (importPath.startsWith("@design-system/")) {
      match = importRegex.exec(content);
      continue;
    }

    // Extract package name (handle scoped packages)
    const packageName = importPath.startsWith("@")
      ? importPath.split("/").slice(0, 2).join("/")
      : importPath.split("/")[0];

    if (packageName) {
      npmDeps.add(packageName);
    }
    match = importRegex.exec(content);
  }

  return {
    npm: Array.from(npmDeps),
    registry: Array.from(registryDeps),
  };
}

/**
 * Build registry entry from component metadata
 * Outputs shadcn CLI v2+ compatible format
 */
function buildRegistryEntry(component: ComponentMetadata): RegistryEntry {
  const deps = extractDependencies(component.content);
  const registryType = getRegistryType(component.category);

  // If the component uses @/lib/utils, add "utils" as a registry dependency
  const registryDeps = [...deps.registry];
  if (component.content.includes("@/lib/utils")) {
    registryDeps.push("utils");
  }

  const entry: RegistryEntry = {
    name: component.id,
    type: registryType,
    title: component.name,
    description: `${component.name} component`,
    dependencies: deps.npm.length > 0 ? deps.npm : undefined,
    registryDependencies: registryDeps.length > 0 ? registryDeps : undefined,
    files: [
      {
        path: getShadcnStylePath(component.category, component.id),
        type: registryType,
        content: component.content,
      },
    ],
  };

  return entry;
}

/**
 * Main build function
 */
async function buildRegistry(): Promise<void> {
  const startTime = performance.now();

  console.info("🏗️  Building registry (shadcn CLI v2+ format)...");
  console.info("");

  // Scan component directories (exclude blocks - internal components)
  const allComponents: ComponentMetadata[] = [];
  const PUBLISHABLE_ROOTS: ComponentRoot[] = ["ui", "magic", "magicui"];

  for (const root of PUBLISHABLE_ROOTS) {
    const components = await scanComponentDirectory(root);
    allComponents.push(...components);
    console.info(`✓ Scanned ${root}: ${components.length} components`);
  }

  console.info("");
  console.info(`📦 Found ${allComponents.length} total components`);
  console.info("");

  // Build registry entries
  const entries: RegistryEntry[] = [];
  const indexItems: RegistryIndexItem[] = [];

  for (const component of allComponents) {
    const entry = buildRegistryEntry(component);

    // Validate entry
    const validation = validateRegistryEntry(entry);
    if (!validation.valid) {
      console.error(`❌ Validation failed for ${component.id}:`);
      for (const error of validation.errors) {
        console.error(`   - ${error.field}: ${error.message}`);
      }
      process.exit(1);
    }

    entries.push(entry);

    // Create index item (summary without file contents)
    indexItems.push({
      name: entry.name,
      type: entry.type,
      title: entry.title,
      description: entry.description,
      categories: [component.category],
    });

    console.info(`✓ Built ${component.id}`);
  }

  // Determine output dir
  const argvOut = process.argv.find((arg) => arg.startsWith("--out="))?.split("=")[1];
  const outputDir = resolve(
    process.cwd(),
    argvOut || (process.env.NODE_ENV === "production" ? DEFAULT_BUILD_OUT : DEFAULT_DEV_OUT),
  );

  await mkdir(outputDir, { recursive: true });

  // Write individual component JSON files
  for (const entry of entries) {
    const componentPath = join(outputDir, `${entry.name}.json`);
    await writeFile(componentPath, JSON.stringify(entry, null, 2));
  }
  console.info("");
  console.info(`✓ Generated ${entries.length} individual component files`);

  // Build and validate index
  const index: RegistryIndex = {
    $schema: REGISTRY_SCHEMA_URL,
    name: REGISTRY_NAME,
    homepage: REGISTRY_HOMEPAGE,
    items: indexItems,
  };

  const indexValidation = validateRegistryIndex(index);
  if (!indexValidation.valid) {
    console.error("❌ Index validation failed:");
    for (const error of indexValidation.errors) {
      console.error(`   - ${error.field}: ${error.message}`);
    }
    process.exit(1);
  }

  // Write registry.json (shadcn CLI uses this filename for registry index)
  const registryPath = join(outputDir, "registry.json");
  await writeFile(registryPath, JSON.stringify(index, null, 2));

  const duration = performance.now() - startTime;

  console.info("");
  console.info(`✅ Registry built successfully in ${Math.round(duration)}ms`);
  console.info(`   Output: ${outputDir}`);
  console.info(`   Components: ${entries.length}`);
  console.info("   Format: shadcn CLI v2+");

  if (duration > BUILD_BUDGET_MS) {
    console.warn("");
    console.warn(`⚠ Build exceeded ${BUILD_BUDGET_MS}ms budget (SC-002)`);
  }

  // Log timing
  const logsDir = join(process.cwd(), "logs");
  await mkdir(logsDir, { recursive: true });

  const logEntry = {
    timestamp: new Date().toISOString(),
    duration: Math.round(duration),
    budget: BUILD_BUDGET_MS,
    status: duration <= BUILD_BUDGET_MS ? "PASS" : "WARN",
    componentCount: entries.length,
    format: "shadcn-v2",
  };

  await writeFile(join(logsDir, "build-registry.json"), JSON.stringify(logEntry, null, 2));
}

buildRegistry().catch((error) => {
  console.error("❌ Registry build failed:", error);
  process.exit(1);
});
