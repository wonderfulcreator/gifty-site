'use client';

import Link from "next/link";
import { Button } from "@/components/Button";

export default function WholesaleDashboardPage() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Оптовый кабинет
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Оптовые цены, MOQ и кратность. Для закупки используйте оптовый каталог или быстрый заказ.
          </p>
        </div>

        <Button variant="secondary" onClick={logout}>
          Выйти
        </Button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Link
          href="/wholesale/catalog"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-soft"
        >
          <div className="text-sm font-semibold">Оптовый каталог</div>
          <p className="mt-2 text-sm text-zinc-600">
            Ассортимент с фильтрами и оптовыми ценами. Удобно подбирать позиции и проверять наличие.
          </p>
          <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
            Перейти →
          </div>
        </Link>

        <Link
          href="/wholesale/quick-order"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-soft"
        >
          <div className="text-sm font-semibold">Быстрый заказ</div>
          <p className="mt-2 text-sm text-zinc-600">
            Табличный ввод количества по товарам. Подходит для регулярных закупок и пополнения.
          </p>
          <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
            Перейти →
          </div>
        </Link>
      </div>

      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold">Нужна помощь с закупкой?</div>
        <p className="mt-2 text-sm text-zinc-600">
          Напишите нам — поможем собрать наборы, подобрать размеры и рассчитать закупку под ваш ассортимент.
        </p>
      </div>
    </div>
  );
}
