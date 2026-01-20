import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const galleryImages = [
  { id: 1, src: mural3, aspect: 'tall' },
  { id: 2, src: mural5, aspect: 'wide' },
  { id: 3, src: heroMural, aspect: 'square' },
  { id: 4, src: mural2, aspect: 'wide' },
  { id: 5, src: mural4, aspect: 'tall' },
  { id: 6, src: mural1, aspect: 'square' },
  { id: 7, src: mural6, aspect: 'wide' },
  { id: 8, src: mural3, aspect: 'square' },
];

const projects = [
  {
    id: 'hotel-aurora',
    title: 'Отель «Аврора»',
    location: 'Москва',
    type: 'HoReCa',
    description: 'Оформление лобби и ресторана отеля панорамными муралами',
    image: mural3,
    images: [mural3, mural5, heroMural],
  },
  {
    id: 'apartment-nevsky',
    title: 'Апартаменты на Невском',
    location: 'Санкт-Петербург',
    type: 'Частный интерьер',
    description: 'Ботанический мурал для спальни с адаптацией цветовой гаммы',
    image: mural5,
    images: [mural5, mural3, mural2],
  },
  {
    id: 'spa-resort',
    title: 'SPA-комплекс «Тишина»',
    location: 'Сочи',
    type: 'HoReCa',
    description: 'Серия муралов для зон отдыха и процедурных кабинетов',
    image: mural2,
    images: [mural2, mural6, mural4],
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
              Галерея интерьеров с продукцией CALMÉ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid - Masonry-like */}
      <section className="section">
        <div className="container-wide">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <div className={`overflow-hidden ${
                  item.aspect === 'tall' ? 'aspect-[3/4]' : 
                  item.aspect === 'wide' ? 'aspect-[16/10]' : 
                  'aspect-square'
                }`}>
                  <img
                    src={item.src}
                    alt={`Интерьер ${item.id}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Проекты</p>
            <h2 className="text-title">Истории реализации</h2>
          </div>

          <div className="space-y-24">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <Link to={`/case/${project.id}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>
                <div>
                  <div className="flex gap-3 mb-4">
                    <span className="text-caption">{project.type}</span>
                    <span className="text-caption">•</span>
                    <span className="text-caption">{project.location}</span>
                  </div>
                  <h3 className="text-subtitle mb-4">{project.title}</h3>
                  <p className="text-body-lg mb-6">{project.description}</p>
                  <Link 
                    to={`/case/${project.id}`}
                    className="btn-outline"
                  >
                    Смотреть проект
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
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