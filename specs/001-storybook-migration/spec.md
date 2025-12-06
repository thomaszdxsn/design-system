# Feature Specification: Storybook Migration for Design System

**Feature Branch**: `001-storybook-migration`  
**Created**: 2025-12-06  
**Status**: Draft  
**Input**: User description: "重大架构调整，将现有 Next.js 文档站替换为基于组件探索器（Storybook）的文档体验，并保留 Registry 能力。"

## Clarifications

### Session 2025-12-06

- Q: Registry JSON 兼容与发布路径策略？ → A: 保持旧字段兼容并只做向后兼容新增，静态导出统一路径 `/registry.json`。

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 组件开发者在隔离环境中调试组件 (Priority: P1)

Design Engineer 运行组件探索器本地构建并验证组件，无需页面耦合。

**Why this priority**: 核心开发体验，决定组件交付效率与质量。

**Independent Test**: 运行开发命令后可独立浏览和编辑组件，热更新可见，满足日常迭代。

**Acceptance Scenarios**:

1. **Given** 项目依赖安装完成，**When** 开发者运行本地预览命令，**Then** 组件列表加载且任意组件可渲染预览。
2. **Given** 开发者修改组件或样式，**When** 保存变更，**Then** 预览在 2 秒内热更新显示最新效果。

---

### User Story 2 - 组件消费者浏览文档与主题切换 (Priority: P1)

Consumer 在文档站浏览组件示例、Props、交互，并在亮/暗主题下检视一致性。

**Why this priority**: 保证消费端能正确理解和采用组件，减少集成阻力。

**Independent Test**: 部署或本地静态站点中可导航、查看示例、切换主题且文档内容完整。

**Acceptance Scenarios**:

1. **Given** 文档站构建完成，**When** 用户通过侧边栏选择任意组件，**Then** 页面展示示例、Props 表和使用说明无 404。
2. **Given** 用户切换亮/暗主题，**When** 重新查看组件示例，**Then** 样式与可读性保持一致且无明显破版。

---

### User Story 3 - 下游可获取 Registry 信息与复制指令 (Priority: P2)

Consumer 需要在文档中复制安装/引用指令，并从 Registry JSON 获取组件元数据供自动化使用。

**Why this priority**: 保持生态衔接与脚本化消费能力，不阻断既有集成流程。

**Independent Test**: 文档页提供复制按钮；构建产物包含可访问的 Registry JSON，字段完备。

**Acceptance Scenarios**:

1. **Given** 用户打开组件文档页，**When** 点击复制按钮，**Then** 成功复制预期的安装/引用指令到剪贴板。
2. **Given** 构建产物发布，**When** 下游脚本请求 Registry JSON，**Then** 返回 200 且包含全部组件条目与元数据。

---

### User Story 4 - 治理与合规确认 (Priority: P3)

技术负责人需要记录已通过的宪章修订，允许用组件探索器取代原 Next.js 文档站。

**Why this priority**: 避免违反现有 Technology Stack Lock，确保变更获得授权。

**Independent Test**: 存在经过批准的宪章修订记录，且发布包不再依赖原框架。

**Acceptance Scenarios**:

1. **Given** 新的架构提案形成，**When** 治理流程批准修订，**Then** 有可追溯的记录表明允许使用新的文档架构。
2. **Given** 修订获批，**When** 构建与运行文档站，**Then** 不再依赖原 Next.js App Router 且功能满足前述需求。

### Edge Cases

- 组件样式依赖全局样式/指令缺失导致预览与生产样式不一致。
- 单个组件缺少 Story/MDX，导致侧边栏空项或 404。
- 复制指令在非安全上下文或禁用剪贴板权限时失败。
- 静态资源路径不匹配导致 Registry JSON 或媒体文件无法加载。
- 大量组件或控件加载时，导航或搜索出现明显性能下降。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Must 提供一个专用组件探索/文档体验，取代现有页面式文档站，并可本地预览与静态构建发布。
- **FR-002**: Must 为现有组件库 100% 提供 Story/MDX 文档，包含示例、Props 描述、交互说明，并覆盖亮/暗主题展示。
- **FR-003**: Must 提供复制安装/使用指令的入口（如按钮），复制结果与发布包一致且可复用。
- **FR-004**: Must 支持亮/暗主题切换，组件在两种模式下均无破版或可读性问题。
- **FR-005**: Must 保持或重建 Registry 构建能力，输出结构化 JSON，字段与现有 Schema 兼容，仅新增向后兼容字段，静态导出稳定路径 `/registry.json` 供下游脚本访问。
- **FR-006**: Must 产生可部署的静态产物，导航、搜索、示例交互在离线/静态托管场景下正常工作且无 404。
- **FR-007**: Must 记录并获得宪章（Technology Stack Lock）修订批准，以允许采用新的文档架构并移除原 Next.js 依赖。

### Key Entities

- **Component Story/Doc**: 单个组件的示例、属性说明和主题变体描述，用于展示与测试。
- **Registry Artifact**: 组件元数据与路径的结构化 JSON，用于下游自动化消费。
- **Copy Command Entry**: 文档内可触发复制的指令/代码片段及其元数据。

### Dependencies & Assumptions

- 宪章修订批准在发布前完成，允许替换文档框架。
- 组件源码与样式继续集中于现有组件目录，便于文档与 Registry 同步。
- 全局样式与设计令牌可在新文档环境中被加载和复用。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 本地文档预览启动后，首个组件列表可在 2 秒内可见，且交互无明显卡顿。
- **SC-002**: 100% 在册组件拥有至少一条文档故事（含示例与 Props），主题切换后内容可读性保持。
- **SC-003**: 静态构建完成且部署后，侧边栏导航和示例访问 0 404，复制指令成功率 ≥ 99%。
- **SC-004**: Registry JSON 在发布环境可被获取（HTTP 200），路径固定为 `/registry.json`，字段与现有 Schema 保持兼容且新增字段不破坏既有消费。
- **SC-005**: Storybook a11y/axe 报告关键组件 critical 级 0，serious 级若存在需建 ticket 且不阻断发布，对比当前实现无可访问性回退。
