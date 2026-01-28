import rawProducts from "@/data/products.json";
import type { Product } from "@/lib/types";

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
