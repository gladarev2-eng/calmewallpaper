import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';
import { products, collections } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.15 } }
};

const Index = () => {
  const featuredProducts = products.filter(p => p.isBestseller || p.isNew).slice(0, 6);

  const whyCalmeFeatures = [
    { 
      title: 'Масштаб до 6 метров', 
      desc: 'Полотна для любых пространств',
      image: mural3,
    },
    { 
      title: 'Сверхдетализация', 
      desc: 'Раскрывается при рассмотрении вблизи',
      image: mural2,
    },
    { 
      title: 'Адаптация под интерьер', 
      desc: 'Цвета и пропорции под ваше пространство',
      image: mural5,
    },
    { 
      title: 'Сервис для дизайнеров', 
      desc: 'Партнёрская программа и поддержка',
      image: mural4,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroMural} 
            alt="CALMÉ Hero" 
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.85) contrast(0.95)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.p 
              className="text-caption mb-8"
              variants={fadeUp}
            >
              Бутик настенных покрытий
            </motion.p>
            <motion.h1 
              className="text-display mb-8"
              variants={fadeUp}
            >
              Тишина<br />Масштаб<br />Детализация
            </motion.h1>
            <motion.p 
              className="text-body-lg mb-12 max-w-md"
              variants={fadeUp}
            >
              Изображения, которые становятся архитектурой вашего пространства
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-6"
              variants={fadeUp}
            >
              <Link to="/catalog" className="btn-primary">
                Каталог
              </Link>
              <Link to="/collections" className="btn-outline">
                Коллекции
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <ChevronDown className="w-5 h-5 stroke-[1] animate-bounce" />
        </motion.div>
      </section>

      {/* Why CALMÉ - Visual Presentation */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption mb-6">Почему Calmé</p>
            <h2 className="text-title">
              Не декор<br />Атмосфера интерьера
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {whyCalmeFeatures.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative aspect-[16/10] overflow-hidden"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ filter: 'saturate(0.85) contrast(0.95)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 text-background">
                  <h3 className="text-lg md:text-xl font-thin uppercase tracking-[0.15em] mb-2">{item.title}</h3>
                  <p className="text-xs font-extralight opacity-80 tracking-wide">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Scale demonstration */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <p className="text-caption mb-6">Масштаб</p>
              <h2 className="text-title mb-8">
                Стена как холст художника
              </h2>
              <p className="text-body-lg mb-10">
                Муралы до 6 метров в ширину с безупречной детализацией в каждом сантиметре. Произведение искусства для вашего пространства.
              </p>
              <Link 
                to="/catalog" 
                className="inline-flex items-center gap-3 text-xs font-extralight uppercase tracking-[0.15em] hover:gap-5 transition-all duration-400"
              >
                Смотреть работы <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={mural3} 
                  alt="Scale demonstration" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.85) contrast(0.95)' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Product Types */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption mb-6">Форматы</p>
            <h2 className="text-title">Три типа продуктов</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { 
                title: 'Муралы', 
                desc: 'Обои с изображением по площади',
                image: mural2,
                link: '/catalog?type=mural'
              },
              { 
                title: 'Панно', 
                desc: 'Арт-объекты на холсте',
                image: mural4,
                link: '/catalog?type=panel'
              },
              { 
                title: 'Фоновые обои', 
                desc: 'Обои-компаньоны',
                image: mural6,
                link: '/catalog?type=companion'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <Link to={item.link} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      style={{ filter: 'saturate(0.85) contrast(0.95)' }}
                    />
                  </div>
                  <h3 className="text-subtitle mb-3">{item.title}</h3>
                  <p className="text-sm font-extralight text-muted-foreground mb-4 tracking-wide">{item.desc}</p>
                  <span className="inline-flex items-center gap-3 text-xs font-extralight uppercase tracking-[0.15em] group-hover:gap-5 transition-all duration-400">
                    Смотреть <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Collections */}
      <section className="section">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-caption mb-6">Коллекции</p>
              <h2 className="text-title">Идеи объединённые концепцией</h2>
            </div>
            <Link 
              to="/collections" 
              className="hidden md:inline-flex items-center gap-3 text-xs font-extralight uppercase tracking-[0.15em] hover:gap-5 transition-all duration-400"
            >
              Все коллекции <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {collections.slice(0, 4).map((collection, i) => {
              const images = [mural2, mural3, mural4, mural6];
              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <Link to={`/collection/${collection.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden mb-6">
                      <img 
                        src={images[i]} 
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        style={{ filter: 'saturate(0.85) contrast(0.95)' }}
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-subtitle mb-2">{collection.name}</h3>
                        <p className="text-sm font-extralight text-muted-foreground tracking-wide">{collection.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 stroke-[1.5] mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/collections" className="btn-outline">
              Все коллекции
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Featured Works */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-caption mb-6">Избранное</p>
              <h2 className="text-title">Популярные работы</h2>
            </div>
            <Link 
              to="/catalog" 
              className="hidden md:inline-flex items-center gap-3 text-xs font-extralight uppercase tracking-[0.15em] hover:gap-5 transition-all duration-400"
            >
              Весь каталог <ArrowRight className="w-4 h-4 stroke-[1.5]" />
            </Link>
          </div>

          <div className="grid-catalog">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-16 text-center md:hidden">
            <Link to="/catalog" className="btn-outline">
              Весь каталог
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* HoReCa */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={mural5} 
                  alt="HoReCa" 
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.85) contrast(0.95)' }}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-caption mb-6">Для бизнеса</p>
              <h2 className="text-title mb-8">HoReCa проекты</h2>
              <p className="text-body-lg mb-10">
                Отели, рестораны, общественные пространства. Специальные материалы, большие масштабы.
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  'Материалы повышенной износостойкости',
                  'Адаптация под брендбук',
                  'Работа с архитекторами',
                  'Монтаж под ключ',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-extralight tracking-wide">
                    <span className="w-6 h-px bg-foreground/30" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/designers" className="btn-primary">
                Подробнее
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* How we work */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption mb-6">Процесс</p>
            <h2 className="text-title">Как мы работаем</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: '01', title: 'Выбор', desc: 'Изображение из каталога или индивидуальный заказ' },
              { step: '02', title: 'Расчёт', desc: 'Размеры стены, материал, стоимость' },
              { step: '03', title: 'Адаптация', desc: 'Подгонка под размеры и цветовую гамму' },
              { step: '04', title: 'Производство', desc: 'Печать, упаковка, доставка, монтаж' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <span className="text-5xl font-thin text-muted-foreground/20 tracking-[0.2em]">{item.step}</span>
                <h3 className="text-subtitle mt-6 mb-3">{item.title}</h3>
                <p className="text-sm font-extralight text-muted-foreground tracking-wide">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* CTA */}
      <section className="section">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption mb-6">Начните</p>
            <h2 className="text-title mb-8">
              Готовы создать атмосферу
            </h2>
            <p className="text-body-lg mb-12 max-w-xl mx-auto">
              Свяжитесь с нами для консультации или посетите каталог
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/catalog" className="btn-primary">
                Каталог
              </Link>
              <Link to="/designers" className="btn-outline">
                Связаться
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;