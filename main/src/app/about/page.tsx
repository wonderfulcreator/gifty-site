import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "О нас",
  description: "GIFTY — минималистичная подарочная упаковка. Розница и оптовые закупки для бизнеса.",
};

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          О GIFTY
        </h1>
        <p className="mt-5 text-base text-zinc-600">
          GIFTY — это подарочная упаковка в спокойной, «редакционной» эстетике: чистая типографика,
          ровный цвет, аккуратная сборка. Мы делаем упаковку, которая не спорит с подарком, а помогает
          создать впечатление заботы.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Минимализм</div>
            <p className="mt-2 text-sm text-zinc-600">
              Чистые формы, ровные поля, правильные пропорции. Витрина выглядит собранно и «дорого».
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Качество</div>
            <p className="mt-2 text-sm text-zinc-600">
              Упор на материалы и аккуратность деталей: чтобы пакет держал форму, а бумага выглядела ровно.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold">Сервис</div>
            <p className="mt-2 text-sm text-zinc-600">
              Розница — быстро выбрать и заказать. Опт — удобно собрать закупку и повторять её.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight">Наша история</h2>
            <p className="mt-3 text-sm text-zinc-600">
              Идея GIFTY выросла из простой проблемы: красивый подарок часто терялся из‑за упаковки «как у всех».
              Мы захотели сделать упаковку, которая выглядит современно, сочетается с любым стилем и легко собирается
              в витрину.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-medium text-zinc-500">2023</div>
                <div className="mt-1 text-sm font-semibold text-zinc-900">Первые коллекции</div>
                <p className="mt-1 text-sm text-zinc-600">
                  Собрали базовые размеры и цвета, чтобы закрыть 80% задач — от маленьких сюрпризов до наборов.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-medium text-zinc-500">2024</div>
                <div className="mt-1 text-sm font-semibold text-zinc-900">Фокус на B2B</div>
                <p className="mt-1 text-sm text-zinc-600">
                  Запустили оптовые закупки для магазинов, студий и флористов: MOQ, кратность и быстрый заказ.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-xs font-medium text-zinc-500">Сейчас</div>
                <div className="mt-1 text-sm font-semibold text-zinc-900">Редакционная витрина</div>
                <p className="mt-1 text-sm text-zinc-600">
                  Доводим визуальную систему и контент до уровня журнала: понятные категории, аккуратные развороты,
                  идеи для упаковки и подборки под поводы.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold tracking-tight">Как мы работаем</h2>
            <div className="mt-4 grid gap-3 text-sm text-zinc-600">
              <div className="flex gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-zinc-900" />
                <p>
                  <span className="font-medium text-zinc-900">Подбор.</span> Помогаем выбрать размеры и сочетания,
                  чтобы витрина выглядела цельно.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-zinc-900" />
                <p>
                  <span className="font-medium text-zinc-900">Закупка.</span> Для опта действуют MOQ и кратность.
                  Это помогает держать цены и стабильное наличие.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-zinc-900" />
                <p>
                  <span className="font-medium text-zinc-900">Повтор.</span> Если вы регулярно пополняете витрину —
                  используйте быстрый заказ, это экономит время.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-zinc-900">FAQ</h3>
              <div className="mt-3 grid gap-3">
                <details className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <summary className="cursor-pointer text-sm font-medium text-zinc-900">
                    Можно ли собрать набор под конкретный размер товара?
                  </summary>
                  <p className="mt-2 text-sm text-zinc-600">
                    Да. Опишите товар и желаемый стиль — предложим несколько вариантов размеров и сочетаний.
                  </p>
                </details>

                <details className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <summary className="cursor-pointer text-sm font-medium text-zinc-900">
                    Сколько времени занимает подтверждение оптовой заявки?
                  </summary>
                  <p className="mt-2 text-sm text-zinc-600">
                    Обычно в течение рабочего дня: проверяем наличие, уточняем сроки и подтверждаем детали.
                  </p>
                </details>

                <details className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <summary className="cursor-pointer text-sm font-medium text-zinc-900">
                    Есть ли доставка по России?
                  </summary>
                  <p className="mt-2 text-sm text-zinc-600">
                    Да, организуем доставку по согласованию. Уточним детали после оформления заявки.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-lg font-semibold tracking-tight">Хотите обсудить опт?</h2>
          <p className="mt-3 text-sm text-zinc-600">
            Если вы собираете корпоративные подарки, ведёте магазин или студию — напишите нам.
            Подскажем, какие позиции лучше зайдут, и как собрать аккуратную витрину.
          </p>
        </div>
      </div>
    </div>
  );
}
