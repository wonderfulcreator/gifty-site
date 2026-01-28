'use client';

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/providers/CartProvider";
import { getProductById } from "@/lib/products";
import { formatRUB } from "@/lib/utils";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { ProductCard } from "@/components/ProductCard";
import { useI18n } from "@/providers/I18nProvider";

export default function CartPage() {
  const { items, removeItem, setQty, subtotalRetail, subtotalWholesale, total, favorites } = useCart();
  const { t } = useI18n();

  const lines = useMemo(() => {
    return items
      .map((it) => {
        const p = getProductById(it.productId);
        if (!p) return null;
        const price = it.mode === "wholesale" ? p.wholesalePrice : p.retailPrice;
        const sum = price * it.qty;
        return { it, p, price, sum };
      })
      .filter(Boolean) as Array<{
      it: any;
      p: any;
      price: number;
      sum: number;
    }>;
  }, [items]);

  const favProducts = useMemo(() => {
    return favorites
      .map((id) => getProductById(id))
      .filter(Boolean)
      .slice(0, 6) as any[];
  }, [favorites]);

  const empty = lines.length === 0;

  return (
    <div className="container py-10 md:py-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("cart.title")}
          </h1>
          <p className="mt-3 text-sm text-zinc-600">
            {t("cart.desc")}
          </p>
        </div>
        <Link
          href="/shop/products"
          className="hidden text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4 md:inline"
        >
          {t("actions.continueShopping")}
        </Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-4">
          {empty ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600">
              {t("cart.empty")}{" "}
              <Link className="underline" href="/shop/products">
                {t("actions.openCatalog")}
              </Link>
              .
            </div>
          ) : null}

          {lines.map(({ it, p, price, sum }) => (
            <div
              key={`${it.productId}:${it.mode}`}
              className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm md:grid-cols-[110px_1fr_130px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-50">
                <Image
                  src={p.images?.[0] || "/products/placeholders/wrap.svg"}
                  alt={p.title}
                  fill
                  className="object-contain p-3"
                />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/shop/product/${p.slug}`}
                    className="text-sm font-medium text-zinc-900 hover:underline"
                  >
                    {p.title}
                  </Link>
                  <Badge>{it.mode === "wholesale" ? t("cart.wholesale") : t("cart.retail")}</Badge>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="text-sm text-zinc-700">
                    {t("cart.price")}:{" "}
                    <span className="font-semibold text-zinc-900">{formatRUB(price)}</span>
                  </div>
                  <div className="text-sm text-zinc-700">
                    {t("cart.sum")}:{" "}
                    <span className="font-semibold text-zinc-900">{formatRUB(sum)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Input
                  type="number"
                  min={1}
                  value={it.qty}
                  onChange={(e) => setQty(it.productId, it.mode, Number(e.target.value))}
                />
                <Button variant="ghost" onClick={() => removeItem(it.productId, it.mode)}>
                  {t("cart.remove")}
                </Button>
              </div>
            </div>
          ))}
        </section>

        <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold tracking-tight">{t("cart.total")}</div>

          <div className="mt-4 grid gap-2 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span>{t("cart.retail")}</span>
              <span className="font-semibold text-zinc-900">{formatRUB(subtotalRetail)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("cart.wholesale")}</span>
              <span className="font-semibold text-zinc-900">{formatRUB(subtotalWholesale)}</span>
            </div>
            <div className="my-2 h-px bg-zinc-200" />
            <div className="flex items-center justify-between text-base">
              <span className="font-medium text-zinc-900">{t("cart.grandTotal")}</span>
              <span className="font-semibold text-zinc-900">{formatRUB(total)}</span>
            </div>
          </div>

          <Link href="/shop/checkout">
            <Button className="mt-6 w-full" disabled={empty}>
              {t("actions.checkout")}
            </Button>
          </Link>

          <Link href="/shop/quote">
            <Button variant="secondary" className="mt-3 w-full" disabled={empty}>
              {t("actions.openQuote")}
            </Button>
          </Link>
          <p className="mt-2 text-xs text-zinc-500">{t("cart.quote.note")}</p>

          <p className="mt-4 text-xs text-zinc-500">{t("cart.note")}</p>

          <div className="mt-6 md:hidden">
            <Link
              href="/shop/products"
              className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
            >
              {t("actions.continueShopping")}
            </Link>
          </div>
        </aside>
      </div>

      {/* Favorites preview (stored in the same provider as the cart) */}
      {favProducts.length ? (
        <section className="mt-14">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">{t("favorites.title")}</h2>
              <p className="mt-2 text-sm text-zinc-600">
                Товары, которые вы отметили сердечком — можно быстро добавить их в корзину.
              </p>
            </div>
            <Link
              href="/shop/favorites"
              className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
            >
              {t("nav.favorites")} →
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {favProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
