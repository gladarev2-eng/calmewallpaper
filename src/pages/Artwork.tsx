import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProductById, materials, products, patternTypes, roomTypes } from '@/data/products';
import { PriceCalculator } from '@/components/calculator/PriceCalculator';
import { ProductCard } from '@/components/catalog/ProductCard';
import { useCart } from '@/context/CartContext';
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

const Artwork = () => {
  const { id } = useParams();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPanelSize, setSelectedPanelSize] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Товар не найден</h1>
          <Link to="/catalog" className="btn-primary">
            Вернуться в каталог
          </Link>
        </div>
      </div>
    );
  }

  const getImageSrc = (imagePath: string) => {
    return imageMap[imagePath] || imagePath;
  };

  const mainImage = getImageSrc(product.images[selectedImage]);
  const relatedProducts = products
    .filter(p => p.collectionId === product.collectionId && p.id !== product.id)
    .slice(0, 3);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleAddPanelToCart = () => {
    if (!product.panelSizes) return;
    const size = product.panelSizes[selectedPanelSize];
    addItem({
      product,
      material: materials.find(m => m.id === 'canvas')!,
      width: 0,
      height: 0,
      area: 0,
      price: size.price,
      quantity: 1,
      panelSize: size.size,
    });
    toast.success('Добавлено в корзину', {
      description: `${product.name} • ${size.size}`,
    });
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const getPatternLabel = () => {
    return patternTypes.find(p => p.id === product.patternType)?.label || product.patternType;
  };

  const getRoomLabels = () => {
    return product.roomTypes.map(r => roomTypes.find(rt => rt.id === r)?.label || r).join(', ');
  };

  return (
    <div className="bg-background">
      {/* Full-screen hero */}
      <section className="relative h-screen min-h-[700px]">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

        {/* Collection name and title - bottom left */}
        <div className="absolute bottom-0 left-0 right-0 pb-20 md:pb-28">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to={`/collection/${product.collectionId}`}
                className="text-[11px] uppercase tracking-[0.3em] text-background/80 mb-4 block hover:text-background transition-colors"
              >
                Коллекция {product.collection}
              </Link>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-background uppercase">
                {product.name}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator - bottom right */}
        <motion.button 
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-center gap-2 text-background/80 hover:text-background transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Листайте</span>
          <span className="text-[10px] uppercase tracking-[0.2em]">вниз</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </section>

      {/* Detail 1:1 Section */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Детализация 1:1
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8">
                Масштаб<br />в каждом пикселе
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {product.description}
              </p>
              
              {/* Stats */}
              <div className="flex gap-12">
                <div>
                  <p className="text-4xl md:text-5xl font-light mb-2">45K</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Пикселей по ширине
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-light mb-2">2400</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    DPI разрешение
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Detail Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-square overflow-hidden cursor-pointer"
              onClick={() => setShowFullscreen(true)}
            >
              <img
                src={product.images[1] ? getImageSrc(product.images[1]) : mainImage}
                alt={`${product.name} детализация`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* In Interior Section */}
      <section className="py-24 md:py-32 lg:py-40 bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              В интерьере
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
              Атмосфера присутствия
            </h2>
          </motion.div>

          {/* Large Interior Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="aspect-[16/9] overflow-hidden"
          >
            <img
              src={product.images[2] ? getImageSrc(product.images[2]) : mainImage}
              alt={`${product.name} в интерьере`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Technical Data + Calculator Section */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Technical Data - Magazine Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
                Технические данные
              </h3>
              
              <div className="space-y-0">
                {[
                  { label: 'Настроение', value: getPatternLabel() },
                  { label: 'Тип изображения', value: product.type === 'mural' ? 'Панорамы' : product.type === 'panel' ? 'Панно' : 'Фоновые обои' },
                  { label: 'Материал', value: 'Флизелин / Текстиль' },
                  { label: 'Основа', value: 'Бесшовное полотно' },
                  { label: 'Макс. высота', value: `${product.maxHeight || 320} см (без стыков)` },
                  { label: 'Помещения', value: getRoomLabels() },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-baseline py-4 border-b border-foreground/10"
                  >
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 border border-foreground/10 text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Calculator or Panel Sizes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {product.type === 'panel' && product.panelSizes ? (
                <div className="space-y-8">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Выберите размер
                  </h3>
                  
                  <div className="space-y-3">
                    {product.panelSizes.map((size, i) => (
                      <label
                        key={i}
                        className={`flex items-center justify-between p-5 cursor-pointer border transition-all ${
                          selectedPanelSize === i
                            ? 'border-foreground'
                            : 'border-foreground/10 hover:border-foreground/30'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedPanelSize === i
                              ? 'border-foreground bg-foreground'
                              : 'border-foreground/30'
                          }`}>
                            {selectedPanelSize === i && (
                              <Check className="w-3 h-3 text-background" />
                            )}
                          </div>
                          <span className="text-sm">{size.size}</span>
                        </div>
                        <span className="text-lg">{formatPrice(size.price)} ₽</span>
                      </label>
                    ))}
                    
                    <label
                      className="flex items-center justify-between p-5 cursor-pointer border border-foreground/10 hover:border-foreground/30 transition-all opacity-60"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-2 border-foreground/30" />
                        <span className="text-sm">Индивидуальный размер</span>
                      </div>
                      <span className="text-sm text-muted-foreground">по запросу</span>
                    </label>
                  </div>

                  <button
                    onClick={handleAddPanelToCart}
                    className="w-full py-4 bg-foreground text-background text-sm uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
                  >
                    Добавить в корзину
                  </button>
                </div>
              ) : (
                <PriceCalculator product={product} />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials - Magazine Style */}
      <section className="py-24 md:py-32 lg:py-40 bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Материалы
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-8">
                Почувствуйте<br />качество
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Каждый материал подобран для своих задач. Закажите бесплатные образцы, чтобы оценить текстуру.
              </p>
              <Link 
                to="/buyers"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] group"
              >
                Заказать образцы
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Right - Materials List */}
            <div className="space-y-8">
              {materials.filter(m => m.id !== 'canvas' || product.type === 'panel').map((material, i) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-foreground/10 pb-8"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl mb-2">{material.name}</h3>
                      {material.forHoreca && (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Рекомендован для HoReCa
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ×{material.priceCoefficient.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{material.description}</p>
                  
                  {/* Features as clean list */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {material.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-muted-foreground" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Texture description */}
                  {material.texture && (
                    <p className="mt-4 text-sm italic text-muted-foreground">
                      "{material.texture}"
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Presentation */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Начать работу над проектом
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
              Мы берём заботы на себя
            </h2>
          </motion.div>

          {/* Service Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '🎨',
                title: 'Визуализация',
                desc: 'Покажем, как принт будет смотреться на вашей стене. Пришлите фото интерьера.',
                cta: 'Заказать визуализацию',
              },
              {
                icon: '📐',
                title: 'Адаптация',
                desc: 'Подстроим пропорции и масштаб под размеры вашей стены. Скорректируем цвета.',
                cta: 'Получить спецификацию',
              },
              {
                icon: '✉️',
                title: 'Образцы',
                desc: 'Пришлём образцы материалов бесплатно. Оцените текстуру перед заказом.',
                cta: 'Заказать образцы',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-muted text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-6">{item.desc}</p>
                <button className="text-sm uppercase tracking-[0.1em] border-b border-foreground/30 pb-1 hover:border-foreground transition-colors">
                  {item.cta}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Additional Services - 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Помощь с подбором',
                desc: 'Подберём изображение под ваш интерьер, подскажем цветовые решения и материал. Работаем с дизайнерами и частными клиентами.',
                image: mural2,
              },
              {
                title: 'Фоновые обои-компаньоны',
                desc: 'Подберём обои для соседних стен — тот же материал, спокойный фон, идеальное сочетание с основным принтом.',
                image: mural6,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[16/10] overflow-hidden"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-background">
                  <h3 className="text-2xl mb-3">{item.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link 
              to="/designers" 
              className="inline-block px-10 py-4 bg-foreground text-background text-sm uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
            >
              Связаться с нами
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 md:py-32 lg:py-40 bg-card">
          <div className="container-wide">
            <div className="flex justify-between items-end mb-16">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Из этой коллекции
                </p>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide">
                  {product.collection}
                </h2>
              </div>
              <Link 
                to={`/collection/${product.collectionId}`}
                className="hidden md:inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] hover:gap-4 transition-all"
              >
                Вся коллекция <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} large />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 p-3 hover:bg-muted transition-colors z-10"
              onClick={() => setShowFullscreen(false)}
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
              <img
                src={mainImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-muted hover:bg-muted/80 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-12 overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-foreground' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={getImageSrc(img)}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
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
