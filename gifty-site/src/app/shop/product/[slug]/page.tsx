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
    description: `${product.type} • ${product.material} • ${product.size}`,
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
    <div className="container py-10 md:py-14">
      <Link
        href="/shop/products"
        className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
      >
        ← Назад в каталог
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="relative aspect-square">
            <Image
              src={product.images?.[0] || "/products/placeholders/wrap.svg"}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>{product.type}</Badge>
            <Badge>{product.material}</Badge>
            <Badge>{product.color}</Badge>
            <Badge>{product.size}</Badge>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {product.title}
            </h1>
            {product.featured ? <Badge>Витрина</Badge> : null}
          </div>

          <p className="mt-4 text-sm text-zinc-600">
            Аккуратный вариант для подарков и наборов: {product.type.toLowerCase()} из материала «{product.material}».
            Цвет: <span className="text-zinc-900">{product.color}</span>, размер: <span className="text-zinc-900">{product.size}</span>.
          </p>

          <p className="mt-2 text-sm text-zinc-600">
            Коллекция: <span className="text-zinc-900">{product.collection}</span>
          </p>

          <div className="mt-6 grid gap-2 text-sm text-zinc-700">
            <div className="flex items-center justify-between">
              <span>Розничная цена</span>
              <span className="font-semibold text-zinc-900">
                <Price amount={product.retailPrice} />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Оптовая цена</span>
              <span className="font-semibold text-zinc-900">
                <Price amount={product.wholesalePrice} />
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
            <div className="font-medium text-zinc-900">Оптовые правила</div>
            <div className="mt-2 grid gap-1">
              <div>MOQ: {product.moq} шт.</div>
              <div>Кратность: {product.packSize} шт.</div>
            </div>
          </div>

          <AddToCartPanel productId={product.id} packSize={product.packSize} />

          <p className="mt-6 text-xs text-zinc-500">
            Если нужно подобрать размер или собрать набор под ваш ассортимент — напишите нам, поможем.
          </p>
        </div>
      </div>
    </div>
  );
}
