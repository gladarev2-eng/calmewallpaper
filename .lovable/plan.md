

# Премиальный редизайн CALMÉ — полный план

## Цель
Поднять визуальный уровень всего сайта до премиального бутикового стандарта: единая типографика, усиленные анимации, акцентный serif-шрифт, улучшенный контраст и ритм отступов. Все страницы приводятся к единому дизайн-коду.

---

## 1. Дизайн-система (фундамент)

### 1.1 Шрифты (`index.html`, `src/index.css`, `tailwind.config.ts`)
- Подключить **Playfair Display** (wght 300;400) — акцентный serif для display-заголовков
- Добавить CSS-переменную `--font-display: 'Playfair Display', Georgia, serif`
- В Tailwind: `fontFamily.display: ['Playfair Display', 'Georgia', 'serif']`
- Заголовки `h1, h2` получают `font-family: var(--font-display)` — создаёт контраст sans/serif
- `h3–h6` остаются на Outfit

### 1.2 Цвет и контраст (`src/index.css`)
- `--foreground`: `25 10% 8%` (глубже)
- `--background`: `38 16% 94%` (теплее)
- `--muted-foreground`: `25 6% 30%` (читаемее, было 38%)
- `--border`: opacity `0.10` (было `0.08`)
- Добавить `--accent-warm: 32 25% 50%` — тёплый золотистый для акцентов (номера шагов, hover-линии)

### 1.3 Кнопки (`src/index.css`)
- `.btn-primary`: border `2px`, hover letter-spacing `0.22em`
- `.btn-outline`: border opacity `0.35` (было `0.25`), text opacity `0.9` (было `0.8`)
- Все кнопки: `duration-700` (было `500`) — более плавные переходы

### 1.4 Анимации (`src/index.css`, `tailwind.config.ts`)
- Новый `reveal-up`: `translateY(40px) → 0` + `opacity`, `0.9s`, `cubic-bezier(0.16, 1, 0.3, 1)`
- Новый `reveal-scale`: `scale(0.97) → 1` + opacity, `0.8s`
- Новый `image-load`: `scale(1.03) → 1`, `1.2s` — для изображений при появлении
- `slowZoom`: увеличить до `12s`, scale до `1.08`
- Все hover-переходы глобально `duration-700`

### 1.5 Типографические классы (`src/index.css`)
- `.text-display`: увеличить до `lg:text-[5.5rem]`, добавить `font-family: var(--font-display)`
- `.text-title`: увеличить до `lg:text-[2.5rem]`, добавить `font-family: var(--font-display)`
- `.text-body`: цвет `text-foreground/55` (вместо `text-muted-foreground`)
- `.text-body-lg`: аналогично `text-foreground/55`, размер `16px`/`17px`
- `.text-caption`: weight `500`, tracking `0.22em`
- Новый `.section-hero`: `py-32 md:py-44 lg:py-56`

---

## 2. Компоненты

### 2.1 Header (`Header.tsx`)
- Высота: `h-20 sm:h-24 lg:h-[96px]` (было `h-16 sm:h-20 lg:h-[88px]`)
- Логотип: `text-[15px]`, tracking `0.4em`
- Навигация: `text-[12px]` (было `11px`), weight `400`
- Все hover-переходы: `duration-700`

### 2.2 Footer (`Footer.tsx`)
- Увеличить padding: `py-20 md:py-24 lg:py-32`
- Акцентная линия сверху: `h-[2px] bg-background/15` (тонкий акцент)
- Логотип: serif-шрифт `font-display`, `text-[15px]`
- Описание: `text-[14px]` (было `13px`)

### 2.3 ProductCard (`ProductCard.tsx`)
- Hover zoom: `scale-[1.04]`, `duration-[1.5s]` (было `1.03`, `1.2s`)
- Название: `text-[15px]` (было `14px`)
- Цена: `text-[13px]`, `text-foreground/50`
- Добавить класс `image-load` анимации на изображение

---

## 3. Страницы

### 3.1 Главная (`Index.tsx`)
- Hero заголовок: serif-шрифт `font-display`, slowZoom `12s`
- Блок философии: заголовки тезисов получают тонкий левый бордюр `border-l-2 border-foreground/15 pl-6` — визуальный акцент
- Категории: добавить gradient overlay при hover для читаемости текста
- Процесс: номера шагов с акцентным цветом `text-foreground/20` → тоньше
- CTA-секция: serif-шрифт для заголовка

### 3.2 Каталог (`Catalog.tsx`)
- Унифицировать отступы с остальными страницами
- Пустое состояние: serif-шрифт для сообщения

### 3.3 Карточка товара (`Artwork.tsx`)
- Название: serif `font-display`
- slowZoom hero: `12s`
- Табы "О принте / О материале": `text-[12px]` (было `11px`)

### 3.4 Дизайнерам (`Designers.tsx`)
- Hero заголовок: serif
- Тиры лояльности: скидки `font-display` serif
- Сервисные блоки: заголовки `font-display`

### 3.5 Покупателям (`Buyers.tsx`)
- Заголовки секций: serif
- Единые отступы между компонентами

### 3.6 О студии (`Studio.tsx`)
- Hero: serif заголовок
- Манифест: serif для цитат/заголовков

### 3.7 Контакты (`Contacts.tsx`)
- Заголовок: serif
- Карточки шоурумов: единый стиль с hover-эффектами `duration-700`

### 3.8 Вдохновение (`Inspiration.tsx`)
- Заголовок: serif

### 3.9 Коллекции и Коллекция (`Collections.tsx`, `Collection.tsx`)
- Заголовки: serif
- Hero: slowZoom `12s`

---

## Затрагиваемые файлы (14 файлов)

| Файл | Изменения |
|------|-----------|
| `index.html` | Подключение Playfair Display |
| `src/index.css` | Цвета, типографика, анимации, кнопки, новые классы |
| `tailwind.config.ts` | font-display, keyframes, duration |
| `src/components/layout/Header.tsx` | Размеры, шрифты |
| `src/components/layout/Footer.tsx` | Padding, serif, акцент |
| `src/components/catalog/ProductCard.tsx` | Анимации, размеры |
| `src/pages/Index.tsx` | Serif, анимации, акценты |
| `src/pages/Artwork.tsx` | Serif, slowZoom |
| `src/pages/Catalog.tsx` | Отступы |
| `src/pages/Designers.tsx` | Serif заголовки |
| `src/pages/Buyers.tsx` | Serif заголовки |
| `src/pages/Studio.tsx` | Serif заголовки |
| `src/pages/Contacts.tsx` | Serif заголовки |
| `src/pages/Inspiration.tsx` | Serif заголовки |
| `src/pages/Collections.tsx` | Serif заголовки |
| `src/pages/Collection.tsx` | Serif, slowZoom |

Структура и маршруты не меняются. Все изменения — визуальные.

