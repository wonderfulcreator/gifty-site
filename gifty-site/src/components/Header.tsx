'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";

const OZON = process.env.NEXT_PUBLIC_OZON_URL;
const WB = process.env.NEXT_PUBLIC_WB_URL;
const brandName = process.env.NEXT_PUBLIC_SITE_NAME || "Пакет Пакетыч";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold transition",
        active
          ? "bg-[#fff3e3] text-[#ab310a] shadow-[0_6px_16px_rgba(170,76,19,0.08)]"
          : "text-[#8a6048] hover:bg-[#fff4e8] hover:text-[#d95c1d]",
      )}
    >
      {children}
    </Link>
  );
}

export function Header() {
  const { totalQty } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-[#edd6bd]/85 bg-[#fff8ef]/90 backdrop-blur-xl">
      <div className="container flex min-h-[78px] items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/brand/logo-main.png"
            alt={brandName}
            width={180}
            height={165}
            priority
            className="h-14 w-auto sm:h-16"
          />
          <div className="hidden min-w-0 sm:block">
            <div className="truncate text-sm font-black uppercase tracking-[0.24em] text-[#ab310a]">
              Пакет Пакетыч
            </div>
            <div className="mt-0.5 truncate text-xs text-[#8a6048]">
              весёлая упаковка для подарков и опта
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink href="/shop/products">Каталог</NavLink>
          <NavLink href="/wholesale">Опт</NavLink>
          <NavLink href="/blog">Блог</NavLink>
          <NavLink href="/partners">Партнёрам</NavLink>
          <NavLink href="/about">О бренде</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 md:flex">
            {OZON ? (
              <a
                href={OZON}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#f1c598] bg-[#fff7ee] px-3 py-2 text-xs font-semibold text-[#9a3c13] transition hover:bg-[#ffefdf]"
              >
                Ozon
              </a>
            ) : null}
            {WB ? (
              <a
                href={WB}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#f1c598] bg-[#fff7ee] px-3 py-2 text-xs font-semibold text-[#9a3c13] transition hover:bg-[#ffefdf]"
              >
                WB
              </a>
            ) : null}
          </div>

          <Link
            href="/shop/cart"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#b62b0d] bg-gradient-to-b from-[#f57822] to-[#e3531d] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(198,81,25,0.2)] transition hover:-translate-y-0.5"
          >
            Корзина
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
              {totalQty}
            </span>
          </Link>
        </div>
      </div>

      <div className="container pb-3 lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <NavLink href="/shop/products">Каталог</NavLink>
          <NavLink href="/wholesale">Опт</NavLink>
          <NavLink href="/blog">Блог</NavLink>
          <NavLink href="/partners">Партнёрам</NavLink>
          <NavLink href="/about">О бренде</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </div>
      </div>
    </header>
  );
}
