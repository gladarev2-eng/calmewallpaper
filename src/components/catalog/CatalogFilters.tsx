import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, RotateCcw } from 'lucide-react';
import { collections, patternTypes, roomTypes, colorOptions } from '@/data/products';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

interface CatalogFiltersProps {
  selectedTypes: string[];
  selectedCollections: string[];
  selectedColors: string[];
  selectedPatterns: string[];
  selectedRooms: string[];
  selectedSizes: string[];
  selectedWidths: string[];
  searchQuery: string;
  sortBy: string;
  onTypesChange: (types: string[]) => void;
  onCollectionsChange: (collections: string[]) => void;
  onColorsChange: (colors: string[]) => void;
  onPatternsChange: (patterns: string[]) => void;
  onRoomsChange: (rooms: string[]) => void;
  onSizesChange: (sizes: string[]) => void;
  onWidthsChange: (widths: string[]) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  onClearAll: () => void;
  totalCount: number;
}

// Primary product types (top level tabs)
const productTypes = [
  { id: 'all', label: 'Все' },
  { id: 'mural', label: 'Муралы' },
  { id: 'panel', label: 'Панно' },
  { id: 'companion', label: 'Фоновые обои' },
];

const sortOptions = [
  { id: 'popularity', label: 'Популярные' },
  { id: 'newest', label: 'Новинки' },
  { id: 'price-asc', label: 'Цена ↑' },
  { id: 'price-desc', label: 'Цена ↓' },
];

// Panel sizes for filter
const panelSizes = [
  { id: '60x80', label: '60×80 см' },
  { id: '80x100', label: '80×100 см' },
  { id: '100x120', label: '100×120 см' },
  { id: '120x150', label: '120×150 см' },
];

// Panel shapes
const panelShapes = [
  { id: 'vertical', label: 'Вертикальные' },
  { id: 'horizontal', label: 'Горизонтальные' },
  { id: 'square', label: 'Квадратные' },
];

// Companion widths
const companionWidths = [
  { id: '53', label: '53 см' },
  { id: '70', label: '70 см' },
  { id: '100', label: '100 см' },
  { id: '106', label: '106 см' },
];

// Underline-style dropdown
interface UnderlineDropdownProps {
  label: string;
  options: { id: string; label: string; hex?: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  isColorPicker?: boolean;
}

const UnderlineDropdown = ({ 
  label, 
  options, 
  selectedValues,
  onChange,
  isColorPicker = false,
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

  const displayValue = selectedValues.length > 0 
    ? (selectedValues.length === 1 
        ? options.find(o => o.id === selectedValues[0])?.label || 'Выбрано'
        : `Выбрано: ${selectedValues.length}`)
    : 'Все';

  const toggleValue = (id: string) => {
    if (selectedValues.includes(id)) {
      onChange(selectedValues.filter(v => v !== id));
    } else {
      onChange([...selectedValues, id]);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[12px] font-light hover:text-foreground transition-colors duration-500"
      >
        <span className="text-foreground/40">{label}:</span>
        <span className="text-foreground/70">{displayValue}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-foreground/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-3 bg-background border border-foreground/8 z-50 min-w-[200px] max-h-[320px] overflow-y-auto"
          >
            {isColorPicker ? (
              <div className="p-4">
                <div className="flex flex-wrap gap-2.5">
                  {options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => toggleValue(option.id)}
                      className={`w-7 h-7 rounded-full transition-all border ${
                        selectedValues.includes(option.id)
                          ? 'ring-2 ring-foreground ring-offset-2 scale-110'
                          : 'border-border/30 hover:scale-110'
                      }`}
                      style={{ backgroundColor: option.hex }}
                      title={option.label}
                    />
                  ))}
                </div>
                {selectedValues.length > 0 && (
                  <button
                    onClick={() => onChange([])}
                    className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Сбросить
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    onChange([]);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selectedValues.length === 0
                      ? 'bg-foreground/5'
                      : 'hover:bg-foreground/5'
                  }`}
                >
                  Все
                </button>
                {options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleValue(option.id)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      selectedValues.includes(option.id)
                        ? 'bg-foreground/5'
                        : 'hover:bg-foreground/5'
                    }`}
                  >
                    {option.label}
                    {selectedValues.includes(option.id) && (
                      <X className="w-3 h-3 text-muted-foreground" />
                    )}
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

export const CatalogFilters = ({
  selectedTypes,
  selectedCollections,
  selectedColors,
  selectedPatterns,
  selectedRooms,
  selectedSizes,
  selectedWidths,
  searchQuery,
  sortBy,
  onTypesChange,
  onCollectionsChange,
  onColorsChange,
  onPatternsChange,
  onRoomsChange,
  onSizesChange,
  onWidthsChange,
  onSearchChange,
  onSortChange,
  onClearAll,
  totalCount,
}: CatalogFiltersProps) => {
  const currentType = selectedTypes[0] || 'all';
  const [isSticky, setIsSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Handle sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        const rect = filterRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 96); // 96px = header height (h-24 = 6rem = 96px)
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const hasActiveFilters = useMemo(() => {
    return selectedCollections.length > 0 || 
           selectedColors.length > 0 || 
           selectedPatterns.length > 0 ||
           selectedRooms.length > 0 ||
           selectedSizes.length > 0 ||
           selectedWidths.length > 0 ||
           searchQuery.length > 0;
  }, [selectedCollections, selectedColors, selectedPatterns, selectedRooms, selectedSizes, selectedWidths, searchQuery]);

  // Get contextual filters based on selected type
  const getSecondLevelFilters = () => {
    const colorDropdownOptions = colorOptions.map(c => ({ id: c.name, label: c.name, hex: c.hex }));
    
    switch (currentType) {
      case 'mural':
        return (
          <>
            <UnderlineDropdown
              label="Коллекция"
              options={collections.map(c => ({ id: c.id, label: c.name }))}
              selectedValues={selectedCollections}
              onChange={onCollectionsChange}
            />
            <UnderlineDropdown
              label="Цвет"
              options={colorDropdownOptions}
              selectedValues={selectedColors}
              onChange={onColorsChange}
              isColorPicker
            />
            <UnderlineDropdown
              label="Сюжет"
              options={patternTypes}
              selectedValues={selectedPatterns}
              onChange={onPatternsChange}
            />
            <UnderlineDropdown
              label="Помещение"
              options={roomTypes}
              selectedValues={selectedRooms}
              onChange={onRoomsChange}
            />
          </>
        );
      case 'panel':
        return (
          <>
            <UnderlineDropdown
              label="Коллекция"
              options={collections.map(c => ({ id: c.id, label: c.name }))}
              selectedValues={selectedCollections}
              onChange={onCollectionsChange}
            />
            <UnderlineDropdown
              label="Цвет"
              options={colorDropdownOptions}
              selectedValues={selectedColors}
              onChange={onColorsChange}
              isColorPicker
            />
            <UnderlineDropdown
              label="Сюжет"
              options={patternTypes}
              selectedValues={selectedPatterns}
              onChange={onPatternsChange}
            />
            <UnderlineDropdown
              label="Помещение"
              options={roomTypes}
              selectedValues={selectedRooms}
              onChange={onRoomsChange}
            />
            <UnderlineDropdown
              label="Форма"
              options={panelShapes}
              selectedValues={selectedSizes}
              onChange={onSizesChange}
            />
            <UnderlineDropdown
              label="Размер"
              options={panelSizes}
              selectedValues={selectedWidths}
              onChange={onWidthsChange}
            />
          </>
        );
      case 'companion':
        return (
          <>
            <UnderlineDropdown
              label="Цвет"
              options={colorDropdownOptions}
              selectedValues={selectedColors}
              onChange={onColorsChange}
              isColorPicker
            />
            <UnderlineDropdown
              label="Ширина"
              options={companionWidths}
              selectedValues={selectedWidths}
              onChange={onWidthsChange}
            />
          </>
        );
      default:
        // "All" - show common filters
        return (
          <>
            <UnderlineDropdown
              label="Коллекция"
              options={collections.map(c => ({ id: c.id, label: c.name }))}
              selectedValues={selectedCollections}
              onChange={onCollectionsChange}
            />
            <UnderlineDropdown
              label="Цвет"
              options={colorDropdownOptions}
              selectedValues={selectedColors}
              onChange={onColorsChange}
              isColorPicker
            />
            <UnderlineDropdown
              label="Сюжет"
              options={patternTypes}
              selectedValues={selectedPatterns}
              onChange={onPatternsChange}
            />
            <UnderlineDropdown
              label="Помещение"
              options={roomTypes}
              selectedValues={selectedRooms}
              onChange={onRoomsChange}
            />
          </>
        );
    }
  };

  return (
    <>
      {/* Spacer for sticky positioning */}
      <div ref={filterRef} className="pt-24" />
      
      {/* Sticky filter bar */}
      <div 
        className={`sticky top-24 z-40 transition-all duration-300 ${
          isSticky 
            ? 'bg-background/95 backdrop-blur-md shadow-[0_1px_0_0_hsl(var(--foreground)/0.08)]' 
            : 'bg-background'
        }`}
      >
        <div className="container-wide">
          {/* Top level: Product type tabs */}
          <div className={`transition-all duration-300 ${isSticky ? 'py-4' : 'pt-4 pb-6'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                {productTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => {
                      onTypesChange(type.id === 'all' ? [] : [type.id]);
                      // Clear type-specific filters when changing type
                      onSizesChange([]);
                      onWidthsChange([]);
                    }}
                    className={`text-sm uppercase tracking-[0.15em] pb-1 transition-all ${
                      currentType === type.id
                        ? 'text-foreground border-b border-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {totalCount} {totalCount === 1 ? 'объект' : totalCount < 5 ? 'объекта' : 'объектов'}
              </p>
            </div>
          </div>
          
          {/* Second level: Contextual filters */}
          <div className={`transition-all duration-300 ${isSticky ? 'pb-4' : 'pb-8'}`}>
            <div className="flex flex-wrap items-center gap-6 lg:gap-8">
              {getSecondLevelFilters()}
              
              {/* Sort */}
              <div className="ml-auto">
                <UnderlineDropdown
                  label="Сортировка"
                  options={sortOptions}
                  selectedValues={[sortBy]}
                  onChange={(vals) => onSortChange(vals[0] || 'popularity')}
                />
              </div>
              
              {/* Reset */}
              {hasActiveFilters && (
                <button
                  onClick={onClearAll}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Сбросить
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
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
  selectedSizes,
  selectedWidths,
  searchQuery,
  sortBy,
  onTypesChange,
  onCollectionsChange,
  onColorsChange,
  onPatternsChange,
  onRoomsChange,
  onSizesChange,
  onWidthsChange,
  onSearchChange,
  onSortChange,
  onClearAll,
  totalCount,
}: MobileFiltersProps) => {
  const currentType = selectedTypes[0] || 'all';

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
        <div className="sticky top-0 bg-background z-10 p-6 flex justify-between items-center border-b border-foreground/10">
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

          {/* Primary Type Selection */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Тип продукта</label>
            <div className="flex flex-wrap gap-2">
              {productTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => {
                    onTypesChange(type.id === 'all' ? [] : [type.id]);
                    onSizesChange([]);
                    onWidthsChange([]);
                  }}
                  className={`px-4 py-2 text-sm transition-colors border ${
                    currentType === type.id
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-foreground/20 hover:border-foreground/40'
                  }`}
                >
                  {type.label}
                </button>
              ))}
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
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
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

          {/* Collection - show for mural and panel */}
          {(currentType === 'all' || currentType === 'mural' || currentType === 'panel') && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Коллекция</label>
              <div className="space-y-1 max-h-[200px] overflow-y-auto">
                <button
                  onClick={() => onCollectionsChange([])}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    selectedCollections.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                  }`}
                >
                  Все коллекции
                </button>
                {collections.map(collection => (
                  <button
                    key={collection.id}
                    onClick={() => toggleFilter(collection.id, selectedCollections, onCollectionsChange)}
                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                      selectedCollections.includes(collection.id)
                        ? 'bg-foreground/5'
                        : 'hover:bg-foreground/5'
                    }`}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pattern/Subject - show for all, mural, panel */}
          {(currentType === 'all' || currentType === 'mural' || currentType === 'panel') && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Сюжет</label>
              <div className="space-y-1">
                <button
                  onClick={() => onPatternsChange([])}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    selectedPatterns.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                  }`}
                >
                  Любой сюжет
                </button>
                {patternTypes.map(pattern => (
                  <button
                    key={pattern.id}
                    onClick={() => toggleFilter(pattern.id, selectedPatterns, onPatternsChange)}
                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
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
          )}

          {/* Room - show for all, mural, panel */}
          {(currentType === 'all' || currentType === 'mural' || currentType === 'panel') && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Помещение</label>
              <div className="space-y-1">
                <button
                  onClick={() => onRoomsChange([])}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    selectedRooms.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                  }`}
                >
                  Все помещения
                </button>
                {roomTypes.map(room => (
                  <button
                    key={room.id}
                    onClick={() => toggleFilter(room.id, selectedRooms, onRoomsChange)}
                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
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
          )}

          {/* Shape - show for panel only */}
          {currentType === 'panel' && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Форма</label>
              <div className="space-y-1">
                <button
                  onClick={() => onSizesChange([])}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    selectedSizes.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                  }`}
                >
                  Любая форма
                </button>
                {panelShapes.map(shape => (
                  <button
                    key={shape.id}
                    onClick={() => toggleFilter(shape.id, selectedSizes, onSizesChange)}
                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                      selectedSizes.includes(shape.id)
                        ? 'bg-foreground/5'
                        : 'hover:bg-foreground/5'
                    }`}
                  >
                    {shape.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size - show for panel only */}
          {currentType === 'panel' && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Размер</label>
              <div className="space-y-1">
                <button
                  onClick={() => onWidthsChange([])}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    selectedWidths.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                  }`}
                >
                  Любой размер
                </button>
                {panelSizes.map(size => (
                  <button
                    key={size.id}
                    onClick={() => toggleFilter(size.id, selectedWidths, onWidthsChange)}
                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                      selectedWidths.includes(size.id)
                        ? 'bg-foreground/5'
                        : 'hover:bg-foreground/5'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Width - show for companion only */}
          {currentType === 'companion' && (
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Ширина рулона</label>
              <div className="space-y-1">
                <button
                  onClick={() => onWidthsChange([])}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    selectedWidths.length === 0 ? 'bg-foreground/5' : 'hover:bg-foreground/5'
                  }`}
                >
                  Любая ширина
                </button>
                {companionWidths.map(width => (
                  <button
                    key={width.id}
                    onClick={() => toggleFilter(width.id, selectedWidths, onWidthsChange)}
                    className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                      selectedWidths.includes(width.id)
                        ? 'bg-foreground/5'
                        : 'hover:bg-foreground/5'
                    }`}
                  >
                    {width.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Цвет</label>
            <div className="flex flex-wrap gap-3">
              {colorOptions.map(color => (
                <button
                  key={color.name}
                  onClick={() => toggleFilter(color.name, selectedColors, onColorsChange)}
                  className={`w-8 h-8 rounded-full transition-all border ${
                    selectedColors.includes(color.name)
                      ? 'ring-2 ring-foreground ring-offset-2 scale-110'
                      : 'border-border/30 hover:scale-110'
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
