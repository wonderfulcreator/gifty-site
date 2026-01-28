'use client';

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { getFilterOptions } from "@/lib/products";
import { Input } from "@/components/Input";
import { Filters, type SelectedFilters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { Badge } from "@/components/Badge";

const emptySelected: SelectedFilters = {
  types: [],
  colors: [],
  materials: [],
  sizes: [],
  occasions: [],
  collections: [],
};

export function WholesaleCatalogClient({ products }: { products: Product[] }) {
  const options = useMemo(() => getFilterOptions(products), [products]);

  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selected, setSelected] = useState<SelectedFilters>(emptySelected);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (inStockOnly && !p.inStock) return false;

      const matchMulti = (arr: string[], value: string) =>
        arr.length === 0 ? true : arr.includes(value);

      if (!matchMulti(selected.types, p.type)) return false;
      if (!matchMulti(selected.colors, p.color)) return false;
      if (!matchMulti(selected.materials, p.material)) return false;
      if (!matchMulti(selected.sizes, p.size)) return false;
      if (!matchMulti(selected.collections, p.collection)) return false;
      if (selected.occasions.length) {
        const ok = p.occasion.some((o) => selected.occasions.includes(o));
        if (!ok) return false;
      }

      if (q) {
        const hay = `${p.title} ${p.sku} ${p.collection}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });
  }, [products, query, inStockOnly, selected]);

  return (
    <div className="container py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <Badge className="border-zinc-300 bg-white">B2B</Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Оптовый каталог
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            То же, что и розничный каталог, но показываем оптовые цены, MOQ и
            кратность. Для заказа большими партиями используйте «Быстрый заказ».
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/wholesale/quick-order"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Быстрый заказ
          </Link>
          <Link
            href="/wholesale"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            В кабинет
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-sm font-medium text-zinc-900">Поиск</div>
            <div className="mt-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Название, коллекция…"
              />
            </div>
            <div className="mt-3 text-xs text-zinc-500">
              Найдено: <span className="font-medium text-zinc-700">{filtered.length}</span>
            </div>
          </div>

          <Filters
            options={options}
            selected={selected}
            onSelectedChange={setSelected}
            inStockOnly={inStockOnly}
            onInStockOnlyChange={setInStockOnly}
            onReset={() => {
              setSelected(emptySelected);
              setInStockOnly(false);
              setQuery("");
            }}
          />
        </aside>

        <section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <div key={p.id} className="grid gap-3">
                <ProductCard product={p} mode="wholesale" />
                <div className="-mt-2 rounded-2xl border border-zinc-200 bg-white p-4 text-xs text-zinc-600">
                  <div className="flex items-center justify-between">
                    <span>MOQ</span>
                    <span className="font-medium text-zinc-900">{p.moq}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span>Кратность</span>
                    <span className="font-medium text-zinc-900">{p.packSize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600">
              Ничего не найдено. Попробуйте снять часть фильтров.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
