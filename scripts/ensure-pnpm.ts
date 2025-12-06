/**
 * pnpm Runtime Guard
 * Ensures pnpm version >= 8.0 before proceeding
 */

import { execSync } from "node:child_process";

const MIN_PNPM_VERSION = "8.0.0";

function parseVersion(version: string): number[] {
  return version.split(".").map((n) => Number.parseInt(n, 10));
}

function compareVersions(a: string, b: string): number {
  const aParts = parseVersion(a);
  const bParts = parseVersion(b);

  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = aParts[i] || 0;
    const bPart = bParts[i] || 0;

    if (aPart > bPart) return 1;
    if (aPart < bPart) return -1;
  }

  return 0;
}

export function ensurePnpm(): void {
  try {
    const pnpmVersion = execSync("pnpm --version", { encoding: "utf-8" }).trim();

    if (compareVersions(pnpmVersion, MIN_PNPM_VERSION) < 0) {
      console.error(`❌ pnpm version ${pnpmVersion} is too old.`);
      console.error(`   Required: >= ${MIN_PNPM_VERSION}`);
      console.error("");
      console.error("Upgrade steps:");
      console.error("  npm install -g pnpm@latest");
      console.error("");
      process.exit(1);
    }

    console.log(`✓ pnpm ${pnpmVersion} detected`);
  } catch (error) {
    console.error("❌ pnpm is not installed.");
    console.error("");
    console.error("Installation steps:");
    console.error("  npm install -g pnpm");
    console.error("  or visit: https://pnpm.io/installation");
    console.error("");
    process.exit(1);
  }
}

// Run check if executed directly
if (require.main === module) {
  ensurePnpm();
}
