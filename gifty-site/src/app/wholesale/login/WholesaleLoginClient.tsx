"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function WholesaleLoginClient({ nextUrl }: { nextUrl: string }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Ошибка авторизации");
      setLoading(false);
      return;
    }

    window.location.href = nextUrl;
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Оптовый кабинет</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Введите логин и пароль, чтобы увидеть оптовые цены и оформить закупку.
        </p>

        <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Логин"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            type="password"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Входим…" : "Войти"}
          </Button>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
              {error}
            </div>
          ) : null}
        </form>

        <div className="mt-6 text-sm text-zinc-600">
          <Link className="underline" href="/">
            ← На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
