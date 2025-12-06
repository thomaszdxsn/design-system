# Quickstart

## 环境准备
1) 安装依赖：`bun install`
2) 确认全局工具：Bun、Biome 已可用（由 repo 提供）。

## 开发模式（Storybook）
1) 运行：`pnpm dev:storybook:measure`（烟测+启动耗时）或 `bun run storybook`  
2) 预期：<1s 启动，侧边栏列出所有组件；保存组件后 2s 内热更新。
3) Registry（dev）：`pnpm build:registry` 生成到 `apps/web/public/registry/registry.json`。

## 构建静态站
1) 运行：`pnpm --filter @design-system/web storybook:build`
2) Registry（build）：自动写入 `apps/web/storybook-static/registry/registry.json`（由 `build:registry` 注入）；如需自定义：`pnpm build:registry -- --out apps/web/storybook-static/registry`
3) 产物：`apps/web/storybook-static` 可直接上传到静态托管，`/registry.json` 可被下游脚本访问。

## 页面迁移指引
1) 定位旧文档：`apps/web/app/(docs)/components/*/page.tsx`
2) 按组件创建 `*.stories.tsx`（CSF3），将示例拆分为 `Default`/`Variants`/`Interactions`，必要时补充 `.mdx` 叙述。
3) 引入全局装饰器/主题：在 `apps/web/.storybook/preview.ts` 复用 `packages/config/tailwind.config` 与主题切换。

## 测试
1) 交互测试：`bun storybook test`（或 `npx storybook@latest test --watch`），覆盖关键交互。
2) 视觉/可访问性（可选）：使用 Storybook 内建 A11y/截图插件跑关键组件。

## 验收自检
- 组件故事 100% 覆盖，亮/暗主题无破版。
- `/registry.json` 在 dev 与 build 场景均可访问，字段兼容旧 Schema。
- Copy 按钮可复制安装/引入/示例代码，并给出成功提示。

