import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight, Check, ArrowRight, ZoomIn, Heart, MessageCircle, CheckCircle2 } from 'lucide-react';
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
  const [materialOpen, setMaterialOpen] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<'print' | 'material'>('print');
  const [selectedInfoMaterial, setSelectedInfoMaterial] = useState<Material>(materials[0]);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isInFavorites = product ? isFavorite(product.id) : false;

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
          <h1 className="text-2xl font-extralight mb-4">Работа не найдена</h1>
          <Link to="/catalog" className="btn-outline">Вернуться в каталог</Link>
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

  const patternLabel = patternTypes.find(p => p.id === product.patternType)?.label || '';
  const roomLabels = product.roomTypes.map(r => roomTypes.find(rt => rt.id === r)?.label).filter(Boolean).join(', ');

  return (
    <div className="bg-background">
      {/* ── Full-screen Hero with slow zoom ── */}
      <section className="relative w-full h-screen overflow-hidden cursor-zoom-in group" onClick={() => setShowFullscreen(true)}>
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ animation: 'slowZoom 10s ease-out forwards' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

        <div className="absolute bottom-10 left-6 md:bottom-16 md:left-12 lg:bottom-20 lg:left-16">
          <p className="text-[10px] font-light uppercase tracking-[0.2em] text-white/50 mb-3">
            {product.collection}
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-white leading-[1.05] tracking-[-0.02em]">
            {product.name}
          </h1>
        </div>

        <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-70 transition-opacity duration-500 text-[9px] uppercase tracking-[0.12em] text-white/70">
          <ZoomIn className="w-3.5 h-3.5" />
          Увеличить
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <span className="text-[9px] uppercase tracking-[0.15em]">Листайте вниз</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container-wide pt-8 pb-4">
        <nav className="flex items-center gap-2 text-[10px] text-foreground/40 font-light">
          <Link to="/" className="hover:text-foreground/70 transition-colors duration-500">Главная</Link>
          <span className="text-foreground/20">/</span>
          <Link to="/catalog" className="hover:text-foreground/70 transition-colors duration-500">Каталог</Link>
          <span className="text-foreground/20">/</span>
          <span className="text-foreground/60">{product.name}</span>
        </nav>
      </div>

      {/* ── Main: Gallery + Info ── */}
      <section className="container-wide py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* LEFT — Stacked gallery */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {product.images.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden cursor-zoom-in group/img aspect-[4/5]"
                onClick={() => { setSelectedImage(i); setShowFullscreen(true); }}
              >
                <img
                  src={getImageSrc(img)}
                  alt={`${product.name} — вид ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover/img:scale-[1.02]"
                />
              </div>
            ))}
          </div>

          {/* RIGHT — Sticky info */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              <p className="text-caption">{product.collection}</p>
              <h2 className="text-2xl md:text-3xl font-extralight leading-tight tracking-[-0.02em] text-foreground">
                {product.name}
              </h2>

              <p className="text-body-lg">
                {product.description}
              </p>

              {/* Material & type info block */}
              <div className="py-5 border-t border-b border-foreground/8 space-y-3">
                <p className="text-caption mb-3">Характеристики</p>
                {[
                  { label: 'Тип', value: product.type === 'mural' ? 'Мурал' : product.type === 'panel' ? 'Панно' : 'Фоновые обои' },
                  { label: 'Сюжет', value: patternLabel },
                  { label: 'Помещение', value: roomLabels },
                  ...(product.maxWidth ? [{ label: 'Макс. ширина', value: `до ${product.maxWidth} см` }] : []),
                  { label: 'Коллекция', value: product.collection },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-[13px] font-light">
                    <span className="text-foreground/40">{row.label}</span>
                    <span className="text-foreground/70">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Materials info */}
              <div className="py-5 border-b border-foreground/8">
                <p className="text-caption mb-3">Материалы</p>
                <p className="text-body mb-4">
                  Доступно 5 типов покрытий: от матового флизелина для жилых помещений до антивандального винила для коммерческих пространств.
                </p>
                <div className="space-y-2">
                  {materials.filter(m => m.id !== 'canvas').map((mat) => (
                    <div key={mat.id} className="flex justify-between text-[12px] font-light">
                      <span className="text-foreground/50">{mat.name}</span>
                      <span className="text-foreground/35">{mat.priceCoefficient > 1 ? `+${Math.round((mat.priceCoefficient - 1) * 100)}%` : 'базовая'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom-fit statement */}
              <p className="text-[13px] text-foreground/45 leading-[1.85] font-light italic">
                Это изображение не имеет фиксированного масштаба. Мы адаптируем композицию
                под размеры вашей стены, сохраняя баланс и глубину сцены.
              </p>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => { toggleFavorite(product.id); toast.success(isInFavorites ? 'Удалено из избранного' : 'Добавлено в избранное'); }}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-[10px] uppercase tracking-[0.12em] font-light transition-all duration-500 ${
                    isInFavorites ? 'border-foreground/40 text-foreground/80' : 'border-foreground/15 text-foreground/50 hover:border-foreground/30'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isInFavorites ? 'fill-foreground/50' : ''}`} />
                  {isInFavorites ? 'В избранном' : 'Избранное'}
                </button>
                <button
                  onClick={() => toast.info('Свяжитесь через страницу контактов')}
                  className="flex items-center gap-2 px-4 py-2.5 border border-foreground/15 text-[10px] uppercase tracking-[0.12em] font-light text-foreground/50 hover:border-foreground/30 transition-all duration-500"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Задать вопрос
                </button>
              </div>

              {/* Color Variants */}
              {colorVariants.length > 1 && (
                <ColorVariantSelector currentProduct={product} variants={colorVariants} />
              )}

              <div className="border-t border-foreground/8" />

              {/* ── Configuration ── */}
              <p className="text-caption">Настройка под интерьер</p>

              {product.type === 'panel' && product.panelSizes ? (
                <div className="space-y-3">
                  <p className="text-[12px] text-foreground/50 font-light">Выберите размер</p>
                  {product.panelSizes.map((size, i) => (
                    <label
                      key={i}
                      onClick={() => setSelectedPanelSize(i)}
                      className={`flex items-center justify-between py-2.5 px-3 cursor-pointer border text-[12px] font-light transition-all duration-500 ${
                        selectedPanelSize === i ? 'border-foreground/30' : 'border-foreground/10 hover:border-foreground/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-colors duration-500 ${selectedPanelSize === i ? 'border-foreground/50 bg-foreground/40' : 'border-foreground/20'}`}>
                          {selectedPanelSize === i && <Check className="w-1.5 h-1.5 text-background" />}
                        </div>
                        <span className="text-foreground/70">{size.size}</span>
                      </div>
                      <span className="text-foreground/50">{formatPrice(size.price)} ₽</span>
                    </label>
                  ))}
                  <button onClick={handleAddToCart} className="btn-primary w-full mt-4">
                    В корзину
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="text-[12px] text-foreground/50 font-light">Укажите размеры вашей стены</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[9px] text-foreground/35 uppercase tracking-[0.1em] block mb-1.5 font-light">Ширина, см</span>
                      <input type="number" value={width} onChange={(e) => setWidth(Math.max(50, Math.min(600, Number(e.target.value))))}
                        className="w-full px-3 py-2.5 bg-transparent border border-foreground/12 text-[13px] font-light focus:outline-none focus:border-foreground/30 transition-colors duration-500" />
                    </div>
                    <div>
                      <span className="text-[9px] text-foreground/35 uppercase tracking-[0.1em] block mb-1.5 font-light">Высота, см</span>
                      <input type="number" value={height} onChange={(e) => setHeight(Math.max(50, Math.min(400, Number(e.target.value))))}
                        className="w-full px-3 py-2.5 bg-transparent border border-foreground/12 text-[13px] font-light focus:outline-none focus:border-foreground/30 transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Material */}
                  <Collapsible open={materialOpen} onOpenChange={setMaterialOpen}>
                    <CollapsibleTrigger className="w-full flex items-center justify-between py-2.5 px-3 border border-foreground/12 text-[12px] font-light hover:border-foreground/22 transition-colors duration-500">
                      <span className="text-foreground/50">Материал</span>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <span>{selectedMaterial.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${materialOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-x border-b border-foreground/12">
                        {materials.filter(m => m.id !== 'canvas').map((material) => (
                          <button
                            key={material.id}
                            onClick={() => { setSelectedMaterial(material); setMaterialOpen(false); }}
                            className={`w-full flex items-center justify-between p-3 text-[12px] font-light text-left hover:bg-foreground/4 transition-colors duration-500 ${selectedMaterial.id === material.id ? 'bg-foreground/4' : ''}`}
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${selectedMaterial.id === material.id ? 'bg-foreground/50' : 'border border-foreground/20'}`} />
                              <span className="text-foreground/70">{material.name}</span>
                            </div>
                            {material.priceCoefficient > 1 && <span className="text-foreground/35">+{Math.round((material.priceCoefficient - 1) * 100)}%</span>}
                          </button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Summary */}
                  <div className="pt-4 border-t border-foreground/8 space-y-2">
                    <div className="flex justify-between text-[12px] font-light">
                      <span className="text-foreground/40">Площадь</span>
                      <span className="text-foreground/60">{area.toFixed(2)} м²</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-foreground/40 text-[12px] font-light">Стоимость</span>
                      <span className="text-xl font-light text-foreground/80">{formatPrice(totalPrice)} ₽</span>
                    </div>
                  </div>

                  <button onClick={handleAddToCart} className="btn-primary w-full">
                    В корзину
                  </button>
                  <p className="text-[10px] text-foreground/35 text-center font-light">
                    Финальная стоимость уточняется после согласования макета
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section-lg border-t border-foreground/6">
        <div className="container-wide">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как это работает</h2>
          </motion.div>

          <div className="max-w-2xl space-y-14">
            {[
              { step: '01', title: 'Выбор дизайна', desc: 'Выберите изображение из каталога или обсудите индивидуальную разработку' },
              { step: '02', title: 'Адаптация под стену', desc: 'Масштабирование, цветокоррекция и композиция под размеры вашего пространства' },
              { step: '03', title: 'Утверждение макета', desc: 'Визуализация в интерьере и финальное согласование перед печатью' },
              { step: '04', title: 'Печать и доставка', desc: 'Производство на премиальных материалах, доставка по всей России' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex gap-8"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <span className="text-[11px] tracking-[0.2em] text-foreground/25 pt-1 shrink-0 font-light">{item.step}</span>
                <div>
                  <h3 className="text-[15px] font-light mb-2 text-foreground">{item.title}</h3>
                  <p className="text-body">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Companion Wallpapers ── */}
      {companionWallpapers.length > 0 && (
        <section className="section border-t border-foreground/6">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="text-caption mb-3">Обои-компаньоны</p>
                <h2 className="text-title mb-4">Фоновые покрытия</h2>
                <p className="text-body mb-6">Подобрали обои в тон для соседних стен.</p>
                <Link to="/catalog?type=companion" className="link-arrow">
                  Все фоновые обои <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="lg:col-span-8 relative overflow-hidden">
                <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory' }}>
                  {companionWallpapers.slice(0, 5).map((wallpaper) => (
                    <Link key={wallpaper.id} to={`/artwork/${wallpaper.slug}`} className="group flex-shrink-0" style={{ width: '240px', scrollSnapAlign: 'start' }}>
                      <div className="aspect-[4/5] overflow-hidden bg-muted mb-3">
                        <img src={getImageSrc(wallpaper.images[0])} alt={wallpaper.name} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
                      </div>
                      <p className="text-[12px] font-light text-foreground/60">{wallpaper.name}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Related products ── */}
      {relatedProducts.length > 0 && (
        <section className="section border-t border-foreground/6">
          <div className="container-wide">
            <div className="mb-12">
              <p className="text-caption mb-3">Из этой коллекции</p>
              <h2 className="text-title">{product.collection}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Fullscreen Gallery Modal ── */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background flex items-center justify-center">
            <button className="absolute top-6 right-6 p-3 text-foreground/40 hover:text-foreground/70 transition-colors duration-500 z-10" onClick={() => setShowFullscreen(false)}>
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
            <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
              <img src={mainImage} alt={product.name} className="max-w-full max-h-full object-contain" />
            </div>
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-foreground/30 hover:text-foreground/60 transition-colors duration-500"><ChevronLeft className="w-5 h-5 stroke-[1.5]" /></button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-foreground/30 hover:text-foreground/60 transition-colors duration-500"><ChevronRight className="w-5 h-5 stroke-[1.5]" /></button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  {product.images.map((_, i) => (
                    <button key={i} onClick={() => setSelectedImage(i)} className={`w-6 h-[1px] transition-colors duration-500 ${selectedImage === i ? 'bg-foreground/60' : 'bg-foreground/20'}`} />
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
