'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-[22px] border border-[#e8ccb0] bg-white/90 px-4 text-sm text-[#5d2b18] outline-none ring-offset-2 placeholder:text-[#8a6048]/75 focus:border-[#e55c1b] focus:ring-4 focus:ring-[#ffdcb9]",
        className,
      )}
      {...props}
    />
  );
}
