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

      {/* Collections — fluid editorial grid */}
      <section className="section">
        <div className="container-wide">
          <div className="space-y-24 lg:space-y-36">
            {collections.map((collection, i) => {
              const images = collectionImages[collection.id] || [mural2, mural3, mural4];
              const isReversed = i % 2 === 1;

              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9 }}
                >
                  <Link to={`/collection/${collection.slug}`} className="group block">
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end ${
                      isReversed ? 'lg:grid-flow-dense' : ''
                    }`}>
                      {/* Large image */}
                      <div className={`lg:col-span-7 ${isReversed ? 'lg:col-start-6' : ''}`}>
                        <div className="aspect-[16/10] overflow-hidden cursor-zoom-in">
                          <img
                            src={images[0]}
                            alt={collection.name}
                            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.05]"
                          />
                        </div>
                      </div>

                      {/* Small image + text */}
                      <div className={`lg:col-span-5 ${isReversed ? 'lg:col-start-1' : ''}`}>
                        <div className="aspect-[4/5] overflow-hidden mb-8 lg:-mt-20 cursor-zoom-in">
                          <img
                            src={images[1]}
                            alt={`${collection.name} — деталь`}
                            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
                          />
                        </div>

                        <div>
                          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light tracking-[-0.03em] font-display mb-4 group-hover:text-foreground/70 transition-colors duration-700 leading-[1]">
                            {collection.name}
                          </h2>
                          <p className="text-body-lg mb-6 max-w-sm">{collection.description}</p>
                          <div className="flex flex-wrap gap-3 mb-6">
                            {collection.colors.map((color) => (
                              <span key={color} className="text-[11px] text-foreground/30 font-light">{color}</span>
                            ))}
                          </div>
                          <span className="link-arrow">
                            Смотреть коллекцию <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
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
