<!--
Sync Impact Report
- Version change: unversioned → 1.0.0
- Modified principles: defined initial set (SSOT, Copy-Paste, Translation, Performance, Stack Lock)
- Added sections: Engineering Standards & Protocols; Delivery Workflow & Language
- Removed sections: none
- Templates updated: ✅ .specify/templates/plan-template.md ; ✅ .specify/templates/tasks-template.md
- Follow-ups: none
-->

# Spec-Kit Constitution

## Core Principles

### I. Single Source of Truth (SSOT)
所有设计决策（颜色、圆角、动画）必须且只能定义在 `packages/config` 中，组件层严禁硬编码。

### II. Copy-Paste Architecture
交付物仅为源码，不发布 npm 包；所有组件必须考虑被直接复制到任意 Next.js 项目的便携性。

### III. Translation Pattern（Shadcnify + Biome）
外部组件（如 MagicUI、Aceternity）进入 Registry 前必须完成 Shadcn 化与 Biome 化，统一 API、样式与格式。

### IV. Performance by Default
开发体验必须“瞬时”；任何操作超过 1 秒视为违约，需优先优化（以 Bun 工具链保障）。

### V. Technology Stack Lock
技术栈固定：Bun、Biome、Husky、Next.js（App Router）、Tailwind CSS + tailwindcss-animate、Lucide React、Zod。禁止引入替代品。

## Engineering Standards & Protocols

### Coding Standards
- 禁用 `default` exports，统一使用命名导出。
- 禁用 `console.log` 于提交代码。
- 禁用 `any`；复杂类型使用 `unknown` 并配合 Zod 校验。
- 文件命名使用 `kebab-case`（例如 `meteor-card.tsx`、`use-click-outside.ts`）。

### Style & Linting
- 所有代码必须通过 `bun check`；Import 顺序由 Biome 管理。
- 缩进为 2 spaces，必须使用分号。

### Component Structure
组件文件遵循“导入 → 类型 → 组件定义”的解剖顺序：

```tsx
// 1. Imports (Standard -> 3rd Party -> Local)
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 2. Types/Interfaces
interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow";
}

// 3. Component Definition
export function MyComponent({ className, variant, ...props }: MyComponentProps) {
  return (
    <div className={cn("bg-background", className)} {...props}>
      {/* content */}
    </div>
  );
}
```

### Shadcnify Protocol
- 颜色清洗：禁用 `#000`、`#ffffff`、`bg-blue-500`、`text-slate-900`；统一映射为 `bg-background/bg-card`、`text-foreground/text-primary-foreground`、`text-muted-foreground`、`bg-primary`、`border-border/border-input`。
- 依赖清洗：`clsx` 与 `tailwind-merge` 组合替换为本地 `cn()`；非 Lucide 图标替换为 Lucide 等价物；Framer Motion 参数抽离为常量或 CSS 变量，避免散落 JSX。

### Directory Structure

```text
root/
├── apps/web/
│   ├── app/                # Next.js Pages (仅用于 Playbook 展示)
│   ├── components/
│   │   ├── ui/             # 基础原子组件 (Button, Input)
│   │   ├── magic/          # 特效组件 (Meteor, Glow)
│   │   └── blocks/         # 组合区块 (Pricing Section)
│   └── public/registry/    # [Generated] 禁止手动编辑
├── packages/
│   ├── config/             # 共享配置 (Biome, Tailwind)
│   └── utils/              # 共享工具函数
└── scripts/                # 构建脚本 (Bun)
```

### Registry Definition
- 若组件使用了其他 Registry 组件，必须在生成的 JSON 中声明 `registryDependencies`（例如 Button → `"registryDependencies": ["button"]`）。
- JSON 必须列出真实 npm 依赖（如 `framer-motion`、`lucide-react`）。
- 若需自定义动画或 keyframes，必须在 JSON 的 `tailwind` 字段声明，禁止要求用户手改 `tailwind.config.js`。

## Delivery Workflow & Language
- Git 工作流：遵循 Conventional Commits；提交必须通过 Husky 触发的 `bun check`；`main` 始终可发布，新组件开发在 `feat/<component-name>` 分支。
- 性能守门：开发流程和脚本需保持 <1s 响应，如超时必须优先优化。
- 语言与产出：Spec-Kit 生成物与 Agent 交互默认使用中文；文档中保留必要的英文专有名词。

## Governance
- 宪章优先级最高；规划、设计、实现、Review 必须对照本宪章执行 Constitution Check。
- 修订流程：任何变更需记录版本、变更内容与影响；批准后更新宪章与相关模板。
- 版本策略：采用语义化版本；新增原则或扩展指导为 MINOR，破坏性调整为 MAJOR，文字澄清为 PATCH。
- 合规审查：PR 审查需验证技术栈锁定、Shadcnify 清洗、目录放置、注册表声明、命名导出与无 `console.log` 等要求。
- 例外管理：如需违反原则，必须在计划与评审中记录理由与临时性，并在后续版本纠偏。

**Version**: 1.0.0 | **Ratified**: 2025-12-06 | **Last Amended**: 2025-12-06
