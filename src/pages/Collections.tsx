import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/products';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const collectionImages: Record<string, string[]> = {
  'silentia': [mural2, heroMural, mural1],
  'botanica': [mural3, mural5, heroMural],
  'forma': [mural4, mural1, mural6],
  'materia': [mural6, mural2, mural4],
};

const CollectionCard = ({ collection, index }: { collection: typeof collections[0]; index: number }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = collectionImages[collection.id] || [mural2, mural3, mural4];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
    >
      <Link 
        to={`/collection/${collection.slug}`} 
        className="group block"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const segmentWidth = rect.width / images.length;
          const newIndex = Math.floor(x / segmentWidth);
          setCurrentImageIndex(Math.min(newIndex, images.length - 1));
        }}
        onMouseLeave={() => setCurrentImageIndex(0)}
      >
        <div className="aspect-[16/10] overflow-hidden mb-6 relative">
          <img
            src={images[currentImageIndex]}
            alt={collection.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          <div className="absolute bottom-4 left-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-[1px] flex-1 transition-colors duration-500 ${
                  i === currentImageIndex ? 'bg-white/80' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-light mb-2 tracking-[-0.02em] font-display">{collection.name}</h2>
            <p className="text-body mb-3">{collection.description}</p>
            <div className="flex flex-wrap gap-3">
              {collection.colors.map((color) => (
                <span key={color} className="text-[11px] text-foreground/35 font-light">
                  {color}
                </span>
              ))}
            </div>
          </div>
          <ArrowRight className="w-5 h-5 mt-1 text-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1.5} />
        </div>
      </Link>
    </motion.div>
  );
};

const Collections = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Header */}
      <section className="section-sm bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-caption mb-6">Коллекции</p>
            <h1 className="text-display mb-8">Коллекции</h1>
            <p className="text-body-lg max-w-xl">
              Каждая коллекция — это законченная концепция, объединяющая работы общей идеей и настроением
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections — editorial asymmetrical grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            {collections.map((collection, i) => {
              const patterns = [
                'md:col-span-7',
                'md:col-span-5',
                'md:col-span-5',
                'md:col-span-7',
              ];
              const aspectPatterns = [
                'aspect-[16/10]',
                'aspect-[4/5]',
                'aspect-[4/5]',
                'aspect-[16/10]',
              ];
              const colClass = patterns[i % 4];
              const aspectClass = aspectPatterns[i % 4];
              const images = collectionImages[collection.id] || [mural2, mural3, mural4];
              return (
                <motion.div
                  key={collection.id}
                  className={colClass}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                >
                  <Link to={`/collection/${collection.slug}`} className="group block">
                    <div className={`${aspectClass} overflow-hidden mb-6`}>
                      <img
                        src={images[0]}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-light mb-2 tracking-[-0.02em] font-display">{collection.name}</h2>
                      <p className="text-body mb-3">{collection.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {collection.colors.map((color) => (
                          <span key={color} className="text-[11px] text-foreground/35 font-light">{color}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
