import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { Badge } from "@/components/Badge";
import { AddToCartPanel } from "./AddToCartPanel";
import { Price } from "@/components/Price";
import { getDiscountPercent, isNewProduct, isPopularProduct, isSaleProduct } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  const hasCompare =
    typeof product.compareAtPrice === "number" && product.compareAtPrice > product.retailPrice;
  const discount = hasCompare ? getDiscountPercent(product) : 0;

  return (
    <div className="container py-10 md:py-14">
      <Link
        href="/shop/products"
        className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
      >
        ← Назад в каталог
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-50">
            <Image
              src={product.images?.[0] || "/products/placeholders/wrap.svg"}
              alt={product.title}
              fill
              className="object-contain p-8"
            />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {(product.images || []).slice(0, 3).map((src) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
              >
                <Image src={src} alt={product.title} fill className="object-contain p-6" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white border-zinc-300">{product.type}</Badge>
            {product.featured ? <Badge>Витрина</Badge> : null}
            {isNewProduct(product) ? <Badge>Новинка</Badge> : null}
            {isPopularProduct(product) && !product.featured ? <Badge>Популярное</Badge> : null}
            {isSaleProduct(product) || hasCompare ? (
              <Badge className="border-amber-200 bg-amber-50 text-amber-900">
                Скидка{discount ? ` −${discount}%` : ""}
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            {product.title}
          </h1>

          <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-medium text-zinc-900">Цена</div>
            <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
              <div className="text-2xl font-semibold text-zinc-900">
                <Price amount={product.retailPrice} />
              </div>
              {hasCompare ? (
                <div className="text-sm text-zinc-500 line-through">
                  <Price amount={product.compareAtPrice as number} />
                </div>
              ) : null}
            </div>
            <div className="mt-3 text-sm text-zinc-600">
              Опт: <span className="font-medium text-zinc-900"><Price amount={product.wholesalePrice} /></span>
              {" "}• MOQ {product.moq} • кратность {product.packSize}
            </div>

            <AddToCartPanel productId={product.id} packSize={product.packSize} />
          </div>

          <div className="mt-8 grid gap-6 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div>
              <div className="text-sm font-medium text-zinc-900">Описание</div>
              <p className="mt-2 text-sm text-zinc-600">
                Минималистичная подарочная упаковка: плотный материал, аккуратная сборка,
                нейтральные оттенки. Подходит для розницы и корпоративных заказов.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-zinc-700">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Материал</span>
                <span className="font-medium text-zinc-900">{product.material}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Цвет</span>
                <span className="font-medium text-zinc-900">{product.color}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Размер</span>
                <span className="font-medium text-zinc-900">{product.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Коллекция</span>
                <span className="font-medium text-zinc-900">{product.collection}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-zinc-500">Повод</span>
                <span className="text-right font-medium text-zinc-900">
                  {(product.occasion || []).join(", ")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-xs text-zinc-500">
            Нужны особые условия (брендирование, индивидуальные размеры, крупный тираж)?
            Напишите — подготовим предложение.
          </div>
        </div>
      </div>
    </div>
  );
}
