# Quickstart (pnpm/Biome Shadcn Registry)

## 1) Prerequisites
- pnpm 8.0+ installed: `npm install -g pnpm`
- Verify: `pnpm --version`

## 2) Install
```bash
pnpm install
```
- Locks workspace deps via `pnpm-workspace.yaml` + `pnpm-lock.yaml`，目标 ≤10s。

## 3) Develop
```bash
pnpm dev   # Next.js app router docs站，启动 <1s 目标
```
- 修改组件时自动热更新；保存即触发 Biome 格式化。

## 4) Lint / Format
```bash
pnpm check           # 全量
pnpm check:staged    # Husky 钩子/提交前
```
- 禁止 default export、`console.log`、`any`；2 空格 + 分号。

## 5) Build Registry
```bash
pnpm build:registry
```
- 扫描 `apps/web/components/{ui,magic,blocks}`，输出到 `apps/web/public/registry/*.json`。
- 输出包含 `registryDependencies`、`npmDependencies`、`tailwind` 配置与 `copyCommand` (npm/pnpm/bun)。
- 记录耗时，目标 <1s；失败时不写入不完整文件。

## 6) Test
```bash
pnpm test
```
- 重点覆盖 `apps/web/scripts/build-registry.ts` 的路径解析、正则替换、schema 校验。

## 7) Security Audit
```bash
pnpm audit --json
```
- CI 汇总报告，发现高危依赖需阻断发布。

## 8) Copy Command Verification
- 在文档站组件页点击 Copy Command，分别在 npm/pnpm/bun 环境执行，确保一次成功获取组件。
