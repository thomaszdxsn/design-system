"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CopyCommandProps {
  npm: string;
  pnpm: string;
  bun: string;
  className?: string;
}

type PackageManager = "npm" | "pnpm" | "bun";

export function CopyCommand({ npm, pnpm, bun, className }: CopyCommandProps): React.ReactElement {
  const [selectedPM, setSelectedPM] = React.useState<PackageManager>("pnpm");
  const [copied, setCopied] = React.useState(false);

  const commands = { npm, pnpm, bun };
  const currentCommand = commands[selectedPM];

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(currentCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silently fail if clipboard is not available
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex gap-2">
        {(["npm", "pnpm", "bun"] as const).map((pm) => (
          <button
            key={pm}
            type="button"
            onClick={() => setSelectedPM(pm)}
            className={cn(
              "px-3 py-1 text-sm font-medium rounded-md transition-colors",
              selectedPM === pm
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            )}
          >
            {pm}
          </button>
        ))}
      </div>

      <div className="relative">
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code className="text-sm">{currentCommand}</code>
        </pre>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="absolute top-2 right-2"
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {selectedPM !== "pnpm" && (
        <p className="text-sm text-muted-foreground">
          💡 Tip: This project uses pnpm. Consider using pnpm for consistency.
        </p>
      )}
    </div>
  );
}
