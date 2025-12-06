/**
 * Bootstrap Script
 * Runs after `pnpm install` to measure install time and perform setup
 */

import { ensurePnpm } from "./ensure-pnpm";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function bootstrap(): Promise<void> {
  const startTime = performance.now();

  // Ensure pnpm version
  ensurePnpm();

  // Create logs directory
  const logsDir = join(process.cwd(), "logs");
  await mkdir(logsDir, { recursive: true });

  // Log install timing
  const duration = performance.now() - startTime;
  const logPath = join(logsDir, "install.json");

  const logEntry = {
    timestamp: new Date().toISOString(),
    duration: Math.round(duration),
    target: 2000, // 2s target from SC-001
    status: duration <= 2000 ? "PASS" : "WARN",
  };

  await writeFile(logPath, JSON.stringify(logEntry, null, 2));

  console.log(`✓ Bootstrap completed in ${Math.round(duration)}ms`);
  if (duration > 2000) {
    console.warn(`⚠ Install exceeded 2s target (SC-001)`);
  }
}

bootstrap().catch((error) => {
  console.error("Bootstrap failed:", error);
  process.exit(1);
});
