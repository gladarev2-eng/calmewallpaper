import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductCard } from '@/components/catalog/ProductCard';

const Favorites = () => {
  const { getFavoriteProducts, totalFavorites } = useFavorites();
  const products = getFavoriteProducts();

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 lg:pt-24">
      {/* Header */}
      <section className="section-sm">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-caption mb-6">Избранное</p>
            <h1 className="text-display mb-4">Избранное</h1>
            <p className="text-body-lg">
              {totalFavorites > 0 
                ? `${totalFavorites} ${totalFavorites === 1 ? 'товар' : totalFavorites < 5 ? 'товара' : 'товаров'} в избранном`
                : 'Ваш список избранного пуст'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-wide">
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
              <div className="w-16 h-16 mx-auto mb-8 border border-foreground/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-foreground/30" />
              </div>
              <h2 className="text-h3 mb-4">Список пуст</h2>
              <p className="text-body-lg mb-8 max-w-md mx-auto">
                Добавляйте понравившиеся муралы и панно в избранное, нажимая на иконку сердца
              </p>
              <Link
                to="/catalog"
                className="link-arrow"
              >
                Перейти в каталог
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
