import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ArrowRight, MapPin } from 'lucide-react';
import { InspirationFilters } from './InspirationFilters';
import { 
  inspirationItems, 
  inspirationRoomTypes,
  moodTypes,
  type MoodType, 
  type InspirationRoomType,
  type InspirationItem
} from '@/data/inspiration';

const ITEMS_PER_PAGE = 12;

export const InspirationGallery = () => {
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<InspirationRoomType[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);

  const filteredItems = useMemo(() => {
    return inspirationItems.filter(item => {
      if (selectedMoods.length > 0 && !item.mood.some(m => selectedMoods.includes(m))) {
        return false;
      }
      if (selectedRooms.length > 0 && !selectedRooms.includes(item.room)) {
        return false;
      }
      return true;
    });
  }, [selectedMoods, selectedRooms]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const clearAllFilters = () => {
    setSelectedMoods([]);
    setSelectedRooms([]);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  const getRoomLabel = (roomId: InspirationRoomType) => {
    return inspirationRoomTypes.find(r => r.id === roomId)?.label || roomId;
  };

  const getMoodLabels = (moods: MoodType[]) => {
    return moods.map(m => moodTypes.find(mt => mt.id === m)?.label || m);
  };

  return (
    <div>
      {/* Filters */}
      <InspirationFilters
        selectedMoods={selectedMoods}
        selectedRooms={selectedRooms}
        onMoodsChange={setSelectedMoods}
        onRoomsChange={setSelectedRooms}
        onClearAll={clearAllFilters}
        totalCount={filteredItems.length}
      />

      {/* Pinterest-style Masonry Grid */}
      <section className="section">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
              >
                {visibleItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="break-inside-avoid mb-4"
                  >
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="group block relative w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    >
                      <img
                        src={item.image}
                        alt={`${item.productName} в интерьере`}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 mb-1">
                            {getRoomLabel(item.room)}
                          </p>
                          <h3 className="text-white font-light text-sm">
                            {item.productName}
                          </h3>
                        </div>
                      </div>

                      {/* Quick view indicator */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <ArrowRight className="w-4 h-4 text-foreground" />
                      </div>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="text-muted-foreground mb-6">
                  По выбранным фильтрам ничего не найдено
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

          {/* Load More */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <button
                onClick={loadMore}
                className="btn-outline"
              >
                Показать ещё
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 flex flex-col lg:flex-row gap-6 max-w-6xl w-full max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Image */}
              <div className="flex-1 min-h-0 overflow-hidden rounded-lg">
                <img
                  src={selectedItem.image}
                  alt={`${selectedItem.productName} в интерьере`}
                  className="w-full h-full object-contain max-h-[70vh] lg:max-h-[85vh]"
                />
              </div>

              {/* Info Panel */}
              <div className="lg:w-80 flex-shrink-0 bg-card rounded-lg p-6 flex flex-col">
                {/* Close button - mobile */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="lg:hidden absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Room & Location */}
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
                  <span>{getRoomLabel(selectedItem.room)}</span>
                  {selectedItem.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {selectedItem.location}
                      </span>
                    </>
                  )}
                </div>

                {/* Product Name */}
                <h2 className="text-xl font-light mb-4">{selectedItem.productName}</h2>

                {/* Moods */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {getMoodLabels(selectedItem.mood).map(mood => (
                    <span
                      key={mood}
                      className="px-2 py-1 text-[10px] uppercase tracking-[0.1em] border border-foreground/20 text-muted-foreground"
                    >
                      {mood}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-foreground/10 my-4" />

                {/* CTA */}
                <p className="text-sm text-muted-foreground mb-4">
                  Понравился этот принт? Посмотрите его детально в каталоге
                </p>

                <Link
                  to={`/artwork/${selectedItem.productId}`}
                  className="btn-primary flex items-center justify-center gap-2"
                  onClick={() => setSelectedItem(null)}
                >
                  Смотреть принт
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {/* Close button - desktop */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="hidden lg:flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                  Закрыть
                </button>
              </div>
            </motion.div>

            {/* Close button - floating for mobile */}
            <button
              onClick={() => setSelectedItem(null)}
              className="lg:hidden fixed top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
