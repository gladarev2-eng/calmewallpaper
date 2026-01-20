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
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link 
        to={`/artwork/${product.slug}`}
        className="group block"
      >
        {/* Image */}
        <div className={`overflow-hidden bg-muted mb-4 relative ${large ? 'aspect-[4/5]' : 'aspect-artwork'}`}>
          <img
            src={getImageSrc(product.images[imageIndex] || product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs uppercase tracking-wide">
                Новинка
              </span>
            )}
            {product.isBestseller && (
              <span className="px-3 py-1 bg-foreground text-background text-xs uppercase tracking-wide">
                Бестселлер
              </span>
            )}
          </div>

          {/* Image dots for hover slideshow */}
          {product.images.length > 1 && (
            <div 
              className="absolute inset-x-0 bottom-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
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
                    className={`h-0.5 flex-1 transition-colors ${
                      i === imageIndex ? 'bg-foreground' : 'bg-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-2">
          <p className="text-caption">{product.collection}</p>
          <h3 className={`font-display tracking-wide ${large ? 'text-2xl' : 'text-xl'}`}>{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
          <p className="text-sm font-medium">
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