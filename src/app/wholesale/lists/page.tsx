import Link from "next/link";

export default function ListsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Списки закупки
          </h1>
          <p className="mt-4 text-sm text-zinc-600">
            В полной версии здесь появятся сохранённые списки закупки, шаблоны
            (например, «еженедельная закупка») и повтор заказа в один клик.
            Раздел в разработке. Пока используйте «Быстрый заказ» или каталог.
          </p>
        </div>

        <Link
          href="/wholesale"
          className="text-sm font-medium text-zinc-900 underline decoration-zinc-900/20 underline-offset-4"
        >
          ← В кабинет
        </Link>
      </div>

      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold">Как это будет работать</div>
        <ul className="mt-3 list-disc pl-5 text-sm text-zinc-600">
          <li>Сохранить текущую корзину как список</li>
          <li>Повторить список: «Добавить всё в корзину»</li>
          <li>История: повтор конкретного заказа</li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/wholesale/quick-order"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Перейти в быстрый заказ
          </Link>
          <Link
            href="/shop/cart"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            Открыть корзину
          </Link>
        </div>
      </div>
    </div>
  );
}
