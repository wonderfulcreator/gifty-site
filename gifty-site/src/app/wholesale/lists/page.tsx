import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";

export default function WholesaleListsPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="paper-card hero-burst overflow-hidden px-6 py-8 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <Image src="/brand/mascot-wink.png" alt="Списки закупки" width={220} height={205} className="h-auto w-40" />
          <div>
            <Badge>Повтор заказов</Badge>
            <h1 className="brand-heading mt-4 text-4xl md:text-5xl">Списки закупки и шаблоны</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#8a6048]">
              Здесь удобно хранить повторяемые наборы товаров: сезонные витрины, еженедельные закупки, корпоративные подборки. В текущей версии оставили раздел как готовый маршрут без бизнес-логики.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/wholesale" className="inline-flex items-center rounded-full border-2 border-[#e7c7a5] bg-[#fff7ee] px-5 py-3 text-sm font-semibold text-[#8b3915] transition hover:bg-[#fff0df]">
                ← В кабинет
              </Link>
              <Link href="/shop/cart" className="brand-link self-center">
                Открыть корзину →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
