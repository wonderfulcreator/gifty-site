'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/15",
        className
      )}
      {...props}
    />
  );
}
