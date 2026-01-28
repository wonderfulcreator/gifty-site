'use client';

import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCart } from "@/providers/CartProvider";
import { useI18n } from "@/providers/I18nProvider";
import { cn } from "@/lib/utils";

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61c-1.8-1.73-4.72-1.73-6.52 0L12 6.83 9.68 4.61c-1.8-1.73-4.72-1.73-6.52 0-2.06 1.98-2.06 5.19 0 7.17l2.32 2.22L12 21l6.52-6.99 2.32-2.22c2.06-1.98 2.06-5.19 0-7.17z"
      />
    </svg>
  );
}

export function AddToCartPanel({
  productId,
  packSize,
}: {
  productId: string;
  packSize: number;
}) {
  const { addItem, isFavorite, toggleFavorite } = useCart();
  const { t } = useI18n();
  const [qty, setQty] = useState(1);

  const fav = isFavorite(productId);

  return (
    <div className="mt-8 grid gap-3">
      <div className="grid gap-2 md:grid-cols-[1fr_220px_48px] md:items-end">
        <div>
          <div className="text-sm font-medium text-zinc-900">Количество</div>
          <div className="mt-2">
            <Input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>
        </div>

        <Button onClick={() => addItem(productId, "retail", qty)} className="w-full">
          {t("actions.addToCartFull")}
        </Button>

        <button
          type="button"
          onClick={() => toggleFavorite(productId)}
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-xl border bg-white",
            fav ? "border-zinc-300 text-zinc-900" : "border-zinc-200 text-zinc-600 hover:text-zinc-900"
          )}
          title={t("nav.favorites")}
          aria-label={t("nav.favorites")}
        >
          <HeartIcon filled={fav} />
        </button>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        <div className="font-medium text-zinc-900">Опт</div>
        <p className="mt-1 text-sm text-zinc-600">
          Для оптовых закупок действует MOQ и кратность. Удобнее всего оформлять через кабинет.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => addItem(productId, "wholesale", packSize)}>
            {t("actions.addWholesale")} ({packSize} шт.)
          </Button>
          <Button variant="ghost" onClick={() => (window.location.href = "/wholesale/quick-order")}>
            {t("actions.quickOrder")}
          </Button>
        </div>
      </div>
    </div>
  );
}
