'use client';

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/providers/CartProvider";
import { getProductById } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/Button";
import { useI18n } from "@/providers/I18nProvider";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addItem, clearFavorites } = useCart();
  const { t } = useI18n();

  const products = useMemo(() => {
    return favorites.map((id) => getProductById(id)).filter(Boolean) as any[];
  }, [favorites]);

  const empty = products.length === 0;

  return (
    <div className="container py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {t("favorites.title")}
          </h1>
          <p className="mt-3 text-sm text-zinc-600">{t("favorites.empty")}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/shop/products"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            {t("actions.openCatalog")} →
          </Link>

          <Button
            variant="secondary"
            disabled={empty}
            onClick={() => {
              products.forEach((p) => addItem(p.id, "retail", 1));
            }}
          >
            {t("favorites.addAllToCart")}
          </Button>

          <Button variant="ghost" disabled={empty} onClick={clearFavorites}>
            {t("common.reset")}
          </Button>
        </div>
      </div>

      {empty ? null : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="relative">
              <ProductCard product={p} />
              <button
                className="mt-2 text-xs text-zinc-600 underline decoration-zinc-900/15 underline-offset-4"
                onClick={() => toggleFavorite(p.id)}
              >
                Удалить из избранного
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
