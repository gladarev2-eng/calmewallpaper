import { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MapPin, ChevronDown, RotateCcw } from 'lucide-react';
import { 
  inspirationItems, 
  inspirationRoomTypes,
  moodTypes,
  type MoodType, 
  type InspirationRoomType,
  type InspirationItem
} from '@/data/inspiration';
import { colorOptions } from '@/data/products';

const ITEMS_PER_PAGE = 12;

const colorFilterOptions = colorOptions.map(c => ({ id: c.name, label: c.name, hex: c.hex }));

interface DropdownProps {
  label: string;
  options: { id: string; label: string; hex?: string }[];
  selectedValues: string[];
  onChange: (v: string[]) => void;
  isColor?: boolean;
}

const FilterDropdown = ({ label, options, selectedValues, onChange, isColor }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayValue = selectedValues.length > 0
    ? selectedValues.length === 1
      ? options.find(o => o.id === selectedValues[0])?.label || 'Выбрано'
      : `Выбрано: ${selectedValues.length}`
    : 'Все';

  const toggle = (id: string) => {
    onChange(
      selectedValues.includes(id)
        ? selectedValues.filter(v => v !== id)
        : [...selectedValues, id]
    );
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[12px] font-light hover:text-foreground transition-colors duration-500"
      >
        <span className="text-foreground/50">{label}:</span>
        <span className="text-foreground/80">{displayValue}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-foreground/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-3 bg-background border border-foreground/10 z-50 min-w-[200px] max-h-[320px] overflow-y-auto"
          >
            {isColor ? (
              <div className="p-4">
                <div className="flex flex-wrap gap-2.5">
                    {options.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => toggle(opt.id)}
                        className="relative w-8 h-8 flex items-center justify-center"
                        title={opt.label}
                      >
                        <span
                          className={`w-5 h-5 rounded-full transition-all duration-500 ${
                            !selectedValues.includes(opt.id) ? 'border border-foreground/15 hover:scale-110' : ''
                          }`}
                          style={{ 
                            backgroundColor: opt.hex,
                            boxShadow: selectedValues.includes(opt.id) 
                              ? `0 0 0 2px hsl(var(--background)), 0 0 0 3.5px hsl(var(--foreground) / 0.7)` 
                              : 'none'
                          }}
                        />
                      </button>
                    ))}
                </div>
                {selectedValues.length > 0 && (
                  <button
                    onClick={() => onChange([])}
                    className="mt-3 text-[11px] text-foreground/40 hover:text-foreground/60 transition-colors duration-500"
                  >
                    Сбросить
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => { onChange([]); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-[12px] font-light transition-colors duration-500 ${selectedValues.length === 0 ? 'bg-foreground/5 text-foreground/70' : 'text-foreground/50 hover:bg-foreground/5'}`}
                >
                  Все
                </button>
                {options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => toggle(opt.id)}
                    className={`w-full text-left px-4 py-2.5 text-[12px] font-light transition-colors duration-500 flex items-center justify-between ${selectedValues.includes(opt.id) ? 'bg-foreground/5 text-foreground/70' : 'text-foreground/50 hover:bg-foreground/5'}`}
                  >
                    {opt.label}
                    {selectedValues.includes(opt.id) && <X className="w-3 h-3 text-foreground/30" />}
                  </button>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Inspiration = () => {
  const [searchParams] = useSearchParams();
  const initialRoom = searchParams.get('room');
  
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<InspirationRoomType[]>(
    initialRoom ? [initialRoom as InspirationRoomType] : []
  );
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        setIsSticky(filterRef.current.getBoundingClientRect().top <= 96);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = useMemo(() => {
    return inspirationItems.filter(item => {
      if (selectedRooms.length > 0 && !selectedRooms.includes(item.room)) return false;
      return true;
    });
  }, [selectedRooms, selectedColors]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;
  const hasActiveFilters = selectedRooms.length > 0 || selectedColors.length > 0;

  const clearAll = () => {
    setSelectedRooms([]);
    setSelectedColors([]);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const getRoomLabel = (id: InspirationRoomType) =>
    inspirationRoomTypes.find(r => r.id === id)?.label || id;

  const getMoodLabels = (moods: MoodType[]) =>
    moods.map(m => moodTypes.find(mt => mt.id === m)?.label || m);

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 lg:pt-24">
      {/* Header */}
      <div className="container-wide section-sm">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-caption mb-4">Вдохновение</p>
          <h1 className="text-display mb-4">Муралы в интерьере</h1>
          <p className="text-body-lg max-w-xl">
            Погрузитесь в мир архитектурных композиций. Каждый интерьер — отдельная визуальная история.
          </p>
        </motion.div>
      </div>

      {/* Sticky filter bar */}
      <div ref={filterRef} />
      <div className={`sticky top-24 z-40 transition-all duration-300 ${
        isSticky ? 'bg-background/95 backdrop-blur-md border-b border-foreground/5' : 'bg-background'
      }`}>
        <div className="container-wide">
          <div className={`transition-all duration-300 ${isSticky ? 'py-4' : 'pt-2 pb-6'}`}>
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
              <FilterDropdown
                label="Помещение"
                options={inspirationRoomTypes.map(r => ({ id: r.id, label: r.label }))}
                selectedValues={selectedRooms}
                onChange={(v) => setSelectedRooms(v as InspirationRoomType[])}
              />
              <FilterDropdown
                label="Цвет"
                options={colorFilterOptions}
                selectedValues={selectedColors}
                onChange={setSelectedColors}
                isColor
              />

              {hasActiveFilters && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 text-[12px] font-light text-foreground/50 hover:text-foreground/80 transition-colors duration-500"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Сбросить
                </button>
              )}

              <p className="ml-auto text-[12px] font-light text-foreground/40">
                {filteredItems.length} {filteredItems.length === 1 ? 'интерьер' : filteredItems.length < 5 ? 'интерьера' : 'интерьеров'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dense Masonry Grid — full-width, 4 columns */}
      <section className="pb-20 lg:pb-32">
        <div style={{ width: '100%', maxWidth: 'none', padding: '0 2vw' }}>
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ columnCount: 4, columnGap: '24px' }}
                className="[column-count:1] md:[column-count:3] lg:[column-count:4]"
              >
                {visibleItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, delay: (i % 3) * 0.05 }}
                    style={{ breakInside: 'avoid', marginBottom: '24px' }}
                    className="w-full block"
                  >
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="group block relative w-full overflow-hidden focus:outline-none"
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={item.image}
                          alt={`${item.productName} в интерьере`}
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-white/60 mb-1.5 font-light">
                            {getRoomLabel(item.room)}
                          </p>
                          <h3 className="text-white font-display font-light text-base md:text-lg">
                            {item.productName}
                          </h3>
                        </div>
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
                className="text-center py-32"
              >
                <p className="text-body-lg mb-6">
                  По выбранным фильтрам ничего не найдено
                </p>
                <button onClick={clearAll} className="text-[12px] font-light text-foreground/50 hover:text-foreground/70 transition-colors duration-500 underline underline-offset-4">
                  Сбросить фильтры
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {hasMore && (
            <div className="text-center mt-20">
              <button onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)} className="btn-outline">
                Смотреть ещё
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <div className="absolute inset-0 bg-black/90" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 flex flex-col lg:flex-row gap-6 max-w-6xl w-full max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex-1 min-h-0 overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.productName}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="lg:w-80 flex flex-col justify-end p-6 lg:py-8">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-white/50 hover:text-white/90 transition-colors"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2 font-light">
                    {getRoomLabel(selectedItem.room)}
                  </p>
                  <h3 className="text-white font-display font-light text-2xl mb-3">
                    {selectedItem.productName}
                  </h3>
                  {'description' in selectedItem && selectedItem.description && (
                    <p className="text-white/50 text-[13px] font-light leading-relaxed mb-4">
                      {String(selectedItem.description)}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {getMoodLabels(selectedItem.mood).map(mood => (
                      <span key={mood} className="text-[10px] uppercase tracking-[0.1em] text-white/30 border border-white/10 px-2.5 py-1">
                        {mood}
                      </span>
                    ))}
                  </div>

                  {selectedItem.productId && (
                    <Link
                      to={`/artwork/${selectedItem.productId}`}
                      onClick={() => setSelectedItem(null)}
                      className="inline-flex items-center gap-2 text-[12px] font-light text-white/60 hover:text-white transition-colors duration-500"
                    >
                      Смотреть в каталоге <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inspiration;
