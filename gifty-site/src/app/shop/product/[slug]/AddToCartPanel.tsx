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
    <div className="mt-8 grid gap-4">
      <div className="paper-card-soft p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_220px] md:items-end">
          <div>
            <div className="text-sm font-black uppercase tracking-[0.14em] text-[#ab310a]">Количество</div>
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
            Добавить в корзину
          </Button>
        </div>
      </div>

      <div className="paper-card-soft p-4 text-sm text-[#7c472a]">
        <div className="text-sm font-black text-[#6b341c]">Для опта</div>
        <p className="mt-2 leading-6 text-[#8a6048]">
          Чтобы не ошибиться с MOQ и кратностью, мы рекомендуем оформлять большие партии через B2B-кабинет. Но для быстрых тестов можно сразу добавить упаковку кратностью {packSize} штук.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => addItem(productId, "wholesale", packSize)}>
            Добавить {packSize} шт. в опт
          </Button>
          <Button variant="ghost" onClick={() => (window.location.href = "/wholesale/quick-order")}>
            В быстрый заказ →
          </Button>
        </div>
      </div>
    </div>
  );
}
