'use client';

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@gifty.example";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+7 (000) 000-00-00";

  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Контакты
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Напишите нам — поможем подобрать размеры и материалы, а для бизнеса —
            рассчитаем оптовую закупку.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Email</div>
              <div className="mt-2 text-sm text-zinc-700">{email}</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Телефон</div>
              <div className="mt-2 text-sm text-zinc-700">{phone}</div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Адрес</div>
              <div className="mt-2 text-sm text-zinc-700">
                Москва (пример) — уточним после запуска.
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight">Форма</h2>
          <p className="mt-2 text-sm text-zinc-600">
            MVP: отправка отключена (подключим email/CRM/Telegram).
          </p>

          <form
            className="mt-6 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <Input required placeholder="Имя" />
            <Input required type="email" placeholder="Email" />
            <Input placeholder="Тема (опционально)" />
            <textarea
              required
              placeholder="Сообщение"
              className="min-h-[140px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/15"
            />
            <Button type="submit">Отправить</Button>

            {sent ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                Сообщение сохранено (MVP). Дальше подключим отправку.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
