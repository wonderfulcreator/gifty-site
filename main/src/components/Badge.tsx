'use client';

import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-700",
        className
      )}
    >
      {children}
    </span>
  );
}
