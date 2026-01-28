import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас",
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          О GIFTY
        </h1>
        <p className="mt-5 text-base text-zinc-600">
          Мы делаем упаковку, которая выглядит аккуратно и современно: чистая типографика,
          спокойные цвета, приятные материалы. Здесь можно купить в розницу или
          оформить оптовую закупку для магазина, студии, флористики или корпоративных наборов.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Философия</div>
            <p className="mt-2 text-sm text-zinc-600">
              Мы за минимализм без «пустоты»: упаковка должна усиливать подарок и создавать
              ощущение заботы — без лишнего декора и шума.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Сервис</div>
            <p className="mt-2 text-sm text-zinc-600">
              Для розницы — быстрый каталог, фильтры и корзина.
              Для опта — MOQ, кратность и быстрый заказ по SKU.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-zinc-500">
          Если вам нужен фирменный тон, история бренда и конкретные преимущества (плотность бумаги,
          ленты, фурнитура, производство) — добавим это сюда отдельным блоком.
        </p>
      </div>
    </div>
  );
}
