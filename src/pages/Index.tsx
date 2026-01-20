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
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
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
      <section className="relative h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroMural} 
            alt="CALMÉ Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div 
            className="max-w-2xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.p 
              className="text-caption mb-6"
              variants={fadeUp}
            >
              Бутик настенных покрытий
            </motion.p>
            <motion.h1 
              className="text-display mb-6"
              variants={fadeUp}
            >
              Тишина,<br />масштаб,<br />детализация
            </motion.h1>
            <motion.p 
              className="text-body-lg mb-8 max-w-lg"
              variants={fadeUp}
            >
              CALMÉ создаёт изображения с невероятной детализацией, которые становятся архитектурой вашего пространства.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={fadeUp}
            >
              <Link to="/catalog" className="btn-primary">
                Смотреть каталог
              </Link>
              <Link to="/collections" className="btn-outline">
                Коллекции
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </section>

      {/* Why CALMÉ - Visual Presentation */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-caption mb-4">Почему CALMÉ</p>
            <h2 className="text-title">
              Не декор, а атмосфера интерьера
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyCalmeFeatures.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[16/10] overflow-hidden"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-background">
                  <h3 className="font-display text-2xl md:text-3xl mb-2">{item.title}</h3>
                  <p className="text-sm md:text-base opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scale demonstration */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="text-caption mb-4">Создано для масштаба</p>
              <h2 className="text-title mb-6">
                Стена как холст художника
              </h2>
              <p className="text-body-lg mb-6">
                Наши муралы достигают 6 метров в ширину, сохраняя безупречную детализацию в каждом сантиметре. Это не просто обои — это произведение искусства, созданное для вашего пространства.
              </p>
              <Link 
                to="/catalog" 
                className="inline-flex items-center gap-2 text-sm hover:gap-4 transition-all"
              >
                Смотреть работы <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={mural3} 
                  alt="Scale demonstration" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Types */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-caption mb-4">Форматы</p>
            <h2 className="text-title">Три типа продуктов</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Муралы', 
                desc: 'Обои с изображением, продаются по площади. Адаптируются под вашу стену.',
                image: mural2,
                link: '/catalog?type=mural'
              },
              { 
                title: 'Панно', 
                desc: 'Готовые арт-объекты на холсте с подрамником. Фиксированные размеры.',
                image: mural4,
                link: '/catalog?type=panel'
              },
              { 
                title: 'Фоновые обои', 
                desc: 'Обои-компаньоны для соседних стен. Тот же материал, спокойный фон.',
                image: mural6,
                link: '/catalog?type=companion'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={item.link} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display text-2xl mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm group-hover:gap-4 transition-all">
                    Смотреть <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="section">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-caption mb-4">Коллекции</p>
              <h2 className="text-title">Идеи, объединённые концепцией</h2>
            </div>
            <Link 
              to="/collections" 
              className="hidden md:inline-flex items-center gap-2 text-sm hover:gap-4 transition-all"
            >
              Все коллекции <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.slice(0, 4).map((collection, i) => {
              const images = [mural2, mural3, mural4, mural6];
              return (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/collection/${collection.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden mb-4">
                      <img 
                        src={images[i]} 
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display text-2xl mb-2">{collection.name}</h3>
                        <p className="text-sm text-muted-foreground">{collection.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/collections" className="btn-outline">
              Все коллекции
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-caption mb-4">Избранное</p>
              <h2 className="text-title">Популярные работы</h2>
            </div>
            <Link 
              to="/catalog" 
              className="hidden md:inline-flex items-center gap-2 text-sm hover:gap-4 transition-all"
            >
              Весь каталог <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid-catalog">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/catalog" className="btn-outline">
              Весь каталог
            </Link>
          </div>
        </div>
      </section>

      {/* HoReCa */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={mural5} 
                  alt="HoReCa" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-caption mb-4">Для бизнеса</p>
              <h2 className="text-title mb-6">HoReCa проекты</h2>
              <p className="text-body-lg mb-6">
                Работаем с отелями, ресторанами и общественными пространствами. Специальные материалы, большие масштабы, сжатые сроки.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Материалы повышенной износостойкости',
                  'Адаптация под брендбук заведения',
                  'Работа с архитекторами и дизайнерами',
                  'Монтаж под ключ',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/designers" className="btn-primary">
                Узнать подробнее
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как мы работаем</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Выбор', desc: 'Выбираете изображение из каталога или обсуждаете индивидуальный заказ' },
              { step: '02', title: 'Расчёт', desc: 'Указываете размеры стены, выбираете материал, получаете стоимость' },
              { step: '03', title: 'Адаптация', desc: 'Мы адаптируем изображение под ваши размеры и цветовую гамму интерьера' },
              { step: '04', title: 'Производство', desc: 'Печатаем, упаковываем и доставляем. По желанию — монтаж' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-5xl text-muted-foreground/30">{item.step}</span>
                <h3 className="font-display text-xl mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-title mb-6">Готовы начать?</h2>
            <p className="text-body-lg mb-8 max-w-xl mx-auto">
              Выберите изображение из каталога или свяжитесь с нами для индивидуального проекта
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/catalog" className="btn-primary">
                Смотреть каталог
              </Link>
              <Link to="/designers" className="btn-outline">
                Связаться с нами
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;