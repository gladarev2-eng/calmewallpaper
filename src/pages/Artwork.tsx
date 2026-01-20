import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight, Check, ArrowRight, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProductById, materials, products, patternTypes, roomTypes, Material } from '@/data/products';
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

  // Calculator state
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(260);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const [margin, setMargin] = useState(5);

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

  // Calculator logic
  const area = (width * height) / 10000;
  const areaWithMargin = area * (1 + margin / 100);
  const basePrice = product.pricePerSqm * areaWithMargin;
  const totalPrice = Math.round(basePrice * selectedMaterial.priceCoefficient);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleAddToCart = () => {
    if (product.type === 'panel' && product.panelSizes) {
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
    } else {
      addItem({
        product,
        material: selectedMaterial,
        width,
        height,
        area: areaWithMargin,
        price: totalPrice,
        quantity: 1,
      });
      toast.success('Добавлено в корзину', {
        description: `${product.name} • ${width}×${height} см`,
      });
    }
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
      {/* Full-screen hero - larger fonts */}
      <section className="relative h-screen min-h-[700px]">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />

        {/* Collection name and title - bottom left, larger fonts */}
        <div className="absolute bottom-0 left-0 right-0 pb-24 md:pb-32">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to={`/collection/${product.collectionId}`}
                className="text-sm md:text-base uppercase tracking-[0.3em] text-background/90 mb-6 block hover:text-background transition-colors"
              >
                Коллекция {product.collection}
              </Link>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wide text-background uppercase leading-none">
                {product.name}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator - bottom right, larger */}
        <motion.button 
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-10 right-8 md:bottom-16 md:right-12 flex flex-col items-center gap-3 text-background/90 hover:text-background transition-colors"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.2em]">Листайте</span>
          <span className="text-xs md:text-sm uppercase tracking-[0.2em]">вниз</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </section>

      {/* Product Details Section - Gallery + Info + Calculator */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Gallery with zoom */}
            <div className="space-y-4">
              {/* Main Image */}
              <div 
                className="aspect-[4/3] overflow-hidden bg-muted cursor-zoom-in relative group"
                onClick={() => setShowFullscreen(true)}
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-background/90 backdrop-blur-sm px-4 py-2 flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    <span className="text-sm">Увеличить</span>
                  </div>
                </div>

                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-1 aspect-[4/3] overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-foreground' : 'border-transparent hover:border-foreground/30'
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
              )}
            </div>

            {/* Right - Product Info + Calculator */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-8">
              {/* Title & Description */}
              <div>
                <Link 
                  to={`/collection/${product.collectionId}`}
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {product.collection}
                </Link>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide mt-2 mb-4">{product.name}</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1.5 border border-foreground/10 text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price & Calculator */}
              {product.type === 'panel' && product.panelSizes ? (
                /* Panel Sizes Selection */
                <div className="space-y-6 pt-6 border-t border-foreground/10">
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Выберите размер
                  </h3>
                  
                  <div className="space-y-2">
                    {product.panelSizes.map((size, i) => (
                      <label
                        key={i}
                        onClick={() => setSelectedPanelSize(i)}
                        className={`flex items-center justify-between p-4 cursor-pointer border transition-all ${
                          selectedPanelSize === i
                            ? 'border-foreground'
                            : 'border-foreground/10 hover:border-foreground/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedPanelSize === i
                              ? 'border-foreground bg-foreground'
                              : 'border-foreground/30'
                          }`}>
                            {selectedPanelSize === i && (
                              <Check className="w-2.5 h-2.5 text-background" />
                            )}
                          </div>
                          <span className="text-sm">{size.size}</span>
                        </div>
                        <span className="text-lg">{formatPrice(size.price)} ₽</span>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-foreground text-background text-sm uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
                  >
                    Добавить в корзину
                  </button>
                </div>
              ) : (
                /* Calculator for Murals/Companion */
                <div className="space-y-6 pt-6 border-t border-foreground/10">
                  {/* Price per sqm */}
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Цена за м²</span>
                    <span className="text-2xl">{formatPrice(product.pricePerSqm)} ₽</span>
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">
                      Размеры стены
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-muted-foreground mb-1 block">Ширина, см</span>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(Math.max(50, Math.min(600, Number(e.target.value))))}
                          className="w-full px-4 py-3 bg-transparent border border-foreground/20 text-sm focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground mb-1 block">Высота, см</span>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Math.max(50, Math.min(400, Number(e.target.value))))}
                          className="w-full px-4 py-3 bg-transparent border border-foreground/20 text-sm focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Material Selection */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">
                      Материал
                    </label>
                    <div className="space-y-2">
                      {materials.filter(m => m.id !== 'canvas').map((material) => (
                        <label
                          key={material.id}
                          onClick={() => setSelectedMaterial(material)}
                          className={`flex items-center justify-between p-4 cursor-pointer border transition-all ${
                            selectedMaterial.id === material.id
                              ? 'border-foreground'
                              : 'border-foreground/10 hover:border-foreground/30'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selectedMaterial.id === material.id
                                ? 'border-foreground bg-foreground'
                                : 'border-foreground/30'
                            }`}>
                              {selectedMaterial.id === material.id && (
                                <Check className="w-2.5 h-2.5 text-background" />
                              )}
                            </div>
                            <div>
                              <span className="text-sm">{material.name}</span>
                              {material.forHoreca && (
                                <span className="ml-2 text-[10px] uppercase tracking-wider text-muted-foreground">HoReCa</span>
                              )}
                            </div>
                          </div>
                          {material.priceCoefficient > 1 && (
                            <span className="text-xs text-muted-foreground">
                              +{Math.round((material.priceCoefficient - 1) * 100)}%
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Margin */}
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">
                      Запас на подрезку
                    </label>
                    <div className="flex gap-3">
                      {[5, 10].map((m) => (
                        <button
                          key={m}
                          onClick={() => setMargin(m)}
                          className={`flex-1 py-2.5 text-sm border transition-colors ${
                            margin === m
                              ? 'bg-foreground text-background border-foreground'
                              : 'border-foreground/20 hover:border-foreground/40'
                          }`}
                        >
                          +{m}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="pt-6 border-t border-foreground/10 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Площадь с запасом</span>
                      <span>{areaWithMargin.toFixed(2)} м²</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-muted-foreground">Итого</span>
                      <span className="text-3xl md:text-4xl font-light">{formatPrice(totalPrice)} ₽</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 bg-foreground text-background text-sm uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
                  >
                    Добавить в корзину
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Финальная стоимость уточняется после согласования макета
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Data Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Technical Data */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
                Технические данные
              </h3>
              
              <div className="space-y-0">
                {[
                  { label: 'Настроение', value: getPatternLabel() },
                  { label: 'Тип', value: product.type === 'mural' ? 'Мурал' : product.type === 'panel' ? 'Панно' : 'Фоновые обои' },
                  { label: 'Разрешение', value: '2400 DPI' },
                  { label: 'Макс. ширина', value: `${product.maxWidth || 600} см` },
                  { label: 'Макс. высота', value: `${product.maxHeight || 320} см (бесшовно)` },
                  { label: 'Помещения', value: getRoomLabels() },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-baseline py-4 border-b border-foreground/10"
                  >
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Scale Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
                Детализация
              </h3>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                Масштаб в каждом пикселе
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Наши принты сохраняют безупречную четкость даже на высоте 6 метров. Каждая прожилка камня или мазок кисти выглядят так, будто они нанесены вручную.
              </p>
              
              {/* Stats */}
              <div className="flex gap-12">
                <div>
                  <p className="text-4xl md:text-5xl font-light mb-2">45K</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Пикселей по ширине
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-light mb-2">2400</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    DPI разрешение
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials Presentation */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32 lg:self-start"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
                Материалы
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                Почувствуйте качество
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
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
            <div className="space-y-6">
              {materials.filter(m => m.id !== 'canvas' || product.type === 'panel').map((material, i) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-foreground/10 p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg mb-1">{material.name}</h3>
                      {material.forHoreca && (
                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Для HoReCa
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ×{material.priceCoefficient.toFixed(2)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                    {material.features.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm">
                        <Check className="w-3.5 h-3.5 text-foreground/50" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Texture */}
                  {material.texture && (
                    <p className="text-xs italic text-muted-foreground border-t border-foreground/10 pt-4">
                      {material.texture}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Сервис
            </p>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              Начать работу над проектом
            </h2>
          </motion.div>

          {/* Service Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: '🎨',
                title: 'Визуализация',
                desc: 'Покажем, как принт будет смотреться на вашей стене. Пришлите фото интерьера — сделаем mockup.',
              },
              {
                icon: '📐',
                title: 'Адаптация',
                desc: 'Подстроим пропорции под размеры стены. Скорректируем масштаб и цветовую гамму.',
              },
              {
                icon: '✉️',
                title: 'Образцы',
                desc: 'Пришлём образцы материалов бесплатно. Оцените текстуру и качество печати.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 border border-foreground/10"
              >
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <h3 className="text-lg mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Помощь с подбором',
                desc: 'Подберём изображение под ваш интерьер, подскажем цветовые решения и оптимальный материал.',
                image: mural2,
              },
              {
                title: 'Фоновые обои',
                desc: 'Подберём обои-компаньоны для соседних стен — тот же материал, спокойный фон.',
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
                  <h3 className="text-xl md:text-2xl mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
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
        <section className="py-16 md:py-24 lg:py-32">
          <div className="container-wide">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Из этой коллекции
                </p>
                <h2 className="text-2xl md:text-3xl font-light tracking-wide">
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
