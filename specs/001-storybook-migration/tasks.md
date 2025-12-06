---
description: "Tasks for Storybook Migration for Design System"
---

# Tasks: Storybook Migration for Design System

**Input**: Design documents from `/specs/001-storybook-migration/`

**Tests**: Storybook test-runner and contract tests are included because验收场景要求可独立验证

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 初始化 Storybook 基础运行与命令

- [x] T000 清理或重命名重复前缀的 spec 目录，仅保留 `001-storybook-migration`
- [x] T001 更新 Storybook dev/build/test 脚本以 Bun 运行 `apps/web/package.json`
- [x] T002 创建 Storybook Vite builder 主配置（stories globs 指向组件目录）于 `apps/web/.storybook/main.ts`
- [x] T003 建立 Storybook TypeScript 配置继承根目录并同步路径别名于 `apps/web/.storybook/tsconfig.json`
- [x] T004 在 `apps/web/.storybook/preview.tsx` 引入全局样式/基础 CSS（复用 `packages/config`）确保故事渲染不缺依赖

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 共享底层能力，所有用户故事开始前必须完成

- [x] T005 将 Storybook Vite builder 接入 `packages/config/tailwind.config` 并注入全局 PostCSS 预设于 `apps/web/.storybook/main.ts`
- [x] T006 配置全局装饰器/Provider（设计令牌、布局容器、`cn()` 帮助）于 `apps/web/.storybook/preview.tsx` 以保证组件可渲染
- [x] T007 启用核心 addons（docs/essentials/interactions/a11y/measure）并声明静态资源/registry 目录映射于 `apps/web/.storybook/main.ts`
- [x] T008 对齐模块解析与别名（`@`/`~` 指向 `apps/web`，packages/* 共享）于 `apps/web/.storybook/tsconfig.json` 与 `apps/web/.storybook/main.ts`

---

## Phase 3: User Story 1 - 组件开发者在隔离环境中调试组件 (Priority: P1) 🎯 MVP

**Goal**: 开发者可在 Storybook 本地预览并调试组件，热更新可见  
**Independent Test**: 运行本地命令后侧边栏列出组件，保存组件后 2s 内热更新

### Tests for User Story 1

- [x] T009 [US1] 添加 Storybook dev 冒烟测试覆盖侧边栏与示例加载 `apps/web/.storybook/tests/us1-dev-smoke.test.ts`
- [x] T010 [US1] 编写启动性能探针脚本记录 dev/HMR 时长 `<1s/<2s` 于 `scripts/measure-storybook-dev.ts` 并集成到 dev 命令

### Implementation for User Story 1

- [x] T011 [P] [US1] 迁移 `apps/web/app/(docs)/components/ui/*/page.tsx` 为 CSF3 故事 `apps/web/components/ui/*/*.stories.tsx`（Default/Variants/Interactions）
- [x] T012 [P] [US1] 迁移 `apps/web/app/(docs)/components/magic/*/page.tsx` 为 CSF3 故事 `apps/web/components/magic/*/*.stories.tsx`
- [x] T013 [P] [US1] 迁移 `apps/web/app/(docs)/components/blocks/*/page.tsx` 为 CSF3 故事 `apps/web/components/blocks/*/*.stories.tsx`

**Checkpoint**: Storybook dev 可启动并渲染全量组件，热更新在阈值内

---

## Phase 4: User Story 2 - 组件消费者浏览文档与主题切换 (Priority: P1)

**Goal**: 消费者可导航文档、查看示例/Props，并在亮暗主题下正常展示  
**Independent Test**: 静态站或本地可导航侧边栏、查看示例、切换主题无 404/破版

### Tests for User Story 2

- [x] T014 [US2] 添加文档/主题验证测试（导航 + 主题切换）于 `apps/web/.storybook/tests/us2-docs.test.ts`
- [x] T014A [US2] 添加 Storybook a11y 验证（axe）覆盖核心组件，确保 critical 级 0，于 `apps/web/.storybook/tests/us2-a11y.test.ts`

### Implementation for User Story 2

- [x] T015 [US2] 在 `apps/web/.storybook/preview.tsx` 添加主题切换 toolbar 与 decorator（`data-theme`/class 复用 design tokens）
- [x] T016 [P] [US2] 为 UI 组件补充 Props/用法文档（MDX 或 Autodocs）于 `apps/web/components/ui/*/*.stories.mdx`
- [x] T017 [P] [US2] 为 Magic 组件补充 Props/用法文档于 `apps/web/components/magic/*/*.stories.mdx`
- [x] T018 [P] [US2] 为 Blocks 组件补充 Props/用法文档于 `apps/web/components/blocks/*/*.stories.mdx`
- [x] T019 [US2] 配置文档导航/搜索/排序以消除 404 与空侧边栏于 `apps/web/.storybook/main.ts`

**Checkpoint**: 文档可导航且 Props/示例齐全，亮暗主题切换一致

---

## Phase 5: User Story 3 - 下游可获取 Registry 信息与复制指令 (Priority: P2)

**Goal**: 构建产物提供稳定 `/registry.json` 与复制指令，字段兼容既有 Schema  
**Independent Test**: `/registry.json` 可 200 返回完整数据，文档内复制按钮可用

### Tests for User Story 3

- [x] T020 [US3] 编写 Registry 合约校验测试覆盖 200/Schema 于 `apps/web/tests/registry/registry-contract.test.ts`（引用 `contracts/registry.openapi.yaml`）
- [x] T020A [US3] 为 CopyButton 添加剪贴板成功/回退测试（禁用权限场景）于 `apps/web/.storybook/tests/us3-copy-button.test.ts`

### Implementation for User Story 3

- [x] T021 [US3] 更新 `scripts/build-registry.ts` 使 dev 输出 `apps/web/public/registry/registry.json`、build 输出 `apps/web/storybook-static/registry/registry.json` 且兼容 schema
- [x] T022 [US3] 添加 `--out`/环境开关并在 `apps/web/package.json` 的 storybook build 流程串联 `scripts/build-registry.ts` 输出目标目录
- [x] T023 [US3] 配置 registry 静态暴露（dev/build）于 `apps/web/.storybook/main.ts` 的 `staticDirs` 和相关 postbuild 拷贝逻辑，将 `registry.json` 映射到根路径 `/registry.json`
- [x] T024 [P] [US3] 实现带剪贴板回退的通用 `CopyButton` 于 `apps/web/components/ui/copy-button.tsx` 并在文档故事中复用
- [x] T025 [US3] 将 CopyCommand 元数据写入 registry（遵循 data-model）于 `scripts/build-registry.ts` 并在故事中展示安装/引入/使用指令

**Checkpoint**: `/registry.json` 可被下游脚本访问，复制指令可用且记录于 registry

---

## Phase 6: User Story 4 - 治理与合规确认 (Priority: P3)

**Goal**: 记录并获得宪章修订批准，确认 Storybook 替换原文档框架  
**Independent Test**: 有批准记录，发布不再依赖 Next.js App Router

### Implementation for User Story 4

- [x] T026 [US4] 创建并在 `specs/001-storybook-migration/checklists/stack-lock.md` 记录并签署 Technology Stack Lock 修订批准
- [x] T027 [P] [US4] 在 `specs/001-storybook-migration/plan.md`（Constitution Check）添加批准信息（决策人/日期/影响说明）
- [x] T028 [US4] 在 `apps/web/app/(docs)/components/*/page.tsx` 添加重定向/声明以替换旧 Next.js 文档入口为 Storybook

**Checkpoint**: 宪章记录完备，旧文档入口已替换且不阻断发布

---

## Phase 7: Polish & Cross-Cutting Concerns

- [x] T029 [P] 更新 `specs/001-storybook-migration/quickstart.md`（最终命令、阈值、registry 步骤）
- [x] T030 [P] 增加 Storybook CI 工作流（build + test + registry 校验）于 `/.github/workflows/storybook.yml`
- [x] T031 [P] 对 `apps/web/.storybook/**/*` 与 `scripts/build-registry.ts` 运行/修正 Biome 配置与格式
- [x] T032 在 `specs/001-storybook-migration/spec.md` 或 `checklists/stack-lock.md` 记录验收结果（0 404、复制成功率、性能数据）

---

## Dependencies & Execution Order

- Setup (Phase 1) → Foundational (Phase 2) → User Stories → Polish  
- User stories可并行：US1 与 US2 同为 P1，可在 Phase 2 完成后并行；US3 依赖 registry 脚本完成；US4 需在 Storybook 替换方案明确后进行记录  
- Polish 依赖所有目标故事完成

## Parallel Execution Examples

### User Story 1
```
T011, T012, T013 可并行迁移不同组件目录的 stories
```

### User Story 2
```
T016, T017, T018 可并行为各组件子域撰写文档
```

### User Story 3
```
T024 可在脚本调整（T021-T023）进行时并行实现 CopyButton
```

### User Story 4
```
T026 与 T027 可并行处理治理文档（不同文件）
```

## Implementation Strategy

### MVP First (User Story 1)
1. 完成 Phase 1-2 基础
2. 落地 US1（stories 覆盖 + dev/HMR 验收）→ 输出 MVP

### Incremental Delivery
1. US1 & US2（并行）完成后交付文档体验
2. 接入 US3 registry 与复制指令
3. 完成 US4 治理备案 → Polish 收尾

### Parallel Team Strategy
1. 团队共建 Phase 1-2
2. 分工：A 负责 US1（stories/HMR），B 负责 US2（文档/主题），C 负责 US3（registry+copy），治理由负责人处理 US4

