# GIFTY — brand + shop + wholesale (Next.js + Tailwind)

MVP‑сайт по ТЗ из `CHATGPT_PRO_SITE_TZ_PROMPT.md`:

- **Витрина бренда** (главная) — editorial‑hero, подборка «Витрина».
- **Каталог** `/shop/products` — фильтры (multi‑select), поиск, добавление в корзину.
- **Карточка товара** `/shop/product/[slug]` — фото, атрибуты, цены retail/wholesale.
- **Корзина** `/shop/cart` и **checkout** `/shop/checkout` — MVP без оплаты.
- **Блог (MDX)** `/blog` и `/blog/[slug]` — статьи из `content/blog/*.mdx`.
- **B2B кабинет** `/wholesale` (JWT + httpOnly cookie):
  - `/wholesale/login` — логин
  - `/wholesale/catalog` — каталог с оптовыми ценами + фильтры
  - `/wholesale/quick-order` — быстрый заказ таблицей (MOQ/кратность/наличие)
  - `/wholesale/lists` — списки закупки / repeat order (заглушка)
  - `/wholesale/orders` — заглушка под историю/документы

--- 
 
## 1) Установка и запуск

```bash
npm i
cp .env.example .env.local
npm run dev
```

Откройте: `http://localhost:3000`

---

## 2) Переменные окружения

Файл: **`.env.local`** (в git не коммитится)

Минимально для работы B2B:


```env
B2B_USERNAME=wholesale
B2B_PASSWORD=gifty2026
JWT_SECRET=change-me-in-production
```

Маркетплейсы (уже заполнены в `.env.example`):

```env
NEXT_PUBLIC_OZON_URL=...
NEXT_PUBLIC_WB_URL=...
```

---

## 3) Как залить в GitHub (репозиторий уже создан: wonderfulcreator/gifty-site)

### Вариант A — через git (рекомендуется)

1) Распакуйте архив в папку `gifty-site`
2) Откройте терминал в этой папке и выполните:

```bash
git init
git add .
git commit -m "Initial commit: GIFTY MVP"
git branch -M main
git remote add origin https://github.com/wonderfulcreator/gifty-site.git
git push -u origin main
```

> Если GitHub попросит пароль — используйте **Personal Access Token** (PAT), т.к. пароль аккаунта больше не принимается.

### Вариант B — через веб‑интерфейс GitHub

1) Откройте ваш репозиторий `gifty-site`
2) Нажмите **Add file → Upload files**
3) Перетащите содержимое папки проекта (не сам zip), нажмите **Commit changes**

---

## 4) Как “загрузить на сайт” (деплой)

### Рекомендуемый способ: Vercel

1) Зайдите на Vercel и нажмите **New Project**
2) Выберите репозиторий `wonderfulcreator/gifty-site`
3) В разделе **Environment Variables** добавьте:
   - `JWT_SECRET`
   - `B2B_USERNAME`
   - `B2B_PASSWORD`
   - (опционально) `NEXT_PUBLIC_SITE_URL` — домен проекта на Vercel после деплоя
4) Нажмите **Deploy**

После деплоя вы получите URL вида `https://gifty-site-....vercel.app`

### Альтернатива: свой сервер/VPS

1) Установите Node.js 18+  
2) На сервере:

```bash
git clone https://github.com/wonderfulcreator/gifty-site.git
cd gifty-site
npm i
cp .env.example .env.local
# заполните .env.local
npm run build
npm run start
```

3) Подключите reverse‑proxy (nginx) на порт 3000.

---

## 5) Где менять ассортимент

Файл: `src/data/products.json`

- `featured: true` — попадает в «Витрину» на главной
- `retailPrice`, `wholesalePrice`, `packSize`, `moq` — правила опта
- `images` — путь к картинкам в `public/`

---

## 6) Что дальше можно улучшить

- Подключить формы (Partners/Contact/Checkout) к email/CRM/Telegram
- Подключить оплату (ЮKassa/CloudPayments/Stripe)
- Добавить реальные аккаунты оптовиков + роли + список заказов в БД
- Оптимизировать фото (доп. кадрирование/фон/серии)
