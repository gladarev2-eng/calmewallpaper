import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight, ZoomIn, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Product, materials, Material, products } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
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

interface BackgroundWallpaperProps {
  product: Product;
}

const BackgroundWallpaper = ({ product }: BackgroundWallpaperProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(260);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isInFavorites = isFavorite(product.id);

  const getImageSrc = (imagePath: string) => imageMap[imagePath] || imagePath;
  const mainImage = getImageSrc(product.images[selectedImage]);

  const area = (width * height) / 10000;
  const basePrice = product.pricePerSqm * area;
  const totalPrice = Math.round(basePrice * selectedMaterial.priceCoefficient);
  const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

  // Related companions from same collection
  const relatedCompanions = products
    .filter(p => p.type === 'companion' && p.collectionId === product.collectionId && p.id !== product.id)
    .slice(0, 4);

  // Murals from the same collection
  const collectionMurals = products
    .filter(p => p.type === 'mural' && p.collectionId === product.collectionId)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem({ product, material: selectedMaterial, width, height, area, price: totalPrice, quantity: 1 });
    toast.success('Добавлено в корзину', { description: `${product.name} • ${width}×${height} см` });
  };

  // Build a gallery grid of images — use product images + repeat to fill a 2x2 grid
  const galleryImages = [...product.images];
  while (galleryImages.length < 4) {
    galleryImages.push(product.images[galleryImages.length % product.images.length]);
  }

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="bg-background">
      {/* Breadcrumbs */}
      <div className="container-wide pt-8 pb-4">
        <nav className="flex items-center gap-2 text-[11px] text-foreground/40 font-light">
          <Link to="/" className="hover:text-foreground/70 transition-colors duration-500">Главная</Link>
          <span className="text-foreground/20">/</span>
          <Link to="/catalog?type=companion" className="hover:text-foreground/70 transition-colors duration-500">Фоновые обои</Link>
          <span className="text-foreground/20">/</span>
          <span className="text-foreground/60">{product.name}</span>
        </nav>
      </div>

      {/* ── Main: 2x2 Grid + Sticky Info ── */}
      <section className="container-wide py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

          {/* LEFT — 2×2 texture grid */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-2 gap-[2px]">
              {galleryImages.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden cursor-zoom-in group/img aspect-square bg-muted"
                  onClick={() => { setSelectedImage(i % product.images.length); setShowFullscreen(true); }}
                >
                  <img
                    src={getImageSrc(img)}
                    alt={`${product.name} — текстура ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/img:scale-[1.05]"
                  />
                </div>
              ))}
            </div>

            {/* Extra full-width shot below grid */}
            <div
              className="mt-[2px] overflow-hidden cursor-zoom-in group/img aspect-[16/9] bg-muted"
              onClick={() => { setSelectedImage(0); setShowFullscreen(true); }}
            >
              <img
                src={getImageSrc(product.images[0])}
                alt={`${product.name} — в интерьере`}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/img:scale-[1.03]"
              />
            </div>
          </div>

          {/* RIGHT — Sticky info */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-[120px] space-y-6">
              <div>
                <p className="text-caption mb-2">Фоновые обои</p>
                <h1 className="text-2xl md:text-3xl font-light leading-tight tracking-[-0.02em] text-foreground font-display">
                  {product.name}
                </h1>
                <p className="text-[11px] text-foreground/30 font-light mt-2 uppercase tracking-[0.1em]">
                  Арт. {product.id.toUpperCase()}
                </p>
              </div>

              <p className="text-body-lg">{product.description}</p>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => { toggleFavorite(product.id); toast.success(isInFavorites ? 'Удалено из избранного' : 'Добавлено в избранное'); }}
                  className={`flex items-center gap-2 px-4 py-2.5 border text-[11px] uppercase tracking-[0.12em] font-light transition-all duration-500 ${
                    isInFavorites ? 'border-foreground/40 text-foreground/80' : 'border-foreground/15 text-foreground/50 hover:border-foreground/30'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isInFavorites ? 'fill-foreground/50' : ''}`} />
                  {isInFavorites ? 'В избранном' : 'Избранное'}
                </button>
              </div>

              <div className="border-t border-foreground/8" />

              {/* ── Wall Size Calculator ── */}
              <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-light">Размер стены</p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] text-foreground/35 uppercase tracking-[0.1em] block mb-2 font-light">Ширина, см</span>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Math.max(50, Math.min(1200, Number(e.target.value))))}
                    className="input-field"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-foreground/35 uppercase tracking-[0.1em] block mb-2 font-light">Высота, см</span>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Math.max(50, Math.min(400, Number(e.target.value))))}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Material selector */}
              <Collapsible open={materialOpen} onOpenChange={setMaterialOpen}>
                <CollapsibleTrigger className="w-full flex items-center justify-between py-3 border-b border-foreground/12 text-[13px] font-light hover:border-foreground/25 transition-colors duration-500">
                  <span className="text-foreground/50">Материал</span>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <span>{selectedMaterial.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${materialOpen ? 'rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="border-b border-foreground/8">
                    {materials.filter(m => m.id !== 'canvas').map((material) => (
                      <button
                        key={material.id}
                        onClick={() => { setSelectedMaterial(material); setMaterialOpen(false); }}
                        className={`w-full flex items-center justify-between py-3 text-[13px] font-light text-left hover:bg-foreground/3 transition-colors duration-500 ${selectedMaterial.id === material.id ? 'text-foreground' : 'text-foreground/60'}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${selectedMaterial.id === material.id ? 'bg-foreground/60' : 'bg-foreground/15'}`} />
                          <span>{material.name}</span>
                        </div>
                        {material.priceCoefficient > 1 && <span className="text-foreground/30">+{Math.round((material.priceCoefficient - 1) * 100)}%</span>}
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Price summary */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-[13px] font-light">
                  <span className="text-foreground/40">Площадь</span>
                  <span className="text-foreground/60">{area.toFixed(2)} м²</span>
                </div>
                <div className="flex justify-between text-[13px] font-light">
                  <span className="text-foreground/40">Цена за м²</span>
                  <span className="text-foreground/60">{formatPrice(Math.round(product.pricePerSqm * selectedMaterial.priceCoefficient))} ₽</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-foreground/40 text-[13px] font-light">Итого</span>
                  <span className="text-2xl font-light text-foreground font-display">{formatPrice(totalPrice)} ₽</span>
                </div>
              </div>

              <button onClick={handleAddToCart} className="btn-primary w-full">
                В корзину
              </button>

              <p className="text-[11px] text-foreground/30 text-center font-light leading-relaxed">
                Бесплатная доставка от 15 000 ₽
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related companion wallpapers ── */}
      {relatedCompanions.length > 0 && (
        <section className="py-20 md:py-28 border-t border-foreground/6">
          <div className="container-wide">
            <div className="mb-12">
              <p className="text-caption mb-3">Другие оттенки</p>
              <h2 className="text-title">{product.collection}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {relatedCompanions.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Murals from same collection ── */}
      {collectionMurals.length > 0 && (
        <section className="py-20 md:py-28 border-t border-foreground/6">
          <div className="container-wide">
            <div className="mb-12">
              <p className="text-caption mb-3">Подходящие муралы</p>
              <h2 className="text-title">Коллекция {product.collection}</h2>
              <p className="text-body mt-4 max-w-xl">
                Фоновые обои {product.name} идеально дополняют муралы из коллекции {product.collection}.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {collectionMurals.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── How it works ── */}
      <section className="py-20 md:py-28 border-t border-foreground/6">
        <div className="container-wide">
          <motion.div className="mb-16" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как это работает</h2>
          </motion.div>
          <div className="max-w-2xl space-y-12">
            {[
              { step: '01', title: 'Выбор оттенка', desc: 'Выберите фоновые обои, подходящие по тону к вашему муралу или интерьеру' },
              { step: '02', title: 'Замер стены', desc: 'Укажите точные размеры стены для расчёта необходимого количества' },
              { step: '03', title: 'Печать и доставка', desc: 'Производство на том же материале, что и мурал, доставка по всей России' },
              { step: '04', title: 'Монтаж', desc: 'Профессиональный монтаж или подробная инструкция для самостоятельной поклейки' },
            ].map((item, i) => (
              <motion.div key={i} className="flex gap-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <span className="text-[12px] tracking-[0.2em] text-foreground/25 pt-1 shrink-0 font-light">{item.step}</span>
                <div>
                  <h3 className="text-[16px] font-light mb-2 text-foreground">{item.title}</h3>
                  <p className="text-body">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fullscreen Modal ── */}
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

export default BackgroundWallpaper;
