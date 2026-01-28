export type ProductType = "Пакеты" | "Упаковка" | "Открытки" | "Аксессуары";

export type Product = {
  id: string;
  slug: string;
  title: string;
  sku: string;
  type: ProductType;
  material: string;
  color: string;
  size: string;
  occasion: string[];
  collection: string;
  inStock: boolean;
  retailPrice: number;
  wholesalePrice: number;
  packSize: number;
  moq: number;
  images: string[];
  featured?: boolean;
};

export type CartMode = "retail" | "wholesale";

export type CartItem = {
  productId: string;
  mode: CartMode;
  qty: number;
};
