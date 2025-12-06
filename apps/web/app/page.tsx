import Link from "next/link";

export default function Page(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold mb-4">Design System</h1>
          <p className="text-muted-foreground mb-8">
            pnpm/Biome Shadcn Registry - Component Documentation
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/registry"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Browse Components
            </Link>
            <Link
              href="/components/button"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
            >
              View Examples
            </Link>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3 text-left">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">⚡ Fast Setup</h3>
              <p className="text-sm text-muted-foreground">
                Single command install with pnpm. Components ready in seconds.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">🎨 Customizable</h3>
              <p className="text-sm text-muted-foreground">
                Built with Tailwind CSS. Full control over styling and behavior.
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">✅ Type Safe</h3>
              <p className="text-sm text-muted-foreground">
                TypeScript-first with strict type checking and Biome linting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
