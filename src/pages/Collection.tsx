import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { getCollectionById, getProductsByCollection } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const collectionImages: Record<string, string[]> = {
  'silentia': [mural2, heroMural, mural1, mural6],
  'botanica': [mural3, mural5, heroMural, mural1],
  'forma': [mural4, mural1, mural6, mural2],
  'materia': [mural6, mural2, mural4, mural3],
};

const Collection = () => {
  const { id } = useParams();
  const collection = getCollectionById(id || '');
  const collectionProducts = getProductsByCollection(id || '');

  if (!collection) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-extralight mb-4">Коллекция не найдена</h1>
          <Link to="/collections" className="btn-outline">
            Все коллекции
          </Link>
        </div>
      </div>
    );
  }

  const images = collectionImages[collection.id] || [mural2, mural3, mural4, mural5];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={images[0]}
            alt={collection.name}
            className="w-full h-full object-cover"
            style={{ animation: 'slowZoom 10s ease-out forwards' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        </div>
        
        <div className="container-wide relative z-10 pb-16">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 text-[11px] font-light uppercase tracking-[0.14em] text-white/60 hover:text-white/90 mb-8 transition-colors duration-500"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            Все коллекции
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-extralight text-white leading-[1.05] tracking-[-0.03em] mb-4">{collection.name}</h1>
            <p className="text-[14px] md:text-[16px] font-light text-white/70 max-w-2xl">{collection.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Presentation */}
      <section className="section">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-20"
          >
            <p className="text-caption mb-6">Идея коллекции</p>
            <p className="text-body-lg">{collection.longDescription}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:row-span-2"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images[1]}
                  alt={`${collection.name} в интерьере`}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.2s]"
                />
              </div>
              <p className="text-[11px] text-foreground/35 mt-3 font-light tracking-[0.02em]">В интерьере гостиной</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={images[2]}
                  alt={`${collection.name} крупный план`}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.2s]"
                />
              </div>
              <p className="text-[11px] text-foreground/35 mt-3 font-light tracking-[0.02em]">Детализация изображения</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={images[3]}
                  alt={`${collection.name} в интерьере`}
                  className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.2s]"
                />
              </div>
              <p className="text-[11px] text-foreground/35 mt-3 font-light tracking-[0.02em]">В интерьере спальни</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="py-16 bg-card/30">
        <div className="container-wide">
          <div className="mb-8">
            <p className="text-caption">Цветовая палитра</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {collection.colors.map((color) => (
              <span 
                key={color}
                className="px-5 py-2 border border-foreground/10 text-[12px] font-light text-foreground/60"
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container-wide">
          <div className="mb-16">
            <p className="text-caption mb-4">Каталог</p>
            <h2 className="text-title">Работы коллекции</h2>
          </div>
          
          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {collectionProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-body text-center py-20">
              В этой коллекции пока нет работ
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg bg-card/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-title mb-6">Не нашли подходящую работу?</h2>
            <p className="text-body-lg mb-12 max-w-md mx-auto">
              Мы можем создать изображение по вашему референсу или адаптировать существующее
            </p>
            <Link to="/designers" className="btn-outline">
              Обсудить проект
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Collection;
