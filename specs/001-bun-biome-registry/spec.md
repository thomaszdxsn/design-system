# Feature Specification: Bun/Biome Shadcn Registry

**Feature Branch**: `001-bun-biome-registry`  
**Created**: 2025-12-06  
**Status**: Draft  
**Input**: User description: "PRD: Bun & Biome Powered Custom Shadcn Registry"

## Clarifications

### Session 2025-12-06

- Q: Registry 产物托管方式选哪种？ → A: CDN/边缘静态托管

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Develop standardized components fast (Priority: P1)

Design Engineer在 monorepo 中通过单条命令完成依赖安装、启动组件文档站，并在编写/保存组件时获得即时格式化和质量反馈。

**Why this priority**: 若没有极速、统一的开发体验，就无法保证后续 Registry 的质量和一致性。  
**Independent Test**: 在新环境执行安装与本地预览，验证组件保存后自动格式化与校验能独立完成且阻断不合规代码。

**Acceptance Scenarios**:

1. **Given** 新克隆的仓库，**When** 运行单条安装命令，**Then** 所有 workspace 依赖在目标时间内安装完成且无错误。
2. **Given** 组件示例在文档站中，**When** 运行本地预览命令，**Then** 组件实时预览可用且热更新生效。
3. **Given** 开发者保存组件文件，**When** Biome 校验触发，**Then** 自动格式化并对违规项给出可执行修复建议；提交时若仍不合规则阻断提交。

---

### User Story 2 - 生成可分发的 Registry (Priority: P2)

Design Engineer 通过一条构建命令扫描组件源代码，生成符合 Shadcn Schema 的 JSON 文件并放置于公开可部署的目录。

**Why this priority**: 没有高质量 Registry 输出，下游无法消费清洗后的组件。  
**Independent Test**: 在无手工干预的情况下运行构建命令，验证生成的 JSON 结构、字段完整性和耗时目标。

**Acceptance Scenarios**:

1. **Given** components/ui 与 components/magic 目录存在规范化组件，**When** 运行构建命令，**Then** 在目标时间内生成 public/registry/*.json 且包含必需元数据（名称、依赖、文件路径、安装指令）。
2. **Given** 组件缺失必需字段或 schema 不符，**When** 运行构建命令，**Then** 构建失败并输出可操作的错误指引，不生成不合法文件。

---

### User Story 3 - 下游无缝拉取组件 (Priority: P3)

Consumer 在任意包管理器环境下，通过官方指令 URL 拉取清洗后的组件，并看到一致的风格与安装提示。

**Why this priority**: 统一输出必须易于被业务项目采用，才能体现 Registry 价值。  
**Independent Test**: 在模拟下游项目中执行提供的拉取指令，验证组件可用且文档包含复制命令入口。

**Acceptance Scenarios**:

1. **Given** 下游项目使用 npm/pnpm/bun 中任一工具，**When** 执行提供的组件拉取命令，**Then** 组件被正确拷贝并保持统一样式与依赖声明。
2. **Given** 文档站组件页面，**When** 用户点击 Copy Command，**Then** 得到可直接运行的安装指令并成功安装。

---

### Edge Cases

- 开发机未安装或版本过低导致安装/构建失败时，需给出 Bun/Biome 版本要求与修复步骤。
- Husky 被跳过（如 GUI 提交）或钩子异常时，CI 仍需阻断不合规代码并提示修复路径。
- 组件缺失必要元数据或引用未清理的依赖时，构建应失败且定位到具体文件。
- Registry 体积或组件数量增长时，构建/校验时间需保持在目标阈值内；超出时提供拆分或分批构建的指引。
- 复制的安装指令不匹配下游包管理器时，应暴露清晰提示并提供对应命令选项。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须提供单条命令完成全仓依赖安装，默认使用工作区定义保证安装时间满足目标（≤2s 基线环境）。
- **FR-002**: 系统必须提供文档站预览入口，运行单条命令后可实时查看组件示例并支持热更新。
- **FR-003**: 保存组件文件时必须自动触发 Biome 格式化/检查，禁止保留 console.log（开发外）和未使用变量，严格类型检查不得出现 any。
- **FR-004**: 提交前必须运行 Biome 校验，若存在违规应阻断提交并提供修复建议；CI 需复核同样规则以防绕过。
- **FR-005**: 构建命令必须扫描 components/ui 与 components/magic，生成符合 Shadcn Schema 的 JSON，输出到 public/registry，并包含组件名称、依赖、文件路径、安装指令等必需字段。
- **FR-006**: 构建必须在目标时间内（<1s 基线环境）完成，失败时不得生成不完整文件且需输出可读错误。
- **FR-007**: 文档站必须提供可复制的安装指令入口，覆盖 npm/pnpm/bun 至少三类命令，确保复制后可直接在下游执行。
- **FR-008**: 构建产物必须可通过 CDN/边缘静态托管 URL 提供给下游，且与文档中展示的指令一致。
- **FR-009**: 质量门禁必须记录并报告耗时（安装、lint、构建），便于验证性能目标。

### Key Entities *(include if feature involves data)*

- **Component Source**: 标准化后的组件源文件，属性含路径、依赖、示例、展示标签。
- **Registry Entry**: 公开的 JSON 描述，包含组件标识、版本或变更指纹、依赖列表、文件映射、安装指令、校验状态。
- **Documentation Page**: 展示组件示例与 Copy Command 的页面，关联到对应 Registry Entry。
- **Consumer Request**: 下游项目触发的拉取动作，携带目标组件和所用包管理器，用于生成正确的安装指令。

### Assumptions

- 基线性能以常规现代开发机为准；极端低配环境可能不满足时间指标但应给出提示。
- Registry JSON 将托管在现有静态站点（如 CDN/边缘节点）并可被 CLI 直接访问。
- 组件 schema 以 Shadcn 官方格式为准，如有差异以最新文档为准并在构建中校验。

## Registry Schema & Versioning *(contracts/openapi.yaml 为单一真源)*

- 必需字段：`id`, `name`, `version`, `description`, `files[]`（含 `path`, `contentHash`）, `registryDependencies[]`, `npmDependencies{}`（name → semver range）, `tailwind` config snippet 或依赖标记, `copyCommand`（npm/pnpm/bun 三类）, `checksum`, `updatedAt`.
- 版本字段：`version` 采用 semver；`schemaVersion` 独立标记 registry schema 版本，变更时需递增并在 contracts/openapi.yaml + `apps/web/lib/registry-schema.ts` 同步。
- 校验规则：required keys、enum/type/default 以 contracts/openapi.yaml 为准，构建时校验，失败即阻断且不写入文件。
- 迁移策略：新增字段保持后向兼容；删除/破坏性变更需提供至少 1 个小版本的双写/兼容窗口，并在 changelog 中声明；提供升级指南与示例 JSON。

## CDN/URL & Caching Strategy

- URL 结构：`https://cdn.example.com/registry/v{schemaVersion}/index.json` 与 `.../v{schemaVersion}/{id}.json`，与文档/Copy Command 指令一致。
- 缓存：默认 TTL 5 分钟，使用 ETag + Cache-Control；schemaVersion 变更即版本化路径，避免陈旧缓存。
- SLA：CDN p95 < 300ms，p99 < 600ms；若失败/超时，回源静态托管（S3/OSS）或本地镜像；失败时 docs 显示可重试/离线提示。

## Tooling & Script Names (Canonical)

- 根/应用脚本统一命名：`dev`, `preview`, `build`, `build:registry`, `check`, `check:staged`, `test`, `audit`.  
- 规范在 plan/tasks 中对齐，不接受同义替代（如 lint/format 分别归入 `check`）。

## Package Manager & Runtime Baseline

- Bun 1.x（最低 1.0），npm ≥10，pnpm ≥8；通过 corepack/Bun pin 在 CI 与本地 bootstrap 固化。
- `bun install` 单条命令覆盖 workspace，保存 `bun.lockb`；锁文件不得手改。

## Baseline Environment & Cross-Platform Matrix

- 基线硬件：8c CPU、16GB RAM、NVMe ≥ 100MB/s；网络：下行 ≥100Mbps，常规延迟 <50ms。
- 平台矩阵：macOS (x64/ARM)、Windows (x64)、CI Alpine (x64) 最低验证安装/预览/构建/复制指令；ARM CI 可选但需文档声明限制。

## Failure Handling & Observability

- 预览/构建失败须：非零退出码、可读日志路径、重试/清缓存指引（删除 `.next`/缓存目录）、CI 上传构建日志 artifact。
- 性能超阈值（安装 >2s、构建 >1s、lint >200ms）记录 telemetry 事件（包含命令、耗时、平台、cpu/ram），可配置告警阈值；CI 视为失败或警告并提示优化。

## Traceability

- FR/SC ↔ tasks/验收 场景映射需维护在 tasks.md/quickstart.md，确保每个 FR/SC 至少一个实现任务与测试覆盖；变更时同步更新。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 全仓依赖在干净环境下单次安装完成时间 ≤2 秒。
- **SC-002**: 构建 Registry 从命令执行到产出 JSON 的耗时 <1 秒，且 100% 组件通过 schema 校验。
- **SC-003**: 全仓 lint/format 检查在单次运行中完成时间 ≤200 毫秒，且提交时无未处理违规通过。
- **SC-004**: 下游项目在 npm/pnpm/bun 三种环境中执行提供指令均能一次成功获取组件（成功率 100% 于验收样本）。
- **SC-005**: 文档站的 Copy Command 按钮在验收测试中 100% 产出可执行命令，用户无需手动修改。
- **SC-006**: 组件外观与代码风格在验收样本中保持一致性（验收抽样 100% 无格式偏差）。
