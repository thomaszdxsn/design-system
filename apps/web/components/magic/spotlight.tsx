"use client";

import { cn } from "@/lib/utils";
import * as React from "react";

export interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: string;
}

export function Spotlight({
  accent = "rgba(99, 102, 241, 0.15)",
  className,
  children,
  ...props
}: SpotlightProps): React.ReactElement {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-transform duration-300",
        hovered ? "shadow-lg ring-2 ring-primary/40 scale-[1.01]" : "shadow-sm",
        className,
      )}
      style={{
        backgroundImage: hovered
          ? `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), ${accent}, transparent 50%)`
          : undefined,
      }}
      onMouseMove={(event) => {
        const target = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - target.left) / target.width) * 100;
        const y = ((event.clientY - target.top) / target.height) * 100;
        event.currentTarget.style.setProperty("--x", `${x}%`);
        event.currentTarget.style.setProperty("--y", `${y}%`);
      }}
    >
      {children ?? (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Magic Spotlight</p>
          <p className="text-base font-semibold text-foreground">Hover to reveal the glow</p>
        </div>
      )}
    </div>
  );
}

