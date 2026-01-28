'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";
import { useI18n } from "@/providers/I18nProvider";

const OZON = process.env.NEXT_PUBLIC_OZON_URL;
const WB = process.env.NEXT_PUBLIC_WB_URL;

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61c-1.8-1.73-4.72-1.73-6.52 0L12 6.83 9.68 4.61c-1.8-1.73-4.72-1.73-6.52 0-2.06 1.98-2.06 5.19 0 7.17l2.32 2.22L12 21l6.52-6.99 2.32-2.22c2.06-1.98 2.06-5.19 0-7.17z"
      />
    </svg>
  );
}

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
  const { totalQty, favoritesCount } = useCart();
  const { locale, setLocale, t } = useI18n();

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
            <div className="text-xs text-zinc-500">{t("brand.tagline")}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          <NavLink href="/shop/products">{t("nav.shop")}</NavLink>
          <NavLink href="/wholesale">{t("nav.wholesale")}</NavLink>
          <NavLink href="/blog">{t("nav.blog")}</NavLink>
          <NavLink href="/partners">{t("nav.partners")}</NavLink>
          <NavLink href="/about">{t("nav.about")}</NavLink>
          <NavLink href="/contact">{t("nav.contact")}</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {/* Lang switch */}
          <div className="hidden items-center rounded-xl border border-zinc-200 bg-white p-1 sm:flex">
            <button
              type="button"
              onClick={() => setLocale("ru")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium",
                locale === "ru" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              )}
              aria-label="Русский"
            >
              {t("lang.ru")}
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium",
                locale === "en" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              )}
              aria-label="English"
            >
              {t("lang.en")}
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium",
                locale === "zh" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              )}
              aria-label="中文"
            >
              {t("lang.zh")}
            </button>
          </div>

          {/* Market links */}
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

          {/* Favorites */}
          <Link
            href="/shop/favorites"
            className="relative inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
            title={t("nav.favorites")}
          >
            <HeartIcon />
            <span className="hidden sm:inline">{t("nav.favorites")}</span>
            {favoritesCount > 0 ? (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-100 px-1.5 text-xs text-zinc-900 ring-1 ring-zinc-200">
                {favoritesCount}
              </span>
            ) : null}
          </Link>

          {/* Cart */}
          <Link
            href="/shop/cart"
            className="relative rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm hover:bg-zinc-50"
          >
            {t("nav.cart")}
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
          <NavLink href="/shop/products">{t("nav.shop")}</NavLink>
          <NavLink href="/wholesale">{t("nav.wholesale")}</NavLink>
          <NavLink href="/blog">{t("nav.blog")}</NavLink>
          <NavLink href="/about">{t("nav.about")}</NavLink>
          <NavLink href="/contact">{t("nav.contact")}</NavLink>

          <div className="ml-auto flex items-center gap-2 rounded-xl border border-zinc-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setLocale("ru")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium",
                locale === "ru" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              )}
            >
              {t("lang.ru")}
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium",
                locale === "en" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              )}
            >
              {t("lang.en")}
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium",
                locale === "zh" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-50"
              )}
            >
              {t("lang.zh")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
