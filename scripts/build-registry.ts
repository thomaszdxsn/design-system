/**
 * Registry Builder
 * Scans components and generates registry JSON files
 */

import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, relative, basename, resolve } from "node:path";
import { createHash } from "node:crypto";
import { getComponentRoot, COMPONENT_ROOTS, type ComponentRoot } from "../apps/web/lib/registry-paths";
import type {
  RegistryEntry,
  RegistryIndex,
  RegistrySummary,
  ComponentCategory,
  CopyCommandEntry,
} from "../apps/web/lib/registry-schema";
import { validateRegistryEntry } from "../apps/web/lib/validate-registry";

const REGISTRY_VERSION = "2025-12-06";
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
 * Scan a component directory and extract metadata
 */
async function scanComponentDirectory(
  root: ComponentRoot,
): Promise<ComponentMetadata[]> {
  const rootPath = getComponentRoot(root);
  const components: ComponentMetadata[] = [];

  try {
    const files = await readdir(rootPath, { recursive: false });

    for (const file of files) {
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
  let match: RegExpExecArray | null;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];

    // Handle @/lib/utils - this requires clsx and tailwind-merge
    if (importPath === "@/lib/utils") {
      npmDeps.add("clsx");
      npmDeps.add("tailwind-merge");
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
      continue;
    }

    // Skip workspace packages
    if (importPath.startsWith("@design-system/")) {
      continue;
    }

    // Extract package name (handle scoped packages)
    const packageName = importPath.startsWith("@")
      ? importPath.split("/").slice(0, 2).join("/")
      : importPath.split("/")[0];

    if (packageName) {
      npmDeps.add(packageName);
    }
  }

  return {
    npm: Array.from(npmDeps),
    registry: Array.from(registryDeps),
  };
}

/**
 * Generate copy command for a component
 */
function generateCopyCommand(id: string, category: string): {
  npm: string;
  pnpm: string;
  bun: string;
} {
  const baseUrl = process.env.REGISTRY_URL || "https://design-system.raycast-llm.workers.dev/registry";
  const registryPath = `${baseUrl}/${id}.json`;

  return {
    npm: `npx shadcn@latest add ${registryPath}`,
    pnpm: `pnpm dlx shadcn@latest add ${registryPath}`,
    bun: `bunx shadcn@latest add ${registryPath}`,
  };
}

function buildCopyEntries(id: string, commands: { npm: string; pnpm: string; bun: string }): CopyCommandEntry[] {
  return [
    {
      id: `${id}-install`,
      kind: "install",
      content: commands.pnpm,
      description: "pnpm 安装（首选）",
      componentId: id,
    },
    {
      id: `${id}-import`,
      kind: "import",
      content: `import { ${id} } from "@/components/ui/${id}";`,
      description: "示例导入路径",
      componentId: id,
    },
    {
      id: `${id}-usage`,
      kind: "usage",
      content: `<${id.charAt(0).toUpperCase() + id.slice(1)}>Example</${id.charAt(0).toUpperCase() + id.slice(1)}>\n`,
      description: "基础用法",
      componentId: id,
    },
  ];
}

/**
 * Build registry entry from component metadata
 */
function buildRegistryEntry(component: ComponentMetadata): RegistryEntry {
  const deps = extractDependencies(component.content);
  const checksum = createHash("sha256").update(component.content).digest("hex").slice(0, 16);

  // If the component uses @/lib/utils, add "utils" as a registry dependency
  const registryDeps = [...deps.registry];
  if (component.content.includes('@/lib/utils')) {
    registryDeps.push("utils");
  }

  const commands = generateCopyCommand(component.id, component.category);

  const entry: RegistryEntry = {
    id: component.id,
    name: component.id,
    title: component.name,
    files: [
      {
        path: `components/${component.category}/${component.id}.tsx`,
        content: component.content,
      },
    ],
    registryDependencies: registryDeps,
    npmDependencies: deps.npm,
    tailwind: { config: "@design-system/config/tailwind.config" },
    copy: buildCopyEntries(component.id, commands),
    copyCommand: commands,
    checksum,
    updatedAt: new Date().toISOString(),
  };

  return entry;
}

/**
 * Main build function
 */
async function buildRegistry(): Promise<void> {
  const startTime = performance.now();

  console.log("🏗️  Building registry...");
  console.log("");

  // Scan component directories (exclude blocks - internal components)
  const allComponents: ComponentMetadata[] = [];
  const PUBLISHABLE_ROOTS: ComponentRoot[] = ["ui", "magic"];

  for (const root of PUBLISHABLE_ROOTS) {
    const components = await scanComponentDirectory(root);
    allComponents.push(...components);
    console.log(`✓ Scanned ${root}: ${components.length} components`);
  }

  console.log("");
  console.log(`📦 Found ${allComponents.length} total components`);
  console.log("");

  // Build registry entries
  const entries: RegistryEntry[] = [];
  const summaries: RegistrySummary[] = [];

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
    summaries.push({
      id: entry.id,
      name: entry.name,
      category: component.category,
      version: REGISTRY_VERSION,
    });

    console.log(`✓ Built ${component.id}`);
  }

  // Determine output dir
  const argvOut = process.argv.find((arg) => arg.startsWith("--out="))?.split("=")[1];
  const outputDir = resolve(process.cwd(), argvOut || (process.env.NODE_ENV === "production" ? DEFAULT_BUILD_OUT : DEFAULT_DEV_OUT));

  await mkdir(outputDir, { recursive: true });

  const registryPayload = {
    components: entries,
    version: REGISTRY_VERSION,
  };
  const registryPath = join(outputDir, "registry.json");
  await writeFile(registryPath, JSON.stringify(registryPayload, null, 2));

  // Write index file (summaries)
  const index: RegistryIndex = {
    components: summaries,
  };
  const indexPath = join(outputDir, "index.json");
  await writeFile(indexPath, JSON.stringify(index, null, 2));

  const duration = performance.now() - startTime;

  console.log("");
  console.log(`✅ Registry built successfully in ${Math.round(duration)}ms`);
  console.log(`   Output: ${outputDir}`);
  console.log(`   Components: ${entries.length}`);

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
  };

  await writeFile(join(logsDir, "build-registry.json"), JSON.stringify(logEntry, null, 2));
}

buildRegistry().catch((error) => {
  console.error("❌ Registry build failed:", error);
  process.exit(1);
});
