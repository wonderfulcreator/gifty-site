'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { getProductById } from "@/lib/products";
import { formatRUB } from "@/lib/utils";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [sent, setSent] = useState(false);

  const lines = useMemo(() => {
    return items
      .map((it) => {
        const p = getProductById(it.productId);
        if (!p) return null;
        const price = it.mode === "wholesale" ? p.wholesalePrice : p.retailPrice;
        return {
          sku: p.sku,
          title: p.title,
          mode: it.mode,
          qty: it.qty,
          sum: price * it.qty,
        };
      })
      .filter(Boolean) as Array<any>;
  }, [items]);

  if (sent) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-10">
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">
            Заявка сформирована
          </h1>
          <p className="mt-3 text-sm text-emerald-900">
            Сайт сейчас в демо‑режиме, поэтому заявка не отправляется автоматически.
            Можно очистить корзину и продолжить просмотр каталога.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => clear()}>Очистить корзину</Button>
            <Link
              href="/shop/products"
              className="rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-medium text-emerald-950 hover:bg-emerald-100/30"
            >
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Оформление заказа
        </h1>
        <p className="mt-4 text-sm text-zinc-600">
          Пока без онлайн‑оплаты: оставьте контакты, и мы подтвердим заказ или оптовую закупку.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="text-lg font-semibold tracking-tight">Контакты</h2>
          <div className="mt-5 grid gap-3">
            <Input required placeholder="Имя" />
            <Input required type="email" placeholder="Email" />
            <Input placeholder="Телефон" />
            <textarea
              placeholder="Комментарий (адрес доставки, реквизиты для опта, etc.)"
              className="min-h-[120px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/15"
            />
            <Button type="submit">Отправить заявку</Button>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            Форма в демо‑режиме: отправку подключим позже.
          </p>
        </form>

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold tracking-tight">Состав</div>
          <div className="mt-4 grid gap-3 text-sm text-zinc-700">
            {lines.map((l, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="font-medium text-zinc-900">{l.title}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  {l.mode === "wholesale" ? "Опт" : "Розница"} • SKU {l.sku}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Qty: {l.qty}</span>
                  <span className="font-semibold">{formatRUB(l.sum)}</span>
                </div>
              </div>
            ))}

            <div className="my-1 h-px bg-zinc-200" />
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-zinc-900">Итого</span>
              <span className="font-semibold text-zinc-900">{formatRUB(total)}</span>
            </div>
          </div>

          <Link
            href="/shop/cart"
            className="mt-6 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
          >
            ← Вернуться в корзину
          </Link>
        </aside>
      </div>
    </div>
  );
}
