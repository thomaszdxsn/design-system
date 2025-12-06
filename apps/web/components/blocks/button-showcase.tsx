"use client";

import { Button } from "@/components/ui/button";

export function ButtonShowcase(): React.ReactElement {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Button Component</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
