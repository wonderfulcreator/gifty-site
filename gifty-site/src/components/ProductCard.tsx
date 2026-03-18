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
    <div className="paper-card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(177,74,20,0.14)]">
      <Link href={`/shop/product/${product.slug}`} className="block">
        <div className="m-3 rounded-[24px] border border-[#f0d6bc] bg-[radial-gradient(circle_at_top_right,_rgba(255,199,96,0.26),_transparent_30%),linear-gradient(180deg,_#fffaf5,_#fff3e7)] p-4">
          <div className="relative aspect-square overflow-hidden rounded-[18px] bg-white/60">
            <Image
              src={product.images?.[0] || "/products/placeholders/wrap.svg"}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-5 transition duration-300 group-hover:scale-[1.04]"
            />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/shop/product/${product.slug}`}
              className="text-base font-bold text-[#6b341c] transition hover:text-[#d95c1d]"
            >
              {product.title}
            </Link>
            <div className="mt-1 text-xs text-[#9b765f]">SKU: {product.sku}</div>
          </div>
          {product.featured ? <Badge>Хит</Badge> : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge className="bg-white">{product.type}</Badge>
          <Badge className="bg-white">{product.collection}</Badge>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <div>
            <Price amount={price} className="text-lg font-black text-[#ab310a]" />
            <div className="mt-0.5 text-xs text-[#8a6048]">
              {mode === "wholesale" ? "оптовая цена" : product.inStock ? "в наличии" : "под заказ"}
            </div>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${product.inStock ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}>
            {product.inStock ? "Есть" : "Нет"}
          </div>
        </div>

        {showQuickAdd ? (
          <Button
            size="sm"
            variant={mode === "wholesale" ? "secondary" : "primary"}
            className="mt-4 w-full"
            onClick={() => addItem(product.id, mode, mode === "wholesale" ? product.packSize : 1)}
            title={mode === "wholesale" ? `Добавить кратностью ${product.packSize}` : "Добавить в корзину"}
          >
            {mode === "wholesale" ? `В корзину • ${product.packSize} шт.` : "В корзину"}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
