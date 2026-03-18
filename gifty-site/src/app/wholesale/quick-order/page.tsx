'use client';

import { useMemo, useState } from "react";
import Link from "next/link";
import { products as allProducts, getFilterOptions } from "@/lib/products";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { formatRUB } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";

export default function QuickOrderPage() {
  const { addItem } = useCart();

  const products = useMemo(() => allProducts, []);
  const options = useMemo(() => getFilterOptions(products), [products]);

  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState<string | null>(null);
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (collection && p.collection !== collection) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.sku} ${p.collection}`.toLowerCase();
      return hay.includes(q);
    });
  }, [products, query, collection]);

  function getQty(id: string, packSize: number) {
    return qtyMap[id] ?? packSize;
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Badge>Quick order</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Быстрый заказ по SKU</h1>
            <p className="mt-4 text-base leading-7 text-[#8a6048]">
              Таблица сохранила прежнюю механику: вводите количество, видите MOQ и кратность, добавляете позицию в корзину. Это самый быстрый путь для повторяющихся закупок и сезонных подборок.
            </p>
          </div>
          <Link href="/wholesale" className="brand-link">
            ← В кабинет
          </Link>
        </div>
      </div>

      <div className="paper-card mt-8 grid gap-4 p-6 md:grid-cols-[1fr_300px] md:items-end">
        <div>
          <div className="text-sm font-black uppercase tracking-[0.16em] text-[#ab310a]">Поиск</div>
          <div className="mt-2">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SKU, название, коллекция…" />
          </div>
        </div>
        <div>
          <div className="text-sm font-black uppercase tracking-[0.16em] text-[#ab310a]">Коллекция</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" variant={collection === null ? "primary" : "secondary"} onClick={() => setCollection(null)}>
              Все
            </Button>
            {options.collections.slice(0, 6).map((c) => (
              <Button key={c} size="sm" variant={collection === c ? "primary" : "secondary"} onClick={() => setCollection(c)}>
                {c}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="paper-card mt-6 overflow-hidden">
        <div className="max-h-[72vh] overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-[#fffaf4]">
              <tr className="border-b border-[#edd6bd] text-[#6b341c]">
                <th className="px-4 py-3 font-black">SKU</th>
                <th className="px-4 py-3 font-black">Товар</th>
                <th className="px-4 py-3 font-black">Опт цена</th>
                <th className="px-4 py-3 font-black">MOQ</th>
                <th className="px-4 py-3 font-black">Кратность</th>
                <th className="px-4 py-3 font-black">Наличие</th>
                <th className="px-4 py-3 font-black">Qty</th>
                <th className="px-4 py-3 font-black"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const qty = getQty(p.id, p.packSize);
                const moqOk = qty >= p.moq;
                const packOk = qty % p.packSize === 0;

                return (
                  <tr key={p.id} className="border-b border-[#f3e4d5] text-[#7c472a]">
                    <td className="px-4 py-4 align-top">
                      <div className="font-bold text-[#6b341c]">{p.sku}</div>
                      <div className="mt-1 text-xs text-[#9b765f]">{p.collection}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="font-bold text-[#6b341c]">{p.title}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge>{p.type}</Badge>
                        <Badge>{p.material}</Badge>
                        <Badge>{p.size}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="font-black text-[#ab310a]">{formatRUB(p.wholesalePrice)}</div>
                      <div className="mt-1 text-xs text-[#9b765f]">розница {formatRUB(p.retailPrice)}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className={moqOk ? "font-semibold text-[#6b341c]" : "font-semibold text-rose-700"}>{p.moq}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className={packOk ? "font-semibold text-[#6b341c]" : "font-semibold text-rose-700"}>{p.packSize}</div>
                      {!moqOk || !packOk ? (
                        <div className="mt-2 text-xs text-rose-700">
                          {!moqOk ? "Ниже MOQ. " : ""}
                          {!packOk ? "Некратное количество." : ""}
                        </div>
                      ) : (
                        <div className="mt-2 text-xs text-emerald-700">Ок</div>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      {p.inStock ? (
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">В наличии</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-500">Нет</span>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => setQtyMap((prev) => ({ ...prev, [p.id]: Number(e.target.value) }))}
                        className="h-10 w-28"
                      />
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Button size="sm" onClick={() => addItem(p.id, "wholesale", qty)} disabled={!p.inStock}>
                        В корзину
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 ? <div className="p-8 text-sm text-[#8a6048]">Ничего не найдено.</div> : null}
        </div>
      </div>

      <div className="mt-6 text-sm text-[#8a6048]">
        <Link className="brand-link" href="/shop/cart">
          Перейти в корзину →
        </Link>
      </div>
    </div>
  );
}
