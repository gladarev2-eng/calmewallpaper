import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';

const Catalog = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) {
        return false;
      }

      // Collection filter
      if (selectedCollections.length > 0 && !selectedCollections.includes(product.collectionId)) {
        return false;
      }

      // Color filter
      if (selectedColors.length > 0 && !product.colors.some(c => selectedColors.includes(c))) {
        return false;
      }

      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.collection.toLowerCase().includes(query) ||
          product.tags.some(t => t.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [selectedTypes, selectedCollections, selectedColors, searchQuery]);

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCollections([]);
    setSelectedColors([]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-sm bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display mb-4">Каталог</h1>
            <p className="text-body-lg">
              Муралы, панно и фоновые обои для любых интерьеров
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog */}
      <section className="section">
        <div className="container-full">
          <div className="flex gap-12">
            {/* Desktop Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-28">
                <CatalogFilters
                  selectedTypes={selectedTypes}
                  selectedCollections={selectedCollections}
                  selectedColors={selectedColors}
                  searchQuery={searchQuery}
                  onTypesChange={setSelectedTypes}
                  onCollectionsChange={setSelectedCollections}
                  onColorsChange={setSelectedColors}
                  onSearchChange={setSearchQuery}
                  onClearAll={clearAllFilters}
                />
              </div>
            </aside>

            {/* Products */}
            <div className="flex-1">
              {/* Mobile filter button */}
              <div className="lg:hidden mb-6 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
                </p>
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="flex items-center gap-2 text-sm border border-border px-4 py-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Фильтры
                </button>
              </div>

              {/* Products count - desktop */}
              <div className="hidden lg:block mb-8">
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
                </p>
              </div>

              {/* Product grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid-catalog">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">
                    По вашему запросу ничего не найдено
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="text-sm underline hover:no-underline"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-background p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-xl">Фильтры</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-muted rounded-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <CatalogFilters
              selectedTypes={selectedTypes}
              selectedCollections={selectedCollections}
              selectedColors={selectedColors}
              searchQuery={searchQuery}
              onTypesChange={setSelectedTypes}
              onCollectionsChange={setSelectedCollections}
              onColorsChange={setSelectedColors}
              onSearchChange={setSearchQuery}
              onClearAll={clearAllFilters}
            />

            <div className="mt-8">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="btn-primary w-full"
              >
                Показать {filteredProducts.length} товаров
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Catalog;
