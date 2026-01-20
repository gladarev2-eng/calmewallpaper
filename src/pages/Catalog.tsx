import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CatalogFilters, MobileFilters } from '@/components/catalog/CatalogFilters';

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

  const filterProps = {
    selectedTypes,
    selectedCollections,
    selectedColors,
    selectedPatterns,
    selectedRooms,
    searchQuery,
    sortBy,
    onTypesChange: setSelectedTypes,
    onCollectionsChange: setSelectedCollections,
    onColorsChange: setSelectedColors,
    onPatternsChange: setSelectedPatterns,
    onRoomsChange: setSelectedRooms,
    onSearchChange: setSearchQuery,
    onSortChange: setSortBy,
    onClearAll: clearAllFilters,
    totalCount: filteredProducts.length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <CatalogFilters {...filterProps} />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="container-wide pt-12 pb-8">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Галерея работ
          </p>
          <div className="flex items-end justify-between">
            <h1 className="text-3xl uppercase tracking-[0.1em] font-light">
              Каталог принтов
            </h1>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} объектов
            </p>
          </div>
        </div>
        <div className="container-wide pb-6 border-b border-foreground/10">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              >
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} large />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-32"
              >
                <p className="text-sm text-muted-foreground mb-6">
                  По вашему запросу ничего не найдено
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Сбросить фильтры
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showMobileFilters && (
          <MobileFilters
            {...filterProps}
            isOpen={showMobileFilters}
            onClose={() => setShowMobileFilters(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
