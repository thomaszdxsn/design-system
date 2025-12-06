/**
 * Dev Check Script with Watch Mode
 * Runs Biome check in watch mode for component development
 */

import { execa } from "execa";

async function devCheck(): Promise<void> {
  console.log("🔍 Starting Biome check in watch mode...");
  console.log("   Watching: apps/web/components/**");
  console.log("");

  try {
    // Run Biome check in watch mode
    await execa(
      "biome",
      [
        "check",
        "--write",
        "--watch",
        "apps/web/components",
      ],
      { stdio: "inherit" },
    );
  } catch (error) {
    console.error("Dev check failed:", error);
    process.exit(1);
  }
}

devCheck();
