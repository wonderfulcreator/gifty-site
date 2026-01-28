'use client';

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function PartnersPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Не удалось отправить заявку.");
      }

      setSent(true);
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Не удалось отправить заявку.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Партнёрам
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Работаем с магазинами, студиями, флористами и корпоративными подарками. Поможем подобрать ассортимент,
            рассчитать объёмы и собрать линейку под ваш формат.
          </p>

          <div className="mt-8 grid gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Форматы сотрудничества</div>
              <ul className="mt-3 list-disc pl-5 text-sm text-zinc-600">
                <li>Оптовые закупки со стабильными условиями</li>
                <li>Подбор размеров и коллекций под ассортимент</li>
                <li>Комплекты для подарочных наборов и витрин</li>
                <li>Сезонные подборки и лимитированные серии</li>
              </ul>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">Скорость</div>
                <p className="mt-2 text-sm text-zinc-600">
                  Быстро подтверждаем наличие и сроки. Можно оформить закупку через кабинет или по заявке.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold">Аккуратная витрина</div>
                <p className="mt-2 text-sm text-zinc-600">
                  Минимализм и чистая типографика — упаковка не спорит с подарком, а усиливает впечатление.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight">
            Заявка на сотрудничество
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            Оставьте контакты и коротко опишите формат — мы ответим и предложим условия.
          </p>

          <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
            <Input
              required
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              required
              placeholder="Компания"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <Input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Телефон (опционально)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder="Коротко: город, формат, объёмы, интересующие позиции"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/15"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Отправляем…" : "Отправить"}
            </Button>

            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                {error}
              </div>
            ) : null}

            {sent ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                Спасибо! Заявка отправлена.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
