import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { collections, patternTypes, roomTypes, colorOptions } from '@/data/products';

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

interface DropdownProps {
  label: string;
  selectedCount: number;
  children: React.ReactNode;
}

const FilterDropdown = ({ label, selectedCount, children }: DropdownProps) => {
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

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
          selectedCount > 0
            ? 'bg-foreground text-background border-foreground'
            : 'border-border hover:border-foreground bg-transparent'
        }`}
      >
        {label}
        {selectedCount > 0 && (
          <span className="ml-1 text-[10px]">({selectedCount})</span>
        )}
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-background border border-border z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
          {children}
        </div>
      )}
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

  const toggleFilter = (value: string, selected: string[], onChange: (values: string[]) => void) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container-wide py-6">
        {/* Main Filter Row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-[180px] pl-10 pr-4 py-2.5 bg-transparent border border-border text-xs tracking-wide focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
            />
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50 mx-2 hidden lg:block" />

          {/* Type Filter - Inline Buttons */}
          <div className="flex gap-2">
            {productTypes.map(type => (
              <button
                key={type.id}
                onClick={() => toggleFilter(type.id, selectedTypes, onTypesChange)}
                className={`px-4 py-2.5 text-xs uppercase tracking-[0.15em] border transition-all duration-300 ${
                  selectedTypes.includes(type.id)
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-foreground bg-transparent'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50 mx-2 hidden lg:block" />

          {/* Collection Dropdown */}
          <FilterDropdown label="Коллекция" selectedCount={selectedCollections.length}>
            <div className="p-2">
              {collections.map(collection => (
                <button
                  key={collection.id}
                  onClick={() => toggleFilter(collection.id, selectedCollections, onCollectionsChange)}
                  className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-colors ${
                    selectedCollections.includes(collection.id)
                      ? 'bg-foreground text-background'
                      : 'hover:bg-muted'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </FilterDropdown>

          {/* Pattern Dropdown */}
          <FilterDropdown label="Рисунок" selectedCount={selectedPatterns.length}>
            <div className="p-2">
              {patternTypes.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => toggleFilter(pattern.id, selectedPatterns, onPatternsChange)}
                  className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-colors ${
                    selectedPatterns.includes(pattern.id)
                      ? 'bg-foreground text-background'
                      : 'hover:bg-muted'
                  }`}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
          </FilterDropdown>

          {/* Room Dropdown */}
          <FilterDropdown label="Помещение" selectedCount={selectedRooms.length}>
            <div className="p-2">
              {roomTypes.map(room => (
                <button
                  key={room.id}
                  onClick={() => toggleFilter(room.id, selectedRooms, onRoomsChange)}
                  className={`w-full text-left px-3 py-2 text-xs tracking-wide transition-colors ${
                    selectedRooms.includes(room.id)
                      ? 'bg-foreground text-background'
                      : 'hover:bg-muted'
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </FilterDropdown>

          {/* Color Dropdown */}
          <FilterDropdown label="Цвет" selectedCount={selectedColors.length}>
            <div className="p-3 grid grid-cols-5 gap-2">
              {colorOptions.map(color => (
                <button
                  key={color.name}
                  onClick={() => toggleFilter(color.name, selectedColors, onColorsChange)}
                  className={`w-7 h-7 rounded-full transition-all ${
                    selectedColors.includes(color.name)
                      ? 'ring-2 ring-foreground ring-offset-2 scale-110'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </FilterDropdown>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort */}
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2.5 bg-transparent border border-border text-xs uppercase tracking-[0.1em] focus:outline-none focus:border-foreground cursor-pointer appearance-none pr-8"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231A1A1A' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '14px' }}
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Clear & Count */}
          {hasActiveFilters && (
            <>
              <div className="h-8 w-px bg-border/50 mx-2" />
              <button
                onClick={onClearAll}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
                Сбросить
              </button>
            </>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <p className="text-xs tracking-[0.1em] text-muted-foreground">
            {totalCount} {totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}
          </p>
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
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute left-0 top-0 bottom-0 w-full max-w-sm bg-background overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border/50 p-6 flex justify-between items-center">
          <h2 className="text-sm uppercase tracking-[0.2em]">Фильтры</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Search */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Поиск</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Название, коллекция..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-border text-sm focus:outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Сортировка</label>
            <div className="grid grid-cols-2 gap-2">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => onSortChange(option.id)}
                  className={`px-3 py-2.5 text-xs border transition-all ${
                    sortBy === option.id
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Тип</label>
            <div className="flex flex-wrap gap-2">
              {productTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleFilter(type.id, selectedTypes, onTypesChange)}
                  className={`px-4 py-2.5 text-xs border transition-all ${
                    selectedTypes.includes(type.id)
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Коллекция</label>
            <div className="max-h-[200px] overflow-y-auto border border-border p-2 space-y-1">
              {collections.map(collection => (
                <button
                  key={collection.id}
                  onClick={() => toggleFilter(collection.id, selectedCollections, onCollectionsChange)}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    selectedCollections.includes(collection.id)
                      ? 'bg-foreground text-background'
                      : 'hover:bg-muted'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Рисунок</label>
            <div className="flex flex-wrap gap-2">
              {patternTypes.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => toggleFilter(pattern.id, selectedPatterns, onPatternsChange)}
                  className={`px-3 py-2 text-xs border transition-all ${
                    selectedPatterns.includes(pattern.id)
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
          </div>

          {/* Room */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Помещение</label>
            <div className="flex flex-wrap gap-2">
              {roomTypes.map(room => (
                <button
                  key={room.id}
                  onClick={() => toggleFilter(room.id, selectedRooms, onRoomsChange)}
                  className={`px-3 py-2 text-xs border transition-all ${
                    selectedRooms.includes(room.id)
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3">Цвет</label>
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
        <div className="sticky bottom-0 bg-background border-t border-border/50 p-6 space-y-3">
          {(selectedTypes.length > 0 || selectedCollections.length > 0 || selectedColors.length > 0 || selectedPatterns.length > 0 || selectedRooms.length > 0) && (
            <button
              onClick={onClearAll}
              className="w-full py-3 text-xs uppercase tracking-[0.15em] border border-border hover:border-foreground transition-colors"
            >
              Сбросить фильтры
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-3 text-xs uppercase tracking-[0.15em] bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            Показать {totalCount} {totalCount === 1 ? 'товар' : totalCount < 5 ? 'товара' : 'товаров'}
          </button>
        </div>
      </div>
    </div>
  );
};
