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
    <div className="container py-10 md:py-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Корзина
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            В корзине можно смешивать розничные и оптовые позиции.
          </p>
        </div>
        <Link
          href="/shop/products"
          className="hidden text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4 md:inline"
        >
          Продолжить покупки →
        </Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-4">
          {lines.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600">
              Корзина пуста. <Link className="underline" href="/shop/products">Открыть каталог</Link>.
            </div>
          ) : null}

          {lines.map(({ it, p, price, sum }) => (
            <div
              key={`${it.productId}:${it.mode}`}
              className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-[110px_1fr_130px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50">
                <Image src={p.images?.[0] || "/products/placeholders/wrap.svg"} alt={p.title} fill className="object-contain p-3" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/shop/product/${p.slug}`} className="text-sm font-medium text-zinc-900 hover:underline">
                    {p.title}
                  </Link>
                  <Badge>{it.mode === "wholesale" ? "Опт" : "Розница"}</Badge>
                </div>
                <div className="mt-1 text-xs text-zinc-500">SKU: {p.sku}</div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="text-sm text-zinc-700">
                    Цена: <span className="font-semibold text-zinc-900">{formatRUB(price)}</span>
                  </div>
                  <div className="text-sm text-zinc-700">
                    Сумма: <span className="font-semibold text-zinc-900">{formatRUB(sum)}</span>
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
                <Button
                  variant="ghost"
                  onClick={() => removeItem(it.productId, it.mode)}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold tracking-tight">Итого</div>

          <div className="mt-4 grid gap-2 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span>Розница</span>
              <span className="font-semibold text-zinc-900">{formatRUB(subtotalRetail)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Опт</span>
              <span className="font-semibold text-zinc-900">{formatRUB(subtotalWholesale)}</span>
            </div>
            <div className="my-2 h-px bg-zinc-200" />
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-zinc-900">Всего</span>
              <span className="font-semibold text-zinc-900">{formatRUB(total)}</span>
            </div>
          </div>

          <Link href="/shop/checkout">
            <Button className="mt-6 w-full" disabled={lines.length === 0}>
              Оформить заявку
            </Button>
          </Link>

          <p className="mt-4 text-xs text-zinc-500">
            Онлайн‑оплата будет подключена позже — пока оформляем как заявку и подтверждаем вручную.
          </p>

          <div className="mt-6 md:hidden">
            <Link
              href="/shop/products"
              className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
            >
              Продолжить покупки →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
