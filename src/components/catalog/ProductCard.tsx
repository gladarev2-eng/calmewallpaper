import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link 
        to={`/artwork/${product.slug}`}
        className="group block"
      >
        {/* Image */}
        <div className="aspect-artwork overflow-hidden bg-muted mb-4 relative">
          <img
            src={product.images[imageIndex] || product.images[0]}
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
              className="absolute inset-x-0 bottom-0 h-16 opacity-0 group-hover:opacity-100 transition-opacity"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const segmentWidth = rect.width / product.images.length;
                const newIndex = Math.floor(x / segmentWidth);
                setImageIndex(Math.min(newIndex, product.images.length - 1));
              }}
              onMouseLeave={() => setImageIndex(0)}
            >
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {product.images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
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
          <h3 className="font-display text-xl tracking-wide">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>
          <p className="text-sm">
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
