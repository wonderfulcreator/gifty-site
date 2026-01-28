'use client';

import Image from "next/image";
import Link from "next/link";
import type { Product, CartMode } from "@/lib/types";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Price } from "@/components/Price";
import { cn } from "@/lib/utils";
import { getDiscountPercent, isNewProduct, isPopularProduct, isSaleProduct } from "@/lib/products";
import { useCart } from "@/providers/CartProvider";
import { useI18n } from "@/providers/I18nProvider";

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61c-1.8-1.73-4.72-1.73-6.52 0L12 6.83 9.68 4.61c-1.8-1.73-4.72-1.73-6.52 0-2.06 1.98-2.06 5.19 0 7.17l2.32 2.22L12 21l6.52-6.99 2.32-2.22c2.06-1.98 2.06-5.19 0-7.17z"
      />
    </svg>
  );
}

export function ProductCard({
  product,
  mode = "retail",
  showCTA = true,
}: {
  product: Product;
  mode?: CartMode;
  showCTA?: boolean;
}) {
  const { addItem, isFavorite, toggleFavorite } = useCart();
  const { t } = useI18n();

  const price = mode === "wholesale" ? product.wholesalePrice : product.retailPrice;
  const hasCompare =
    mode === "retail" &&
    typeof product.compareAtPrice === "number" &&
    product.compareAtPrice > product.retailPrice;

  const isSale = mode === "retail" && (hasCompare || isSaleProduct(product));
  const discount = hasCompare ? getDiscountPercent(product) : 0;

  const fav = isFavorite(product.id);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-soft">
      <div className="relative">
        <Link
          href={`/shop/product/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-zinc-50"
        >
          <Image
            src={product.images?.[0] || "/products/placeholders/wrap.svg"}
            alt={product.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </Link>

        {/* Favorite */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className={cn(
            "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm",
            fav ? "border-zinc-300 text-zinc-900" : "border-zinc-200 text-zinc-600 hover:text-zinc-900"
          )}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          title={t("nav.favorites")}
        >
          <HeartIcon filled={fav} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/shop/product/${product.slug}`}
              className="line-clamp-2 text-sm font-medium text-zinc-900 hover:underline"
            >
              {product.title}
            </Link>

            <div className="mt-2 flex flex-wrap gap-2">
              <Badge>{product.type}</Badge>
              {product.featured ? <Badge>{t("badge.featured")}</Badge> : null}
              {isNewProduct(product) ? <Badge>{t("badge.new")}</Badge> : null}
              {isPopularProduct(product) && !product.featured ? (
                <Badge>{t("badge.popular")}</Badge>
              ) : null}
              {isSale ? (
                <Badge className="border-amber-200 bg-amber-50 text-amber-900">
                  {t("badge.sale")}
                  {discount ? ` −${discount}%` : ""}
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-sm font-semibold text-zinc-900">
              <Price amount={price} />
            </div>
            {hasCompare ? (
              <div className="text-xs text-zinc-500 line-through">
                <Price amount={product.compareAtPrice as number} />
              </div>
            ) : (
              <div className="text-xs text-zinc-500">
                {product.inStock ? "В наличии" : "Под заказ"}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-xs text-zinc-500">{product.collection}</div>

          {showCTA ? (
            <Button
              size="sm"
              onClick={() => addItem(product.id, mode, mode === "wholesale" ? product.packSize : 1)}
            >
              {t("actions.addToCart")}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
