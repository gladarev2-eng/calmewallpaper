import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
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

interface ProductCardProps {
  product: Product;
  index?: number;
  large?: boolean;
}

export const ProductCard = ({ product, index = 0, large = false }: ProductCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const getImageSrc = (imagePath: string) => {
    return imageMap[imagePath] || imagePath;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
    >
      <Link 
        to={`/artwork/${product.slug}`}
        className="group block"
      >
        {/* Image */}
        <div className={`overflow-hidden bg-muted mb-6 relative ${large ? 'aspect-[4/5]' : 'aspect-artwork'}`}>
          <img
            src={getImageSrc(product.images[imageIndex] || product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ filter: 'saturate(0.85) contrast(0.95)' }}
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-[10px] font-extralight uppercase tracking-[0.15em]">
                Новинка
              </span>
            )}
            {product.isBestseller && (
              <span className="px-3 py-1.5 bg-foreground text-background text-[10px] font-extralight uppercase tracking-[0.15em]">
                Бестселлер
              </span>
            )}
          </div>

          {/* Image dots for hover slideshow */}
          {product.images.length > 1 && (
            <div 
              className="absolute inset-x-0 bottom-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const segmentWidth = rect.width / product.images.length;
                const newIndex = Math.floor(x / segmentWidth);
                setImageIndex(Math.min(newIndex, product.images.length - 1));
              }}
              onMouseLeave={() => setImageIndex(0)}
            >
              {/* Progress bar */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-1">
                {product.images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-px flex-1 transition-colors duration-400 ${
                      i === imageIndex ? 'bg-foreground' : 'bg-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-3">
          <p className="text-caption">{product.collection}</p>
          <h3 className={`font-thin uppercase tracking-[0.15em] ${large ? 'text-xl' : 'text-base'}`}>{product.name}</h3>
          <p className="text-xs font-extralight text-muted-foreground line-clamp-2 tracking-wide">
            {product.shortDescription}
          </p>
          <p className="text-xs font-extralight uppercase tracking-[0.1em]">
            {product.type === 'panel' && product.panelSizes ? (
              <>от {formatPrice(product.panelSizes[0].price)} ₽</>
            ) : (
              <>от {formatPrice(product.pricePerSqm)} ₽/м²</>
            )}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};