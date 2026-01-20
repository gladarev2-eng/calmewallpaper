import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getCollectionById, getProductsByCollection } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
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

const Collection = () => {
  const { id } = useParams();
  const collection = getCollectionById(id || '');
  const collectionProducts = getProductsByCollection(id || '');

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Коллекция не найдена</h1>
          <Link to="/collections" className="btn-primary">
            Все коллекции
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = imageMap[collection.id];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={collection.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        
        <div className="container-wide relative z-10 pb-16">
          <Link 
            to="/collections" 
            className="inline-flex items-center gap-2 text-sm mb-8 hover:gap-4 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Все коллекции
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display mb-4">{collection.name}</h1>
            <p className="text-body-lg max-w-2xl">{collection.description}</p>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-title mb-6">Идея коллекции</h2>
            <p className="text-body-lg">{collection.longDescription}</p>
          </motion.div>
        </div>
      </section>

      {/* Colors */}
      <section className="section-sm bg-card">
        <div className="container-wide">
          <div className="flex flex-wrap justify-center gap-4">
            {collection.colors.map((color) => (
              <span 
                key={color}
                className="px-6 py-2 border border-border text-sm"
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
          <h2 className="text-title mb-12 text-center">Работы коллекции</h2>
          
          {collectionProducts.length > 0 ? (
            <div className="grid-catalog">
              {collectionProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              В этой коллекции пока нет работ
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-card">
        <div className="container-narrow text-center">
          <h2 className="text-title mb-6">Не нашли подходящую работу?</h2>
          <p className="text-body-lg mb-8">
            Мы можем создать изображение по вашему референсу или адаптировать существующее
          </p>
          <Link to="/designers" className="btn-primary">
            Обсудить проект
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collection;
