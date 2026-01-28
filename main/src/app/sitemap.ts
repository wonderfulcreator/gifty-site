import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const staticRoutes = [
    "",
    "/about",
    "/partners",
    "/contact",
    "/shop",
    "/shop/products",
    "/shop/cart",
    "/shop/checkout",
    "/blog",
    "/wholesale/login",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/shop/product/${p.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
