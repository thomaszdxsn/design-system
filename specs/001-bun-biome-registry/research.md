# Research: Bun/Biome Shadcn Registry

## Clarification Status
- Outstanding questions: 无。
- All Technical Context fields已确认，研究聚焦最佳实践与性能门。

## Findings

- Decision: 使用 Bun workspaces + `bunfig.toml` 配置 `install.workspaces=true`、`install.saveTextLockfile=true`，并开启硬链接缓存。  
  Rationale: 确保 `bun install` 在 <10s 内完成且锁定 workspace 依赖解析。  
  Alternatives considered: 保持默认 bun 配置（不可控安装时间）；yarn/pnpm（违反栈锁）。

- Decision: Biome 作为单一 lint/format 工具，`bun check` 统一入口，Husky `pre-commit`/`pre-push` 均调用 `bun check --staged`（如需 lint-staged 则用 Bun 子进程过滤）。  
  Rationale: 避免重复工具链，减少 I/O；保证提交/CI 一致。  
  Alternatives considered: lint-staged+ESLint/Prettier（与栈锁冲突）；仅在 CI 运行（无法阻断本地提交）。

- Decision: Registry 构建由 `apps/web/scripts/build-registry.ts` 驱动，扫描 `components/{ui,magic,blocks}`，输出到 `apps/web/public/registry/*.json`，附带 `registryDependencies`、真实 npm 依赖、`tailwind` 配置与 `copyCommand` 映射（npm/pnpm/bun）。  
  Rationale: 满足 Shadcn schema 和 Copy Command 要求，确保产物可 CDN 托管且下游可直接使用。  
  Alternatives considered: 手写 JSON 或手改 `public/registry`（违背只读规则与一致性）。

- Decision: 构建性能策略：使用 `Bun.file().text()` + `Promise.all` 并行读取，正则替换路径（如 `@/lib/utils` → `@/app/lib/utils` 或相对路径），结果按组件名写入 JSON；记录耗时并在 >1s 时打印警告。  
  Rationale: Bun 原生文件 I/O 性能高，便于达到 <1s 构建目标并可追踪超时。  
  Alternatives considered: Node fs/promises（非栈锁）；串行处理（易超时）。

- Decision: 文档站提供 Copy Command 三件套：`npm create`, `pnpm dlx`, `bunx`/`bun create`；UI 按钮直接复制与 registry JSON 一致的命令。  
  Rationale: 覆盖主要包管理器，确保 User Story 3 的一次成功率。  
  Alternatives considered: 仅提供 npm（不满足多包管理器场景）；CLI 交互生成（增加学习成本）。

- Decision: 测试策略：用 `bun test` 针对 `build-registry.ts` 进行路径解析、正则替换与 schema 断言；对生成文件使用快照或 JSON schema 校验；模拟缺失字段触发失败分支。  
  Rationale: 保障 FR-005/FR-006，避免不合法产物落盘。  
  Alternatives considered: 仅端到端人工验证（覆盖不足且耗时）。

- Decision: 安全与审计：在 CI 中执行 `bun pm audit --json`，解析输出生成摘要；如 Bun 尚未支持部分 advisory，则通过静态依赖列表检查关键包版本。  
  Rationale: 满足依赖安全审计要求，且保持在 Bun 工具链内。  
  Alternatives considered: npm/yarn audit（偏离 Bun）；跳过审计（不符安全要求）。
