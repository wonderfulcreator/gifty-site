'use client';

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@paket-paketych.ru";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+7 (900) 000-00-00";

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <div className="paper-card hero-burst p-6 md:p-8">
            <Badge>Связаться с нами</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Контакты</h1>
            <p className="mt-4 text-base leading-7 text-[#8a6048]">
              Подскажем по размерам, коллекциям, тиражам и соберём заявку на розницу или опт. Эта форма пока работает как демонстрация сценария, без реальной отправки на сервер.
            </p>
          </div>

          <div className="paper-card p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ab310a]">Email</div>
            <div className="mt-2 text-base font-bold text-[#6b341c]">{email}</div>
          </div>

          <div className="paper-card p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ab310a]">Телефон</div>
            <div className="mt-2 text-base font-bold text-[#6b341c]">{phone}</div>
          </div>

          <div className="paper-card-soft flex items-center justify-center p-4">
            <Image src="/brand/mascot-wink.png" alt="Пакет Пакетыч" width={260} height={240} className="h-auto w-full max-w-[200px]" />
          </div>
        </div>

        <div className="paper-card p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#6b341c]">Форма обратной связи</h2>
          <p className="mt-2 text-sm leading-6 text-[#8a6048]">
            MVP-версия: данные никуда не уходят, но структура формы уже готова для email, CRM или Telegram-бота.
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
            <Input placeholder="Тема" />
            <textarea required placeholder="Сообщение" className="warm-textarea" />
            <Button type="submit">Отправить</Button>

            {sent ? (
              <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Сообщение сохранено в демо-режиме. Следующий шаг — подключить реальную отправку.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
