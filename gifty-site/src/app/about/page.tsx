import Image from "next/image";
import type { Metadata } from "next";
import { Badge } from "@/components/Badge";

export const metadata: Metadata = {
  title: "О бренде",
};

const values = [
  {
    title: "Тёплая эстетика",
    text: "Упаковка должна быть дружелюбной: мягкие формы, бумажные фактуры и акценты, которые поднимают настроение ещё до распаковки.",
  },
  {
    title: "Понятный выбор",
    text: "Мы оставили удобный каталог с фильтрами по размеру, цвету и коллекции, чтобы клиент быстро нашёл нужный пакет или бумагу.",
  },
  {
    title: "Готовность к опту",
    text: "Сайт подходит и для розницы, и для закупщиков: B2B-кабинет позволяет считать кратности, MOQ и быстро собирать заказ по SKU.",
  },
  {
    title: "Персонаж бренда",
    text: "Пакет Пакетыч добавляет бренду узнаваемость и делает сайт не просто магазином, а полноценным дружелюбным digital-героем.",
  },
];

export default function AboutPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Badge>История ребрендинга</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">О бренде Пакет Пакетыч</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#8a6048]">
              Мы переосмыслили прежний строгий визуальный стиль и превратили сайт в уютную, яркую и чуть мультяшную витрину упаковки. Новый образ держится на трёх вещах: бумажная теплота, энергичная палитра и маскот, который задаёт настроение на всех ключевых страницах.
            </p>
          </div>
          <div className="paper-card-soft p-4">
            <Image
              src="/brand/team-hero.png"
              alt="Персонажи бренда Пакет Пакетыч"
              width={799}
              height={306}
              className="h-auto w-full rounded-[20px]"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {values.map((item) => (
          <div key={item.title} className="paper-card p-6">
            <h2 className="text-2xl font-black text-[#6b341c]">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#8a6048]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
