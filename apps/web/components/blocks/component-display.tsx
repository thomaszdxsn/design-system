"use client";

import { CopyCommand } from "@/components/blocks/copy-command";
import type { RegistryEntry } from "@/lib/registry-schema";

interface ComponentDisplayProps {
  component: RegistryEntry;
}

export function ComponentDisplay({ component }: ComponentDisplayProps): React.ReactElement {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{component.name}</h1>
          <p className="text-muted-foreground">Component ID: {component.id}</p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Installation</h2>
            <CopyCommand
              npm={component.copyCommand.npm}
              pnpm={component.copyCommand.pnpm}
              bun={component.copyCommand.bun}
            />
          </section>

          {component.npmDependencies.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Dependencies</h2>
              <ul className="list-disc list-inside space-y-1">
                {component.npmDependencies.map((dep) => (
                  <li key={dep} className="text-sm">
                    <code className="bg-muted px-2 py-1 rounded">{dep}</code>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {component.registryDependencies.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Registry Dependencies</h2>
              <p className="text-sm text-muted-foreground mb-2">
                This component depends on other components from the registry:
              </p>
              <ul className="list-disc list-inside space-y-1">
                {component.registryDependencies.map((dep) => (
                  <li key={dep} className="text-sm">
                    <code className="bg-muted px-2 py-1 rounded">{dep}</code>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-semibold mb-4">Files</h2>
            {component.files.map((file) => (
              <div key={file.path} className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">{file.path}</p>
                <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                  <code className="text-sm">{file.content}</code>
                </pre>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Metadata</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-semibold">Checksum</dt>
                <dd className="text-muted-foreground">
                  <code className="bg-muted px-2 py-1 rounded">{component.checksum}</code>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Last Updated</dt>
                <dd className="text-muted-foreground">
                  {new Date(component.updatedAt || "").toLocaleString()}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
