# 需求文档

## 简介

本功能旨在将 Magic UI 组件库集成到现有的 design-system 项目中。通过 shadcn CLI 的 registry 机制引入 Magic UI 组件，严禁手动编写组件代码。集成后的组件将使用项目自有的 design tokens，确保 registry 消费者可以直接使用这些组件。

## 术语表

- **Magic_UI**: 一个为设计工程师打造的 UI 组件库，包含 150+ 免费开源的动画组件和效果，基于 React、TypeScript、Tailwind CSS 和 Motion 构建
- **Registry**: shadcn/ui 的组件分发系统，允许通过 CLI 命令安装组件
- **Design_Tokens**: 项目中定义的设计变量，包括颜色、间距、圆角等 CSS 变量
- **Shadcn_CLI**: shadcn/ui 提供的命令行工具，用于初始化项目和添加组件
- **Components_JSON**: shadcn CLI 的临时配置文件，仅用于组件安装过程，安装完成后需删除

## 需求

### 需求 1：初始化 shadcn CLI 临时配置

**用户故事：** 作为开发者，我希望项目能够临时支持 shadcn CLI，以便可以通过命令行安装 Magic UI 组件。

#### 验收标准

1. THE System SHALL 在 `apps/web` 目录下创建临时的 `components.json` 配置文件
2. WHEN 配置 components.json 时，THE System SHALL 将组件输出路径设置为 `components/magicui` 目录
3. THE System SHALL 配置 `@magicui` registry 指向 `https://magicui.design/r/{name}.json`
4. THE System SHALL 确保配置使用项目现有的 Tailwind CSS 变量和 design tokens
5. THE System SHALL 配置 TypeScript 路径别名与项目现有配置保持一致

### 需求 2：通过 CLI 命令引入 Magic UI 组件

**用户故事：** 作为开发者，我希望所有 Magic UI 组件都通过 CLI 命令引入，而非手动编写代码。

#### 验收标准

1. THE System SHALL 仅通过 `pnpm dlx shadcn@latest add @magicui/<component>` 命令引入组件
2. THE System SHALL NOT 手动编写任何 Magic UI 组件代码
3. WHEN 组件被安装后，THE System SHALL 将组件文件放置在 `apps/web/components/magicui` 目录
4. THE System SHALL 确保引入的组件使用项目的 `cn()` 工具函数
5. IF 组件依赖额外的 npm 包，THEN THE System SHALL 自动安装这些依赖到 `apps/web/package.json`
6. THE System SHALL 引入以下核心组件类别：
   - 文字动画组件（如 text-reveal、typing-animation、word-rotate）
   - 背景效果组件（如 particles、dot-pattern、grid-pattern）
   - 交互组件（如 dock、marquee、border-beam）
   - 特效组件（如 magic-card、shine-border、meteors）

### 需求 3：组件适配项目 Design Tokens

**用户故事：** 作为开发者，我希望引入的 Magic UI 组件能够自动适配项目的 design tokens，以保持视觉一致性。

#### 验收标准

1. WHEN Magic UI 组件被引入后，THE System SHALL 确保组件使用 `hsl(var(--primary))` 等项目定义的颜色变量
2. THE System SHALL 确保组件的圆角使用 `var(--radius)` 变量
3. IF 组件包含硬编码的颜色值，THEN THE System SHALL 提供适配脚本或文档说明如何修改
4. THE System SHALL 确保组件在 light 和 dark 模式下都能正确显示

### 需求 4：Registry 分发支持

**用户故事：** 作为 registry 消费者，我希望能够直接使用这个项目分发的 Magic UI 组件，无需额外配置。

#### 验收标准

1. THE System SHALL 将 Magic UI 组件纳入现有的 `build:registry` 构建流程
2. WHEN 执行 `pnpm run build:registry` 时，THE System SHALL 生成包含 Magic UI 组件的 registry JSON 文件
3. THE System SHALL 确保生成的 registry 文件包含组件的依赖信息
4. THE System SHALL 更新 `registry-paths.ts` 以支持 `magic` 组件根目录（已存在）

### 需求 5：Storybook 文档集成与验证

**用户故事：** 作为开发者，我希望所有引入的 Magic UI 组件都能在 Storybook 中正确展示，无任何报错。

#### 验收标准

1. WHEN 新的 Magic UI 组件被引入后，THE System SHALL 为其创建对应的 `.stories.tsx` 文件
2. THE System SHALL 确保 Storybook stories 展示组件的主要用法和变体
3. THE System SHALL 确保组件在 Storybook 中可以正确渲染动画效果
4. THE System SHALL 确保每个组件的 Storybook 页面无任何控制台错误或警告
5. WHEN 所有组件集成完成后，THE System SHALL 运行 Storybook 并验证所有页面可正常访问
6. IF 组件需要特殊的 Storybook 配置，THEN THE System SHALL 更新 `.storybook/main.ts` 配置

### 需求 6：依赖管理

**用户故事：** 作为开发者，我希望 Magic UI 组件的依赖能够被正确管理，避免版本冲突。

#### 验收标准

1. THE System SHALL 确保 `framer-motion`（或 `motion`）作为 Magic UI 动画组件的核心依赖被安装
2. IF 组件依赖 `@react-three/fiber` 或其他 3D 库，THEN THE System SHALL 将其标记为可选依赖
3. THE System SHALL 确保所有依赖版本与项目现有依赖兼容
4. THE System SHALL 在 `apps/web/package.json` 中记录所有新增依赖

### 需求 7：清理临时配置

**用户故事：** 作为开发者，我希望在组件集成完成后删除临时配置文件，以便未来可以引入其他组件库。

#### 验收标准

1. WHEN 所有 Magic UI 组件安装完成且 Storybook 验证通过后，THE System SHALL 删除 `apps/web/components.json` 文件
2. THE System SHALL 确保删除配置文件后，已安装的组件仍能正常工作
3. THE System SHALL 确保 registry 构建流程不依赖 `components.json` 文件

