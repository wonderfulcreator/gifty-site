'use client';

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/providers/CartProvider";
import { getProductById } from "@/lib/products";
import { formatRUB } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";

export default function CartPage() {
  const { items, removeItem, setQty, subtotalRetail, subtotalWholesale, total } = useCart();

  const lines = useMemo(() => {
    return items
      .map((it) => {
        const p = getProductById(it.productId);
        if (!p) return null;
        const price = it.mode === "wholesale" ? p.wholesalePrice : p.retailPrice;
        const sum = price * it.qty;
        return { it, p, price, sum };
      })
      .filter(Boolean) as Array<{
        it: any;
        p: any;
        price: number;
        sum: number;
      }>;
  }, [items]);

  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <div className="grid gap-8 md:grid-cols-[1fr_240px] md:items-center">
          <div>
            <Badge>Корзина</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Ваши выбранные позиции</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#8a6048]">
              В этой MVP-версии можно смешивать розницу и опт, чтобы протестировать логику работы корзины и итогов перед следующим этапом интеграций.
            </p>
          </div>
          <div className="paper-card-soft flex items-center justify-center p-4">
            <Image src="/brand/mascot-wink.png" alt="Корзина" width={220} height={205} className="h-auto w-full max-w-[180px]" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-4">
          {lines.length === 0 ? (
            <div className="paper-card p-8 text-sm text-[#8a6048]">
              Корзина пока пуста. <Link className="brand-link" href="/shop/products">Открыть каталог</Link>.
            </div>
          ) : null}

          {lines.map(({ it, p, price, sum }) => (
            <div
              key={`${it.productId}:${it.mode}`}
              className="paper-card grid gap-4 p-4 md:grid-cols-[120px_1fr_140px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-[20px] border border-[#f0d6bc] bg-[linear-gradient(180deg,_#fffaf5,_#fff3e7)]">
                <Image src={p.images?.[0] || "/products/placeholders/wrap.svg"} alt={p.title} fill className="object-contain p-3" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/shop/product/${p.slug}`} className="text-base font-black text-[#6b341c] hover:text-[#d95c1d]">
                    {p.title}
                  </Link>
                  <Badge>{it.mode === "wholesale" ? "Опт" : "Розница"}</Badge>
                </div>
                <div className="mt-1 text-xs text-[#9b765f]">SKU: {p.sku}</div>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#7c472a]">
                  <div>
                    Цена: <span className="font-bold text-[#6b341c]">{formatRUB(price)}</span>
                  </div>
                  <div>
                    Сумма: <span className="font-bold text-[#6b341c]">{formatRUB(sum)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  min={1}
                  value={it.qty}
                  onChange={(e) => setQty(it.productId, it.mode, Number(e.target.value))}
                />
                <Button variant="ghost" onClick={() => removeItem(it.productId, it.mode)}>
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </section>

        <aside className="paper-card h-fit p-6">
          <div className="text-2xl font-black text-[#6b341c]">Итого</div>

          <div className="mt-4 grid gap-2 text-sm text-[#7c472a]">
            <div className="paper-card-soft flex items-center justify-between px-4 py-3">
              <span>Розница</span>
              <span className="font-black text-[#6b341c]">{formatRUB(subtotalRetail)}</span>
            </div>
            <div className="paper-card-soft flex items-center justify-between px-4 py-3">
              <span>Опт</span>
              <span className="font-black text-[#6b341c]">{formatRUB(subtotalWholesale)}</span>
            </div>
            <div className="brand-divider my-3" />
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold text-[#6b341c]">Всего</span>
              <span className="text-xl font-black text-[#ab310a]">{formatRUB(total)}</span>
            </div>
          </div>

          <Link href="/shop/checkout">
            <Button className="mt-6 w-full" disabled={lines.length === 0}>
              Оформить заявку
            </Button>
          </Link>

          <div className="mt-4 text-xs leading-5 text-[#9b765f]">
            Оплата не подключена: на checkout собираются контакты для обратной связи и подтверждения заказа.
          </div>
        </aside>
      </div>
    </div>
  );
}
