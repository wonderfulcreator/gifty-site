'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl border text-sm font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed",
        size === "sm" ? "h-9 px-3" : "h-11 px-4",
        variant === "primary" &&
          "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800",
        variant === "secondary" &&
          "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50",
        variant === "ghost" &&
          "border-transparent bg-transparent text-zinc-900 hover:bg-zinc-100",
        className
      )}
      {...props}
    />
  );
}
