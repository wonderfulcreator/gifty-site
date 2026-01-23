'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, CartMode } from "@/lib/types";
import { getProductById } from "@/lib/products";

type CartContextValue = {
  items: CartItem[];
  totalQty: number;
  subtotalRetail: number;
  subtotalWholesale: number;
  total: number;
  addItem: (productId: string, mode: CartMode, qty?: number) => void;
  removeItem: (productId: string, mode: CartMode) => void;
  setQty: (productId: string, mode: CartMode, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "gifty_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const totalQty = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  const { subtotalRetail, subtotalWholesale } = useMemo(() => {
    let retail = 0;
    let wholesale = 0;
    for (const it of items) {
      const p = getProductById(it.productId);
      if (!p) continue;
      const price = it.mode === "wholesale" ? p.wholesalePrice : p.retailPrice;
      if (it.mode === "wholesale") wholesale += price * it.qty;
      else retail += price * it.qty;
    }
    return { subtotalRetail: retail, subtotalWholesale: wholesale };
  }, [items]);

  const total = subtotalRetail + subtotalWholesale;

  function addItem(productId: string, mode: CartMode, qty = 1) {
    setItems((prev) => {
      const safeQty = Math.max(1, Math.floor(qty));
      const existing = prev.find((x) => x.productId === productId && x.mode === mode);
      if (existing) {
        return prev.map((x) =>
          x.productId === productId && x.mode === mode ? { ...x, qty: x.qty + safeQty } : x
        );
      }
      return [...prev, { productId, mode, qty: safeQty }];
    });
  }

  function removeItem(productId: string, mode: CartMode) {
    setItems((prev) => prev.filter((x) => !(x.productId === productId && x.mode === mode)));
  }

  function setQty(productId: string, mode: CartMode, qty: number) {
    setItems((prev) =>
      prev
        .map((x) =>
          x.productId === productId && x.mode === mode ? { ...x, qty: Math.max(1, Math.floor(qty)) } : x
        )
        .filter((x) => x.qty > 0)
    );
  }

  function clear() {
    setItems([]);
  }

  const value: CartContextValue = {
    items,
    totalQty,
    subtotalRetail,
    subtotalWholesale,
    total,
    addItem,
    removeItem,
    setQty,
    clear,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
