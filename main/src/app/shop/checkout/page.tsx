'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/providers/CartProvider";
import { getProductById } from "@/lib/products";
import { formatRUB } from "@/lib/utils";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useI18n } from "@/providers/I18nProvider";

type OrderLine = {
  productId: string;
  title: string;
  mode: "retail" | "wholesale";
  qty: number;
  price: number;
  sum: number;
};

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const { t } = useI18n();

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const lines = useMemo(() => {
    return items
      .map((it) => {
        const p = getProductById(it.productId);
        if (!p) return null;
        const price = it.mode === "wholesale" ? p.wholesalePrice : p.retailPrice;
        return {
          productId: p.id,
          title: p.title,
          mode: it.mode,
          qty: it.qty,
          price,
          sum: price * it.qty,
        } as OrderLine;
      })
      .filter(Boolean) as OrderLine[];
  }, [items]);

  async function submit() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customer: { name, email, phone },
          comment,
          total,
          lines: lines.map((l) => ({
            productId: l.productId,
            title: l.title,
            mode: l.mode,
            qty: l.qty,
            price: l.price,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
      }

      clear();
      setSent(true);
    } catch (e: any) {
      setError(e?.message || "Не удалось отправить заявку. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-10">
          <h1 className="text-2xl font-semibold tracking-tight text-emerald-950">
            {t("checkout.sent.title")}
          </h1>
          <p className="mt-3 text-sm text-emerald-900">{t("checkout.sent.desc")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/shop/products"
              className="rounded-xl bg-emerald-950 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-900"
            >
              {t("checkout.backToCatalog")}
            </Link>
            <Link
              href="/"
              className="rounded-xl border border-emerald-300 bg-white px-5 py-3 text-sm font-medium text-emerald-950 hover:bg-emerald-100/30"
            >
              {t("checkout.home")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10 md:py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("checkout.title")}
        </h1>
        <p className="mt-4 text-sm text-zinc-600">{t("checkout.desc")}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
          onSubmit={async (e) => {
            e.preventDefault();
            if (lines.length === 0) {
              setError(t("cart.empty"));
              return;
            }
            await submit();
          }}
        >
          <div className="grid gap-3">
            <Input required placeholder={t("checkout.name")} value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              required
              type="email"
              placeholder={t("checkout.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              required
              placeholder={t("checkout.phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <textarea
              placeholder={t("checkout.comment")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[140px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm outline-none ring-offset-2 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/15"
            />
            <Button type="submit" disabled={loading}>
              {loading ? t("checkout.sending") : t("checkout.submit")}
            </Button>

            {error ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                {error}
              </div>
            ) : null}
          </div>
        </form>

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold tracking-tight">{t("cart.total")}</div>

          <div className="mt-4 grid gap-3 text-sm text-zinc-700">
            {lines.map((l) => (
              <div key={`${l.productId}:${l.mode}`} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="line-clamp-2 text-sm font-medium text-zinc-900">{l.title}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    {l.mode === "wholesale" ? t("cart.wholesale") : t("cart.retail")} • {l.qty} × {formatRUB(l.price)}
                  </div>
                </div>
                <div className="shrink-0 font-medium text-zinc-900">{formatRUB(l.sum)}</div>
              </div>
            ))}

            <div className="my-2 h-px bg-zinc-200" />
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-zinc-900">{t("cart.grandTotal")}</span>
              <span className="font-semibold text-zinc-900">{formatRUB(total)}</span>
            </div>

            <Link
              href="/shop/cart"
              className="mt-2 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
            >
              ← {t("cart.title")}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
