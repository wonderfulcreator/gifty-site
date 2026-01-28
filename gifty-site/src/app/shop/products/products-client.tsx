'use client';

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { getFilterOptions, isNewProduct, isPopularProduct, isSaleProduct } from "@/lib/products";
import { Input } from "@/components/Input";
import { Filters, type SelectedFilters } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";
import { useI18n } from "@/providers/I18nProvider";

const emptySelected: SelectedFilters = {
  picks: [],
  types: [],
  colors: [],
  materials: [],
  sizes: [],
  occasions: [],
  collections: [],
};

export function ProductsClient({ products }: { products: Product[] }) {
  const { t } = useI18n();
  const options = useMemo(() => getFilterOptions(products), [products]);

  const [query, setQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selected, setSelected] = useState<SelectedFilters>(emptySelected);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (inStockOnly && !p.inStock) return false;

      // editorial picks
      if (selected.picks.includes("new") && !isNewProduct(p)) return false;
      if (selected.picks.includes("popular") && !isPopularProduct(p)) return false;
      if (selected.picks.includes("sale") && !isSaleProduct(p)) return false;

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
    <div className="container py-10 md:py-14">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {t("shop.catalog.title")}
        </h1>
        <p className="mt-4 text-sm text-zinc-600">
          {t("shop.catalog.desc")}
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <div className="text-sm font-medium text-zinc-900">{t("common.search")}</div>
            <div className="mt-3">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("filters.searchPlaceholder")}
              />
            </div>
            <div className="mt-3 text-xs text-zinc-500">
              {t("common.found")}:{" "}
              <span className="font-medium text-zinc-700">{filtered.length}</span>
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
            <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8 text-sm text-zinc-600">
              {t("shop.catalog.empty")}
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
