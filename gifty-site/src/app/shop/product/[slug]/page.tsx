import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug } from "@/lib/products";
import { Badge } from "@/components/Badge";
import { Price } from "@/components/Price";
import { AddToCartPanel } from "./AddToCartPanel";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.title,
    description: `${product.type} • ${product.material} • ${product.size} • SKU ${product.sku}`,
    openGraph: {
      title: product.title,
      description: `${product.type} • ${product.material} • ${product.size}`,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <div className="container py-8 md:py-12">
      <Link href="/shop/products" className="brand-link">
        ← Назад в каталог
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="paper-card p-4 md:p-6">
          <div className="rounded-[24px] border border-[#f0d6bc] bg-[radial-gradient(circle_at_top_right,_rgba(255,199,96,0.26),_transparent_30%),linear-gradient(180deg,_#fffaf5,_#fff3e7)] p-4">
            <div className="relative aspect-square overflow-hidden rounded-[20px] bg-white/60">
              <Image
                src={product.images?.[0] || "/products/placeholders/wrap.svg"}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
                priority
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>{product.type}</Badge>
            <Badge>{product.material}</Badge>
            <Badge>{product.color}</Badge>
            <Badge>{product.size}</Badge>
            <Badge>SKU: {product.sku}</Badge>
          </div>
        </div>

        <div className="paper-card p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge className="bg-white">{product.collection}</Badge>
              <h1 className="brand-heading mt-4 text-3xl md:text-4xl">{product.title}</h1>
            </div>
            {product.featured ? <Badge>Хит</Badge> : null}
          </div>

          <div className="mt-6 grid gap-3 text-sm text-[#7c472a]">
            <div className="paper-card-soft flex items-center justify-between px-4 py-3">
              <span>Розничная цена</span>
              <span className="text-lg font-black text-[#ab310a]"><Price amount={product.retailPrice} /></span>
            </div>
            <div className="paper-card-soft flex items-center justify-between px-4 py-3">
              <span>Оптовая цена</span>
              <span className="text-lg font-black text-[#ab310a]"><Price amount={product.wholesalePrice} /></span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="paper-card-soft p-4 text-sm text-[#7c472a]">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ab310a]">Наличие</div>
              <div className="mt-2 font-bold text-[#6b341c]">{product.inStock ? "В наличии" : "Под заказ"}</div>
            </div>
            <div className="paper-card-soft p-4 text-sm text-[#7c472a]">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ab310a]">Оптовые правила</div>
              <div className="mt-2 font-bold text-[#6b341c]">MOQ {product.moq} • кратность {product.packSize}</div>
            </div>
          </div>

          <AddToCartPanel productId={product.id} packSize={product.packSize} />
        </div>
      </div>
    </div>
  );
}
