import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Product, collections, patternTypes } from '@/data/products';
import { useFavorites } from '@/context/FavoritesContext';
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
  showPrice?: boolean;
}

const getSubline = (product: Product): string => {
  const pattern = patternTypes.find(p => p.id === product.patternType);
  if (pattern) return pattern.label.toLowerCase();
  return product.collection.toLowerCase();
};

const formatPrice = (price: number) => new Intl.NumberFormat('ru-RU').format(price);

export const ProductCard = ({ product, index = 0, showPrice = true }: ProductCardProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const isInFavorites = isFavorite(product.id);

  const getImageSrc = (imagePath: string) => imageMap[imagePath] || imagePath;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.04 }}
    >
      <Link to={`/artwork/${product.slug}`} className="group block">
        {/* Image — dominant element */}
        <div className="overflow-hidden bg-muted relative aspect-[4/5]">
          <img
            src={getImageSrc(product.images[imageIndex] || product.images[0])}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04] animate-image-load"
          />

          {/* Favorite */}
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 transition-all duration-700 ${
              isInFavorites ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
            }`}
          >
            <Heart className={`w-4 h-4 transition-colors ${isInFavorites ? 'fill-white stroke-white' : 'stroke-white/90'}`} />
          </button>

          {/* Image slideshow indicator */}
          {product.images.length > 1 && (
            <div
              className="absolute inset-x-0 bottom-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const segmentWidth = rect.width / product.images.length;
                const newIndex = Math.floor(x / segmentWidth);
                setImageIndex(Math.min(newIndex, product.images.length - 1));
              }}
              onMouseLeave={() => setImageIndex(0)}
            >
              <div className="absolute bottom-3 left-4 right-4 flex gap-1">
                {product.images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-[1px] flex-1 transition-colors duration-700 ${
                      i === imageIndex ? 'bg-white/80' : 'bg-white/25'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info — name, subline, price */}
        <div className="pt-4 pb-2">
          <h3 className="text-[15px] font-light tracking-[0.01em] leading-snug text-foreground font-display">
            {product.name}
          </h3>
          <div className="flex items-baseline justify-between mt-1.5">
            <p className="text-[11px] text-foreground/40 font-extralight tracking-[0.02em]">
              {getSubline(product)}
            </p>
            {showPrice && (
              <p className="text-[13px] text-foreground/50 font-light">
                от {formatPrice(product.pricePerSqm)} ₽/м²
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
