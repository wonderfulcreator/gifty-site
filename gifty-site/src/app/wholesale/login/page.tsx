
'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

function WholesaleLoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/wholesale/catalog'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data?.error || 'Не удалось войти в B2B-кабинет')
        return
      }

      router.push(redirectTo)
      router.refresh()
    } catch {
      setError('Произошла ошибка сети. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-orange-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white p-8 shadow-[0_20px_60px_rgba(234,88,12,0.12)] lg:p-12">
          <span className="inline-flex rounded-full border border-orange-300 bg-white px-4 py-1 text-sm font-semibold text-orange-700">
            B2B · Пакет Пакетыч
          </span>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-orange-950 sm:text-5xl">
            Вход в оптовый кабинет
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-orange-900/80">
            Получите доступ к оптовому каталогу, быстрым заказам, персональным ценам и истории заявок.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-orange-200 bg-white/80 p-5">
              <h2 className="text-lg font-bold text-orange-950">Для постоянных клиентов</h2>
              <p className="mt-2 text-sm leading-6 text-orange-900/75">
                Войдите по учётным данным вашей компании, чтобы оформить заказ в пару кликов.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-white/80 p-5">
              <h2 className="text-lg font-bold text-orange-950">Новые партнёры</h2>
              <p className="mt-2 text-sm leading-6 text-orange-900/75">
                Если у вас ещё нет доступа, оставьте заявку на подключение оптового кабинета.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-orange-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] lg:p-10">
          <h2 className="text-2xl font-black text-orange-950">Авторизация</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Используйте логин и пароль, выданные менеджером.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="company@example.com"
                className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-800">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Введите пароль"
                className="w-full rounded-2xl border border-orange-200 bg-orange-50/40 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
                required
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Входим...' : 'Войти в кабинет'}
            </button>
          </form>

          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p>
              Нет доступа?{' '}
              <Link href="/contact" className="font-semibold text-orange-700 hover:text-orange-800">
                Свяжитесь с менеджером
              </Link>
            </p>
            <p>
              Вернуться в{' '}
              <Link href="/wholesale" className="font-semibold text-orange-700 hover:text-orange-800">
                раздел для оптовых клиентов
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function WholesaleLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-orange-200 bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-sm">
            Загружаем страницу входа...
          </div>
        </main>
      }
    >
      <WholesaleLoginContent />
    </Suspense>
  )
}