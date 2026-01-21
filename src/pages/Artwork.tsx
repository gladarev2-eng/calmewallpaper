import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight, Check, ArrowRight, ZoomIn, Heart, MessageCircle } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { getProductById, materials, products, patternTypes, roomTypes, Material, AspectRatio, collections, getColorVariants } from '@/data/products';
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

// 6 aspect ratio variants from PDF: 1:1, 3:4, 5:3, 2:1, 5:2, 4:1
type AspectRatioVariant = AspectRatio;

const aspectRatioConfigs: Record<AspectRatioVariant, {
  heroAspect: string;
  galleryAspect: string;
  galleryClass: string;
  heroObjectPosition: string;
}> = {
  '1:1': {
    heroAspect: 'aspect-square',
    galleryAspect: 'aspect-square',
    galleryClass: 'lg:col-span-7',
    heroObjectPosition: 'object-center',
  },
  '3:4': {
    heroAspect: 'aspect-[3/4]',
    galleryAspect: 'aspect-[3/4]',
    galleryClass: 'lg:col-span-6',
    heroObjectPosition: 'object-center',
  },
  '5:3': {
    heroAspect: 'aspect-[5/3]',
    galleryAspect: 'aspect-[5/3]',
    galleryClass: 'lg:col-span-8',
    heroObjectPosition: 'object-center',
  },
  '2:1': {
    heroAspect: 'aspect-[2/1]',
    galleryAspect: 'aspect-[2/1]',
    galleryClass: 'lg:col-span-8',
    heroObjectPosition: 'object-center',
  },
  '5:2': {
    heroAspect: 'aspect-[5/2]',
    galleryAspect: 'aspect-[5/2]',
    galleryClass: 'lg:col-span-9',
    heroObjectPosition: 'object-center',
  },
  '4:1': {
    heroAspect: 'aspect-[4/1]',
    galleryAspect: 'aspect-[4/1]',
    galleryClass: 'lg:col-span-12',
    heroObjectPosition: 'object-center',
  },
};

// Determine aspect ratio based on product data or default
const getProductAspectRatio = (product: { aspectRatio?: string }): AspectRatioVariant => {
  const ratio = product.aspectRatio as AspectRatioVariant;
  if (ratio && aspectRatioConfigs[ratio]) {
    return ratio;
  }
  return '5:3'; // Default for murals - landscape orientation
};

const Artwork = () => {
  const { id } = useParams();
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPanelSize, setSelectedPanelSize] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'print' | 'material'>('print');
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isInFavorites = product ? isFavorite(product.id) : false;

  // Calculator state
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(260);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const [margin, setMargin] = useState(5);

  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo(0, 0);
  }, [id]);

  const aspectRatio = useMemo((): AspectRatioVariant => {
    if (!product) return '5:3';
    // Check if product has aspectRatio property
    const productAny = product as { aspectRatio?: string };
    if (productAny.aspectRatio && aspectRatioConfigs[productAny.aspectRatio as AspectRatioVariant]) {
      return productAny.aspectRatio as AspectRatioVariant;
    }
    return '5:3'; // Default for murals - landscape orientation
  }, [product]);

  const config = aspectRatioConfigs[aspectRatio];

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
  
  // Get color variants for this product
  const colorVariants = useMemo(() => getColorVariants(product), [product]);
  
  // Get related products excluding color variants
  const relatedProducts = products
    .filter(p => 
      p.collectionId === product.collectionId && 
      p.id !== product.id && 
      p.colorVariantGroup !== product.colorVariantGroup
    )
    .slice(0, 3);

  // Get companion wallpapers for this collection
  const companionWallpapers = useMemo(() => {
    return products.filter(p => 
      p.type === 'companion' && 
      p.collectionId === product.collectionId
    );
  }, [product.collectionId]);

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
      {/* Full-screen hero - absolute positioned within viewport */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover ${config.heroObjectPosition}`}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-foreground/30" />

        {/* Title at bottom left - extra large typography */}
        <div className="absolute bottom-0 left-0 right-0 pb-20 md:pb-28">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                to={`/collection/${product.collectionId}`}
                className="text-base md:text-lg uppercase tracking-[0.25em] text-white/90 mb-4 block hover:text-white transition-colors font-medium"
              >
                {product.collection}
              </Link>
              <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-light tracking-tight text-white uppercase leading-[0.85]">
                {product.name}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator - left aligned, bolder, more compact */}
        <motion.button 
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-6 md:left-12 flex items-center gap-3 text-white hover:text-white/80 transition-colors group"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
          <span className="text-sm uppercase tracking-[0.15em] font-medium">Листайте вниз</span>
        </motion.button>
      </section>

      {/* Product Details Section - Gallery + Compact Info */}
      <section className="relative bg-background py-12 md:py-16">
        <div className="container-wide">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/catalog" className="hover:text-foreground transition-colors">Каталог</Link>
            <span>/</span>
            <Link to={`/collection/${product.collectionId}`} className="hover:text-foreground transition-colors">{product.collection}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left - Large Gallery */}
            <div className={`${config.galleryClass} space-y-3`}>
              {/* Main Image - larger */}
              <div 
                className={`${config.galleryAspect} overflow-hidden bg-muted cursor-zoom-in relative group`}
                onClick={() => setShowFullscreen(true)}
              >
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
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
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails - compact */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-12 overflow-hidden border transition-colors ${
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

            {/* Right - Compact Product Info */}
            <div className={`${config.galleryClass === 'lg:col-span-12' ? 'lg:col-span-12' : config.galleryClass === 'lg:col-span-9' ? 'lg:col-span-3' : config.galleryClass === 'lg:col-span-8' ? 'lg:col-span-4' : config.galleryClass === 'lg:col-span-7' ? 'lg:col-span-5' : 'lg:col-span-6'} lg:sticky lg:top-20 lg:self-start`}>
              <div className="space-y-4">
                {/* Action buttons - Favorite & Ask Question */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      toggleFavorite(product.id);
                      toast.success(isInFavorites ? 'Удалено из избранного' : 'Добавлено в избранное');
                    }}
                    className={`flex items-center gap-2 px-4 py-2 border text-xs uppercase tracking-[0.1em] transition-colors ${
                      isInFavorites 
                        ? 'border-foreground bg-foreground text-background hover:bg-foreground/90' 
                        : 'border-foreground/15 hover:border-foreground/40'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInFavorites ? 'fill-background' : ''}`} />
                    {isInFavorites ? 'В избранном' : 'Избранное'}
                  </button>
                  <button
                    onClick={() => toast.info('Функция в разработке', { description: 'Свяжитесь с нами через страницу контактов' })}
                    className="flex items-center gap-2 px-4 py-2 border border-foreground/15 text-xs uppercase tracking-[0.1em] hover:border-foreground/40 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Задать вопрос
                  </button>
                </div>
                {/* Title & Price header */}
                <div>
                  <Link 
                    to={`/collection/${product.collectionId}`}
                    className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {product.collection}
                  </Link>
                  <h2 className="text-2xl md:text-3xl font-light tracking-wide mt-1">{product.name}</h2>
                </div>

                {/* Description - compact */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{product.description}</p>

                {/* Color Variant Selector */}
                {colorVariants.length > 1 && (
                  <ColorVariantSelector 
                    currentProduct={product} 
                    variants={colorVariants} 
                  />
                )}

                {/* Price & Calculator or Panel Sizes */}
                {product.type === 'panel' && product.panelSizes ? (
                  /* Panel Sizes Selection - compact */
                  <div className="space-y-4 pt-4 border-t border-foreground/10">
                    <div className="space-y-1.5">
                      {product.panelSizes.map((size, i) => (
                        <label
                          key={i}
                          onClick={() => setSelectedPanelSize(i)}
                          className={`flex items-center justify-between py-2.5 px-3 cursor-pointer border text-sm transition-all ${
                            selectedPanelSize === i
                              ? 'border-foreground'
                              : 'border-foreground/10 hover:border-foreground/30'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full border flex items-center justify-center transition-colors ${
                              selectedPanelSize === i
                                ? 'border-foreground bg-foreground'
                                : 'border-foreground/30'
                            }`}>
                              {selectedPanelSize === i && (
                                <Check className="w-2 h-2 text-background" />
                              )}
                            </div>
                            <span>{size.size}</span>
                          </div>
                          <span className="font-medium">{formatPrice(size.price)} ₽</span>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3 bg-foreground text-background text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
                    >
                      Добавить в корзину
                    </button>
                  </div>
                ) : (
                  /* Calculator for Murals/Companion - compact single screen */
                  <div className="space-y-4 pt-4 border-t border-foreground/10">
                    {/* Price per sqm - inline */}
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">Цена за м²</span>
                      <span className="text-lg font-medium">{formatPrice(product.pricePerSqm)} ₽</span>
                    </div>

                    {/* Dimensions - compact grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Ширина, см</span>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(Math.max(50, Math.min(600, Number(e.target.value))))}
                          className="w-full px-3 py-2 bg-transparent border border-foreground/15 text-sm focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">Высота, см</span>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Math.max(50, Math.min(400, Number(e.target.value))))}
                          className="w-full px-3 py-2 bg-transparent border border-foreground/15 text-sm focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>

                    {/* Material Selection - Collapsible */}
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
                              className={`w-full flex items-center justify-between p-3 text-sm text-left hover:bg-muted/50 transition-colors ${
                                selectedMaterial.id === material.id ? 'bg-muted/50' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${
                                  selectedMaterial.id === material.id
                                    ? 'bg-foreground'
                                    : 'border border-foreground/30'
                                }`} />
                                <span>{material.name}</span>
                                {material.forHoreca && (
                                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground">HoReCa</span>
                                )}
                              </div>
                              {material.priceCoefficient > 1 && (
                                <span className="text-xs text-muted-foreground">
                                  +{Math.round((material.priceCoefficient - 1) * 100)}%
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Margin - compact toggle */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Запас:</span>
                      <div className="flex gap-2 flex-1">
                        {[5, 10].map((m) => (
                          <button
                            key={m}
                            onClick={() => setMargin(m)}
                            className={`flex-1 py-1.5 text-xs border transition-colors ${
                              margin === m
                                ? 'bg-foreground text-background border-foreground'
                                : 'border-foreground/15 hover:border-foreground/30'
                            }`}
                          >
                            +{m}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Summary - compact */}
                    <div className="pt-4 border-t border-foreground/10 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Площадь</span>
                        <span>{areaWithMargin.toFixed(2)} м²</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Итого</span>
                        <span className="text-2xl md:text-3xl font-light">{formatPrice(totalPrice)} ₽</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3 bg-foreground text-background text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
                    >
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
        </div>
      </section>

      {/* Technical Info Section - Tabs */}
      <section className="py-10 md:py-14 border-t border-foreground/10">
        <div className="container-wide">
          {/* Tab buttons */}
          <div className="flex gap-6 mb-8 border-b border-foreground/10">
            <button
              onClick={() => setActiveTab('print')}
              className={`pb-3 text-xs uppercase tracking-[0.2em] transition-colors relative ${
                activeTab === 'print' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              О принте
              {activeTab === 'print' && (
                <motion.div 
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('material')}
              className={`pb-3 text-xs uppercase tracking-[0.2em] transition-colors relative ${
                activeTab === 'material' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              О материале
              {activeTab === 'material' && (
                <motion.div 
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                />
              )}
            </button>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {activeTab === 'print' ? (
              <motion.div
                key="print"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {/* Print specs */}
                <div className="space-y-0">
                  {[
                    { label: 'Коллекция', value: product.collection },
                    { label: 'Пропорция', value: aspectRatio },
                    { label: 'Макс. размер', value: `${product.maxWidth || 600}×${product.maxHeight || 320} см` },
                    { label: 'Разрешение', value: '2400 DPI / 45K px' },
                    { label: 'Тип', value: product.type === 'mural' ? 'Мурал' : product.type === 'panel' ? 'Панно' : 'Фоновые обои' },
                    { label: 'Настроение', value: getPatternLabel() },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-baseline py-2.5 border-b border-foreground/8"
                    >
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-xs font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Print stats */}
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Наши принты сохраняют безупречную четкость даже на высоте 6 метров. Каждая прожилка камня или мазок кисти выглядят так, будто они нанесены вручную.
                  </p>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-2xl font-light">45K</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Пикселей</p>
                    </div>
                    <div>
                      <p className="text-2xl font-light">2400</p>
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">DPI</p>
                    </div>
                  </div>
                </div>

                {/* Rooms */}
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Рекомендуемые помещения</p>
                  <div className="flex flex-wrap gap-2">
                    {product.roomTypes.map(r => {
                      const room = roomTypes.find(rt => rt.id === r);
                      return room ? (
                        <span key={r} className="text-xs px-2.5 py-1 border border-foreground/15">
                          {room.label}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="material"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Left - Material selection + specs */}
                <div className="space-y-5">
                  {/* Compact material selection */}
                  <div className="flex flex-wrap gap-1.5">
                    {materials.filter(m => product.type === 'panel' ? m.id === 'canvas' : m.id !== 'canvas').map((material) => (
                      <button
                        key={material.id}
                        onClick={() => setSelectedMaterial(material)}
                        className={`px-3 py-1.5 text-[11px] border transition-all ${
                          selectedMaterial.id === material.id
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-foreground/15 hover:border-foreground/40'
                        }`}
                      >
                        {material.name}
                        {material.priceCoefficient > 1 && (
                          <span className="ml-1 opacity-60">+{Math.round((material.priceCoefficient - 1) * 100)}%</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Material description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMaterial.description}
                  </p>

                  {/* Material tech specs */}
                  <div className="space-y-0">
                    {[
                      { label: 'Шов', value: selectedMaterial.id === 'fleece-premium' || selectedMaterial.id === 'fleece-commercial' ? 'Бесшовный до 320 см' : 'Шовный' },
                      { label: 'Основа', value: selectedMaterial.id.includes('fleece') ? 'Флизелин' : selectedMaterial.id === 'vinyl' ? 'Винил на флизелине' : selectedMaterial.id === 'textile' ? 'Текстиль' : 'Холст' },
                      { label: 'Плотность', value: selectedMaterial.id === 'vinyl' ? '350 г/м²' : selectedMaterial.id === 'textile' ? '280 г/м²' : '220 г/м²' },
                      { label: 'Макс. ширина', value: selectedMaterial.id === 'canvas' ? '150 см' : '320 см' },
                      { label: 'Уход', value: selectedMaterial.care },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-baseline py-2 border-b border-foreground/8"
                      >
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <span className="text-xs">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {selectedMaterial.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="w-3 h-3" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {selectedMaterial.forHoreca && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="w-3 h-3" />
                        <span>Подходит для HoReCa</span>
                      </div>
                    )}
                  </div>

                  <Link 
                    to="/buyers"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Подробнее о материалах
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Right - Texture preview */}
                <div className="aspect-[4/3] bg-muted/30 border border-foreground/8 overflow-hidden relative">
                  <img 
                    src={mainImage}
                    alt="Текстура материала"
                    className="w-full h-full object-cover scale-[2] origin-center"
                    style={{ filter: 'saturate(0.4) contrast(0.95)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm font-medium">{selectedMaterial.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedMaterial.texture || 'Превью текстуры на изображении принта'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Companion Wallpapers Section */}
      {companionWallpapers.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Обои-компаньоны
                </p>
                <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-4">
                  Фоновые обои к этому принту
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Подобрали обои в тон для оформления соседних стен. Идеально сочетаются с выбранным муралом.
                </p>
                <Link 
                  to="/catalog?type=companion"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] group"
                >
                  Все фоновые обои
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Companion Wallpapers - Horizontal Scroll */}
              <div className="lg:col-span-8 relative overflow-hidden">
                <div 
                  className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {companionWallpapers.slice(0, 5).map((wallpaper, i) => (
                    <motion.div
                      key={wallpaper.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="group border border-foreground/10 hover:border-foreground/30 transition-colors flex-shrink-0"
                      style={{ width: '260px', scrollSnapAlign: 'start' }}
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                        <img
                          src={getImageSrc(wallpaper.images[0])}
                          alt={wallpaper.name}
                          className="w-full h-full object-cover"
                          style={{ filter: 'saturate(0.7)' }}
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
                          {wallpaper.collection}
                        </p>
                        <h3 className="text-sm font-medium mb-1">{wallpaper.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">{wallpaper.shortDescription}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex gap-1">
                            {wallpaper.colors.slice(0, 2).map((color, j) => (
                              <span key={j} className="text-[10px] text-muted-foreground">
                                {color}{j < Math.min(wallpaper.colors.length, 2) - 1 ? ',' : ''}
                              </span>
                            ))}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {new Intl.NumberFormat('ru-RU').format(wallpaper.pricePerSqm)} ₽/м²
                          </span>
                        </div>
                        <a
                          href={`/artwork/${wallpaper.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 flex items-center justify-center gap-2 w-full py-2 border border-foreground/15 text-[10px] uppercase tracking-[0.1em] hover:border-foreground hover:bg-foreground hover:text-background transition-colors"
                        >
                          <ArrowRight className="w-3 h-3" />
                          Смотреть
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {/* Scroll hint gradient */}
                <div className="absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Section - Presentation style */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Сервис
            </p>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide">
              Начать работу над проектом
            </h2>
          </motion.div>

          {/* Service Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: '🎨',
                title: 'Визуализация',
                desc: 'Покажем, как принт будет смотреться на вашей стене',
              },
              {
                icon: '📐',
                title: 'Адаптация',
                desc: 'Подстроим пропорции под размеры стены',
              },
              {
                icon: '✉️',
                title: 'Образцы',
                desc: 'Пришлём образцы материалов бесплатно',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 border border-foreground/10"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="text-sm font-medium mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Additional Services - 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Помощь с подбором',
                desc: 'Подберём изображение под ваш интерьер',
                image: mural2,
              },
              {
                title: 'Фоновые обои',
                desc: 'Подберём обои-компаньоны для соседних стен',
                image: mural6,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[16/9] overflow-hidden"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <h3 className="text-lg mb-1">{item.title}</h3>
                  <p className="text-xs opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link 
              to="/designers" 
              className="inline-block px-8 py-3 bg-foreground text-background text-xs uppercase tracking-[0.15em] hover:bg-foreground/90 transition-colors"
            >
              Связаться с нами
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container-wide">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  Из этой коллекции
                </p>
                <h2 className="text-xl md:text-2xl font-light tracking-wide">
                  {product.collection}
                </h2>
              </div>
              <Link 
                to={`/collection/${product.collectionId}`}
                className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] hover:gap-3 transition-all"
              >
                Вся коллекция <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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

            <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
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
                      className={`w-14 h-10 overflow-hidden border-2 transition-colors ${
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
