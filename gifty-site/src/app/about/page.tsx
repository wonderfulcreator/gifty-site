import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас",
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          О бренде GIFTY
        </h1>
        <p className="mt-5 text-base text-zinc-600">
          Мы делаем упаковку, которая выглядит как аккуратная редакционная
          страница: воздух, сетка, типографика, честные материалы. На этом MVP
          сайте уже есть витрина бренда, магазин и закрытый B2B‑кабинет.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Философия</div>
            <p className="mt-2 text-sm text-zinc-600">
              Минимализм не холодный — а точный. Упаковка должна усиливать
              подарок, а не спорить с ним.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Сервис</div>
            <p className="mt-2 text-sm text-zinc-600">
              Для розницы — быстрый каталог и корзина. Для опта — MOQ, кратность
              и быстрый заказ табличным видом.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-zinc-500">
          Примечание: тексты — редакционные заглушки для MVP. Контент можно
          заменить на ваш фирменный.
        </p>
      </div>
    </div>
  );
}
