'use client';

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function PartnersPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="container py-8 md:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <div className="paper-card hero-burst p-6 md:p-8">
            <Badge>Партнёрские заявки</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Партнёры и оптовые клиенты</h1>
            <p className="mt-4 text-base leading-7 text-[#8a6048]">
              Если вы магазин, студия декора, флористика или корпоративное направление, мы соберём ассортимент под вашу аудиторию и подскажем по кратностям и сезонным коллекциям.
            </p>
          </div>

          <div className="paper-card p-5">
            <div className="text-sm font-black text-[#6b341c]">Что уже предусмотрено на сайте</div>
            <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#8a6048]">
              <li>• форма первичной заявки</li>
              <li>• отдельный B2B-кабинет</li>
              <li>• быстрый заказ по SKU</li>
              <li>• страницы под повтор заказов и документы</li>
            </ul>
          </div>

          <div className="paper-card-soft overflow-hidden p-4">
            <Image src="/brand/team-hero.png" alt="Команда фирменных персонажей" width={799} height={306} className="h-auto w-full rounded-[20px]" />
          </div>
        </div>

        <div className="paper-card p-6 md:p-8">
          <h2 className="text-2xl font-black text-[#6b341c]">Заявка партнёра</h2>
          <p className="mt-2 text-sm leading-6 text-[#8a6048]">
            Форма демонстрационная: следующая итерация сайта может отправлять заявки в CRM, на email или в Telegram.
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
            <Input placeholder="Телефон" />
            <textarea placeholder="Город, формат магазина, объёмы и интересующие позиции" className="warm-textarea" />
            <Button type="submit">Отправить заявку</Button>

            {sent ? (
              <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                Заявка записана в демо-режиме. Реальную интеграцию можно подключить без переделки интерфейса.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
