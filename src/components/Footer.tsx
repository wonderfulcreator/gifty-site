import Link from "next/link";

const OZON = process.env.NEXT_PUBLIC_OZON_URL;
const WB = process.env.NEXT_PUBLIC_WB_URL;
const IG = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const TG = process.env.NEXT_PUBLIC_TELEGRAM_URL;
const VK = process.env.NEXT_PUBLIC_VK_URL;

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200/70">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div>
          <div className="text-sm font-semibold tracking-wide">GIFTY</div>
          <p className="mt-2 max-w-sm text-sm text-zinc-600">
            Минималистичная подарочная упаковка: пакеты, бумага, открытки и аксессуары.
            Розница и опт.
          </p>
          <p className="mt-4 text-xs text-zinc-500">
            © {new Date().getFullYear()} GIFTY.
          </p>
        </div>

        <div className="grid gap-2 text-sm">
          <Link className="text-zinc-700 hover:text-zinc-900" href="/shop/products">
            Магазин
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/wholesale">
            Опт
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/blog">
            Блог
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/partners">
            Партнёры
          </Link>
          <Link className="text-zinc-700 hover:text-zinc-900" href="/contact">
            Контакты
          </Link>
        </div>

        <div>
          <div className="text-sm font-medium text-zinc-900">Ссылки</div>
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
            Формы на сайте пока в демо‑режиме: отправку подключим отдельно.
          </p>
        </div>
      </div>
    </footer>
  );
}
