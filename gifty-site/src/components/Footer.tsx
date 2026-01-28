'use client';

import Link from "next/link";
import { useI18n } from "@/providers/I18nProvider";

const OZON = process.env.NEXT_PUBLIC_OZON_URL;
const WB = process.env.NEXT_PUBLIC_WB_URL;
const IG = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const TG = process.env.NEXT_PUBLIC_TELEGRAM_URL;
const VK = process.env.NEXT_PUBLIC_VK_URL;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "gifty@shopify.com";
const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+79837221794";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-20 border-t border-zinc-200/70">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold tracking-wide">GIFTY</div>
          <p className="mt-2 max-w-sm text-sm text-zinc-600">
            {t("brand.tagline")}. {t("nav.shop")} • {t("nav.wholesale")}.
          </p>
          <p className="mt-4 text-xs text-zinc-500">
            © {new Date().getFullYear()} GIFTY.
          </p>
        </div>

        <div className="grid gap-2 text-sm">
          <Link className="text-zinc-700 hover:text-zinc-900" href="/shop/products">
            {t("nav.shop")}
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/wholesale">
            {t("nav.wholesale")}
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/blog">
            {t("nav.blog")}
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/partners">
            {t("nav.partners")}
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/contact">
            {t("nav.contact")}
          </Link>
        </div>

        <div>
          <div className="text-sm font-medium text-zinc-900">Links</div>
          <div className="mt-3 flex flex-wrap gap-2">
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
            {TG ? (
              <a
                href={TG}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50"
              >
                Telegram
              </a>
            ) : null}
            {IG ? (
              <a
                href={IG}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50"
              >
                Instagram
              </a>
            ) : null}
            {VK ? (
              <a
                href={VK}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-50"
              >
                VK
              </a>
            ) : null}
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            {CONTACT_EMAIL} • {CONTACT_PHONE}
          </p>
        </div>
      </div>
    </footer>
  );
}
