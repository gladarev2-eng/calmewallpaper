import { useMemo } from 'react';
import { Search, X } from 'lucide-react';
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
}

const productTypes = [
  { id: 'mural', label: 'Муралы' },
  { id: 'panel', label: 'Панно' },
  { id: 'companion', label: 'Фоновые обои' },
];

const sortOptions = [
  { id: 'popularity', label: 'По популярности' },
  { id: 'newest', label: 'Новинки' },
  { id: 'price-asc', label: 'Цена: по возрастанию' },
  { id: 'price-desc', label: 'Цена: по убыванию' },
];

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
    <div className="bg-card border-b border-border py-6">
      <div className="container-wide">
        {/* Search and Sort Row */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по каталогу..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring appearance-none cursor-pointer min-w-[200px]"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={onClearAll}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                <X className="w-4 h-4" />
                Сбросить
              </button>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-6">
          {/* Product Type */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Тип:</span>
            <div className="flex gap-2">
              {productTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => toggleFilter(type.id, selectedTypes, onTypesChange)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
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

          {/* Collection */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Коллекция:</span>
            <div className="flex gap-2">
              {collections.map(collection => (
                <button
                  key={collection.id}
                  onClick={() => toggleFilter(collection.id, selectedCollections, onCollectionsChange)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
                    selectedCollections.includes(collection.id)
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          </div>

          {/* Pattern Type */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Рисунок:</span>
            <div className="flex gap-2 flex-wrap">
              {patternTypes.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => toggleFilter(pattern.id, selectedPatterns, onPatternsChange)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
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

          {/* Room Type */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Помещение:</span>
            <div className="flex gap-2 flex-wrap">
              {roomTypes.map(room => (
                <button
                  key={room.id}
                  onClick={() => toggleFilter(room.id, selectedRooms, onRoomsChange)}
                  className={`px-3 py-1.5 text-xs border transition-colors ${
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
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Цвет:</span>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map(color => (
                <button
                  key={color.name}
                  onClick={() => toggleFilter(color.name, selectedColors, onColorsChange)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedColors.includes(color.name)
                      ? 'border-foreground scale-110 ring-2 ring-foreground ring-offset-2'
                      : 'border-border hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};