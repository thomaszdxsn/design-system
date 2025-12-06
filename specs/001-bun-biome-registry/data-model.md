# Data Model: Bun/Biome Shadcn Registry

## Entities

### Component Source
- Fields:
  - `id` (string, kebab-case, required)
  - `path` (string, required; under `apps/web/components/{ui,magic,blocks}`)
  - `category` (`"ui" | "magic" | "blocks"`, required)
  - `dependencies` (string[], npm package names, default `[]`)
  - `registryDependencies` (string[], registry ids, default `[]`)
  - `tailwindConfig` (object | null; keyframes/plugins used by component)
  - `examplePath` (string, required; points to demo file)
  - `owner` (string; package/workspace owner, default `apps/web`)
  - `schemaVersion` (string, required; tracks Shadcn schema)
- Relationships:
  - One Component Source → One Registry Entry.
  - Component Source → many Documentation Pages (one per variant/route).
- Validation Rules:
  - path must live under allowed directories; reject hand-written public/registry edits.
  - dependencies must exclude dev-only packages; registryDependencies list only existing ids.

### Registry Entry
- Fields:
  - `name` (string, required; human-readable)
  - `id` (string, required; matches Component Source id)
  - `files` (array of `{path: string, content: string}`; required)
  - `registryDependencies` (string[], required)
  - `npmDependencies` (string[], required)
  - `tailwind` (object with `config`/`css` snippets, optional but prefer present)
  - `copyCommand` (object `{npm: string, pnpm: string, bun: string}`, required)
  - `checksum` (string; hash of content for cache busting)
  - `updatedAt` (ISO string)
- Relationships:
  - Registry Entry → displayed by Documentation Page.
  - Registry Entry → consumed by Consumer Request.
- Validation Rules:
  - Must contain registryDependencies for every intra-registry import.
  - copyCommand must match the component id and hosting base URL.
  - No missing required fields; fail build on violation.

### Documentation Page
- Fields:
  - `route` (string, required; Next.js segment)
  - `title` (string, required)
  - `componentId` (string, required)
  - `examples` (array of example ids/snippets)
  - `copyCommand` (same shape as registry entry for display)
  - `seo` (object: `description`, `keywords[]`)
- Relationships:
  - One Documentation Page references exactly one Registry Entry.
  - Consumed by Copy Command UI for multi-PM support.
- Validation Rules:
  - route must live under `app/(docs)/registry/[component]`.
  - copyCommand must be read-only, sourced from generated registry JSON.

### Consumer Request
- Fields:
  - `componentId` (string, required)
  - `packageManager` (`"npm" | "pnpm" | "bun"`, required)
  - `targetPath` (string, required; where files will be placed)
  - `version` (string | null; optional pin)
  - `timestamp` (ISO string)
- Relationships:
  - Consumer Request → resolves to Registry Entry + copyCommand.
- Validation Rules:
  - packageManager must be one of the supported three.
  - targetPath must not escape project root; sanitize `..` segments.

## State Transitions
- Component Source saved → Biome format + lint passes → Registry Entry generated/updated.
- Registry Entry generated → Documentation Page rehydrates with new copyCommand + metadata.
- Consumer Request executed → files downloaded/copied; success/failure logged for CI smoke.
