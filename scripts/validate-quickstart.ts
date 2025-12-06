/**
 * Quickstart Validator
 * Validates the complete quickstart workflow
 */

import { execa } from "execa";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

interface StepResult {
  name: string;
  duration: number;
  status: "PASS" | "FAIL";
  error?: string;
}

async function runStep(name: string, command: string, args: string[]): Promise<StepResult> {
  const startTime = performance.now();

  try {
    await execa(command, args, {
      stdio: "inherit",
      cwd: process.cwd(),
    });

    const duration = performance.now() - startTime;

    return {
      name,
      duration: Math.round(duration),
      status: "PASS",
    };
  } catch (error) {
    const duration = performance.now() - startTime;

    return {
      name,
      duration: Math.round(duration),
      status: "FAIL",
      error: (error as Error).message,
    };
  }
}

async function validateQuickstart(): Promise<void> {
  console.log("🚀 Validating quickstart workflow...");
  console.log("");

  const results: StepResult[] = [];

  // Step 1: Check
  console.log("📋 Step 1: Running checks...");
  results.push(await runStep("check", "pnpm", ["check"]));
  console.log("");

  // Step 2: Build Registry
  console.log("📦 Step 2: Building registry...");
  results.push(await runStep("build:registry", "pnpm", ["build:registry"]));
  console.log("");

  // Step 3: Test
  console.log("🧪 Step 3: Running tests...");
  results.push(await runStep("test", "pnpm", ["test", "run"]));
  console.log("");

  // Generate report
  const logsDir = join(process.cwd(), "logs");
  await mkdir(logsDir, { recursive: true });

  const report = {
    timestamp: new Date().toISOString(),
    results,
    totalDuration: results.reduce((sum, r) => sum + r.duration, 0),
    passed: results.filter((r) => r.status === "PASS").length,
    failed: results.filter((r) => r.status === "FAIL").length,
  };

  await writeFile(join(logsDir, "quickstart-validation.json"), JSON.stringify(report, null, 2));

  // Summary
  console.log("📊 Validation Summary:");
  console.log("");

  for (const result of results) {
    const icon = result.status === "PASS" ? "✅" : "❌";
    console.log(`${icon} ${result.name}: ${result.duration}ms`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  }

  console.log("");
  console.log(`Total: ${report.passed}/${results.length} passed`);
  console.log(`Duration: ${report.totalDuration}ms`);

  if (report.failed > 0) {
    console.error("");
    console.error("❌ Quickstart validation failed");
    process.exit(1);
  }

  console.log("");
  console.log("✅ Quickstart validation passed");
}

validateQuickstart().catch((error) => {
  console.error("Validation failed:", error);
  process.exit(1);
});
