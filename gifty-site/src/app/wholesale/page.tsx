'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

const cards = [
  {
    href: "/wholesale/catalog",
    title: "Оптовый каталог",
    text: "Те же товары, что и в магазине, но с оптовыми ценами и быстрым переходом к закупке.",
  },
  {
    href: "/wholesale/quick-order",
    title: "Быстрый заказ",
    text: "Таблица по SKU с подсказками по MOQ и кратности для закупки коробами.",
  },
  {
    href: "/wholesale/lists",
    title: "Списки закупки",
    text: "Маршрут под повторяемые шаблоны и сохранённые наборы товаров.",
  },
  {
    href: "/wholesale/orders",
    title: "Заказы и документы",
    text: "Заготовка под историю заказов, счета, акты и PDF-документы.",
  },
];

export default function WholesaleDashboardPage() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_280px] lg:items-center">
          <div>
            <Badge>B2B-кабинет</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Оптовый раздел Пакет Пакетыча</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#8a6048]">
              Здесь уже работают защищённый вход, оптовые цены, быстрый заказ по SKU и страницы под будущие документы. Визуально кабинет продолжает новый бренд, но сохраняет прежнюю структуру и маршруты.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/wholesale/quick-order" className="inline-flex items-center rounded-full border-2 border-[#b62b0d] bg-gradient-to-b from-[#f57822] to-[#e3531d] px-5 py-3 text-sm font-semibold text-white">
                Быстрый заказ
              </Link>
              <Button variant="secondary" onClick={logout}>
                Выйти из кабинета
              </Button>
            </div>
          </div>
          <div className="paper-card-soft flex items-center justify-center p-4">
            <Image src="/brand/mascot-wink.png" alt="B2B" width={220} height={205} className="h-auto w-full max-w-[180px]" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="paper-card p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(177,74,20,0.14)]">
            <div className="text-2xl font-black text-[#6b341c]">{card.title}</div>
            <p className="mt-3 text-sm leading-6 text-[#8a6048]">{card.text}</p>
            <div className="brand-link mt-5 inline-flex">Открыть →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
