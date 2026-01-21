import { Link, useNavigate } from 'react-router-dom';
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

interface ColorVariantSelectorProps {
  currentProduct: Product;
  variants: Product[];
}

export const ColorVariantSelector = ({ currentProduct, variants }: ColorVariantSelectorProps) => {
  const navigate = useNavigate();

  if (variants.length <= 1) return null;

  const getImageSrc = (imagePath: string) => {
    return imageMap[imagePath] || imagePath;
  };

  // Get dominant color for the product
  const getDominantColor = (product: Product) => {
    return product.colorVariantHex || product.colors[0] || '#888888';
  };

  return (
    <div className="space-y-2">
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        Цветовое решение
      </span>
      <div className="flex gap-2">
        {variants.map((variant) => {
          const isActive = variant.id === currentProduct.id;
          const colorHex = getDominantColor(variant);
          
          return (
            <button
              key={variant.id}
              onClick={() => !isActive && navigate(`/artwork/${variant.slug}`)}
              className={`group relative w-14 h-14 overflow-hidden border-2 transition-all ${
                isActive 
                  ? 'border-foreground' 
                  : 'border-transparent hover:border-foreground/40'
              }`}
              title={variant.colorVariantName || variant.name}
            >
              {/* Color preview with image overlay */}
              <div className="absolute inset-0">
                <img
                  src={getImageSrc(variant.images[0])}
                  alt={variant.colorVariantName || variant.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  style={{ 
                    filter: 'saturate(0.9) contrast(0.95)',
                  }}
                />
              </div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-1 right-1 w-2 h-2 bg-foreground rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Current variant name */}
      <p className="text-xs text-muted-foreground">
        {currentProduct.colorVariantName || currentProduct.colors.join(', ')}
      </p>
    </div>
  );
};
