import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-10 md:py-16">
      <div className="paper-card hero-burst mx-auto max-w-3xl px-6 py-8 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Image src="/brand/mascot-wink.png" alt="Страница не найдена" width={220} height={205} className="h-auto w-40" />
          <div>
            <h1 className="brand-heading text-3xl md:text-4xl">Страница не найдена</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8a6048]">
              Похоже, ссылка устарела или этот раздел ещё не добавлен в новую версию сайта. Вернитесь на главную или сразу откройте каталог упаковки.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/" className="inline-flex items-center rounded-full border-2 border-[#b62b0d] bg-gradient-to-b from-[#f57822] to-[#e3531d] px-5 py-3 text-sm font-semibold text-white">
                На главную
              </Link>
              <Link href="/shop/products" className="inline-flex items-center rounded-full border-2 border-[#e7c7a5] bg-[#fff7ee] px-5 py-3 text-sm font-semibold text-[#8b3915] transition hover:bg-[#fff0df]">
                В каталог
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
