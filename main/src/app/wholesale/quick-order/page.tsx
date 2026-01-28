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

  const products = useMemo(() => {
    return allProducts;
  }, []);

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
    <div className="container py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Быстрый заказ
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            Выберите коллекцию и введите количество — позиции добавятся в корзину.
          </p>
        </div>
        <Link
          href="/wholesale"
          className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
        >
          ← В кабинет
        </Link>
      </div>

      <div className="mt-10 grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-[1fr_260px] md:items-end">
        <div>
          <div className="text-sm font-medium text-zinc-900">Поиск</div>
          <div className="mt-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
                placeholder="Название, коллекция…"
            />
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-zinc-900">Коллекция</div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={collection === null ? "primary" : "secondary"}
              onClick={() => setCollection(null)}
            >
              Все
            </Button>
            {options.collections.slice(0, 6).map((c) => (
              <Button
                key={c}
                size="sm"
                variant={collection === c ? "primary" : "secondary"}
                onClick={() => setCollection(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <div className="max-h-[70vh] overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-white">
              <tr className="border-b border-zinc-200">
                <th className="px-4 py-3 font-semibold text-zinc-900">Артикул</th>
                <th className="px-4 py-3 font-semibold text-zinc-900">Товар</th>
                <th className="px-4 py-3 font-semibold text-zinc-900">Опт цена</th>
                <th className="px-4 py-3 font-semibold text-zinc-900">MOQ</th>
                <th className="px-4 py-3 font-semibold text-zinc-900">Кратность</th>
                <th className="px-4 py-3 font-semibold text-zinc-900">Наличие</th>
                <th className="px-4 py-3 font-semibold text-zinc-900">Кол-во</th>
                <th className="px-4 py-3 font-semibold text-zinc-900"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const qty = getQty(p.id, p.packSize);
                const moqOk = qty >= p.moq;
                const packOk = qty % p.packSize === 0;

                return (
                  <tr key={p.id} className="border-b border-zinc-100">
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium text-zinc-900">{p.sku}</div>
                      <div className="mt-1 text-xs text-zinc-500">{p.collection}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium text-zinc-900">{p.title}</div>
                      <div className="mt-1 flex flex-wrap gap-2">
                        <Badge>{p.type}</Badge>
                        <Badge>{p.material}</Badge>
                        <Badge>{p.size}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="font-semibold text-zinc-900">
                        {formatRUB(p.wholesalePrice)}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        розница {formatRUB(p.retailPrice)}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className={moqOk ? "text-zinc-900" : "text-rose-700"}>
                        {p.moq}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className={packOk ? "text-zinc-900" : "text-rose-700"}>
                        {p.packSize}
                      </div>
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
                        <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs text-emerald-800">
                          В наличии
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                          Нет
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) =>
                          setQtyMap((prev) => ({
                            ...prev,
                            [p.id]: Number(e.target.value),
                          }))
                        }
                        className="h-10 w-28"
                      />
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Button
                        size="sm"
                        onClick={() => addItem(p.id, "wholesale", qty)}
                        disabled={!p.inStock}
                      >
                        В корзину
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 ? (
            <div className="p-8 text-sm text-zinc-600">Ничего не найдено.</div>
          ) : null}
        </div>
      </div>

      <div className="mt-6 text-sm text-zinc-600">
        <Link className="underline" href="/shop/cart">
          Перейти в корзину →
        </Link>
      </div>
    </div>
  );
}
