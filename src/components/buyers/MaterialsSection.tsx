import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Material } from '@/data/products';
import { useState } from 'react';

interface MaterialsSectionProps {
  materials: Material[];
  images: string[];
}

const MaterialsSection = ({ materials, images }: MaterialsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMaterial = materials[activeIndex];

  return (
    <div className="space-y-12">
      {/* Material Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {materials.map((material, i) => (
          <motion.button
            key={material.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setActiveIndex(i)}
            className={`text-left group transition-all duration-300 ${
              activeIndex === i 
                ? 'ring-1 ring-foreground' 
                : 'hover:ring-1 hover:ring-border'
            }`}
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <img 
                src={images[i % images.length]} 
                alt={material.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  activeIndex === i ? 'scale-105' : 'group-hover:scale-105'
                }`}
              />
            </div>
            <div className="p-3 bg-background">
              <h4 className="font-display text-sm md:text-base leading-tight">{material.name}</h4>
              {material.forHoreca && (
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  HoReCa
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Active Material Details */}
      <motion.div
        key={activeMaterial.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start"
      >
        {/* Large Preview Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={images[activeIndex % images.length]} 
            alt={activeMaterial.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="max-w-md">
          <h3 className="font-display text-2xl md:text-3xl mb-2">{activeMaterial.name}</h3>
          {activeMaterial.forHoreca && (
            <span className="inline-block text-xs px-2 py-1 bg-accent text-accent-foreground mb-4">
              Подходит для HoReCa
            </span>
          )}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {activeMaterial.description}
          </p>
          
          {activeMaterial.texture && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Текстура</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeMaterial.texture}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Характеристики</h4>
            <ul className="space-y-2">
              {activeMaterial.features.map((feature, j) => (
                <li key={j} className="flex items-center gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-medium mb-2">Уход</h4>
            <p className="text-sm text-muted-foreground">{activeMaterial.care}</p>
          </div>

          <Link 
            to="/contacts" 
            className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            Заказать образцы бесплатно
            <span className="ml-2">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MaterialsSection;
