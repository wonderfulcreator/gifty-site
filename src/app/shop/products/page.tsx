import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductsClient } from "./products-client";

export const metadata: Metadata = {
  title: "Каталог",
};

export default function ShopProductsPage() {
  return <ProductsClient products={products} />;
}
