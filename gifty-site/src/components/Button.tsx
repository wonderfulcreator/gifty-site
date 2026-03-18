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
        "inline-flex items-center justify-center gap-2 rounded-full border-2 text-sm font-semibold transition duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "h-10 px-4" : "h-12 px-5",
        variant === "primary" &&
          "border-[#b62b0d] bg-gradient-to-b from-[#f57822] to-[#e3531d] text-white shadow-[0_10px_24px_rgba(198,81,25,0.24)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(198,81,25,0.28)]",
        variant === "secondary" &&
          "border-[#e6c6a2] bg-[#fff7ef] text-[#8b3915] shadow-[0_8px_18px_rgba(158,72,23,0.08)] hover:bg-[#fff2e2]",
        variant === "ghost" &&
          "border-transparent bg-transparent text-[#8b3915] hover:bg-[#fff1e4]",
        className,
      )}
      {...props}
    />
  );
}
