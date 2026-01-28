'use client';

import Image from "next/image";
import Link from "next/link";
import type { Product, CartMode } from "@/lib/types";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Price } from "@/components/Price";
import { useCart } from "@/providers/CartProvider";

export function ProductCard({
  product,
  mode = "retail",
  showQuickAdd = true,
}: {
  product: Product;
  mode?: CartMode;
  showQuickAdd?: boolean;
}) {
  const { addItem } = useCart();
  const price = mode === "wholesale" ? product.wholesalePrice : product.retailPrice;

  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-soft">
      <Link href={`/shop/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-zinc-50">
          <Image
            src={product.images?.[0] || "/products/placeholders/wrap.svg"}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-6 transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/shop/product/${product.slug}`} className="text-sm font-medium text-zinc-900 hover:underline">
              {product.title}
            </Link>
          </div>
          {product.featured ? <Badge>Витрина</Badge> : null}
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="text-sm">
            <Price amount={price} className="font-semibold" />
            {mode === "wholesale" ? <span className="ml-1 text-xs text-zinc-500">опт</span> : null}
          </div>
          {showQuickAdd ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => addItem(product.id, mode, mode === "wholesale" ? product.packSize : 1)}
              title={mode === "wholesale" ? `Добавить кратностью ${product.packSize}` : "Добавить в корзину"}
            >
              В корзину
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
