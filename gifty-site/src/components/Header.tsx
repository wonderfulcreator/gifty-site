'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";

const OZON = process.env.NEXT_PUBLIC_OZON_URL;
const WB = process.env.NEXT_PUBLIC_WB_URL;

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={cn(
        "text-sm transition hover:text-zinc-900",
        active ? "text-zinc-900" : "text-zinc-600"
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const { totalQty } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-[rgb(var(--bg))]/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo-mark.png"
            alt="GIFTY"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl bg-white shadow-soft ring-1 ring-zinc-200"
          />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">GIFTY</div>
            <div className="text-xs text-zinc-500">подарочная упаковка</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink href="/shop/products">Магазин</NavLink>
          <NavLink href="/wholesale">Опт</NavLink>
          <NavLink href="/blog">Блог</NavLink>
          <NavLink href="/partners">Партнёры</NavLink>
          <NavLink href="/about">О нас</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            {OZON ? (
              <a
                href={OZON}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50"
              >
                Ozon
              </a>
            ) : null}
            {WB ? (
              <a
                href={WB}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50"
              >
                WB
              </a>
            ) : null}
          </div>

          <Link
            href="/shop/cart"
            className="relative rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          >
            Корзина
            {totalQty > 0 ? (
              <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1.5 text-xs text-white">
                {totalQty}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div className="container -mt-2 pb-2 md:hidden">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-600">
          <NavLink href="/shop/products">Магазин</NavLink>
          <NavLink href="/wholesale">Опт</NavLink>
          <NavLink href="/blog">Блог</NavLink>
          <NavLink href="/about">О нас</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </div>
      </div>
    </header>
  );
}
