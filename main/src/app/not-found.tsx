import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-16">
      <div className="max-w-xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Страница не найдена</h1>
        <p className="mt-3 text-sm text-zinc-600">
          Возможно, ссылка устарела или страница ещё не добавлена.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            На главную
          </Link>
          <Link
            href="/shop/products"
            className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
          >
            В каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
