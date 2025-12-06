# Data Model

## ComponentStory
- Fields:
  - `id`: string（kebab-case，源自组件目录名）
  - `title`: string（组件显示名）
  - `stories`: StoryItem[]（Default、Variants、Interactions）
  - `componentPath`: string（相对 `apps/web/components/*` 路径）
  - `propsTable`: Record<string, PropMeta>（由现有类型生成）
  - `themes`: ("light" | "dark")[]（可用主题）
  - `status`: "ready" | "wip" | "deprecated"
- Relationships:
  - 归属 `ComponentRegistryEntry`，与 Registry JSON 同步。
- Validation:
  - `id` 与目录一致；`stories` 至少 1 个；`themes` 必含 light/dark。

## CopyCommandEntry
- Fields:
  - `id`: string（与组件 id 对齐）
  - `kind`: "install" | "import" | "usage"
  - `content`: string（可复制指令/代码片段）
  - `description`: string
  - `componentId`: string
- Relationships:
  - 挂载到对应 `ComponentStory`；在 Storybook 文档与 Registry 中暴露。
- Validation:
  - `content` 非空；`componentId` 有效；提供无障碍提示文本。

## ComponentRegistryEntry
- Fields:
  - `name`: string（组件 id）
  - `title`: string
  - `files`: string[]（生成/依赖的文件列表）
  - `registryDependencies`: string[]
  - `npmDependencies`: Record<string, string>
  - `tailwind`: Record<string, unknown>（包含 presets/plugins 需求）
  - `copy`: CopyCommandEntry[]（可选，保持向后兼容）
- Relationships:
  - 聚合多个 `ComponentStory`，存储于 `registry.json`。
- Validation:
  - 兼容现有字段；新增字段只做向后兼容；路径指向实际文件。

