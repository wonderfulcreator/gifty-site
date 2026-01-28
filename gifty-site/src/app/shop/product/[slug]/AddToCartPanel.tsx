'use client';

import { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useCart } from "@/providers/CartProvider";

export function AddToCartPanel({
  productId,
  packSize,
}: {
  productId: string;
  packSize: number;
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-8 grid gap-3">
      <div className="grid gap-2 md:grid-cols-[1fr_180px] md:items-end">
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

        <Button
          onClick={() => addItem(productId, "retail", qty)}
          className="w-full"
        >
          Добавить в корзину
        </Button>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
        <div className="font-medium text-zinc-900">Опт</div>
        <p className="mt-1 text-sm text-zinc-600">
          Для оптовых закупок действует MOQ и кратность. Удобнее всего оформлять через кабинет.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => addItem(productId, "wholesale", packSize)}
          >
            Добавить оптом ({packSize} шт.)
          </Button>
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/wholesale/quick-order")}
          >
            Быстрый заказ →
          </Button>
        </div>
      </div>
    </div>
  );
}
