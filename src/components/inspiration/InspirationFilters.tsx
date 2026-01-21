import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { moodTypes, inspirationRoomTypes, type MoodType, type InspirationRoomType } from '@/data/inspiration';

interface InspirationFiltersProps {
  selectedMoods: MoodType[];
  selectedRooms: InspirationRoomType[];
  onMoodsChange: (moods: MoodType[]) => void;
  onRoomsChange: (rooms: InspirationRoomType[]) => void;
  onClearAll: () => void;
  totalCount: number;
}

export const InspirationFilters = ({
  selectedMoods,
  selectedRooms,
  onMoodsChange,
  onRoomsChange,
  onClearAll,
  totalCount,
}: InspirationFiltersProps) => {
  const hasActiveFilters = selectedMoods.length > 0 || selectedRooms.length > 0;

  const toggleMood = (mood: MoodType) => {
    if (selectedMoods.includes(mood)) {
      onMoodsChange(selectedMoods.filter(m => m !== mood));
    } else {
      onMoodsChange([...selectedMoods, mood]);
    }
  };

  const toggleRoom = (room: InspirationRoomType) => {
    if (selectedRooms.includes(room)) {
      onRoomsChange(selectedRooms.filter(r => r !== room));
    } else {
      onRoomsChange([...selectedRooms, room]);
    }
  };

  return (
    <div className="border-b border-foreground/10 bg-background">
      <div className="container-wide py-6">
        {/* Filter rows */}
        <div className="space-y-4">
          {/* Moods */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground w-24 shrink-0">
              Настроение
            </span>
            <div className="flex flex-wrap gap-2">
              {moodTypes.map(mood => (
                <button
                  key={mood.id}
                  onClick={() => toggleMood(mood.id)}
                  className={`px-3 py-1.5 text-xs transition-all border ${
                    selectedMoods.includes(mood.id)
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-foreground/70 border-foreground/20 hover:border-foreground/40'
                  }`}
                >
                  {mood.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rooms */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground w-24 shrink-0">
              Помещение
            </span>
            <div className="flex flex-wrap gap-2">
              {inspirationRoomTypes.map(room => (
                <button
                  key={room.id}
                  onClick={() => toggleRoom(room.id)}
                  className={`px-3 py-1.5 text-xs transition-all border ${
                    selectedRooms.includes(room.id)
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent text-foreground/70 border-foreground/20 hover:border-foreground/40'
                  }`}
                >
                  {room.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active filters & count */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-foreground/5">
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={onClearAll}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3 h-3" />
                  Сбросить
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs text-muted-foreground">
            {totalCount} {totalCount === 1 ? 'интерьер' : totalCount < 5 ? 'интерьера' : 'интерьеров'}
          </p>
        </div>
      </div>
    </div>
  );
};
