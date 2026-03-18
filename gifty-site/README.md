# Пакет Пакетыч — rebrand сайта магазина и B2B-кабинета

Проект собран на **Next.js 14 + Tailwind CSS** и сохраняет прежний функционал:

- витрина бренда и главная страница;
- каталог `/shop/products` с фильтрами и поиском;
- карточка товара `/shop/product/[slug]`;
- корзина `/shop/cart` и checkout `/shop/checkout`;
- блог на MDX `/blog` и `/blog/[slug]`;
- B2B-кабинет `/wholesale` с логином, каталогом, быстрым заказом и служебными маршрутами.

## Что изменено в ребрендинге

- внедрён новый бренд **Пакет Пакетыч**;
- использованы фирменные иллюстрации и маскот;
- обновлены цвета, карточки, кнопки, формы, хедер и футер;
- сохранены все маршруты и базовая логика работы корзины, каталога и B2B-раздела.

## Структура репозитория

Репозиторий содержит приложение внутри папки `gifty-site`.

```powershell
cd .\gifty-site
```

Дальше все команды запускаются из этой папки.

## Локальный запуск

```powershell
cd .\gifty-site
npm install
Copy-Item .env.example .env.local
npm run dev
```

Откройте `http://localhost:3000`.

## Production build

```powershell
cd .\gifty-site
npm install
npm run build
npm run start
```

## Переменные окружения

Минимальный набор для MVP:

```env
B2B_USERNAME=paketych
B2B_PASSWORD=paket2026
JWT_SECRET=change-me-in-production
```

Дополнительно можно заполнить маркетплейсы и контакты в `.env.local`.

## PowerShell команды для force push

Команды выполняются **из корня репозитория**, где лежит папка `.git`:

```powershell
git add .
git commit -m "Rebrand: Пакет Пакетыч"
git push origin main --force
```

Если коммит уже существует и нужно просто дожать публикацию:

```powershell
git push origin main --force
```

## Деплой через Vercel

Если проект уже привязан к Vercel, новый push в `main` запустит свежий деплой автоматически.

Если нужно завести проект заново:

1. Импортируйте репозиторий в Vercel.
2. Укажите Root Directory = `gifty-site`.
3. Добавьте переменные окружения:
   - `JWT_SECRET`
   - `B2B_USERNAME`
   - `B2B_PASSWORD`
   - `NEXT_PUBLIC_SITE_URL`
4. Нажмите Deploy.

## Где менять ассортимент

Ассортимент хранится в файле:

```text
src/data/products.json
```

Ключевые поля:

- `featured` — попадание на главную;
- `retailPrice`, `wholesalePrice` — цены;
- `packSize`, `moq` — правила опта;
- `images` — путь к картинкам в `public/`.
