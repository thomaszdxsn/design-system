# Technology Stack Lock Approval

- Feature: Storybook Migration
- Decision: Adopt Storybook 8 (Vite builder) as primary documentation runtime, replace Next.js docs pages.
- Approved by: Team Lead
- Date: 2025-12-06
- Impact: Doc runtime switched to Storybook; Registry outputs served via `/registry.json`; existing components unchanged.
- Notes: Keep Bun + Biome + Tailwind CSS + Lucide + Zod unchanged; reuse `packages/config/tailwind.config`.

## 验收记录
- Storybook dev smoke（T009）已编写；启动预算 <1s 由 `scripts/measure-storybook-dev.ts` 记录。
- Registry 合约校验（T020）与 CopyButton 回退测试（T020A）已提供。
- 未发生 404；复制按钮提供回退并通过故事测试；性能数据需结合实际运行日志更新。

