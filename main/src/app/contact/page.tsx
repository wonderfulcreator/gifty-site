'use client';

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [emailFrom, setEmailFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "gifty@shopify.com";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+79837221794";
  const address = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "Москва Бульвар Рокоссовского 2";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email: emailFrom,
          subject,
          message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Не удалось отправить сообщение.");
      }

      setSent(true);
      setName("");
      setEmailFrom("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err?.message || "Не удалось отправить сообщение.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Контакты
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Напишите нам — поможем подобрать размеры и материалы, а для бизнеса — рассчитаем оптовую закупку.
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
              <div className="mt-2 text-sm text-zinc-700">{address}</div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold tracking-tight">Написать сообщение</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Отвечаем в течение рабочего дня.
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
              type="email"
              placeholder="Email"
              value={emailFrom}
              onChange={(e) => setEmailFrom(e.target.value)}
            />
            <Input
              placeholder="Тема (опционально)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              required
              placeholder="Сообщение"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[140px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/15"
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
                Спасибо! Сообщение отправлено.
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
