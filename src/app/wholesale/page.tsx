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
            Оптовые цены, фильтры, быстрый заказ и правила MOQ/кратности.
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
          <div className="text-sm font-semibold">Каталог (опт)</div>
          <p className="mt-2 text-sm text-zinc-600">
            Карточки товаров + фильтры, но с оптовыми ценами.
          </p>
          <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
            Открыть →
          </div>
        </Link>

        <Link
          href="/wholesale/quick-order"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-soft"
        >
          <div className="text-sm font-semibold">Быстрый заказ</div>
          <p className="mt-2 text-sm text-zinc-600">
            Таблица по SKU: ввод количества → в корзину.
          </p>
          <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
            Открыть →
          </div>
        </Link>

        <Link
          href="/wholesale/lists"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-soft"
        >
          <div className="text-sm font-semibold">Списки / Repeat order</div>
          <p className="mt-2 text-sm text-zinc-600">
            Заглушка под списки закупки и повтор заказа.
          </p>
          <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
            Открыть →
          </div>
        </Link>

        <Link
          href="/wholesale/orders"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-soft"
        >
          <div className="text-sm font-semibold">Заказы и документы</div>
          <p className="mt-2 text-sm text-zinc-600">
            История/документы/PDF — заглушка под интеграцию.
          </p>
          <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
            Открыть →
          </div>
        </Link>
      </div>

      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold">Подсказка</div>
        <p className="mt-2 text-sm text-zinc-600">
          Демо‑логин/пароль задаются через переменные окружения. В продакшене
          обязательно смените <code className="rounded bg-zinc-100 px-1">JWT_SECRET</code>.
        </p>
      </div>
    </div>
  );
}
