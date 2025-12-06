# Implementation Plan: Bun/Biome Shadcn Registry

**Branch**: `001-bun-biome-registry` | **Date**: 2025-12-06 | **Spec**: `/specs/001-bun-biome-registry/spec.md`
**Input**: Feature specification from `/specs/001-bun-biome-registry/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

以 Bun 1.x 作为工作区运行时，重构 Next.js App Router 组件文档站与 Shadcn Registry 构建链路：统一 Biome + Husky 质量门、Tailwind 主题集中在 `packages/config`，通过 Bun 脚本生成 `apps/web/public/registry/*.json`，提供 npm/pnpm/bun 三类 Copy Command，确保安装 ≤2s、开发/构建/校验单次操作均保持 <1s 体验。

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (strict) on Bun 1.0+; Next.js App Router (14+ target)  
**Primary Dependencies**: Next.js, Tailwind CSS + `tailwindcss-animate`, Biome, Husky, Bun test, `lucide-react`, `zod`, local `cn()` utils  
**Storage**: N/A（静态站点与生成的 JSON 产物）  
**Testing**: `bun test`（脚本与 utilities），`bun check` 作为 lint/format gate  
**Target Platform**: Web 前端（Next.js app router）；Registry 通过 CDN/边缘静态托管；基线覆盖 macOS (x64/ARM)、Windows、CI Alpine 容器并验证关键命令  
**Project Type**: Bun workspaces monorepo（apps + packages + scripts）  
**Performance Goals**: 安装 ≤2s（基线），开发启动 <1s，Registry 构建 <1s，lint/format <200ms，Copy Command 成功率 100%  
**Constraints**: 栈锁（Bun/Biome/Husky/Next/Tailwind/Lucide/Zod），禁 default export/`console.log`/`any`，2 空格+分号；Registry 仅通过脚本生成，公共 tokens 只在 `packages/config`；性能操作超过 1 秒需记录并优先优化；包管理器版本通过 corepack/Bun pin；CDN TTL/etag 与 SLA 需声明；Registry schema 需版本化与迁移指引  
**Scale/Scope**: 组件库与文档站（apps/web），注册表覆盖 ui/magic/blocks 组件，公共配置在 packages/config 与 packages/utils

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Stack lock: Bun runtime, Biome formatter, Husky hooks, Next.js App Router, Tailwind CSS + tailwindcss-animate, Lucide React, Zod。严禁替代。  
- SSOT: 颜色/圆角/动画等设计决策只放 `packages/config`，组件层禁止硬编码。  
- Copy-Paste 架构：交付源码，组件需可直接复制到任意 Next.js 项目且无仓库特定假设。  
- Translation/Shadcnify：外部组件入库前必须 Shadcn 化 + Biome 化；使用本地 `cn()`；颜色按映射清洗；动画参数抽离常量或 CSS 变量。  
- 代码规范：仅命名导出；禁止 `console.log` 与 `any`（改用 `unknown` + Zod）；2 空格缩进，强制分号，`bun check` 必过。  
- 目录约束：组件放置于 `apps/web/components/(ui|magic|blocks)`，公共注册表生成于 `apps/web/public/registry` 严禁手改。  
- Registry 声明：生成 JSON 必须列出 `registryDependencies`、真实 npm 依赖及 `tailwind` 配置；禁止要求用户手动修改 `tailwind.config.js`。  
- 性能门：开发命令/脚本需 <1s，如超时需记录并优先优化。  
- 语言：Spec-Kit 产出与 Agent 交互默认中文，可保留必要英文专有名词。  

Status: PASS（无例外需求）。

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
/Users/zhouyang/Coding/personal/design-system/
├── package.json            # Bun workspaces roots
├── bunfig.toml             # Bun workspace/runner tuning
├── bun.lockb
├── biome.json              # Workspace-wide Biome config
├── apps/
│   └── web/                # Next.js App Router + registry host
│       ├── app/            # Docs routes
│       ├── components/
│       │   ├── ui/
│       │   ├── magic/
│       │   └── blocks/
│       ├── lib/            # registry helpers (paths, schema)
│       ├── public/
│       │   └── registry/   # generated JSON (read-only)
│       └── scripts/
│           └── build-registry.ts
├── packages/
│   ├── config/             # Biome/Tailwind/theme tokens (SSOT)
│   └── utils/              # shared helpers incl. cn()
├── scripts/                # Bun entrypoints (registry, checks)
└── specs/001-bun-biome-registry/
    ├── plan.md
    ├── research.md
    ├── data-model.md
    ├── quickstart.md
    └── contracts/
```

**Structure Decision**: 采用单仓 monorepo，应用层集中在 `apps/web`，共享配置/工具在 `packages/{config,utils}`，注册表脚本与入口在 `scripts/` 与 `apps/web/scripts`。

## Checklist Gap Alignment (from quality-compatibility.md)

- CHK012/017/038: Registry schema 必需字段/版本化/单一真源与迁移策略 → tasks T033、T034。  
- CHK014/029/032: CDN 版本化/TTL/etag、SLA 与回源/降级方案 → tasks T034。  
- CHK016: 脚本命名一致性与公开接口对齐 → task T004a。  
- CHK023: 预览/构建失败的可观测性与恢复路径 → task T040。  
- CHK028: 性能超阈值 Telemetry/告警策略 → task T035。  
- CHK030/037: 包管理器版本范围与 corepack/Bun pin → task T038。  
- CHK031/033/036: 基线硬件/网络/OS 定义与跨平台验证矩阵 → tasks T036、T037。  
- CHK035: FR/SC 与 tasks/验收映射表 → task T039。  

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
