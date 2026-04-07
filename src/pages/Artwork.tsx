import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight, Check, ArrowRight, ZoomIn, Heart, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProductById, materials, products, patternTypes, roomTypes, Material, collections, getColorVariants } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { ColorVariantSelector } from '@/components/artwork/ColorVariantSelector';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const imageMap: Record<string, string> = {
  '/hero-mural.jpg': heroMural,
  '/mural-1.jpg': mural1,
  '/mural-2.jpg': mural2,
  '/mural-3.jpg': mural3,
  '/mural-4.jpg': mural4,
  '/mural-5.jpg': mural5,
  '/mural-6.jpg': mural6,
};

const Artwork = () => {
  const { id } = useParams();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPanelSize, setSelectedPanelSize] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'print' | 'material'>('print');
  const [materialOpen, setMaterialOpen] = useState(false);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isInFavorites = product ? isFavorite(product.id) : false;

  // Calculator state (no margin)
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(260);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);

  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Товар не найден</h1>
          <Link to="/catalog" className="btn-primary">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  const getImageSrc = (imagePath: string) => imageMap[imagePath] || imagePath;
  const mainImage = getImageSrc(product.images[selectedImage]);
  const colorVariants = getColorVariants(product);

  const relatedProducts = products
    .filter(p => p.collectionId === product.collectionId && p.id !== product.id && p.colorVariantGroup !== product.colorVariantGroup)
    .slice(0, 3);

  const companionWallpapers = products.filter(p => p.type === 'companion' && p.collectionId === product.collectionId);

  // Calculator logic (no margin)
  const area = (width * height) / 10000;
  const basePrice = product.pricePerSqm * area;
  const totalPrice = Math.round(basePrice * selectedMaterial.priceCoefficient);

  const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

  const handleAddToCart = () => {
    if (product.type === 'panel' && product.panelSizes) {
      const size = product.panelSizes[selectedPanelSize];
      addItem({ product, material: materials.find(m => m.id === 'canvas')!, width: 0, height: 0, area: 0, price: size.price, quantity: 1, panelSize: size.size });
      toast.success('Добавлено в корзину', { description: `${product.name} • ${size.size}` });
    } else {
      addItem({ product, material: selectedMaterial, width, height, area, price: totalPrice, quantity: 1 });
      toast.success('Добавлено в корзину', { description: `${product.name} • ${width}×${height} см` });
    }
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const getPatternLabel = () => patternTypes.find(p => p.id === product.patternType)?.label || product.patternType;

  return (
    <div className="bg-background">
      {/* ── Full-screen Hero ── */}
      <section className="relative w-full h-screen overflow-hidden cursor-zoom-in group" onClick={() => setShowFullscreen(true)}>
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Product title — bottom left, bold */}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-[-0.02em]">
            {product.name}
          </h1>
        </div>
        {/* Zoom hint */}
        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm px-3 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-[0.1em] text-white">
          <ZoomIn className="w-3.5 h-3.5" />
          Увеличить
        </div>
      </section>
        {/* Scroll down hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.15em]">Листайте вниз</span>
          <ChevronDown className="w-4 h-4" />
        </div>

      {/* Breadcrumbs — below hero */}
      <div className="container-wide pt-6 pb-4">
        <nav className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-foreground transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* ── Main product section: Gallery + Info ── */}
      <section className="container-wide py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT — Stacked gallery (all images large, scrollable) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-zoom-in group/img"
                onClick={() => { setSelectedImage(i); setShowFullscreen(true); }}
              >
                <img
                  src={getImageSrc(img)}
                  alt={`${product.name} — вид ${i + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover/img:scale-[1.02]"
                />
              </div>
            ))}
          </div>

          {/* RIGHT — Sticky product info */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-5">
              <p className="text-caption">{product.collection}</p>
              <h2 className="text-2xl md:text-3xl font-light leading-tight tracking-[-0.01em]">
                {product.name}
              </h2>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => { toggleFavorite(product.id); toast.success(isInFavorites ? 'Удалено из избранного' : 'Добавлено в избранное'); }}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-[10px] uppercase tracking-[0.1em] transition-colors ${
                    isInFavorites ? 'border-foreground bg-foreground text-background' : 'border-foreground/15 hover:border-foreground/40'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isInFavorites ? 'fill-background' : ''}`} />
                  {isInFavorites ? 'В избранном' : 'Избранное'}
                </button>
                <button
                  onClick={() => toast.info('Функция в разработке', { description: 'Свяжитесь с нами через страницу контактов' })}
                  className="flex items-center gap-2 px-4 py-2.5 border border-foreground/15 text-[10px] uppercase tracking-[0.1em] hover:border-foreground/40 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Задать вопрос
                </button>
              </div>

              {/* Color Variants */}
              {colorVariants.length > 1 && (
                <ColorVariantSelector currentProduct={product} variants={colorVariants} />
              )}

              <div className="border-t border-foreground/10" />

              {/* Price & Calculator / Panel sizes */}
              {product.type === 'panel' && product.panelSizes ? (
                <div className="space-y-3">
                  <p className="text-caption">Размер</p>
                  {product.panelSizes.map((size, i) => (
                    <label
                      key={i}
                      onClick={() => setSelectedPanelSize(i)}
                      className={`flex items-center justify-between py-2.5 px-3 cursor-pointer border text-sm transition-all ${
                        selectedPanelSize === i ? 'border-foreground' : 'border-foreground/10 hover:border-foreground/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-colors ${selectedPanelSize === i ? 'border-foreground bg-foreground' : 'border-foreground/30'}`}>
                          {selectedPanelSize === i && <Check className="w-2 h-2 text-background" />}
                        </div>
                        <span>{size.size}</span>
                      </div>
                      <span className="font-medium">{formatPrice(size.price)} ₽</span>
                    </label>
                  ))}
                  <button onClick={handleAddToCart} className="btn-primary w-full">
                    Добавить в корзину
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Цена за м²</span>
                    <span className="text-lg font-light">{formatPrice(product.pricePerSqm)} ₽</span>
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Ширина, см</span>
                      <input type="number" value={width} onChange={(e) => setWidth(Math.max(50, Math.min(600, Number(e.target.value))))}
                        className="w-full px-3 py-2 bg-transparent border border-foreground/15 text-sm focus:outline-none focus:border-foreground transition-colors" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Высота, см</span>
                      <input type="number" value={height} onChange={(e) => setHeight(Math.max(50, Math.min(400, Number(e.target.value))))}
                        className="w-full px-3 py-2 bg-transparent border border-foreground/15 text-sm focus:outline-none focus:border-foreground transition-colors" />
                    </div>
                  </div>

                  {/* Material */}
                  <Collapsible open={materialOpen} onOpenChange={setMaterialOpen}>
                    <CollapsibleTrigger className="w-full flex items-center justify-between py-2.5 px-3 border border-foreground/15 text-sm hover:border-foreground/30 transition-colors">
                      <span className="text-muted-foreground">Материал:</span>
                      <div className="flex items-center gap-2">
                        <span>{selectedMaterial.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${materialOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-x border-b border-foreground/15 divide-y divide-foreground/10">
                        {materials.filter(m => m.id !== 'canvas').map((material) => (
                          <button
                            key={material.id}
                            onClick={() => { setSelectedMaterial(material); setMaterialOpen(false); }}
                            className={`w-full flex items-center justify-between p-3 text-sm text-left hover:bg-muted/50 transition-colors ${selectedMaterial.id === material.id ? 'bg-muted/50' : ''}`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${selectedMaterial.id === material.id ? 'bg-foreground' : 'border border-foreground/30'}`} />
                              <span>{material.name}</span>
                              {material.forHoreca && <span className="text-[9px] uppercase tracking-wider text-muted-foreground">HoReCa</span>}
                            </div>
                            {material.priceCoefficient > 1 && <span className="text-xs text-muted-foreground">+{Math.round((material.priceCoefficient - 1) * 100)}%</span>}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Summary */}
                  <div className="pt-4 border-t border-foreground/10 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Площадь</span>
                      <span>{area.toFixed(2)} м²</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted-foreground">Итого</span>
                      <span className="text-2xl font-light">{formatPrice(totalPrice)} ₽</span>
                    </div>
                  </div>

                  <button onClick={handleAddToCart} className="btn-primary w-full">
                    Добавить в корзину
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center">
                    Финальная стоимость уточняется после согласования
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Info — Tabs ── */}
      <section className="py-12 md:py-16 border-t border-foreground/10">
        <div className="container-wide">
          <div className="flex gap-6 mb-8 border-b border-foreground/10">
            {(['print', 'material'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-[10px] uppercase tracking-[0.15em] transition-colors relative ${activeTab === tab ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab === 'print' ? 'О принте' : 'О материале'}
                {activeTab === tab && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'print' ? (
              <motion.div key="print" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-0">
                  {[
                    { label: 'Коллекция', value: product.collection },
                    { label: 'Пропорция', value: product.aspectRatio || '5:3' },
                    { label: 'Макс. размер', value: `${product.maxWidth || 600}×${product.maxHeight || 320} см` },
                    { label: 'Разрешение', value: '2400 DPI / 45K px' },
                    { label: 'Настроение', value: getPatternLabel() },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-baseline py-2.5 border-b border-foreground/8">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-xs">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    Наши принты сохраняют безупречную четкость даже на высоте 6 метров. Каждая прожилка камня или мазок кисти выглядят так, будто они нанесены вручную.
                  </p>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-2xl font-light">45K</p>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Пикселей</p>
                    </div>
                    <div>
                      <p className="text-2xl font-light">2400</p>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">DPI</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Рекомендуемые помещения</p>
                  <div className="flex flex-wrap gap-2">
                    {product.roomTypes.map(r => {
                      const room = roomTypes.find(rt => rt.id === r);
                      return room ? <span key={r} className="text-xs px-2.5 py-1 border border-foreground/15">{room.label}</span> : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="material" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="flex flex-wrap gap-1.5">
                    {materials.filter(m => product.type === 'panel' ? m.id === 'canvas' : m.id !== 'canvas').map((material) => (
                      <button key={material.id} onClick={() => setSelectedMaterial(material)}
                        className={`px-3 py-1.5 text-[11px] border transition-all ${selectedMaterial.id === material.id ? 'border-foreground bg-foreground text-background' : 'border-foreground/15 hover:border-foreground/40'}`}>
                        {material.name}
                        {material.priceCoefficient > 1 && <span className="ml-1 opacity-60">+{Math.round((material.priceCoefficient - 1) * 100)}%</span>}
                      </button>
                    ))}
                  </div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{selectedMaterial.description}</p>
                  <div className="space-y-0">
                    {[
                      { label: 'Шов', value: selectedMaterial.id === 'fleece-premium' || selectedMaterial.id === 'fleece-commercial' ? 'Бесшовный до 320 см' : 'Шовный' },
                      { label: 'Основа', value: selectedMaterial.id.includes('fleece') ? 'Флизелин' : selectedMaterial.id === 'vinyl' ? 'Винил на флизелине' : selectedMaterial.id === 'textile' ? 'Текстиль' : 'Холст' },
                      { label: 'Плотность', value: selectedMaterial.id === 'vinyl' ? '350 г/м²' : selectedMaterial.id === 'textile' ? '280 г/м²' : '220 г/м²' },
                      { label: 'Макс. ширина', value: selectedMaterial.id === 'canvas' ? '150 см' : '320 см' },
                      { label: 'Уход', value: selectedMaterial.care },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-baseline py-2 border-b border-foreground/8">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <span className="text-xs">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {selectedMaterial.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="w-3 h-3" /><span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/buyers" className="link-arrow">
                    Подробнее о материалах <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="aspect-[4/3] bg-muted/30 border border-foreground/8 overflow-hidden relative">
                  <img src={mainImage} alt="Текстура материала" className="w-full h-full object-cover scale-[2] origin-center" style={{ filter: 'saturate(0.4) contrast(0.95)' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm font-medium">{selectedMaterial.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{selectedMaterial.texture || 'Превью текстуры на изображении принта'}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Companion Wallpapers ── */}
      {companionWallpapers.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="text-caption mb-3">Обои-компаньоны</p>
                <h2 className="text-title mb-4">Фоновые обои к этому принту</h2>
                <p className="text-body mb-6">Подобрали обои в тон для оформления соседних стен.</p>
                <Link to="/catalog?type=companion" className="link-arrow">
                  Все фоновые обои <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="lg:col-span-8 relative overflow-hidden">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory' }}>
                  {companionWallpapers.slice(0, 5).map((wallpaper) => (
                    <div key={wallpaper.id} className="group border border-foreground/10 hover:border-foreground/30 transition-colors flex-shrink-0" style={{ width: '240px', scrollSnapAlign: 'start' }}>
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img src={getImageSrc(wallpaper.images[0])} alt={wallpaper.name} className="w-full h-full object-cover" style={{ filter: 'saturate(0.7)' }} />
                      </div>
                      <div className="p-4">
                        <p className="text-caption mb-1">{wallpaper.collection}</p>
                        <h3 className="text-sm mb-1">{wallpaper.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-muted-foreground">{formatPrice(wallpaper.pricePerSqm)} ₽/м²</span>
                        </div>
                        <Link to={`/artwork/${wallpaper.slug}`} className="mt-3 flex items-center justify-center gap-2 w-full py-2 border border-foreground/15 text-[10px] uppercase tracking-[0.1em] hover:border-foreground hover:bg-foreground hover:text-background transition-colors">
                          <ArrowRight className="w-3 h-3" /> Смотреть
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Service section ── */}
      <section className="py-12 md:py-20 bg-card">
        <div className="container-wide">
          <div className="text-center mb-10">
            <p className="text-caption mb-3">Сервис</p>
            <h2 className="text-title">Начать работу над проектом</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10">
            {[
              { num: '01', title: 'Визуализация', desc: 'Покажем принт на вашей стене' },
              { num: '02', title: 'Адаптация', desc: 'Подстроим под размеры' },
              { num: '03', title: 'Образцы', desc: 'Пришлём бесплатно' },
              { num: '04', title: 'Подбор краски', desc: 'Найдём идеальный тон' },
            ].map((item, i) => (
              <div key={i} className="bg-card p-6 md:p-8">
                <span className="text-caption text-muted-foreground/40 block mb-4">{item.num}</span>
                <h3 className="text-sm font-medium mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/designers" className="btn-primary">Связаться с нами</Link>
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      {relatedProducts.length > 0 && (
        <section className="py-12 md:py-20">
          <div className="container-wide">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-caption mb-2">Из этой коллекции</p>
                <h2 className="text-title">{product.collection}</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} large />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Fullscreen Gallery Modal ── */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background flex items-center justify-center">
            <button className="absolute top-6 right-6 p-3 hover:bg-muted transition-colors z-10" onClick={() => setShowFullscreen(false)}>
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
              <img src={mainImage} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-muted hover:bg-muted/80 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-muted hover:bg-muted/80 transition-colors"><ChevronRight className="w-5 h-5" /></button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-2 h-2 rounded-full transition-colors ${selectedImage === i ? 'bg-foreground' : 'bg-foreground/30'}`} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Artwork;
