import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';

interface ColorVariantSelectorProps {
  currentProduct: Product;
  variants: Product[];
}

export const ColorVariantSelector = ({ currentProduct, variants }: ColorVariantSelectorProps) => {
  const navigate = useNavigate();

  if (variants.length <= 1) return null;

  const getDominantColor = (product: Product) => {
    return product.colorVariantHex || product.colors[0] || '#888888';
  };

  return (
    <div className="space-y-2">
      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        Цветовое решение
      </span>
      <div className="flex items-center gap-3">
        {variants.map((variant) => {
          const isActive = variant.id === currentProduct.id;
          const colorHex = getDominantColor(variant);

          return (
            <button
              key={variant.id}
              onClick={() => !isActive && navigate(`/artwork/${variant.slug}`)}
              className="relative flex items-center justify-center"
              title={variant.colorVariantName || variant.name}
            >
              <div
                className={`w-7 h-7 rounded-full transition-all ${
                  isActive ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: colorHex }}
              />
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        {currentProduct.colorVariantName || currentProduct.colors.join(', ')}
      </p>
    </div>
  );
};
