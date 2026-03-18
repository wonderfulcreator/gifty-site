import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/Badge";
import { getAllPosts } from "@/lib/blog";

const bullets = [
  "225+ позиций в каталоге",
  "быстрый выбор размеров и коллекций",
  "отдельный оптовый кабинет для закупки коробами",
];

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="pb-8 pt-6 md:pt-8">
      <section className="container">
        <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <Badge className="border-[#f1be83] bg-white/80">Новый бренд сайта</Badge>
              <h1 className="brand-heading mt-5 max-w-3xl text-4xl leading-tight md:text-6xl">
                Пакет Пакетыч — упаковка, которая уже сама выглядит как подарок
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#8a6048] md:text-lg">
                Мы сохранили весь магазин, корзину, карточки товаров и B2B-функции, но полностью переодели сайт в тёплую бумажную эстетику с фирменным персонажем и яркими акцентами.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/shop/products"
                  className="inline-flex items-center rounded-full border-2 border-[#b62b0d] bg-gradient-to-b from-[#f57822] to-[#e3531d] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(198,81,25,0.24)] transition hover:-translate-y-0.5"
                >
                  Перейти в каталог
                </Link>
                <Link
                  href="/wholesale"
                  className="inline-flex items-center rounded-full border-2 border-[#e7c7a5] bg-[#fff7ee] px-5 py-3 text-sm font-semibold text-[#8b3915] transition hover:bg-[#fff0df]"
                >
                  Открыть B2B-кабинет
                </Link>
                <Link href="/partners" className="brand-link self-center">
                  Стать партнёром →
                </Link>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {bullets.map((item) => (
                  <div key={item} className="paper-card-soft p-4 text-sm font-medium text-[#7c472a]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="paper-card-soft flex items-center justify-center p-4">
                <Image
                  src="/brand/logo-main.png"
                  alt="Логотип Пакет Пакетыч"
                  width={360}
                  height={330}
                  priority
                  className="h-auto w-full max-w-[320px]"
                />
              </div>
              <div className="paper-card-soft overflow-hidden p-3">
                <Image
                  src="/brand/team-hero.png"
                  alt="Фирменные персонажи Пакет Пакетыч"
                  width={799}
                  height={306}
                  className="h-auto w-full rounded-[20px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-8 grid gap-4 md:grid-cols-3">
        <div className="paper-card p-6">
          <div className="paper-chip">Магазин</div>
          <h2 className="mt-4 text-2xl font-black text-[#6b341c]">Каталог без лишних шагов</h2>
          <p className="mt-3 text-sm leading-6 text-[#8a6048]">
            Фильтры по типу, цвету, материалу и размеру, быстрый поиск по SKU и удобные карточки товаров для розничных покупок.
          </p>
          <Link href="/shop/products" className="brand-link mt-5 inline-flex">
            Смотреть весь ассортимент →
          </Link>
        </div>

        <div className="paper-card p-6">
          <div className="paper-chip">Опт</div>
          <h2 className="mt-4 text-2xl font-black text-[#6b341c]">Заказ коробами и кратностями</h2>
          <p className="mt-3 text-sm leading-6 text-[#8a6048]">
            Отдельный кабинет с оптовыми ценами, MOQ, быстрым заказом табличным видом и заготовками под историю документов.
          </p>
          <Link href="/wholesale/quick-order" className="brand-link mt-5 inline-flex">
            Быстрый заказ →
          </Link>
        </div>

        <div className="paper-card p-6">
          <div className="paper-chip">Блог</div>
          <h2 className="mt-4 text-2xl font-black text-[#6b341c]">Подсказки по упаковке</h2>
          <p className="mt-3 text-sm leading-6 text-[#8a6048]">
            Статьи про размеры пакетов, работу с коллекциями и то, как собирать витрину, чтобы упаковка выглядела дорого и весело одновременно.
          </p>
          <Link href="/blog" className="brand-link mt-5 inline-flex">
            Читать статьи →
          </Link>
        </div>
      </section>

      <section className="container mt-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge>Подборка на витрине</Badge>
            <h2 className="brand-heading mt-3 text-3xl md:text-4xl">Любимчики Пакет Пакетыча</h2>
            <p className="muted-copy mt-3 max-w-2xl">
              Здесь мы оставили самые заметные позиции из ассортимента — те, которые отлично показывают разнообразие размеров, материалов и праздничных коллекций.
            </p>
          </div>
          <Link href="/shop/products" className="brand-link">
            Открыть весь каталог →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="container mt-10">
        <div className="paper-card overflow-hidden px-6 py-8 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="paper-card-soft flex items-center justify-center p-4">
              <Image
                src="/brand/mascot-wink.png"
                alt="Маскот Пакет Пакетыч"
                width={300}
                height={280}
                className="h-auto w-full max-w-[240px]"
              />
            </div>
            <div>
              <Badge className="border-[#f1be83] bg-white/80">B2B и партнёрства</Badge>
              <h2 className="brand-heading mt-4 text-3xl md:text-4xl">
                Для студий, флористики, магазинов и корпоративных подарков
              </h2>
              <p className="mt-4 text-base leading-7 text-[#8a6048]">
                В B2B-разделе уже работают вход в кабинет, оптовый каталог, быстрый заказ по SKU и заготовки под документы. Можно использовать сайт как публичную витрину и как рабочий инструмент закупки.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/wholesale"
                  className="inline-flex items-center rounded-full border-2 border-[#b62b0d] bg-gradient-to-b from-[#f57822] to-[#e3531d] px-5 py-3 text-sm font-semibold text-white"
                >
                  Войти в кабинет
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center rounded-full border-2 border-[#e7c7a5] bg-[#fff7ee] px-5 py-3 text-sm font-semibold text-[#8b3915] transition hover:bg-[#fff0df]"
                >
                  Отправить заявку
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-10 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge>Журнал бренда</Badge>
            <h2 className="brand-heading mt-3 text-3xl md:text-4xl">Полезные материалы</h2>
          </div>
          <Link href="/blog" className="brand-link">
            Все статьи →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="paper-card p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(177,74,20,0.14)]"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ab310a]">{post.date}</div>
              <div className="mt-3 text-xl font-black text-[#6b341c]">{post.title}</div>
              <p className="mt-3 text-sm leading-6 text-[#8a6048]">{post.description}</p>
              <div className="brand-link mt-5 inline-flex">Читать →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
