# Implementation Plan: Storybook Migration for Design System

**Branch**: `001-storybook-migration` | **Date**: 2025-12-06 | **Spec**: `/specs/001-storybook-migration/spec.md`
**Input**: Feature specification from `/specs/001-storybook-migration/spec.md`

## Summary

以 Storybook 8（Vite builder）重构现有基于 Next.js 的文档站，保留 React 18 + TypeScript + Tailwind 技术栈，迁移所有组件展示与交互到 `*.stories.tsx`/MDX，提升本地启动速度（<1s）与 HMR 体验，并保持 Registry 产物（兼容旧字段，静态路径 `/registry.json`）。构建输出使用 Storybook 静态站点，dev 模式沿用 `apps/web/public/registry`，build 模式输出到 `apps/web/storybook-static/registry`，并通过 `staticDirs`/部署映射在根路径暴露 `/registry.json`。

## Technical Context

**Language/Version**: TypeScript 5.x + React 18（Bun runtime）  
**Primary Dependencies**: Storybook 8 (Vite builder), Vite, Tailwind CSS, Biome, Bun, Lucide React, Zod  
**Storage**: N/A（静态资源 + JSON 产物）  
**Testing**: Storybook Interaction Tests + Storybook test-runner；必要时 `bun test` 补充组件单测  
**Target Platform**: Web 静态站（`apps/web/storybook-static`）+ 本地 Storybook dev server  
**Project Type**: web 文档站（前端单项目）  
**Performance Goals**: 开发启动 <1s，组件热更新 <2s；静态构建满足现有 CI 时间窗口  
**Constraints**: 组件样式/设计令牌需由 `packages/config` 注入；不再保留 Next.js App Router 路由；Registry 路径固定 `/registry.json`（通过 `staticDirs`/部署映射根路径）并保持向后兼容字段；静态托管需 0 404  
**Scale/Scope**: 覆盖 `apps/web/components/(ui|magic|blocks)` 全量组件故事与文档，Registry 生成与 Copy 指令全量可用

## Constitution Check（复核完成）

*GATE: pre-Phase0 状态 = 软通过 → Phase2 后正式批准并留痕。*

- Stack lock：已批准 “Storybook 8 (Vite builder)” 作为文档框架，Next.js App Router 仅作示例/兼容层；批准人：Team Lead；日期：2025-12-06；记录见 `checklists/stack-lock.md`。其他锁（Bun、Biome、Husky、Tailwind CSS + tailwindcss-animate、Lucide React、Zod）保持不变。
- SSOT：继续从 `packages/config` 提供设计令牌与全局样式，Storybook 需加载同一 Tailwind 配置。
- Copy-Paste 架构：组件源码保持可复制性；Storybook 仅作为展示，不引入仓库特定耦合。
- Translation/Shadcnify：沿用现有清洗与 `cn()` 约束，故事中禁用未经清洗的外部依赖。
- 代码规范：仅命名导出，禁用 `console.log`/`any`，2 空格缩进、分号、`bun check` 必过。
- 目录约束：组件仍在 `apps/web/components/(ui|magic|blocks)`；Registry 生成 dev 到 `apps/web/public/registry`，build 到 `apps/web/storybook-static/registry`，并通过映射暴露根级 `/registry.json`，禁止手改。
- Registry 声明：JSON 必须包含 `registryDependencies`、真实 npm 依赖与 `tailwind` 字段，禁止要求用户手改 `tailwind.config.js`。
- 性能门：Storybook dev 脚本目标 <1s，若超时需记录与优化。
- 语言：输出与交互默认中文，保留必要英文专有名词。

Phase1 后复核结果：通过，允许进入落地实施；需在后续验收中保留性能与可用性数据。

## Project Structure

### Documentation (this feature)

```text
specs/001-storybook-migration/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md              # 由 /speckit.tasks 生成
```

### Source Code (repository root)

```text
apps/web/
├── app/                  # 现有 Next.js app（将废弃文档路由）
├── components/
│   ├── ui/
│   ├── magic/
│   └── blocks/
├── public/
│   └── registry/         # dev 模式 Registry 输出
└── storybook-static/     # build 后静态站与 Registry 输出

packages/
├── config/               # Tailwind/主题/设计令牌
└── utils/                # 共享工具

scripts/
└── build-registry.ts     # Registry 构建脚本（需支持 Storybook 输出）
```

**Structure Decision**: 单前端项目，Storybook 承载文档；复用 `apps/web` 组件目录与共享 `packages/*` 配置，Registry 由 `scripts/build-registry.ts` 生成并按环境写入 `public/registry` 或 `storybook-static/registry`。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| 栈锁修改：Next.js → Storybook (Vite builder) | 文档站迁移到 Storybook 以获得更快 dev/build 与更好的组件隔离体验 | 保持 Next.js 文档站 dev >1s 且耦合路由，不满足性能与隔离需求 |
