import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Заказы
        </h1>
        <p className="mt-4 text-sm text-zinc-600">
          Здесь будет история заказов, возможность повторить заказ, скачать счета
          и документы. Раздел в разработке.
        </p>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold">Пусто</div>
          <p className="mt-2 text-sm text-zinc-600">
            Подключим после интеграции с базой/CRM.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/wholesale/quick-order"
              className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
            >
              Сделать заказ
            </Link>
            <Link
              href="/wholesale"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              В кабинет
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
