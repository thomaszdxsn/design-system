"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  successLabel?: string;
  fallbackLabel?: string;
}

async function copyWithFallback(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textarea);
      return result;
    } catch {
      return false;
    }
  }
}

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ value, className, children, successLabel = "已复制", fallbackLabel = "复制失败", ...props }, ref) => {
    const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");

    const label = status === "success" ? successLabel : status === "error" ? fallbackLabel : children;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        aria-live="polite"
        onClick={async () => {
          const ok = await copyWithFallback(value);
          setStatus(ok ? "success" : "error");
          setTimeout(() => setStatus("idle"), 2000);
        }}
        {...props}
      >
        {label}
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";

