// Product data for CALMÉ catalog

export type ProductType = 'mural' | 'panel' | 'companion';

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  collection: string;
  collectionId: string;
  description: string;
  shortDescription: string;
  pricePerSqm: number;
  images: string[];
  tags: string[];
  colors: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  panelSizes?: { size: string; price: number }[];
  maxWidth?: number;
  maxHeight?: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  heroImage: string;
  products: string[];
  colors: string[];
}

export interface Material {
  id: string;
  name: string;
  description: string;
  priceCoefficient: number;
  features: string[];
  care: string;
  forHoreca: boolean;
}

export const materials: Material[] = [
  {
    id: 'fleece-premium',
    name: 'Флизелин премиум',
    description: 'Матовое покрытие с благородной текстурой. Идеально для жилых интерьеров.',
    priceCoefficient: 1.0,
    features: ['Матовая поверхность', 'Экологичный материал', 'Легкий монтаж'],
    care: 'Сухая чистка мягкой щёткой',
    forHoreca: false,
  },
  {
    id: 'fleece-commercial',
    name: 'Флизелин коммерческий',
    description: 'Усиленная структура для общественных пространств с повышенной проходимостью.',
    priceCoefficient: 1.15,
    features: ['Повышенная прочность', 'Устойчивость к истиранию', 'Долгий срок службы'],
    care: 'Влажная уборка, мягкие моющие средства',
    forHoreca: true,
  },
  {
    id: 'vinyl',
    name: 'Винил на флизелине',
    description: 'Максимальная защита поверхности. Рекомендован для HoReCa.',
    priceCoefficient: 1.35,
    features: ['Влагостойкость', 'Моющаяся поверхность', 'Антивандальные свойства'],
    care: 'Влажная уборка любыми средствами',
    forHoreca: true,
  },
  {
    id: 'textile',
    name: 'Текстильное покрытие',
    description: 'Тактильная текстура ткани. Создаёт особую атмосферу уюта.',
    priceCoefficient: 1.5,
    features: ['Натуральная текстура', 'Звукопоглощение', 'Премиальный вид'],
    care: 'Только сухая чистка',
    forHoreca: false,
  },
  {
    id: 'canvas',
    name: 'Холст',
    description: 'Только для панно. УФ-печать на натуральном холсте с подрамником.',
    priceCoefficient: 2.0,
    features: ['Натуральный холст', 'УФ-печать', 'Подрамник включён'],
    care: 'Протирка сухой тканью',
    forHoreca: true,
  },
];

export const collections: Collection[] = [
  {
    id: 'silentia',
    name: 'Silentia',
    slug: 'silentia',
    description: 'Коллекция тишины. Минимализм форм, глубина оттенков.',
    longDescription: 'Silentia — это поиск абсолютной гармонии через сдержанность. Каждый мурал коллекции создан как медитативное пространство, где цвет и форма существуют в идеальном балансе.',
    heroImage: '/mural-2.jpg',
    products: ['morning-whisper', 'fog-layers', 'silent-peak'],
    colors: ['Серый', 'Голубой', 'Белый'],
  },
  {
    id: 'botanica',
    name: 'Botanica',
    slug: 'botanica',
    description: 'Ботаническая коллекция. Природа во всей детализации.',
    longDescription: 'Botanica переносит природу в интерьер с беспрецедентной детализацией. Каждый лист, каждый лепесток — как живой.',
    heroImage: '/mural-3.jpg',
    products: ['peony-garden', 'tropical-calm', 'eucalyptus-mist'],
    colors: ['Зелёный', 'Розовый', 'Бежевый'],
  },
  {
    id: 'forma',
    name: 'Forma',
    slug: 'forma',
    description: 'Геометрия и архитектура. Структурные решения.',
    longDescription: 'Forma исследует границы между искусством и архитектурой. Геометрические формы создают ритм пространства.',
    heroImage: '/mural-4.jpg',
    products: ['arch-rhythm', 'terracotta-flow', 'sand-forms'],
    colors: ['Терракота', 'Песочный', 'Оливковый'],
  },
  {
    id: 'materia',
    name: 'Materia',
    slug: 'materia',
    description: 'Текстуры природных материалов. Камень, дерево, вода.',
    longDescription: 'Materia воспроизводит красоту природных поверхностей с точностью до мельчайших деталей.',
    heroImage: '/mural-6.jpg',
    products: ['carrara-flow', 'travertine-layers'],
    colors: ['Белый', 'Серый', 'Бежевый'],
  },
];

export const products: Product[] = [
  {
    id: 'morning-whisper',
    name: 'Morning Whisper',
    slug: 'morning-whisper',
    type: 'mural',
    collection: 'Silentia',
    collectionId: 'silentia',
    description: 'Туманные горы на рассвете. Многослойная композиция с плавными переходами тонов создаёт ощущение бесконечной глубины.',
    shortDescription: 'Туманные горы на рассвете',
    pricePerSqm: 4500,
    images: ['/mural-2.jpg'],
    tags: ['Пейзаж', 'Горы', 'Минимализм'],
    colors: ['Серый', 'Голубой', 'Белый'],
    isBestseller: true,
    maxWidth: 600,
    maxHeight: 320,
  },
  {
    id: 'peony-garden',
    name: 'Peony Garden',
    slug: 'peony-garden',
    type: 'mural',
    collection: 'Botanica',
    collectionId: 'botanica',
    description: 'Пионы в полном цвету. Акварельная техника с невероятной детализацией каждого лепестка.',
    shortDescription: 'Пионы в акварельной технике',
    pricePerSqm: 4800,
    images: ['/mural-3.jpg'],
    tags: ['Цветы', 'Ботаника', 'Романтика'],
    colors: ['Розовый', 'Зелёный', 'Кремовый'],
    isNew: true,
    maxWidth: 500,
    maxHeight: 300,
  },
  {
    id: 'terracotta-flow',
    name: 'Terracotta Flow',
    slug: 'terracotta-flow',
    type: 'mural',
    collection: 'Forma',
    collectionId: 'forma',
    description: 'Органические формы в тёплых терракотовых тонах. Плавные линии создают динамику и покой одновременно.',
    shortDescription: 'Органические формы в терракоте',
    pricePerSqm: 4200,
    images: ['/mural-1.jpg'],
    tags: ['Абстракция', 'Геометрия', 'Тёплые тона'],
    colors: ['Терракота', 'Кремовый', 'Персиковый'],
    maxWidth: 600,
    maxHeight: 400,
  },
  {
    id: 'arch-rhythm',
    name: 'Arch Rhythm',
    slug: 'arch-rhythm',
    type: 'mural',
    collection: 'Forma',
    collectionId: 'forma',
    description: 'Архитектурные арки в гармоничной палитре песочных и оливковых оттенков.',
    shortDescription: 'Архитектурные арки',
    pricePerSqm: 4500,
    images: ['/mural-4.jpg'],
    tags: ['Архитектура', 'Геометрия', 'Арки'],
    colors: ['Песочный', 'Оливковый', 'Бежевый'],
    isBestseller: true,
    maxWidth: 600,
    maxHeight: 350,
  },
  {
    id: 'tropical-calm',
    name: 'Tropical Calm',
    slug: 'tropical-calm',
    type: 'mural',
    collection: 'Botanica',
    collectionId: 'botanica',
    description: 'Тропические листья в приглушённой палитре. Монстеры и пальмы создают атмосферу спокойствия.',
    shortDescription: 'Тропические листья',
    pricePerSqm: 4600,
    images: ['/mural-5.jpg'],
    tags: ['Тропики', 'Листья', 'Ботаника'],
    colors: ['Зелёный', 'Кремовый', 'Серо-зелёный'],
    maxWidth: 600,
    maxHeight: 400,
  },
  {
    id: 'carrara-flow',
    name: 'Carrara Flow',
    slug: 'carrara-flow',
    type: 'mural',
    collection: 'Materia',
    collectionId: 'materia',
    description: 'Текстура каррарского мрамора. Плавные серые вены на белоснежном фоне.',
    shortDescription: 'Текстура мрамора',
    pricePerSqm: 5200,
    images: ['/mural-6.jpg'],
    tags: ['Мрамор', 'Текстура', 'Камень'],
    colors: ['Белый', 'Серый'],
    isNew: true,
    maxWidth: 600,
    maxHeight: 400,
  },
  {
    id: 'eucalyptus-mist',
    name: 'Eucalyptus Mist',
    slug: 'eucalyptus-mist',
    type: 'mural',
    collection: 'Botanica',
    collectionId: 'botanica',
    description: 'Воздушные ветви эвкалипта в дымчатой акварельной технике.',
    shortDescription: 'Ветви эвкалипта',
    pricePerSqm: 4400,
    images: ['/hero-mural.jpg'],
    tags: ['Ботаника', 'Минимализм', 'Акварель'],
    colors: ['Шалфей', 'Бежевый', 'Кремовый'],
    maxWidth: 600,
    maxHeight: 320,
  },
  // Panels
  {
    id: 'silent-peak-panel',
    name: 'Silent Peak',
    slug: 'silent-peak-panel',
    type: 'panel',
    collection: 'Silentia',
    collectionId: 'silentia',
    description: 'Горный пик в тумане. Панно на холсте с подрамником.',
    shortDescription: 'Горный пик на холсте',
    pricePerSqm: 0,
    images: ['/mural-2.jpg'],
    tags: ['Панно', 'Горы', 'Минимализм'],
    colors: ['Серый', 'Белый'],
    panelSizes: [
      { size: '60×80 см', price: 18500 },
      { size: '80×100 см', price: 28000 },
      { size: '100×120 см', price: 42000 },
      { size: '120×150 см', price: 65000 },
    ],
  },
  // Companion wallpapers
  {
    id: 'silentia-fog',
    name: 'Silentia Fog',
    slug: 'silentia-fog',
    type: 'companion',
    collection: 'Silentia',
    collectionId: 'silentia',
    description: 'Фоновые обои в тон коллекции Silentia. Мягкий серо-голубой оттенок.',
    shortDescription: 'Фоновые обои Silentia',
    pricePerSqm: 2800,
    images: ['/mural-2.jpg'],
    tags: ['Фон', 'Компаньон'],
    colors: ['Серый', 'Голубой'],
    maxWidth: 100,
    maxHeight: 320,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id || p.slug === id);
};

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(c => c.id === id || c.slug === id);
};

export const getProductsByCollection = (collectionId: string): Product[] => {
  return products.filter(p => p.collectionId === collectionId);
};

export const getProductsByType = (type: ProductType): Product[] => {
  return products.filter(p => p.type === type);
};
