import Image from "next/image";
import Link from "next/link";

const OZON = process.env.NEXT_PUBLIC_OZON_URL;
const WB = process.env.NEXT_PUBLIC_WB_URL;
const IG = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const TG = process.env.NEXT_PUBLIC_TELEGRAM_URL;
const VK = process.env.NEXT_PUBLIC_VK_URL;
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@paket-paketych.ru";
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE || "+7 (900) 000-00-00";

type SocialLink = {
  label: string;
  href: string;
};

export function Footer() {
  const socialLinks: SocialLink[] = [
    OZON ? { label: "Ozon", href: OZON } : null,
    WB ? { label: "WB", href: WB } : null,
    TG ? { label: "Telegram", href: TG } : null,
    IG ? { label: "Instagram", href: IG } : null,
    VK ? { label: "VK", href: VK } : null,
  ].filter(Boolean) as SocialLink[];

  return (
    <footer className="mt-16 border-t border-[#edd6bd]/85 bg-[#fff3e3]/70">
      <div className="container grid gap-10 py-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/mascot-wink.png"
              alt="Пакет Пакетыч"
              width={72}
              height={72}
              className="h-16 w-auto"
            />
            <div>
              <div className="text-lg font-black tracking-tight text-[#ab310a]">
                Пакет Пакетыч
              </div>
              <p className="mt-1 max-w-sm text-sm text-[#8a6048]">
                Яркий бренд подарочной упаковки: розничный магазин, статьи о выборе размеров и отдельный кабинет для оптовых закупок.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#efc49b] bg-[#fff8ef] px-3 py-2 text-xs font-semibold text-[#9a3c13] transition hover:bg-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#9b765f]">
            © {new Date().getFullYear()} Пакет Пакетыч. Все формы в этой версии работают как демонстрационные сценарии без реальной отправки.
          </p>
        </div>

        <div>
          <div className="text-sm font-black uppercase tracking-[0.2em] text-[#ab310a]">
            Навигация
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <Link className="text-[#8a6048] transition hover:text-[#d95c1d]" href="/shop/products">
              Каталог
            </Link>
            <Link className="text-[#8a6048] transition hover:text-[#d95c1d]" href="/wholesale">
              Опт
            </Link>
            <Link className="text-[#8a6048] transition hover:text-[#d95c1d]" href="/blog">
              Блог
            </Link>
            <Link className="text-[#8a6048] transition hover:text-[#d95c1d]" href="/partners">
              Партнёрам
            </Link>
            <Link className="text-[#8a6048] transition hover:text-[#d95c1d]" href="/about">
              О бренде
            </Link>
            <Link className="text-[#8a6048] transition hover:text-[#d95c1d]" href="/contact">
              Контакты
            </Link>
          </div>
        </div>

        <div>
          <div className="text-sm font-black uppercase tracking-[0.2em] text-[#ab310a]">
            Связь
          </div>
          <div className="mt-4 grid gap-4 text-sm text-[#8a6048]">
            <div className="paper-card-soft p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ab310a]">
                Email
              </div>
              <div className="mt-2 text-sm font-medium text-[#6b341c]">{email}</div>
            </div>
            <div className="paper-card-soft p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ab310a]">
                Телефон
              </div>
              <div className="mt-2 text-sm font-medium text-[#6b341c]">{phone}</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
