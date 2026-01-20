import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ChevronDown } from 'lucide-react';
import { collections } from '@/data/products';

interface CatalogFiltersProps {
  selectedTypes: string[];
  selectedCollections: string[];
  selectedColors: string[];
  searchQuery: string;
  onTypesChange: (types: string[]) => void;
  onCollectionsChange: (collections: string[]) => void;
  onColorsChange: (colors: string[]) => void;
  onSearchChange: (query: string) => void;
  onClearAll: () => void;
}

const productTypes = [
  { id: 'mural', label: 'Муралы' },
  { id: 'panel', label: 'Панно' },
  { id: 'companion', label: 'Фоновые обои' },
];

const allColors = [
  'Серый', 'Голубой', 'Белый', 'Розовый', 'Зелёный', 
  'Бежевый', 'Терракота', 'Кремовый', 'Персиковый', 
  'Песочный', 'Оливковый', 'Шалфей'
];

export const CatalogFilters = ({
  selectedTypes,
  selectedCollections,
  selectedColors,
  searchQuery,
  onTypesChange,
  onCollectionsChange,
  onColorsChange,
  onSearchChange,
  onClearAll,
}: CatalogFiltersProps) => {
  const [openSection, setOpenSection] = useState<string | null>('type');

  const hasActiveFilters = useMemo(() => {
    return selectedTypes.length > 0 || 
           selectedCollections.length > 0 || 
           selectedColors.length > 0 || 
           searchQuery.length > 0;
  }, [selectedTypes, selectedCollections, selectedColors, searchQuery]);

  const toggleFilter = (value: string, selected: string[], onChange: (values: string[]) => void) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const FilterSection = ({ 
    id, 
    title, 
    children 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpenSection(openSection === id ? null : id)}
        className="w-full flex items-center justify-between py-4 text-sm tracking-wide hover:text-muted-foreground transition-colors"
      >
        {title}
        <ChevronDown 
          className={`w-4 h-4 transition-transform ${openSection === id ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: openSection === id ? 'auto' : 0,
          opacity: openSection === id ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="pb-4">
          {children}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Поиск..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-muted/50 border-none text-sm focus:outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
        />
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
          Сбросить фильтры
        </button>
      )}

      {/* Filters */}
      <div>
        <FilterSection id="type" title="Тип продукта">
          <div className="space-y-2">
            {productTypes.map(type => (
              <label 
                key={type.id} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-4 h-4 border ${
                  selectedTypes.includes(type.id) 
                    ? 'bg-foreground border-foreground' 
                    : 'border-muted-foreground group-hover:border-foreground'
                } transition-colors flex items-center justify-center`}>
                  {selectedTypes.includes(type.id) && (
                    <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection id="collection" title="Коллекция">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {collections.map(collection => (
              <label 
                key={collection.id} 
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-4 h-4 border ${
                  selectedCollections.includes(collection.id) 
                    ? 'bg-foreground border-foreground' 
                    : 'border-muted-foreground group-hover:border-foreground'
                } transition-colors flex items-center justify-center`}>
                  {selectedCollections.includes(collection.id) && (
                    <svg className="w-3 h-3 text-background" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className="text-sm">{collection.name}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection id="color" title="Цвет">
          <div className="flex flex-wrap gap-2">
            {allColors.map(color => (
              <button
                key={color}
                onClick={() => toggleFilter(color, selectedColors, onColorsChange)}
                className={`px-3 py-1.5 text-xs border transition-colors ${
                  selectedColors.includes(color)
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:border-foreground'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
};
