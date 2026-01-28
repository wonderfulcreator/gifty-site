import type { Metadata } from "next";
import { products } from "@/lib/products";
import { WholesaleCatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "Оптовый каталог",
};

export default function WholesaleCatalogPage() {
  return <WholesaleCatalogClient products={products} />;
}
