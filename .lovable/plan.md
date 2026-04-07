

# Полный дизайн-аудит CALMÉ — найденные проблемы и план исправлений

## Обнаруженные проблемы

### 1. Несогласованная типографика (разнобой кеглей и начертаний)

**Проблема**: Одни и те же по смыслу элементы используют разные размеры шрифтов на разных страницах.

| Элемент | Где | Размер | Должно быть |
|---------|-----|--------|-------------|
| Номер шага | Index.tsx | `text-[11px]` | `text-[10px]` как text-caption |
| Номер шага | Designers.tsx | `text-[11px]` | `text-[10px]` |
| Subtitle под h3 | Designers.tsx | `text-[11px]` | `text-[11px]` OK |
| h3 заголовки | Studio.tsx | `text-2xl lg:text-3xl` | Единый `text-xl lg:text-2xl` |
| h3 заголовки | Designers.tsx | `text-2xl lg:text-3xl` | Единый `text-xl lg:text-2xl` |
| h3 заголовки | ProcessSteps | `text-2xl lg:text-3xl` | Должны быть `text-xl lg:text-2xl` |
| h3 в карточках | Index, Studio, Contacts | `text-[15px]`, `text-[16px]`, `text-[18px]` | Единый `text-[15px]` |
| h3 в серии "Подход" | Studio.tsx | `font-display` | OK, но `text-[12px]` subtitle слишком мелкий для десктопа |
| Hero Studio | — | `lg:text-[5rem]` | `lg:text-[5.5rem]` как text-display |
| Lightbox title | Inspiration | `text-xl font-light` | `font-display text-xl` |

**Действие**: Создать утилитарные классы `.text-h3` (для секционных заголовков) и `.text-step-num`, унифицировать все страницы.

---

### 2. Несогласованные отступы между секциями

**Проблема**: Страницы используют разные паттерны отступов хаотично.

| Страница | Отступ hero от контента | Паттерн |
|----------|------------------------|---------|
| Index | `section` (py-24/32/44) | OK |
| Designers | `section-lg` hero, `section` сервисы | OK |
| Buyers | `section-sm` hero, `section` далее | Слишком мало для hero |
| Studio | `section-lg` манифест | OK |
| Contacts | `section-lg` hero | OK |
| Inspiration | `pt-20 pb-10` hero | Нестандартный, слишком мало |
| Collections | `section-sm` hero | Слишком мало для text-display |
| Catalog | `pt-16 sm:pt-20 lg:pt-24` + `pt-24` | Двойной padding сверху |
| Favorites | `pt-20 sm:pt-24 lg:pt-28` | Нестандартный |
| Cart | `section-sm bg-card` hero | OK но bg-card выбивается |
| Checkout | `section-sm bg-card` hero | То же |

**Действие**: Все текстовые hero-блоки (без изображения) получают `section-sm`, все полноэкранные hero — `h-screen`. Cart/Checkout/Favorites используют единый паттерн `pt-32 lg:pt-40`.

---

### 3. Страницы Cart, Checkout, Favorites — выбиваются из дизайн-кода

**Cart.tsx**:
- Использует `text-muted-foreground` напрямую вместо `text-body` / `text-foreground/xx`
- `bg-card` для секции hero — на остальных страницах этого нет
- `rounded-sm` для кнопки удаления — на сайте нет border-radius
- `font-medium` в подтверждении — на сайте только `font-light`/`font-extralight`
- Иконка корзины `w-16 h-16` — слишком большая
- Кнопки +/- с `border-border` — стилистически не согласованы

**Checkout.tsx**:
- `rounded-full` для степпера — на сайте --radius: 0
- `bg-card` для форм — нет на других страницах
- `focus:ring-1 focus:ring-ring` — на других формах (Designers) используется `focus:border-foreground/30`
- `font-medium` — не используется в дизайн-коде
- `text-sm` вместо `text-[13px] font-light`

**Favorites.tsx**:
- `tracking-wide` — не используется нигде
- `text-3xl md:text-4xl font-light` — должен быть `text-display`
- `rounded-full` для пустого состояния — нет border-radius
- `text-sm` вместо `text-body`
- `hover:gap-3` анимация — нигде больше не используется

**Действие**: Полностью переверстать Cart, Checkout, Favorites в дизайн-коде сайта.

---

### 4. Непоследовательные hover-эффекты

- **Transition duration**: большинство элементов `duration-700`, но Cart/Checkout используют стандартный `transition-colors` без duration
- **Кнопки удаления**: Cart — `hover:bg-muted rounded-sm`, Artwork — `hover:border-foreground/30`
- **Ссылки**: Cart — `hover:underline`, остальной сайт — `hover:text-foreground/xx`

**Действие**: Унифицировать все transitions к `duration-500` или `duration-700`, убрать rounded, использовать единые hover-паттерны.

---

### 5. Непоследовательные bg-секций

- CTA блоки: `bg-card/50` (Buyers, Index), `bg-card/30` (Collection, Buyers CTA, Designers), `bg-foreground` (Contacts CTA)
- Чередование: некоторые страницы чередуют `bg-background` / `bg-card/50`, другие нет

**Действие**: Стандартизировать: `bg-background` — основной, `bg-card/30` — альтернативный, `bg-foreground` — только для финального CTA.

---

### 6. Отсутствие `font-display` на некоторых элементах

- Favorites: `h1` без `font-display`
- Cart: `h1` через `text-display` (OK), но `h2 "Итого"` — `font-display text-2xl` без `text-title`
- Checkout: `h1` через `text-display` (OK)
- ProcessSteps (Buyers): `h3` — `font-extralight` без `font-display`

**Действие**: Все h1–h2 через `text-display`/`text-title`, все h3 в больших секциях — `font-display`.

---

### 7. Мелкие UX-проблемы

- **Hero на главной**: текст заголовка еле виден на скриншоте — gradient недостаточно контрастный, текст белый на очень светлом фоне
- **Catalog**: нет заголовка страницы на десктопе вообще — пользователь попадает сразу на фильтры
- **Collections**: `h1 text-display` + `mb-6` — отступ `mb-6` слишком мал для display-заголовка, должен быть `mb-8`
- **Inspiration**: `h1` использует `text-title` вместо `text-display` — ниже уровень иерархии

---

## План исправлений

### Шаг 1: Дизайн-система — новые утилитарные классы (`src/index.css`)
- Добавить `.text-h3` = `text-[18px] lg:text-[20px] font-display font-light tracking-[-0.02em]` — для секционных h3
- Добавить `.text-step-num` = `text-[10px] tracking-[0.2em] text-foreground/20 font-light` — для номеров шагов
- Стандартизировать `.text-body` opacity: `text-foreground/50` (сейчас `/55` — слишком близко к `/50`)
- Добавить `.input-field` = стандартный инпут: `bg-transparent border border-foreground/12 text-[13px] font-light focus:border-foreground/30 transition-colors duration-500 px-4 py-3`

### Шаг 2: Cart.tsx — полная переверстка
- Hero: убрать `bg-card`, использовать `section-sm bg-background`
- Карточки товаров: `border border-foreground/8` вместо `bg-card`
- Кнопки +/-: стиль `border border-foreground/12 hover:border-foreground/25 duration-500`
- Кнопка удаления: `text-foreground/30 hover:text-foreground/60 duration-500` без rounded
- Все `text-sm` → `text-[13px] font-light`, `text-muted-foreground` → `text-foreground/45`
- Summary sidebar: `border border-foreground/8` вместо `bg-card`
- Price: `font-display text-2xl`
- Кнопка "Очистить": `text-[12px] font-light text-foreground/40`

### Шаг 3: Checkout.tsx — переверстка
- Убрать `bg-card` у секций, `rounded-full` у степпера
- Степпер: квадратные элементы `w-7 h-7 border border-foreground/20`
- Инпуты: использовать `.input-field`
- `font-medium` → `font-light`
- Стиль подтверждения: `border border-foreground/8` вместо `bg-card`
- Финальный экран: убрать `rounded-full`, квадратная иконка

### Шаг 4: Favorites.tsx — переверстка
- Заголовок: `text-display` + `font-display`
- Убрать `tracking-wide`, `rounded-full`
- Пустое состояние: квадратный бордер `border border-foreground/10`
- Текст: `text-body` / `text-body-lg`
- Ссылка: `link-arrow` вместо кастомной

### Шаг 5: Унификация h3 и номеров шагов на всех страницах
- **Index.tsx**: h3 в "Процесс" → `text-h3`, номера → `text-step-num`
- **Designers.tsx**: h3 сервисов → `text-h3`, номера → `text-step-num`
- **Studio.tsx**: h3 "Подход" → `text-h3`, hero → `text-display` (lg:5.5rem)
- **Buyers/ProcessSteps**: h3 → `text-h3`
- **Contacts.tsx**: h3 шоурумов → `text-h3`

### Шаг 6: Унификация отступов hero-блоков
- Buyers hero: `section-sm` → OK (уже)
- Inspiration hero: `pt-20 pb-10` → `section-sm`
- Collections hero: `section-sm` → OK + `mb-8` для display
- Favorites: `pt-20` → `section-sm`
- Cart/Checkout: `section-sm`

### Шаг 7: Унификация bg-секций
- Все чередующиеся секции: `bg-background` / `bg-card/30`
- CTA финальный: `bg-card/30` (светлый) или `bg-foreground` (тёмный инвертированный)
- Убрать `bg-card/50` → заменить на `bg-card/30`

### Шаг 8: Улучшение Hero на главной
- Усилить градиент: `from-black/50 via-black/15` (было `from-black/40 via-black/5`)
- Добавить `text-shadow` для заголовка через inline style

### Шаг 9: Catalog — добавить заголовок страницы на десктопе
- Добавить над фильтрами: `text-display mb-4` "Каталог" + `text-body-lg` краткое описание

### Шаг 10: Inspiration — поднять иерархию заголовка
- `text-title` → `text-display`

---

## Затрагиваемые файлы (11)

| Файл | Что меняется |
|------|-------------|
| `src/index.css` | Новые классы: .text-h3, .text-step-num, .input-field |
| `src/pages/Cart.tsx` | Полная переверстка в дизайн-коде |
| `src/pages/Checkout.tsx` | Полная переверстка в дизайн-коде |
| `src/pages/Favorites.tsx` | Переверстка в дизайн-коде |
| `src/pages/Index.tsx` | h3, step nums, hero gradient |
| `src/pages/Catalog.tsx` | Добавить заголовок |
| `src/pages/Inspiration.tsx` | h1 → text-display |
| `src/pages/Studio.tsx` | h3 → text-h3, hero size |
| `src/pages/Designers.tsx` | h3 → text-h3, step nums |
| `src/pages/Collections.tsx` | mb-8 для display |
| `src/components/buyers/ProcessSteps.tsx` | h3 → text-h3 |

