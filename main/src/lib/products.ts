import rawProducts from "@/data/products.json";
import type { Product, ProductTag } from "@/lib/types";

export const products = rawProducts as Product[];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(limit = 8) {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function productHasTag(p: Product, tag: ProductTag) {
  return Boolean(p.tags?.includes(tag));
}

export function isPopularProduct(p: Product) {
  return Boolean(p.featured) || productHasTag(p, "popular");
}

export function isNewProduct(p: Product) {
  return productHasTag(p, "new");
}

export function isSaleProduct(p: Product) {
  const cmp = typeof p.compareAtPrice === "number" ? p.compareAtPrice : undefined;
  return (typeof cmp === "number" && cmp > p.retailPrice) || productHasTag(p, "sale");
}

export function getDiscountPercent(p: Product) {
  const cmp = typeof p.compareAtPrice === "number" ? p.compareAtPrice : undefined;
  if (!cmp || cmp <= p.retailPrice || p.retailPrice <= 0) return 0;
  return Math.round((1 - p.retailPrice / cmp) * 100);
}

export function getFilterOptions(list: Product[]) {
  const uniq = (arr: string[]) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b, "ru"));
  const types = uniq(list.map((p) => p.type));
  const colors = uniq(list.map((p) => p.color));
  const materials = uniq(list.map((p) => p.material));
  const sizes = uniq(list.map((p) => p.size));
  const collections = uniq(list.map((p) => p.collection));
  const occasions = uniq(list.flatMap((p) => p.occasion));
  return { types, colors, materials, sizes, occasions, collections };
}
