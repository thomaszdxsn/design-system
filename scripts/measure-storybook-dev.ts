import { execa } from "execa";

async function main(): Promise<void> {
  const start = performance.now();
  const args = ["--filter", "@design-system/web", "storybook", "--", "--smoke-test", "--ci", "-p", "6006"];

  console.log("⏱  Measuring Storybook dev startup (smoke-test)...");
  try {
    await execa("pnpm", args, { stdio: "inherit" });
    const duration = Math.round(performance.now() - start);
    console.log(`✅ Storybook smoke-test completed in ${duration}ms (budget: <1000ms)`);
  } catch (error) {
    const duration = Math.round(performance.now() - start);
    console.error(`❌ Storybook smoke-test failed after ${duration}ms`);
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

