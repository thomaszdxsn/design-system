# Design System - pnpm/Biome Shadcn Registry

A modern component registry built with Next.js, Tailwind CSS, and shadcn/ui patterns. Features automated component discovery, type-safe schemas, and multi-package-manager support.

## 🚀 Quick Start

### Prerequisites

- **pnpm** 8.0+ (recommended)
- **Node.js** 18+

```bash
# Install pnpm if you haven't
npm install -g pnpm

# Verify installation
pnpm --version
```

### Installation

```bash
# Clone and install
pnpm install

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the documentation site.

## 📦 Available Commands

```bash
# Development
pnpm dev              # Start Next.js dev server
pnpm dev:check        # Watch mode for Biome checks

# Building
pnpm build            # Build Next.js app
pnpm build:registry   # Generate component registry JSON

# Quality
pnpm check            # Run Biome lint/format
pnpm check:staged     # Check staged files (used by Husky)
pnpm test             # Run tests with Vitest
pnpm audit            # Security audit

# Preview
pnpm preview          # Start production server
```

## 🏗️ Project Structure

```
design-system/
├── apps/
│   └── web/                    # Next.js documentation site
│       ├── app/                # App Router pages
│       │   ├── (docs)/         # Documentation routes
│       │   │   ├── components/ # Component examples
│       │   │   └── registry/   # Registry browser
│       │   └── page.tsx        # Homepage
│       ├── components/         # Component source
│       │   ├── ui/             # UI primitives
│       │   ├── magic/          # Enhanced components
│       │   └── blocks/         # Composite components
│       ├── lib/                # Utilities
│       │   ├── registry-schema.ts
│       │   ├── registry-paths.ts
│       │   ├── registry-client.ts
│       │   └── validate-registry.ts
│       └── public/
│           └── registry/       # Generated JSON (read-only)
├── packages/
│   ├── config/                 # Shared configuration
│   └── utils/                  # Shared utilities (cn, etc.)
├── scripts/                    # Build & automation scripts
│   ├── bootstrap.ts
│   ├── check.ts
│   ├── build-registry.ts
│   ├── audit.ts
│   └── validate-quickstart.ts
└── specs/                      # Feature specifications
```

## 🎨 Adding Components

1. Create your component in `apps/web/components/{ui,magic,blocks}/`
2. Follow Biome rules (no default exports, named exports only)
3. Use the `cn()` utility for className merging
4. Run `pnpm build:registry` to generate registry JSON

Example:

```tsx
// apps/web/components/ui/card.tsx
import * as React from "react";
import { cn } from "@design-system/utils/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          variant === "outlined" && "border-2",
          className,
        )}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run with coverage
pnpm test --coverage
```

## 📝 Code Quality

This project enforces strict code quality standards:

- **Biome**: Linting and formatting
- **TypeScript**: Strict mode enabled
- **Husky**: Pre-commit and pre-push hooks
- **No default exports**: Named exports only
- **No console.log**: Use proper logging
- **No `any` type**: Use `unknown` + type guards

## 🔒 Security

```bash
# Run security audit
pnpm audit

# View audit report
cat reports/audit-summary.json
```

## 📊 Performance Targets

- **Install**: ≤ 10s
- **Dev start**: < 1s  
- **Registry build**: < 1s
- **Lint/format**: < 200ms

Performance metrics are logged to `logs/` directory.

## 🌐 Registry Usage

### Browse Components

Visit `/registry` to browse all available components.

### Install Components

Each component page provides installation commands for npm, pnpm, and bun:

```bash
# Using pnpm (recommended)
pnpm dlx shadcn@latest add https://registry.example.com/button.json

# Using npm
npx shadcn@latest add https://registry.example.com/button.json

# Using bun
bunx shadcn@latest add https://registry.example.com/button.json
```

## 🛠️ Tech Stack

- **Runtime**: Node.js with pnpm
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + tailwindcss-animate
- **Type System**: TypeScript (strict mode)
- **Linting**: Biome
- **Testing**: Vitest
- **Git Hooks**: Husky
- **Icons**: Lucide React
- **Validation**: Zod

## 📄 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm check` and `pnpm test`
5. Submit a pull request

All commits must pass Biome checks and tests.
