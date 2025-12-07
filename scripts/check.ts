/**
 * Check Script with Timing
 * Runs Biome lint/format with performance tracking
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { execa } from "execa";

const LINT_BUDGET_MS = 5000; // Increased budget for realistic usage

async function check(): Promise<void> {
  const startTime = performance.now();
  const isStaged = process.argv.includes("--staged");

  try {
    // Run Biome check
    const args = isStaged ? ["check", "--write", "--staged", "."] : ["check", "--write", "."];

    await execa("biome", args, { stdio: "inherit" });

    const duration = performance.now() - startTime;

    // Log timing
    const logsDir = join(process.cwd(), "logs");
    await mkdir(logsDir, { recursive: true });

    const logEntry = {
      timestamp: new Date().toISOString(),
      duration: Math.round(duration),
      budget: LINT_BUDGET_MS,
      status: duration <= LINT_BUDGET_MS ? "PASS" : "WARN",
      mode: isStaged ? "staged" : "full",
    };

    await writeFile(join(logsDir, "check.json"), JSON.stringify(logEntry, null, 2));

    // biome-ignore lint/suspicious/noConsoleLog: CLI output is intentional
    console.log(`✓ Check completed in ${Math.round(duration)}ms`);

    if (duration > LINT_BUDGET_MS) {
      console.warn(`⚠ Check exceeded ${LINT_BUDGET_MS}ms budget`);
      if (duration > LINT_BUDGET_MS * 2) {
        console.error(`❌ Check took ${Math.round(duration)}ms, significantly over budget`);
        process.exit(1);
      }
    }
  } catch (error) {
    console.error("Check failed:", error);
    process.exit(1);
  }
}

check();
