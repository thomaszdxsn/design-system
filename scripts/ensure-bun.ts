/**
 * Bun Runtime Guard
 * Ensures Bun version >= 1.0 before proceeding
 */

const MIN_BUN_VERSION = "1.0.0";

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

function ensureBun(): void {
  const bunVersion = Bun.version;

  if (compareVersions(bunVersion, MIN_BUN_VERSION) < 0) {
    console.error(`❌ Bun version ${bunVersion} is too old.`);
    console.error(`   Required: >= ${MIN_BUN_VERSION}`);
    console.error("");
    console.error("Upgrade steps:");
    console.error("  curl -fsSL https://bun.sh/install | bash");
    console.error("  bun upgrade");
    console.error("");
    process.exit(1);
  }

  console.log(`✓ Bun ${bunVersion} detected`);
}

// Run check if executed directly
if (import.meta.main) {
  ensureBun();
}

export { ensureBun };
