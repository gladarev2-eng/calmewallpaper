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
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedWidths, setSelectedWidths] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
      if (selectedCollections.length > 0 && !selectedCollections.includes(product.collectionId)) return false;
      if (selectedColors.length > 0 && !product.colors.some(c => selectedColors.includes(c))) return false;
      if (selectedPatterns.length > 0 && !selectedPatterns.includes(product.patternType)) return false;
      if (selectedRooms.length > 0 && !product.roomTypes.some(r => selectedRooms.includes(r))) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return product.name.toLowerCase().includes(query) || product.collection.toLowerCase().includes(query) || product.tags.some(t => t.toLowerCase().includes(query));
      }
      return true;
    });

    switch (sortBy) {
      case 'newest': result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'price-asc': result = result.sort((a, b) => a.pricePerSqm - b.pricePerSqm); break;
      case 'price-desc': result = result.sort((a, b) => b.pricePerSqm - a.pricePerSqm); break;
      default: result = result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0)); break;
    }
    return result;
  }, [selectedTypes, selectedCollections, selectedColors, selectedPatterns, selectedRooms, searchQuery, sortBy]);

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedCollections([]);
    setSelectedColors([]);
    setSelectedPatterns([]);
    setSelectedRooms([]);
    setSelectedSizes([]);
    setSelectedWidths([]);
    setSearchQuery('');
  };

  const filterProps = {
    selectedTypes, selectedCollections, selectedColors, selectedPatterns, selectedRooms,
    selectedSizes, selectedWidths, searchQuery, sortBy,
    onTypesChange: setSelectedTypes, onCollectionsChange: setSelectedCollections,
    onColorsChange: setSelectedColors, onPatternsChange: setSelectedPatterns,
    onRoomsChange: setSelectedRooms, onSizesChange: setSelectedSizes,
    onWidthsChange: setSelectedWidths, onSearchChange: setSearchQuery,
    onSortChange: setSortBy, onClearAll: clearAllFilters, totalCount: filteredProducts.length,
  };

  const currentType = selectedTypes[0] || 'all';
  const typeLabels: Record<string, string> = { all: 'Все', mural: 'Муралы', panel: 'Панно', companion: 'Фоновые обои' };

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 lg:pt-24">
      {/* Desktop Header + Filters */}
      <div className="hidden lg:block">
        <div className="container-wide section-sm pb-0">
          <h1 className="text-display mb-4">Каталог</h1>
          <p className="text-body-lg max-w-xl">Архитектурная композиция для вашего пространства — муралы, панно и фоновые текстуры</p>
        </div>
        <CatalogFilters {...filterProps} />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden">
        <div className="container-wide pt-16 pb-6">
          <div className="flex items-center gap-5">
            {['all', 'mural', 'panel', 'companion'].map(type => (
              <button
                key={type}
                onClick={() => { setSelectedTypes(type === 'all' ? [] : [type]); setSelectedSizes([]); setSelectedWidths([]); }}
                className={`text-[11px] uppercase tracking-[0.14em] font-light pb-1 transition-all duration-500 ${
                  currentType === type ? 'text-foreground border-b border-foreground/30' : 'text-foreground/40'
                }`}
              >
                {typeLabels[type]}
              </button>
            ))}
          </div>
        </div>
        <div className="container-wide pb-6">
          <div className="flex items-center justify-between">
            <button onClick={() => setShowMobileFilters(true)} className="flex items-center gap-2 text-[11px] font-light text-foreground/50">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Фильтры
            </button>
            <p className="text-[11px] font-light text-foreground/40">
              {filteredProducts.length} работ
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid — editorial mixed layout */}
      <section className="pb-24 lg:pb-32">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
              >
                {filteredProducts.map((product, i) => {
                  // Every 7th item spans 2 columns for editorial rhythm
                  const isWide = i % 7 === 0 && i > 0;
                  return (
                    <div
                      key={product.id}
                      className={isWide ? 'col-span-2 lg:col-span-2' : ''}
                    >
                      <ProductCard product={product} index={i} />
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-40"
              >
                <p className="text-body-lg mb-8">
                  По вашему запросу ничего не найдено
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-[12px] font-light text-foreground/50 hover:text-foreground/70 transition-colors duration-500 underline underline-offset-4 decoration-foreground/15"
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
          <MobileFilters {...filterProps} isOpen={showMobileFilters} onClose={() => setShowMobileFilters(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Catalog;
