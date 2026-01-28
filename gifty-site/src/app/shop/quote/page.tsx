'use client';

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { useCart } from "@/providers/CartProvider";
import { getProductById } from "@/lib/products";
import { formatRUB } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useI18n } from "@/providers/I18nProvider";

type Party = {
  company: string;
  contact: string;
  email: string;
  phone: string;
};

const PARTY_STORAGE_KEY = "gifty_quote_party_v1";

export default function QuotePage() {
  const { items, total } = useCart();
  const { t, locale } = useI18n();

  const fromEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "gifty@shopify.com";
  const fromPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+79837221794";
  const fromAddress = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "Москва Бульвар Рокоссовского 2";

  const [to, setTo] = useState<Party>({
    company: "",
    contact: "",
    email: "",
    phone: "",
  });

  // Load saved recipient
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PARTY_STORAGE_KEY);
      if (raw) setTo(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // Persist recipient
  useEffect(() => {
    try {
      localStorage.setItem(PARTY_STORAGE_KEY, JSON.stringify(to));
    } catch {
      // ignore
    }
  }, [to]);

  const lines = useMemo(() => {
    return items
      .map((it) => {
        const p = getProductById(it.productId);
        if (!p) return null;
        const price = it.mode === "wholesale" ? p.wholesalePrice : p.retailPrice;
        const sum = price * it.qty;
        return { it, p, price, sum };
      })
      .filter(Boolean) as Array<{ it: any; p: any; price: number; sum: number }>;
  }, [items]);

  const date = useMemo(() => {
    const d = new Date();
    const localeTag = locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "ru-RU";
    return d.toLocaleDateString(localeTag, { year: "numeric", month: "2-digit", day: "2-digit" });
  }, [locale]);

  const empty = lines.length === 0;

  return (
    <div className="container py-10 md:py-14">
      {/* Controls */}
      <div className="print:hidden">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t("quote.title")}
            </h1>
            <p className="mt-3 text-sm text-zinc-600">{t("quote.subtitle")}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop/cart"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              ← {t("cart.title")}
            </Link>
            <Button onClick={() => window.print()} disabled={empty}>
              {t("actions.print")}
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">{t("quote.to")}</div>
            <div className="mt-4 grid gap-3">
              <Input
                placeholder={t("quote.company")}
                value={to.company}
                onChange={(e) => setTo((s) => ({ ...s, company: e.target.value }))}
              />
              <Input
                placeholder={t("quote.contact")}
                value={to.contact}
                onChange={(e) => setTo((s) => ({ ...s, contact: e.target.value }))}
              />
              <Input
                type="email"
                placeholder={t("quote.email")}
                value={to.email}
                onChange={(e) => setTo((s) => ({ ...s, email: e.target.value }))}
              />
              <Input
                placeholder={t("quote.phone")}
                value={to.phone}
                onChange={(e) => setTo((s) => ({ ...s, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">{t("quote.from")}</div>
            <div className="mt-4 grid gap-2 text-sm text-zinc-700">
              <div>
                <span className="text-zinc-500">{t("quote.company")}: </span>
                <span className="font-medium text-zinc-900">GIFTY</span>
              </div>
              <div>
                <span className="text-zinc-500">{t("quote.email")}: </span>
                <span className="font-medium text-zinc-900">{fromEmail}</span>
              </div>
              <div>
                <span className="text-zinc-500">{t("quote.phone")}: </span>
                <span className="font-medium text-zinc-900">{fromPhone}</span>
              </div>
              <div>
                <span className="text-zinc-500">{t("quote.address")}: </span>
                <span className="font-medium text-zinc-900">{fromAddress}</span>
              </div>
              <div className="pt-2 text-xs text-zinc-500">
                {t("quote.meta")}: {date}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable document */}
      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none print:p-0">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm font-semibold tracking-wide">GIFTY</div>
            <div className="mt-1 text-xs text-zinc-500">
              {fromEmail} • {fromPhone}
            </div>
            <div className="mt-1 text-xs text-zinc-500">{fromAddress}</div>
          </div>
          <div className="text-right text-xs text-zinc-500">
            {t("quote.meta")}: {date}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xl font-semibold tracking-tight">{t("quote.title")}</div>
          <div className="mt-2 grid gap-1 text-sm text-zinc-700">
            {to.company ? (
              <div>
                <span className="text-zinc-500">{t("quote.company")}: </span>
                <span className="font-medium text-zinc-900">{to.company}</span>
              </div>
            ) : null}
            {to.contact ? (
              <div>
                <span className="text-zinc-500">{t("quote.contact")}: </span>
                <span className="font-medium text-zinc-900">{to.contact}</span>
              </div>
            ) : null}
            {to.email ? (
              <div>
                <span className="text-zinc-500">{t("quote.email")}: </span>
                <span className="font-medium text-zinc-900">{to.email}</span>
              </div>
            ) : null}
            {to.phone ? (
              <div>
                <span className="text-zinc-500">{t("quote.phone")}: </span>
                <span className="font-medium text-zinc-900">{to.phone}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 text-xs text-zinc-500">
              <tr>
                <th className="py-2 pr-4">{t("quote.table.item")}</th>
                <th className="py-2 pr-4">{t("quote.table.qty")}</th>
                <th className="py-2 pr-4">{t("quote.table.price")}</th>
                <th className="py-2">{t("quote.table.sum")}</th>
              </tr>
            </thead>
            <tbody>
              {lines.map(({ it, p, price, sum }) => (
                <tr key={`${it.productId}:${it.mode}`} className="border-b border-zinc-100">
                  <td className="py-3 pr-4">
                    <div className="font-medium text-zinc-900">{p.title}</div>
                    <div className="mt-1 text-xs text-zinc-500">
                      {it.mode === "wholesale" ? t("cart.wholesale") : t("cart.retail")}
                    </div>
                  </td>
                  <td className="py-3 pr-4">{it.qty}</td>
                  <td className="py-3 pr-4">{formatRUB(price)}</td>
                  <td className="py-3 font-medium text-zinc-900">{formatRUB(sum)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-end gap-4">
          <div className="text-sm text-zinc-600">{t("quote.total")}:</div>
          <div className="text-lg font-semibold text-zinc-900">{formatRUB(total)}</div>
        </div>

        <div className="mt-8 text-xs text-zinc-500">{t("quote.footer")}</div>
      </div>

      {empty ? (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 print:hidden">
          {t("cart.empty")}{" "}
          <Link className="underline" href="/shop/products">
            {t("actions.openCatalog")}
          </Link>
          .
        </div>
      ) : null}
    </div>
  );
}
