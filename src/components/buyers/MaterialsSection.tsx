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
    <div className="space-y-14">
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
            className={`text-left group transition-all duration-500 ${
              activeIndex === i 
                ? 'ring-1 ring-foreground/30' 
                : 'hover:ring-1 hover:ring-foreground/10'
            }`}
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <img 
                src={images[i % images.length]} 
                alt={material.name}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  activeIndex === i ? 'scale-105' : 'group-hover:scale-[1.03]'
                }`}
              />
            </div>
            <div className="p-3 bg-background">
              <h4 className="text-[13px] font-light leading-tight text-foreground">{material.name}</h4>
              {material.forHoreca && (
                <span className="text-[10px] text-foreground/35 uppercase tracking-[0.12em] font-light">
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
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={images[activeIndex % images.length]} 
            alt={activeMaterial.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-md">
          <h3 className="text-2xl font-extralight mb-2 tracking-[-0.02em]">{activeMaterial.name}</h3>
          {activeMaterial.forHoreca && (
            <span className="inline-block text-[10px] px-3 py-1.5 border border-foreground/10 text-foreground/50 uppercase tracking-[0.12em] mb-5 font-light">
              Подходит для HoReCa
            </span>
          )}
          <p className="text-body-lg mb-8">
            {activeMaterial.description}
          </p>
          
          {activeMaterial.texture && (
            <div className="mb-8">
              <h4 className="text-[13px] font-light mb-2 text-foreground">Текстура</h4>
              <p className="text-body">
                {activeMaterial.texture}
              </p>
            </div>
          )}

          <div className="mb-8">
            <h4 className="text-[13px] font-light mb-4 text-foreground">Характеристики</h4>
            <ul className="space-y-3">
              {activeMaterial.features.map((feature, j) => (
                <li key={j} className="flex items-start gap-3 text-[13px] font-light text-foreground/60">
                  <span className="w-4 h-[0.5px] bg-foreground/20 mt-2.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h4 className="text-[13px] font-light mb-2 text-foreground">Уход</h4>
            <p className="text-body">{activeMaterial.care}</p>
          </div>

          <Link to="/contacts" className="link-arrow">
            Заказать образцы бесплатно
            <span className="ml-1">→</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MaterialsSection;
