import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { collections } from '@/data/products';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural6 from '@/assets/mural-6.jpg';

const imageMap: Record<string, string> = {
  'silentia': mural2,
  'botanica': mural3,
  'forma': mural4,
  'materia': mural6,
};

const Collections = () => {
  return (
    <div className="min-h-screen">
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
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/collection/${collection.slug}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden mb-6">
                    <img
                      src={imageMap[collection.id]}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
