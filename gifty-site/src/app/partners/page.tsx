'use client';

import { useState } from "react";
import type { Metadata } from "next";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function PartnersPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Партнёры
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Если вы магазин, студия, флористика или собираете корпоративные подарки —
            поможем подобрать ассортимент, размеры и оптовые условия.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Логотипы партнёров</div>
              <p className="mt-2 text-sm text-zinc-600">
                Здесь можно разместить логотипы партнёров и кейсы.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/2] rounded-xl border border-dashed border-zinc-300 bg-zinc-50"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight">
            Заявка для партнёров
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Форма пока в демо‑режиме. Для связи используйте контакты на странице «Контакты».
          </p>

          <form
            className="mt-6 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <Input required placeholder="Имя" />
            <Input required placeholder="Компания" />
            <Input required type="email" placeholder="Email" />
            <Input placeholder="Телефон (опционально)" />
            <textarea
              placeholder="Коротко: город, формат, объёмы, интересующие позиции"
              className="min-h-[120px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/15"
            />
            <Button type="submit">Отправить заявку</Button>

            {sent ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                Заявка сохранена (MVP). Дальше подключим отправку.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
