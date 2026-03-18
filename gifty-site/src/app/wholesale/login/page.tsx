'use client';

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export default function WholesaleLoginPage() {
  const sp = useSearchParams();
  const next = sp.get("next") || "/wholesale";

  const [username, setUsername] = useState("paketych");
  const [password, setPassword] = useState("paket2026");
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

    window.location.href = next;
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] border border-[#edd6bd] bg-white/90 shadow-[0_20px_50px_rgba(164,65,17,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-burst p-6 md:p-10">
            <Badge>Вход в B2B</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Добро пожаловать в оптовый кабинет</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#8a6048]">
              Логика осталась прежней: кабинет защищён JWT-cookie и даёт доступ к оптовым ценам, быстрому заказу и заготовкам под документы. Для демо-доступа логин и пароль уже подставлены.
            </p>
            <div className="paper-card-soft mt-6 overflow-hidden p-3">
              <Image src="/brand/team-hero.png" alt="Пакет Пакетыч" width={799} height={306} className="h-auto w-full rounded-[20px]" />
            </div>
          </div>

          <div className="p-6 md:p-10">
            <h2 className="text-2xl font-black text-[#6b341c]">Авторизация</h2>
            <p className="mt-2 text-sm leading-6 text-[#8a6048]">
              Поменять логин и пароль можно в <code className="rounded bg-[#fff4e7] px-1.5 py-0.5">.env.local</code> через переменные <code className="rounded bg-[#fff4e7] px-1.5 py-0.5">B2B_USERNAME</code> и <code className="rounded bg-[#fff4e7] px-1.5 py-0.5">B2B_PASSWORD</code>.
            </p>

            <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Логин" required />
              <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" required />
              <Button type="submit" disabled={loading}>
                {loading ? "Входим…" : "Войти"}
              </Button>

              {error ? (
                <div className="rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                  {error}
                </div>
              ) : null}
            </form>

            <p className="mt-6 text-sm text-[#8a6048]">
              <Link className="brand-link" href="/">
                ← Вернуться на главную
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
