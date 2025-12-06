---
description: "Task list for Bun/Biome Shadcn Registry"
---

# Tasks: Bun/Biome Shadcn Registry

**Input**: Design docs in `/Users/zhouyang/Coding/personal/design-system/specs/001-bun-biome-registry/`

**Prerequisites**: `plan.md` (required), `spec.md` (required), `research.md`, `data-model.md`, `contracts/openapi.yaml`, `quickstart.md`

**Tests**: Included where the spec mandates verification; test tasks are marked within each user story.

**Organization**: Tasks are grouped by user story to allow independent implementation and testing. IDs are execution-ordered; `[P]` marks safe parallel work; `[US#]` maps to the related story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Workspace/runtime setup to enable pnpm + Biome + Next.js development.

- [X] T001 Update pnpm workspace settings in `pnpm-workspace.yaml` and `.npmrc`.
- [X] T002 Define single-entry scripts (`dev`, `build`, `check`, `check:staged`, `build:registry`, `test`, `audit`) in root `package.json`.
- [X] T003 [P] Add pnpm runtime guard to fail fast on <8.0 and print upgrade steps in `scripts/ensure-pnpm.ts`.
- [X] T004 [P] Scaffold required workspace dirs and read-only registry placeholder (`apps/web/components/{ui,magic,blocks}` + `apps/web/public/registry/.gitkeep`).
- [ ] T004a Align script/command naming across spec/plan/tasks and package manifests (`dev`, `build:registry`, `check`, `preview`, `audit`) and document the canonical names.
- [ ] T004b Pin package manager versions via corepack/pnpm (npm/pnpm/bun ranges) and surface in CI/bootstrap scripts.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Quality gates and shared types that all stories depend on.

- [X] T005 Harden lint/format rules (no default export/`any`, 2-space + semicolon, Next App Router patterns) in `biome.json`.
- [X] T006 [P] Configure Husky hooks to run `pnpm check --staged` and block non-compliant commits/pushes in `.husky/pre-commit` and `.husky/pre-push`.
- [X] T007 [P] Add timing-aware `pnpm check` wrapper that logs durations for FR-009 in `scripts/check.ts`.
- [X] T007a [P] Enforce lint/format 200ms budget (SC-003) with timing guard and failure/warn thresholds in `scripts/check.ts`.
- [X] T008 Define registry/data-model types per `data-model.md` and `contracts/openapi.yaml` in `apps/web/lib/registry-schema.ts`.
- [X] T009 Add path guards/utilities to enforce component roots and prevent manual writes to `public/registry` in `apps/web/lib/registry-paths.ts`.
- [X] T010 Provide shared `cn()` utility for components in `packages/utils/cn.ts`.
- [ ] T010a Add CI pipeline (e.g., GitHub Actions) running `pnpm check --staged`, tests, and registry build to block violations when Husky is bypassed.
- [ ] T010b Document baseline hardware/OS/network assumptions (CPU/内存/磁盘/带宽/区域) for performance targets in `spec.md`/`quickstart.md`.
- [ ] T010c Establish FR/SC → tasks/验收场景映射表并放入 `specs/001-bun-biome-registry/tasks.md` 或 `quickstart.md`.

---

## Phase 3: User Story 1 - Develop standardized components fast (Priority: P1) 🎯 MVP

**Goal**: Single install + dev command with instant HMR, Biome enforcement on save/commit.

**Independent Test**: Fresh clone runs `bun install` and `bun run dev`; saving a component triggers Biome fix/violations; committing with violations is blocked.

### Implementation & Tests for User Story 1

- [X] T011 [P] [US1] Add install bootstrap to time `pnpm install` (<2s target) and log to `logs/install.json` in `scripts/bootstrap.ts`.
- [X] T012 [US1] Wire `postinstall` to `tsx scripts/bootstrap.ts` so a single `pnpm install` covers all workspaces in root `package.json`.
- [X] T013 [P] [US1] Ensure `pnpm dev` starts Next.js App Router via `apps/web/package.json` and shared config in `apps/web/tsconfig.json`.
- [X] T014 [P] [US1] Create exemplar Biome-compliant component using `cn()` in `apps/web/components/ui/button.tsx`.
- [X] T015 [US1] Add docs preview route that renders the sample component with HMR in `apps/web/app/(docs)/components/button/page.tsx`.
- [X] T016 [P] [US1] Add `pnpm check --watch` helper for component paths and expose as `dev:check` in `scripts/dev-check.ts`.
- [X] T017 [P] [US1] Add dev-experience smoke test (install+dev+biome assertions) in `apps/web/__tests__/dev-experience.test.ts`.

---

## Phase 4: User Story 2 - 生成可分发的 Registry (Priority: P2)

**Goal**: Build command scans components and emits Shadcn-compliant JSON with required metadata and performance budget.

**Independent Test**: Run `bun run build:registry` without manual edits; JSON meets schema, fails on missing fields, and completes within target time.

### Tests for User Story 2

- [X] T018 [P] [US2] Add registry build tests (success, missing fields, invalid paths) in `apps/web/scripts/__tests__/build-registry.test.ts`.
- [ ] T019 [P] [US2] Add fixture components for registry tests in `apps/web/components/magic/__fixtures__/card.tsx`.

### Implementation for User Story 2

- [X] T020 [P] [US2] Implement registry builder that scans `components/{ui,magic,blocks}` and writes `apps/web/public/registry/*.json` with registryDependencies/npmDependencies/tailwind/copyCommand/checksum in `scripts/build-registry.ts`.
- [X] T021 [P] [US2] Add schema validation + fail-fast partial-write guard using `registry-schema` in `apps/web/lib/validate-registry.ts`.
- [X] T022 [US2] Wire `build:registry` pnpm script (with duration logging and >1s warning) in root `package.json`.
- [X] T023 [US2] Generate CDN-ready index manifest per `contracts/openapi.yaml` (`GET /index.json`) in `apps/web/public/registry/index.json`.
- [ ] T023a Add batch/parallel build option and telemetry for large component sets; document thresholds and fallback when registry size grows.
- [ ] T033 Define registry schema required fields + versioning/migration policy (single source in `contracts/openapi.yaml` + `registry-schema.ts`), include version/deprecation fields and samples.
- [ ] T034 Define CDN URL versioning + caching (TTL/etag/p95/p99 SLA) and fallback/回源策略，更新 docs/quickstart 与 copy-command 显示的 URL。

---

## Phase 5: User Story 3 - 下游无缝拉取组件 (Priority: P3)

**Goal**: Consumers fetch registry JSON and copy npm/pnpm/bun commands directly from docs pages.

**Independent Test**: In downstream projects, running copied commands pulls components with correct deps; docs show consistent commands for all package managers.

### Tests for User Story 3

- [ ] T024 [P] [US3] Add copy-command UI tests covering npm/pnpm/bun outputs and error states in `apps/web/app/(docs)/registry/__tests__/copy-command.test.tsx`.

### Implementation for User Story 3

- [X] T025 [P] [US3] Implement registry fetch client for `index.json` and `{id}.json` CDN endpoints in `apps/web/lib/registry-client.ts`.
- [X] T026 [US3] Build registry list page showing components and copy entry points in `apps/web/app/(docs)/registry/page.tsx`.
- [X] T027 [P] [US3] Build component detail page that renders metadata and copy buttons in `apps/web/app/(docs)/registry/[component]/page.tsx`.
- [X] T028 [P] [US3] Implement reusable copy-command UI for npm/pnpm/bun with mismatch hints in `apps/web/components/blocks/copy-command.tsx`.
- [X] T029 [US3] Align documentation of copy flows with generated commands in `specs/001-bun-biome-registry/quickstart.md`.
- [ ] T029a [US3] Add CDN/URL validation ensuring `index.json`/`{id}.json` are reachable and match Copy Command URLs in docs/E2E.
- [ ] T029b [US3] Add visual/style consistency checks (snapshots or stylelint rules) for sample components to ensure SC-006.
- [ ] T035 Add telemetry events for install/lint/build durations超阈值（事件名/字段/采样率）并在 CI/monitor 中告警。

---

## Final Phase: Polish & Cross-Cutting

**Purpose**: Hardening, docs, and end-to-end verification across stories.

- [X] T030 [P] Add pnpm audit summarizer (`pnpm audit --json` -> `reports/audit.json`) in `scripts/audit.ts`.
- [X] T031 Capture measured install/dev/build timings and update acceptance notes in `specs/001-bun-biome-registry/quickstart.md`.
- [X] T032 [P] Add quickstart validator that runs install → dev → build → test pipeline and records durations in `scripts/validate-quickstart.ts`.
- [ ] T036 Define cross-platform validation matrix（macOS/Windows/CI Alpine/ARM）并在 quickstart/CI 中验证安装/预览/构建关键命令。
- [ ] T037 Add fallback/retry and log artifact for preview/build failures（退出码、可读日志、清缓存/重试指南、CI artifact 上传）。
- [ ] T038 Add CDN dependency/failover playbook（提供方、鉴权、区域覆盖、降级到回源或本地镜像）并在 docs 中说明。

---

## Traceability: FR/SC → Tasks & Tests

| FR/SC | Tasks (implementation) | Tests/Artifacts |
| --- | --- | --- |
| FR-001 / SC-001 单条安装 ≤2s | T011, T012, T032 | T017（dev 体验），T031/T032（耗时记录） |
| FR-002 文档预览/HMR | T013, T015, T032 | T017 |
| FR-003 保存时 Biome 校验/禁用项 | T005, T007, T007a, T016 | T017 |
| FR-004 提交/CI 阻断 | T006, T010a | T032 |
| FR-005 Registry 构建 + 必需字段 | T008, T020, T021, T023, T033 | T018, T019, T029a |
| FR-006 / SC-002 构建 <1s | T022, T023a, T031, T032 | T018, T032 |
| FR-007 / SC-004 / SC-005 Copy Command | T024, T025, T026, T027, T028, T029, T029a | T024, T029a |
| FR-008 CDN/URL/缓存 | T023, T034, T038 | T029a |
| FR-009 / SC-003 耗时记录与 Telemetry | T007, T007a, T011, T022, T031, T035, T032 | T031, T032 |
| SC-006 风格一致性 | T029b | T029b |
| 基线/跨平台/失败可观测 | T036, T037 | T032（涵盖部分验证） |

---

## Dependencies & Execution Order

- **Phase dependencies**: Setup → Foundational → US1 (MVP) → US2 → US3 → Polish.
- **Story dependencies**: US1 depends on Foundational; US2 depends on Foundational (can run parallel to US1 after foundation but consumes component fixtures); US3 depends on US2 outputs (`public/registry/*.json` + index) and Foundational.
- **Within stories**: Write tests first, then models/types → services/scripts → routes/UI; ensure validation hooks before writing artifacts.

---

## Parallel Execution Examples

### User Story 1
```bash
Run in parallel:
- T013 start dev command setup (`apps/web/package.json`, `apps/web/tsconfig.json`)
- T014 create sample component (`apps/web/components/ui/button.tsx`)
- T016 add biome watch helper (`scripts/dev-check.ts`)
```

### User Story 2
```bash
Run in parallel:
- T020 implement builder (`apps/web/scripts/build-registry.ts`)
- T021 add validation guard (`apps/web/lib/validate-registry.ts`)
- T018 write tests + fixtures (T019) for build script
```

### User Story 3
```bash
Run in parallel:
- T025 registry client (`apps/web/lib/registry-client.ts`)
- T026 list page (`apps/web/app/(docs)/registry/page.tsx`)
- T028 copy-command UI (`apps/web/components/blocks/copy-command.tsx`)
```

---

## Implementation Strategy

- **MVP first**: Complete Setup → Foundational → US1; validate install/dev/biome loop before touching registry.
- **Incremental delivery**: After US1, deliver US2 (registry build + schema validation); then US3 (docs + copy commands) consuming generated JSON.
- **Performance gates**: Log durations in check/build scripts; fail or warn on install/dev/build over targets.
- **Safety**: Block manual edits under `apps/web/public/registry`; enforce typed schemas and Husky/Biome gates before CI.
