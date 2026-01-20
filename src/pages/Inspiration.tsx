import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import mural3 from '@/assets/mural-3.jpg';
import mural5 from '@/assets/mural-5.jpg';

const cases = [
  {
    id: 'hotel-aurora',
    title: 'Отель «Аврора»',
    location: 'Москва',
    type: 'HoReCa',
    description: 'Оформление лобби и ресторана отеля панорамными муралами из коллекции Silentia',
    image: mural3,
  },
  {
    id: 'apartment-nevsky',
    title: 'Апартаменты на Невском',
    location: 'Санкт-Петербург',
    type: 'Частный интерьер',
    description: 'Ботанический мурал для спальни с адаптацией цветовой гаммы под существующий интерьер',
    image: mural5,
  },
];

const Inspiration = () => {
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
            <h1 className="text-display mb-4">Вдохновение</h1>
            <p className="text-body-lg">
              Реализованные проекты и истории интеграции CALMÉ в интерьеры
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((caseItem, i) => (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/case/${caseItem.id}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden mb-6">
                    <img
                      src={caseItem.image}
                      alt={caseItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex gap-3 mb-2">
                        <span className="text-caption">{caseItem.type}</span>
                        <span className="text-caption">•</span>
                        <span className="text-caption">{caseItem.location}</span>
                      </div>
                      <h2 className="font-display text-2xl mb-2">{caseItem.title}</h2>
                      <p className="text-muted-foreground text-sm">{caseItem.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-card">
        <div className="container-narrow text-center">
          <h2 className="text-title mb-6">Хотите попасть в галерею?</h2>
          <p className="text-body-lg mb-8">
            Пришлите фотографии вашего интерьера с продукцией CALMÉ
          </p>
          <Link to="/designers" className="btn-primary">
            Связаться с нами
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Inspiration;
