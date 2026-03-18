'use client';

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { getProductById } from "@/lib/products";
import { formatRUB } from "@/lib/utils";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

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
      <div className="container py-8 md:py-12">
        <div className="paper-card hero-burst max-w-3xl px-6 py-8 md:px-10">
          <div className="flex flex-col items-start gap-5 md:flex-row md:items-center">
            <Image src="/brand/mascot-wink.png" alt="Готово" width={180} height={168} className="h-auto w-36" />
            <div>
              <Badge>Готово</Badge>
              <h1 className="brand-heading mt-4 text-3xl md:text-4xl">Заявка оформлена в демо-режиме</h1>
              <p className="mt-4 text-sm leading-6 text-[#8a6048]">
                Сейчас сайт не отправляет данные на сервер, но сценарий checkout уже готов. Следующий шаг — подключить email, CRM или Telegram-бота и передавать состав заказа автоматически.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => clear()}>Очистить корзину</Button>
            <Link href="/shop/products" className="inline-flex items-center rounded-full border-2 border-[#e7c7a5] bg-[#fff7ee] px-5 py-3 text-sm font-semibold text-[#8b3915] transition hover:bg-[#fff0df]">
              Вернуться в каталог
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <Badge>Checkout</Badge>
        <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Подтверждение заявки</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#8a6048]">
          Оставьте контакты — в следующей итерации сайта они будут автоматически улетать в CRM, email или Telegram вместе с составом корзины.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          className="paper-card p-6 md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h2 className="text-2xl font-black text-[#6b341c]">Контакты</h2>
          <div className="mt-5 grid gap-3">
            <Input required placeholder="Имя" />
            <Input required type="email" placeholder="Email" />
            <Input placeholder="Телефон" />
            <textarea placeholder="Комментарий: доставка, реквизиты, пожелания" className="warm-textarea" />
            <Button type="submit">Отправить заявку</Button>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#9b765f]">
            Оплата и отправка данных сейчас отключены. Форма нужна, чтобы показать готовый путь пользователя.
          </p>
        </form>

        <aside className="paper-card h-fit p-6">
          <div className="text-2xl font-black text-[#6b341c]">Состав заказа</div>
          <div className="mt-4 grid gap-3 text-sm text-[#7c472a]">
            {lines.map((l, idx) => (
              <div key={idx} className="paper-card-soft p-4">
                <div className="font-bold text-[#6b341c]">{l.title}</div>
                <div className="mt-1 text-xs text-[#9b765f]">
                  {l.mode === "wholesale" ? "Опт" : "Розница"} • SKU {l.sku}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Qty: {l.qty}</span>
                  <span className="font-black text-[#ab310a]">{formatRUB(l.sum)}</span>
                </div>
              </div>
            ))}

            <div className="brand-divider my-1" />
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold text-[#6b341c]">Итого</span>
              <span className="text-xl font-black text-[#ab310a]">{formatRUB(total)}</span>
            </div>
          </div>

          <Link href="/shop/cart" className="brand-link mt-6 inline-flex">
            ← Вернуться в корзину
          </Link>
        </aside>
      </div>
    </div>
  );
}
