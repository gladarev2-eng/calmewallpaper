import { motion } from 'framer-motion';
import { Material } from '@/data/products';

interface MaterialsGridProps {
  materials: Material[];
  images: string[];
}

const MaterialsGrid = ({ materials, images }: MaterialsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((material, i) => (
        <motion.div
          key={material.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="group"
        >
          <div className="aspect-[4/3] overflow-hidden mb-4">
            <img 
              src={images[i % images.length]} 
              alt={material.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <h3 className="font-display text-lg md:text-xl mb-2">{material.name}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{material.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {material.features.map((feature, j) => (
              <span key={j} className="text-xs px-2 py-1 bg-background border border-border">
                {feature}
              </span>
            ))}
          </div>
          {material.forHoreca && (
            <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs">
              Для HoReCa
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default MaterialsGrid;
