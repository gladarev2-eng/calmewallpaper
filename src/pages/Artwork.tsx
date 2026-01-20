import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, X, ChevronLeft, ChevronRight, Check, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getProductById, materials, products } from '@/data/products';
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
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <div>
      {/* Full-screen hero with collection name */}
      <section className="relative h-screen min-h-[600px]">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Breadcrumb overlay */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container-wide">
            <Link 
              to="/catalog" 
              className="inline-flex items-center gap-2 text-sm bg-background/80 backdrop-blur-sm px-4 py-2 hover:bg-background transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Каталог
            </Link>
          </div>
        </div>

        {/* Collection name and title */}
        <div className="absolute bottom-0 left-0 right-0 pb-24">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link 
                to={`/collection/${product.collectionId}`}
                className="text-caption mb-4 block hover:text-foreground/80 transition-colors"
              >
                Коллекция {product.collection}
              </Link>
              <h1 className="text-display text-foreground">{product.name}</h1>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <button 
          onClick={scrollToContent}
          className="absolute bottom-8 right-8 flex items-center gap-2 text-sm bg-background/80 backdrop-blur-sm px-4 py-3 hover:bg-background transition-colors"
        >
          Листайте вниз
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </section>

      {/* Gallery Section */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Gallery - takes more space */}
            <div className="lg:col-span-3 space-y-4">
              {/* Main image - larger */}
              <div 
                className="aspect-[4/3] overflow-hidden bg-muted cursor-pointer relative group"
                onClick={() => setShowFullscreen(true)}
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-background bg-foreground/80 px-4 py-2 text-sm">
                    Открыть на весь экран
                  </span>
                </div>

                {/* Navigation arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`flex-1 aspect-[4/3] overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-foreground' : 'border-transparent hover:border-foreground/50'
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

            {/* Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 sticky top-28"
              >
                <div>
                  <Link 
                    to={`/collection/${product.collectionId}`}
                    className="text-caption hover:text-foreground transition-colors"
                  >
                    {product.collection}
                  </Link>
                  <h2 className="text-subtitle mt-2">{product.name}</h2>
                </div>

                <p className="text-body-lg">{product.description}</p>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-muted text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Panel sizes or Calculator */}
                {product.type === 'panel' && product.panelSizes ? (
                  <div className="bg-card p-6 space-y-6">
                    <h3 className="font-display text-xl">Выберите размер</h3>
                    
                    <div className="space-y-2">
                      {product.panelSizes.map((size, i) => (
                        <label
                          key={i}
                          className={`flex items-center justify-between p-4 cursor-pointer border transition-colors ${
                            selectedPanelSize === i
                              ? 'border-foreground bg-muted/50'
                              : 'border-border hover:border-foreground/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              selectedPanelSize === i
                                ? 'border-foreground'
                                : 'border-muted-foreground'
                            }`}>
                              {selectedPanelSize === i && (
                                <div className="w-2 h-2 rounded-full bg-foreground" />
                              )}
                            </div>
                            <span className="text-sm">{size.size}</span>
                          </div>
                          <span className="font-display text-lg">{formatPrice(size.price)} ₽</span>
                        </label>
                      ))}
                      
                      <label
                        className="flex items-center justify-between p-4 cursor-pointer border border-border hover:border-foreground/50 transition-colors opacity-60"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                          <span className="text-sm">Индивидуальный размер</span>
                        </div>
                        <span className="text-sm text-muted-foreground">по запросу</span>
                      </label>
                    </div>

                    <button
                      onClick={handleAddPanelToCart}
                      className="btn-primary w-full"
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
        </div>
      </section>

      {/* Materials - Tactile Presentation */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title mb-6">Почувствуйте качество</h2>
            <p className="text-body-lg">
              Каждый материал подобран для своих задач. Закажите бесплатные образцы, чтобы оценить текстуру.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.filter(m => m.id !== 'canvas' || product.type === 'panel').map((material, i) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-4 bg-gradient-to-br from-muted to-muted/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background/50 flex items-center justify-center">
                        <span className="text-2xl">✋</span>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        {material.texture}
                      </p>
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-xl mb-2">{material.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                <div className="flex flex-wrap gap-2">
                  {material.features.map((feature, j) => (
                    <span key={j} className="text-xs px-2 py-1 bg-muted">
                      {feature}
                    </span>
                  ))}
                </div>
                {material.forHoreca && (
                  <span className="inline-block mt-3 px-2 py-1 bg-accent text-accent-foreground text-xs">
                    Для HoReCa
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/buyers" className="btn-outline">
              Подробнее о материалах
            </Link>
          </div>
        </div>
      </section>

      {/* Service Presentation */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-caption mb-4">Сервис</p>
            <h2 className="text-title">Мы берём заботы на себя</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Помощь с подбором',
                desc: 'Подберём изображение под ваш интерьер, подскажем цветовые решения и материал',
                image: mural2,
              },
              {
                title: 'Адаптация изображения',
                desc: 'Подстроим пропорции под вашу стену, скорректируем цветовую гамму',
                image: mural3,
              },
              {
                title: 'Бесплатные образцы',
                desc: 'Пришлём образцы материалов, чтобы вы оценили качество перед заказом',
                image: mural5,
              },
              {
                title: 'Фоновые обои',
                desc: 'Подберём обои-компаньоны для соседних стен — тот же материал, спокойный фон',
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
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <h3 className="font-display text-2xl mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/designers" className="btn-primary">
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="section bg-card">
          <div className="container-wide">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-title">Из коллекции {product.collection}</h2>
              <Link 
                to={`/collection/${product.collectionId}`}
                className="hidden md:inline-flex items-center gap-2 text-sm hover:gap-4 transition-all"
              >
                Вся коллекция <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid-catalog">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
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
              className="absolute top-6 right-6 p-3 hover:bg-muted rounded-sm transition-colors z-10"
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