import Link from "next/link";
import { getLocalRegistryIndex } from "@/lib/registry-client";

export default async function Page(): Promise<React.ReactElement> {
  const index = await getLocalRegistryIndex();

  const componentsByCategory = index.components.reduce(
    (acc, component) => {
      if (!acc[component.category]) {
        acc[component.category] = [];
      }
      acc[component.category].push(component);
      return acc;
    },
    {} as Record<string, typeof index.components>,
  );

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Component Registry</h1>
        <p className="text-muted-foreground mb-8">
          Browse and copy components to your project. All components are built with Tailwind CSS
          and follow shadcn/ui patterns.
        </p>

        <div className="space-y-8">
          {Object.entries(componentsByCategory).map(([category, components]) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {components.map((component) => (
                  <Link
                    key={component.id}
                    href={`/registry/${component.id}`}
                    className="block p-6 border rounded-lg hover:border-primary transition-colors"
                  >
                    <h3 className="font-semibold mb-2">{component.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Version: {component.version}
                    </p>
                    <p className="text-sm text-muted-foreground">ID: {component.id}</p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {index.components.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No components found. Run <code className="bg-muted px-2 py-1 rounded">pnpm build:registry</code> to generate the registry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
