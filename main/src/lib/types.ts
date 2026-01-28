export type ProductType = "Пакеты" | "Упаковка" | "Открытки" | "Аксессуары";

export type ProductTag = "new" | "popular" | "sale";

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

  /** Editorial tags for merchandising & filters (optional). */
  tags?: ProductTag[];

  /**
   * Old price for sale display (retail). If present and > retailPrice,
   * the UI will show a discount badge and crossed-out price.
   */
  compareAtPrice?: number;
};

export type CartMode = "retail" | "wholesale";

export type CartItem = {
  productId: string;
  mode: CartMode;
  qty: number;
};
