import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, RotateCcw } from 'lucide-react';
import { collections, patternTypes, roomTypes, colorOptions } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

interface CatalogFiltersProps {
  selectedTypes: string[];
  selectedCollections: string[];
  selectedColors: string[];
  selectedPatterns: string[];
  selectedRooms: string[];
  searchQuery: string;
  sortBy: string;
  onTypesChange: (types: string[]) => void;
  onCollectionsChange: (collections: string[]) => void;
  onColorsChange: (colors: string[]) => void;
  onPatternsChange: (patterns: string[]) => void;
  onRoomsChange: (rooms: string[]) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  onClearAll: () => void;
  totalCount: number;
}

const productTypes = [
  { id: 'all', label: 'Все типы' },
  { id: 'mural', label: 'Панорамы' },
  { id: 'panel', label: 'Абстракции' },
  { id: 'companion', label: 'Фоновые' },
];

const sortOptions = [
  { id: 'popularity', label: 'Популярные' },
  { id: 'newest', label: 'Новинки' },
  { id: 'price-asc', label: 'Цена ↑' },
  { id: 'price-desc', label: 'Цена ↓' },
];

// Underline-style dropdown like reference
interface UnderlineDropdownProps {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (value: string) => void;
  multiSelect?: boolean;
  selectedValues?: string[];
  onMultiChange?: (values: string[]) => void;
}

const UnderlineDropdown = ({ 
  label, 
  value, 
  options, 
  onChange,
  multiSelect = false,
  selectedValues = [],
  onMultiChange
}: UnderlineDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayValue = multiSelect 
    ? (selectedValues.length > 0 
        ? options.filter(o => selectedValues.includes(o.id)).map(o => o.label).join(', ')
        : options[0]?.label || 'Все')
    : options.find(o => o.id === value)?.label || options[0]?.label;

  const toggleMulti = (id: string) => {
    if (!onMultiChange) return;
    if (id === 'all') {
      onMultiChange([]);
    } else if (selectedValues.includes(id)) {
      onMultiChange(selectedValues.filter(v => v !== id));
    } else {
      onMultiChange([...selectedValues, id]);
    }
  };

  return (
    <div ref={dropdownRef} className="relative flex-1 min-w-[180px]">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between pb-2 border-b border-foreground/20 hover:border-foreground/40 transition-colors text-left"
      >
        <span className="text-sm truncate pr-4">{displayValue}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border border-border/50 z-50 max-h-[280px] overflow-y-auto"
          >
            {options.map(option => (
              <button
                key={option.id}
                onClick={() => {
                  if (multiSelect) {
                    toggleMulti(option.id);
                  } else {
                    onChange(option.id);
                    setIsOpen(false);
                  }
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                  (multiSelect ? selectedValues.includes(option.id) : value === option.id)
                    ? 'bg-foreground/5'
                    : 'hover:bg-foreground/5'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const CatalogFilters = ({
  selectedTypes,
  selectedCollections,
  selectedColors,
  selectedPatterns,
  selectedRooms,
  searchQuery,
  sortBy,
  onTypesChange,
  onCollectionsChange,
  onColorsChange,
  onPatternsChange,
  onRoomsChange,
  onSearchChange,
  onSortChange,
  onClearAll,
  totalCount,
}: CatalogFiltersProps) => {
  const hasActiveFilters = useMemo(() => {
    return selectedTypes.length > 0 || 
           selectedCollections.length > 0 || 
           selectedColors.length > 0 || 
           selectedPatterns.length > 0 ||
           selectedRooms.length > 0 ||
           searchQuery.length > 0;
  }, [selectedTypes, selectedCollections, selectedColors, selectedPatterns, selectedRooms, searchQuery]);

  return (
    <div className="bg-background">
      <div className="container-wide">
        {/* Header with title and count */}
        <div className="pt-24 pb-16">
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
            Галерея работ
          </p>
          <div className="flex items-end justify-between">
            <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.1em] font-light">
              Каталог принтов
            </h1>
            <p className="text-sm text-muted-foreground">
              {totalCount} объектов
            </p>
          </div>
        </div>
        
        {/* Filters Row */}
        <div className="pb-12 border-b border-foreground/10">
          <div className="flex flex-wrap gap-8 lg:gap-12">
            <UnderlineDropdown
              label="Тип покрытия"
              value={selectedTypes[0] || 'all'}
              options={productTypes}
              onChange={(val) => onTypesChange(val === 'all' ? [] : [val])}
            />
            
            <UnderlineDropdown
              label="Настроение"
              value={selectedPatterns[0] || 'all'}
              options={[
                { id: 'all', label: 'Любое' },
                ...patternTypes
              ]}
              onChange={(val) => onPatternsChange(val === 'all' ? [] : [val])}
            />
            
            <UnderlineDropdown
              label="Помещение"
              value={selectedRooms[0] || 'all'}
              options={[
                { id: 'all', label: 'Все помещения' },
                ...roomTypes
              ]}
              onChange={(val) => onRoomsChange(val === 'all' ? [] : [val])}
            />

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-end pb-2"
              >
                <RotateCcw className="w-4 h-4" />
                Сбросить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Filters Component
interface MobileFiltersProps extends CatalogFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileFilters = ({
  isOpen,
  onClose,
  selectedTypes,
  selectedCollections,
  selectedColors,
  selectedPatterns,
  selectedRooms,
  searchQuery,
  sortBy,
  onTypesChange,
  onCollectionsChange,
  onColorsChange,
  onPatternsChange,
  onRoomsChange,
  onSearchChange,
  onSortChange,
  onClearAll,
  totalCount,
}: MobileFiltersProps) => {
  const toggleFilter = (value: string, selected: string[], onChange: (values: string[]) => void) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 lg:hidden"
    >
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-background overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-background p-6 flex justify-between items-center">
          <h2 className="text-sm uppercase tracking-[0.2em]">Фильтры</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Search */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Поиск</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Название, коллекция..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-transparent border-b border-foreground/20 text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Сортировка</label>
            <div className="space-y-1">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => onSortChange(option.id)}
                  className={`w-full text-left px-3 py-3 text-sm transition-colors ${
                    sortBy === option.id
                      ? 'bg-foreground/5'
                      : 'hover:bg-foreground/5'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Тип покрытия</label>
            <div className="space-y-1">
              {productTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => onTypesChange(type.id === 'all' ? [] : [type.id])}
                  className={`w-full text-left px-3 py-3 text-sm transition-colors ${
                    (type.id === 'all' && selectedTypes.length === 0) || selectedTypes.includes(type.id)
                      ? 'bg-foreground/5'
                      : 'hover:bg-foreground/5'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Настроение</label>
            <div className="space-y-1">
              <button
                onClick={() => onPatternsChange([])}
                className={`w-full text-left px-3 py-3 text-sm transition-colors ${
                  selectedPatterns.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                }`}
              >
                Любое
              </button>
              {patternTypes.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => toggleFilter(pattern.id, selectedPatterns, onPatternsChange)}
                  className={`w-full text-left px-3 py-3 text-sm transition-colors ${
                    selectedPatterns.includes(pattern.id)
                      ? 'bg-foreground/5'
                      : 'hover:bg-foreground/5'
                  }`}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
          </div>

          {/* Room */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Помещение</label>
            <div className="space-y-1">
              <button
                onClick={() => onRoomsChange([])}
                className={`w-full text-left px-3 py-3 text-sm transition-colors ${
                  selectedRooms.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                }`}
              >
                Все помещения
              </button>
              {roomTypes.map(room => (
                <button
                  key={room.id}
                  onClick={() => toggleFilter(room.id, selectedRooms, onRoomsChange)}
                  className={`w-full text-left px-3 py-3 text-sm transition-colors ${
                    selectedRooms.includes(room.id)
                      ? 'bg-foreground/5'
                      : 'hover:bg-foreground/5'
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Цвет</label>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map(color => (
                <button
                  key={color.name}
                  onClick={() => toggleFilter(color.name, selectedColors, onColorsChange)}
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColors.includes(color.name)
                      ? 'ring-2 ring-foreground ring-offset-2 scale-110'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background p-6 border-t border-foreground/10">
          <div className="flex gap-4">
            <button
              onClick={onClearAll}
              className="flex-1 py-3 text-sm uppercase tracking-[0.1em] border border-foreground/20 hover:border-foreground transition-colors"
            >
              Сбросить
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 text-sm uppercase tracking-[0.1em] bg-foreground text-background"
            >
              Показать ({totalCount})
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
