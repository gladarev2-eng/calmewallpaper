import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/components/catalog/ProductCard';

const Favorites = () => {
  const { getFavoriteProducts, totalFavorites } = useFavorites();
  const products = getFavoriteProducts();

  return (
    <div className="min-h-screen bg-background pt-20 sm:pt-24 lg:pt-28 pb-16 lg:pb-24">
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5" />
            <h1 className="text-3xl md:text-4xl font-light tracking-wide">Избранное</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {totalFavorites > 0 
              ? `${totalFavorites} ${totalFavorites === 1 ? 'товар' : totalFavorites < 5 ? 'товара' : 'товаров'} в избранном`
              : 'Ваш список избранного пуст'
            }
          </p>
        </motion.div>

        {/* Content */}
        {products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} large />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-8 border border-foreground/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-light mb-4">Список пуст</h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
              Добавляйте понравившиеся муралы и панно в избранное, нажимая на иконку сердца
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] hover:gap-3 transition-all"
            >
              Перейти в каталог
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
