import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Material } from '@/data/products';

interface MaterialsSectionProps {
  materials: Material[];
  image: string;
}

const MaterialsSection = ({ materials, image }: MaterialsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      {/* Image */}
      <div>
        <div className="aspect-[4/3] overflow-hidden sticky top-32">
          <img 
            src={image} 
            alt="Материалы CALMÉ"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="space-y-8">
          {materials.slice(0, 4).map((material, i) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="pb-8 border-b border-border last:border-0"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="font-display text-lg">{material.name}</h3>
                {material.forHoreca && (
                  <span className="text-xs px-2 py-1 bg-accent text-accent-foreground flex-shrink-0">
                    HoReCa
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {material.description}
              </p>
              <ul className="space-y-2">
                {material.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className="w-1 h-1 bg-foreground rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <Link 
            to="/contacts" 
            className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            Заказать образцы бесплатно
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MaterialsSection;
