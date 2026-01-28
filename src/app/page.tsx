import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/Badge";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const featured = getFeaturedProducts(9);
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="subtle-grid border-b border-zinc-200/70">
        <div className="container py-14 md:py-20">
          <div className="max-w-3xl">
            <Badge className="border-zinc-300 bg-white">Пакеты • бумага • открытки</Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              Упаковка, которая завершает подарок
            </h1>
            <p className="mt-5 text-base text-zinc-600 md:text-lg">
              GIFTY — пакеты, бумага, открытки и аксессуары в едином минималистичном стиле.
              Для личных покупок и для бизнеса.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop/products"
                className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Перейти в магазин
              </Link>
              <Link
                href="/wholesale"
                className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Опт: кабинет
              </Link>
              <Link
                href="/partners"
                className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Стать партнёром
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Пакеты</div>
              <p className="mt-2 text-sm text-zinc-600">
                Коллекции по размерам, цветам и материалам. Быстрые фильтры.
              </p>
              <Link
                href="/shop/products"
                className="mt-4 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
              >
                Открыть каталог →
              </Link>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Опт</div>
              <p className="mt-2 text-sm text-zinc-600">
                Быстрый заказ табличным видом: SKU → qty → в корзину.
              </p>
              <Link
                href="/wholesale/quick-order"
                className="mt-4 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
              >
                Быстрый заказ →
              </Link>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold">Советы</div>
              <p className="mt-2 text-sm text-zinc-600">
                Короткие подсказки: размеры, материалы и идеи упаковки.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
              >
                Читать блог →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Витрина
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Несколько самых эффектных позиций из ассортимента.
            </p>
          </div>
          <Link
            href="/shop/products"
            className="hidden text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4 md:inline"
          >
            Смотреть все →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/shop/products"
            className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
          >
            Смотреть все →
          </Link>
        </div>
      </section>

      <section className="container pb-14">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Для бизнеса
              </h3>
              <p className="mt-3 text-sm text-zinc-600">
                Оптовые цены, MOQ и кратность. Быстрый заказ по SKU — удобно для закупки и повторных заказов.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/wholesale"
                  className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
                >
                  Войти в кабинет
                </Link>
                <Link
                  href="/partners"
                  className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                >
                  Заявка партнёра
                </Link>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">MOQ и кратность</div>
                <p className="mt-1 text-sm text-zinc-600">
                  Подсказки в таблице быстрых заказов помогают не ошибиться с минимальным объёмом и шагом заказа.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Заказы и документы</div>
                <p className="mt-1 text-sm text-zinc-600">
                  История заказов и документы — раздел в разработке.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="text-sm font-semibold">Повтор заказа</div>
                <p className="mt-1 text-sm text-zinc-600">
                  Собирайте повторный заказ из избранного/списка — без ручного поиска по каталогу.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Блог
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Публикации о материалах, размерах и подборе упаковки.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4 md:inline"
          >
            Все посты →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-soft"
            >
              <div className="text-xs text-zinc-500">{post.date}</div>
              <div className="mt-2 text-lg font-semibold tracking-tight">
                {post.title}
              </div>
              <p className="mt-2 text-sm text-zinc-600">{post.description}</p>
              <div className="mt-4 text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4">
                Читать →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
          >
            Все посты →
          </Link>
        </div>
      </section>
    </div>
  );
}
