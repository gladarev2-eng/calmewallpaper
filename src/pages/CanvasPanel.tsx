import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Product, materials, products } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { toast } from 'sonner';
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

interface CanvasPanelProps {
  product: Product;
}

const CanvasPanel = ({ product }: CanvasPanelProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isInFavorites = isFavorite(product.id);

  const getImageSrc = (imagePath: string) => imageMap[imagePath] || imagePath;
  const mainImage = getImageSrc(product.images[selectedImage]);

  const panelSizes = product.panelSizes || [
    { size: '50×70 см', price: 15000 },
    { size: '70×100 см', price: 25000 },
    { size: '100×140 см', price: 45000 },
  ];

  const currentSize = panelSizes[selectedSizeIndex];
  const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

  const canvasMaterial = materials.find(m => m.id === 'canvas')!;

  const relatedPanels = products
    .filter(p => p.type === 'panel' && p.id !== product.id)
    .slice(0, 3);

  const collectionMurals = products
    .filter(p => p.type === 'mural' && p.collectionId === product.collectionId)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem({
      product,
      material: canvasMaterial,
      width: 0,
      height: 0,
      area: 0,
      price: currentSize.price,
      quantity: 1,
      panelSize: currentSize.size,
    });
    toast.success('Добавлено в корзину', { description: `${product.name} • ${currentSize.size}` });
  };

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <div className="bg-background">
      {/* Breadcrumbs */}
      <div className="container-wide pt-8 pb-4">
        <nav className="flex items-center gap-2 text-[11px] text-foreground/40 font-light">
          <Link to="/" className="hover:text-foreground/70 transition-colors duration-500">Главная</Link>
          <span className="text-foreground/20">/</span>
          <Link to="/catalog?type=panel" className="hover:text-foreground/70 transition-colors duration-500">Панно</Link>
          <span className="text-foreground/20">/</span>
          <span className="text-foreground/60">{product.name}</span>
        </nav>
      </div>

      {/* ── Main: Big Image + Sticky Info ── */}
      <section className="container-wide py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">

          {/* LEFT — One big hero + detail shots */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-[2px]">
            {/* Main massive image */}
            <div
              className="overflow-hidden cursor-zoom-in group/img aspect-[4/5] bg-muted"
              onClick={() => { setSelectedImage(0); setShowFullscreen(true); }}
            >
              <img
                src={getImageSrc(product.images[0])}
                alt={`${product.name} — в интерьере`}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/img:scale-[1.03]"
              />
            </div>

            {/* Detail shots */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-[2px]">
                {product.images.slice(1, 3).map((img, i) => (
                  <div
                    key={i}
                    className="overflow-hidden cursor-zoom-in group/img aspect-square bg-muted"
                    onClick={() => { setSelectedImage(i + 1); setShowFullscreen(true); }}
                  >
                    <img
                      src={getImageSrc(img)}
                      alt={`${product.name} — деталь ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover/img:scale-[1.05]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Sticky info */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-[120px] space-y-6">
              <div>
                <p className="text-caption mb-2">Панно на холсте</p>
                <h1 className="text-2xl md:text-3xl font-light leading-tight tracking-[-0.02em] text-foreground font-display">
                  {product.name}
                </h1>
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
                <button
                  onClick={() => toast.info('Свяжитесь через страницу контактов')}
                  className="flex items-center gap-2 px-4 py-2.5 border border-foreground/15 text-[11px] uppercase tracking-[0.12em] font-light text-foreground/50 hover:border-foreground/30 transition-all duration-500"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Задать вопрос
                </button>
              </div>

              <div className="border-t border-foreground/8" />

              {/* ── Size Selector — pill buttons ── */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-foreground/40 font-light mb-4">Размер</p>
                <div className="flex flex-wrap gap-2">
                  {panelSizes.map((size, i) => (
                    <button
                      key={size.size}
                      onClick={() => setSelectedSizeIndex(i)}
                      className={`px-5 py-3 text-[13px] font-light tracking-[0.01em] transition-all duration-500 ${
                        selectedSizeIndex === i
                          ? 'border-2 border-foreground text-foreground'
                          : 'border border-foreground/15 text-foreground/50 hover:border-foreground/35'
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material info (read-only) */}
              <div className="flex justify-between text-[13px] font-light py-2 border-b border-foreground/8">
                <span className="text-foreground/40">Материал</span>
                <span className="text-foreground/60">Холст, подрамник</span>
              </div>

              {/* Price */}
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-foreground/40 text-[13px] font-light">Стоимость</span>
                <span className="text-2xl font-light text-foreground font-display">{formatPrice(currentSize.price)} ₽</span>
              </div>

              <button onClick={handleAddToCart} className="btn-primary w-full">
                В корзину
              </button>

              <p className="text-[11px] text-foreground/30 text-center font-light leading-relaxed">
                Готовое панно на подрамнике • Бесплатная доставка
              </p>

              {/* Extra details */}
              <div className="border-t border-foreground/8 pt-6 space-y-3">
                {[
                  { label: 'Печать', value: 'УФ-печать высокого разрешения' },
                  { label: 'Подрамник', value: 'Натуральная сосна, 2 см' },
                  { label: 'Готовность', value: '5–7 рабочих дней' },
                ].map((row, i) => (
                  <div key={i} className="flex justify-between text-[13px] font-light">
                    <span className="text-foreground/40">{row.label}</span>
                    <span className="text-foreground/60">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other Panels ── */}
      {relatedPanels.length > 0 && (
        <section className="py-20 md:py-28 border-t border-foreground/6">
          <div className="container-wide">
            <div className="mb-12">
              <p className="text-caption mb-3">Другие панно</p>
              <h2 className="text-title">Арт-панели на холсте</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {relatedPanels.map((p, i) => (
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
              <p className="text-caption mb-3">Муралы коллекции</p>
              <h2 className="text-title">{product.collection}</h2>
              <p className="text-body mt-4 max-w-xl">
                Панно {product.name} создано на основе дизайнов коллекции {product.collection}.
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

export default CanvasPanel;
