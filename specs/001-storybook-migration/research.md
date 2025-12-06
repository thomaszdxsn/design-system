# Research Findings

## 1) Storybook 构建与运行
- Decision: 采用 Storybook 8 + Vite builder，运行 `storybook dev`（Bun 包装）和 `storybook build`，输出到 `apps/web/storybook-static`。
- Rationale: 与 Vite 共享缓存，启动与 HMR 延迟显著低于 Webpack；Storybook 官方推荐路径，兼容 React 18 + Tailwind。
- Alternatives considered: Webpack builder（启动慢且配置冗长，违背 <1s 目标）；保留 Next.js + MDX 页面（不再符合文档体验目标且性能不足）。

## 2) Registry 产物路径与兼容
- Decision: 开发模式继续生成 `apps/web/public/registry/registry.json`，构建后生成 `apps/web/storybook-static/registry/registry.json`；在构建流程中复制或输出到 Storybook 静态目录，保持 `/registry.json` 路径稳定。
- Rationale: Storybook 静态站默认根目录为 `storybook-static`，直接放置 registry 产物可被静态托管；保留 `public/registry` 便于本地 dev/legacy 对齐。
- Alternatives considered: 仅保留 `public/registry` 并额外 CDN 映射（易遗漏同步，发布路径不直观）；运行时接口代理（增加复杂度，与静态站目标不符）。

## 3) Tailwind 与主题切换
- Decision: Storybook 复用 `packages/config/tailwind.config` 作为 preset；在 `preview.ts` 设置全局装饰器，使用 `data-theme` + `class` 控制亮/暗主题，沿用现有 token；在 stories 中使用与组件一致的 `cn()`。
- Rationale: 直接复用配置可消除样式偏差，确保暗黑模式一致；保持与组件运行环境等价，避免双份配置。
- Alternatives considered: Storybook 独立 Tailwind 配置（易产生颜色/spacing 偏差，违背 SSOT）；CSS 变量手动注入（需要额外维护，风险高）。

## 4) Copy 指令实现
- Decision: 在故事/文档内使用通用 `CopyButton` 组件，调用 `navigator.clipboard.writeText`，失败时回退到 `document.execCommand("copy")`；提供 `aria-live` 成功提示，覆盖 install/import 片段。
- Rationale: 满足浏览器权限差异与无障碍要求；与现有组件范式一致，易在 Storybook 中复用。
- Alternatives considered: Storybook 自定义 addon（开发成本高且超出“暂缓复杂 addon”范围）；依赖第三方 Clipboard 库（增加依赖且与 Bun/Tree-shaking 不匹配）。

## 5) 页面迁移策略
- Decision: 将 `apps/web/app/(docs)/components/*/page.tsx` 转为 CSF3 `*.stories.tsx`；复用现有示例拆分为 stories（Default/Variants/Interactions），如需长文档使用 MDX；移除 Next.js 特有路由逻辑。
- Rationale: CSF3 是 Storybook 推荐标准，支持 Controls/Interactions；MDX 仅用于需要叙述性文档的组件，控制范围。
- Alternatives considered: 保留 Next.js 页面作为 iframe 嵌入（双重构建，维护成本高）；全部 MDX 化（重写成本大且缺少交互控件）。

## 6) 测试与性能守护
- Decision: 使用 Storybook test-runner 执行交互测试，关键组件补充视觉回归截图（可选）；在 CI 中记录 dev 启动和 build 用时，超出阈值时优先优化。
- Rationale: test-runner 与 CSF stories 共享上下文，最小化额外测试编写；性能数据可直接佐证 <1s 目标。
- Alternatives considered: 仅依赖手动检查（风险高）；引入 Cypress/E2E 针对静态站（现阶段超出范围，增加维护成本）。

