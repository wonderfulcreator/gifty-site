'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { getFilterOptions } from "@/lib/products";
import { Input } from "@/components/Input";
import { Filters, type SelectedFilters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/Badge";

const emptySelected: SelectedFilters = {
  types: [],
  colors: [],
  materials: [],
  sizes: [],
  occasions: [],
  collections: [],
};

export function ProductsClient({ products }: { products: Product[] }) {
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

  const featuredFirst = useMemo(() => {
    return [...filtered].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [filtered]);

  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_300px] lg:items-center">
          <div>
            <Badge>Розничный каталог</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Пакеты, упаковка и открытки</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#8a6048]">
              У каталога сохранилась прежняя логика: фильтры, поиск по SKU, карточки товаров и корзина. Мы обновили только внешний образ — теперь он дружелюбнее, теплее и заметно брендовее.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#8a6048]">
              <div className="paper-chip">{products.length} товаров</div>
              <div className="paper-chip">{options.collections.length} коллекций</div>
              <Link href="/wholesale" className="brand-link self-center">Перейти в опт →</Link>
            </div>
          </div>
          <div className="paper-card-soft flex items-center justify-center p-4">
            <Image src="/brand/mascot-wink.png" alt="Маскот каталога" width={220} height={205} className="h-auto w-full max-w-[180px]" />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-4">
          <div className="paper-card p-4">
            <div className="text-sm font-black uppercase tracking-[0.16em] text-[#ab310a]">Поиск</div>
            <div className="mt-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Название, SKU, коллекция…"
              />
            </div>
            <div className="mt-3 text-xs text-[#9b765f]">
              Найдено: <span className="font-bold text-[#6b341c]">{filtered.length}</span>
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
            {featuredFirst.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {featuredFirst.length === 0 ? (
            <div className="paper-card mt-8 p-8 text-sm text-[#8a6048]">
              Ничего не найдено. Попробуйте снять часть фильтров или изменить поисковый запрос.
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
