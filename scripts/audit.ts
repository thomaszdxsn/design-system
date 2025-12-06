/**
 * Audit Script
 * Runs pnpm audit and generates a summary report
 */

import { execa } from "execa";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function audit(): Promise<void> {
  console.log("🔍 Running security audit...");
  console.log("");

  try {
    // Run pnpm audit
    const result = await execa("pnpm", ["audit", "--json"], {
      reject: false,
    });

    const reportsDir = join(process.cwd(), "reports");
    await mkdir(reportsDir, { recursive: true });

    // Save raw audit output
    const auditPath = join(reportsDir, "audit.json");
    await writeFile(auditPath, result.stdout);

    // Parse and summarize
    let auditData;
    try {
      auditData = JSON.parse(result.stdout);
    } catch {
      console.warn("⚠ Could not parse audit output");
      auditData = { advisories: {} };
    }

    const advisories = auditData.advisories || {};
    const advisoryCount = Object.keys(advisories).length;

    // Count by severity
    const severityCounts = {
      critical: 0,
      high: 0,
      moderate: 0,
      low: 0,
      info: 0,
    };

    for (const advisory of Object.values(advisories) as Array<{ severity: string }>) {
      const severity = advisory.severity?.toLowerCase() || "info";
      if (severity in severityCounts) {
        severityCounts[severity as keyof typeof severityCounts]++;
      }
    }

    // Generate summary
    const summary = {
      timestamp: new Date().toISOString(),
      totalAdvisories: advisoryCount,
      severityCounts,
      status:
        severityCounts.critical > 0 || severityCounts.high > 0 ? "FAIL" : "PASS",
    };

    const summaryPath = join(reportsDir, "audit-summary.json");
    await writeFile(summaryPath, JSON.stringify(summary, null, 2));

    console.log("✅ Audit complete");
    console.log(`   Total advisories: ${advisoryCount}`);
    console.log(`   Critical: ${severityCounts.critical}`);
    console.log(`   High: ${severityCounts.high}`);
    console.log(`   Moderate: ${severityCounts.moderate}`);
    console.log(`   Low: ${severityCounts.low}`);
    console.log("");
    console.log(`   Reports saved to: ${reportsDir}`);

    if (summary.status === "FAIL") {
      console.error("");
      console.error("❌ Audit failed: Critical or high severity vulnerabilities found");
      process.exit(1);
    }
  } catch (error) {
    console.error("Audit failed:", error);
    process.exit(1);
  }
}

audit();
