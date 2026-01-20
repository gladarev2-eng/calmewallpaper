import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ZoomIn, Maximize, Check } from 'lucide-react';
import { useState } from 'react';
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
  const [showZoom, setShowZoom] = useState(false);
  const { addItem } = useCart();

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

  const mainImage = imageMap[product.images[selectedImage]] || product.images[selectedImage];
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

  return (
    <div>
      {/* Full-screen hero image */}
      <section className="relative h-screen min-h-[600px]">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setShowZoom(true)}
        />
        <button
          onClick={() => setShowZoom(true)}
          className="absolute bottom-8 right-8 p-3 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        
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
      </section>

      {/* Product info */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? 'border-foreground' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={imageMap[img] || img}
                        alt={`${product.name} ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <Link 
                    to={`/collection/${product.collectionId}`}
                    className="text-caption hover:text-foreground transition-colors"
                  >
                    {product.collection}
                  </Link>
                  <h1 className="text-display mt-2">{product.name}</h1>
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
                  <div className="bg-card p-6 md:p-8 space-y-6">
                    <h3 className="font-display text-2xl">Выберите размер</h3>
                    
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

      {/* Features */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Maximize className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">Масштаб</h3>
              <p className="text-sm text-muted-foreground">
                {product.maxWidth && product.maxHeight 
                  ? `До ${product.maxWidth}×${product.maxHeight} см`
                  : 'Размер по вашим параметрам'}
              </p>
            </div>
            <div className="text-center p-6">
              <Check className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">Адаптация</h3>
              <p className="text-sm text-muted-foreground">
                Подстроим цвета и пропорции под ваш интерьер
              </p>
            </div>
            <div className="text-center p-6">
              <ZoomIn className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-display text-xl mb-2">Детализация</h3>
              <p className="text-sm text-muted-foreground">
                Высочайшее разрешение для любого масштаба
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="section">
          <div className="container-wide">
            <h2 className="text-title mb-12">Из коллекции {product.collection}</h2>
            <div className="grid-catalog">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zoom modal */}
      {showZoom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <button
            className="absolute top-6 right-6 p-3 hover:bg-muted rounded-sm transition-colors"
            onClick={() => setShowZoom(false)}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img
            src={mainImage}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
};

export default Artwork;
