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

const imageMap: Record<string, string> = {
  '/hero-mural.jpg': heroMural,
  '/mural-1.jpg': mural1,
  '/mural-2.jpg': mural2,
  '/mural-3.jpg': mural3,
  '/mural-4.jpg': mural4,
  '/mural-5.jpg': mural5,
  '/mural-6.jpg': mural6,
};

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
      transition={{ delay: index * 0.1 }}
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
          
          {/* Image indicators */}
          <div className="absolute bottom-4 left-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 transition-colors ${
                  i === currentImageIndex ? 'bg-background' : 'bg-background/40'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-display text-3xl mb-2">{collection.name}</h2>
            <p className="text-muted-foreground mb-3">{collection.description}</p>
            <div className="flex flex-wrap gap-2">
              {collection.colors.map((color) => (
                <span key={color} className="text-xs text-muted-foreground">
                  {color}
                </span>
              ))}
            </div>
          </div>
          <ArrowRight className="w-6 h-6 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </Link>
    </motion.div>
  );
};

const Collections = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Header */}
      <section className="section-sm bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display mb-4">Коллекции</h1>
            <p className="text-body-lg">
              Каждая коллекция — это законченная концепция, объединяющая работы общей идеей и настроением
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, i) => (
              <CollectionCard key={collection.id} collection={collection} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;