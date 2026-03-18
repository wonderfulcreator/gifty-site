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
        "inline-flex items-center rounded-full border border-[#efc49b] bg-[#fff7ed] px-3 py-1 text-xs font-semibold text-[#9a3c13]",
        className,
      )}
    >
      {children}
    </span>
  );
}
