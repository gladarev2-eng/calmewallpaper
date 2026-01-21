import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InspirationFilters } from './InspirationFilters';
import { 
  inspirationItems, 
  inspirationRoomTypes,
  moodTypes,
  type MoodType, 
  type InspirationRoomType 
} from '@/data/inspiration';

const ITEMS_PER_PAGE = 9;

export const InspirationGallery = () => {
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<InspirationRoomType[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredItems = useMemo(() => {
    return inspirationItems.filter(item => {
      // Mood filter
      if (selectedMoods.length > 0 && !item.mood.some(m => selectedMoods.includes(m))) {
        return false;
      }
      // Room filter
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

  // Get label helpers
  const getRoomLabel = (roomId: InspirationRoomType) => {
    return inspirationRoomTypes.find(r => r.id === roomId)?.label || roomId;
  };

  const getMoodLabels = (moods: MoodType[]) => {
    return moods.map(m => moodTypes.find(mt => mt.id === m)?.label || m).join(', ');
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

      {/* Gallery Grid */}
      <section className="section">
        <div className="container-wide">
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {visibleItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link 
                      to={`/artwork/${item.productId}`}
                      className="group block relative overflow-hidden"
                    >
                      <div className={`overflow-hidden ${
                        item.aspect === 'tall' ? 'aspect-[3/4]' : 
                        item.aspect === 'wide' ? 'aspect-[4/3]' : 
                        'aspect-square'
                      }`}>
                        <img
                          src={item.image}
                          alt={`${item.productName} в интерьере`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">
                                {getRoomLabel(item.room)}
                              </p>
                              <h3 className="text-white font-light text-lg mb-3">
                                {item.productName}
                              </h3>
                              <span className="inline-flex items-center gap-2 text-white text-xs">
                                Смотреть принт
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info below image - visible on mobile */}
                      <div className="mt-3 md:hidden">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                          {getRoomLabel(item.room)}
                        </p>
                        <h3 className="text-sm font-light">
                          {item.productName}
                        </h3>
                      </div>
                    </Link>
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
    </div>
  );
};
