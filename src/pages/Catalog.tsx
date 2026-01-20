import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, PatternType, RoomType } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';

const Catalog = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
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

      // Pattern filter
      if (selectedPatterns.length > 0 && !selectedPatterns.includes(product.patternType)) {
        return false;
      }

      // Room filter
      if (selectedRooms.length > 0 && !product.roomTypes.some(r => selectedRooms.includes(r))) {
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

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result = result.sort((a, b) => a.pricePerSqm - b.pricePerSqm);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.pricePerSqm - a.pricePerSqm);
        break;
      case 'popularity':
      default:
        result = result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
    }

    return result;
  }, [selectedTypes, selectedCollections, selectedColors, selectedPatterns, selectedRooms, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedPatterns([]);
    setSelectedRooms([]);
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

      {/* Filters - Desktop */}
      <div className="hidden lg:block sticky top-20 z-30">
        <CatalogFilters
          selectedTypes={selectedTypes}
          selectedCollections={selectedCollections}
          selectedColors={selectedColors}
          selectedPatterns={selectedPatterns}
          selectedRooms={selectedRooms}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onTypesChange={setSelectedTypes}
          onCollectionsChange={setSelectedCollections}
          onColorsChange={setSelectedColors}
          onPatternsChange={setSelectedPatterns}
          onRoomsChange={setSelectedRooms}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onClearAll={clearAllFilters}
        />
      </div>

      {/* Mobile filter button */}
      <div className="lg:hidden sticky top-20 z-30 bg-background border-b border-border py-4">
        <div className="container-wide flex justify-between items-center">
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
      </div>

      {/* Catalog */}
      <section className="section">
        <div className="container-wide">
          {/* Products count - desktop */}
          <div className="hidden lg:block mb-8">
            <p className="text-sm text-muted-foreground">
              Найдено {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
            </p>
          </div>

          {/* Product grid - larger cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} large />
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
            
            {/* Mobile filters content would go here */}
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Используйте десктопную версию для расширенных фильтров
              </p>
            </div>

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