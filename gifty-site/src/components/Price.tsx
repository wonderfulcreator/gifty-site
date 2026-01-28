'use client';

import { formatRUB } from "@/lib/utils";

export function Price({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  return <span className={className}>{formatRUB(amount)}</span>;
}
