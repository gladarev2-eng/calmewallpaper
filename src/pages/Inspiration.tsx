import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { InspirationGallery } from '@/components/inspiration/InspirationGallery';
import { projects } from '@/data/inspiration';

const Inspiration = () => {
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
            <h1 className="text-display mb-4">Вдохновение</h1>
            <p className="text-body-lg">
              Галерея интерьеров с продукцией CALMÉ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery with Filters */}
      <InspirationGallery />

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
