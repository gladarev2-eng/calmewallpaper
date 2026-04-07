import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';
import { collections } from '@/data/products';

const heroSlides = [heroMural, mural1, mural2, mural3, mural5, mural6];

const Index = () => {
  const collectionImages = [mural1, mural2, mural3, mural4];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div>
      {/* Hero Section - Full screen with calm crossfade */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* All slides stacked, opacity-driven crossfade */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[1.8s] ease-in-out"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img 
              src={slide} 
              alt="CALMÉ" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        ))}
        
        <div className="relative z-10 text-center text-white">
          <motion.h1 
            className="text-[3.5rem] md:text-[6.5rem] lg:text-[8.5rem] font-extralight tracking-[-0.04em] leading-[0.9] mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CALMÉ
          </motion.h1>
          <motion.p 
            className="text-[11px] md:text-[12px] font-light uppercase tracking-[0.3em] text-white/80 mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Архитектура тишины
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link to="/catalog" className="btn-light">
              Смотреть каталог
            </Link>
          </motion.div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={1} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" strokeWidth={1} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-700 ${
                i === currentSlide 
                  ? 'w-8 h-[1.5px] bg-white' 
                  : 'w-4 h-[1.5px] bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="section bg-background">
        <div className="container-wide">
          <motion.div 
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption mb-8">Манифест</p>
            <h2 className="text-title mb-8">
              Мы не продаём узоры.<br />
              Мы создаём атмосферу.
            </h2>
            <p className="text-body-lg max-w-2xl">
              CALMÉ — это стратегия «визуальной паузы». Мы рассматриваем стену как холст, 
              где встречаются передовые технологии печати и фундаментальные принципы классического искусства.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="section-sm bg-background">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-title">Коллекции</h2>
            <Link to="/collections" className="link-arrow hidden md:flex">
              Все коллекции <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.slice(0, 2).map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <Link to={`/collection/${collection.slug}`} className="group block relative">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={collectionImages[i]} 
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/20 transition-colors duration-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    <h3 className="text-lg md:text-xl font-light mb-1">{collection.name}</h3>
                    <p className="text-sm text-white/70 font-light">{collection.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/collections" className="link-arrow">
              Все коллекции <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Scale in Details Section */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text content with numbered list */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-title mb-12">Масштаб в деталях</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <span className="text-caption text-muted-foreground/50 pt-1">01</span>
                  <div>
                    <h4 className="text-base font-medium mb-2">Разрешение</h4>
                    <p className="text-body">
                      До 45 000 пикселей для безупречной четкости на стенах до 6 метров.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <span className="text-caption text-muted-foreground/50 pt-1">02</span>
                  <div>
                    <h4 className="text-base font-medium mb-2">Бесшовность</h4>
                    <p className="text-body">
                      Печать единым полотном исключает стыки и искажения рисунка.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <span className="text-caption text-muted-foreground/50 pt-1">03</span>
                  <div>
                    <h4 className="text-base font-medium mb-2">Адаптация</h4>
                    <p className="text-body">
                      Индивидуальная подгонка масштаба и цвета под ваше пространство.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Link to="/studio" className="link-arrow">
                  О технологии <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={mural5} 
                  alt="Macro detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why CALMÉ - Magazine style presentation */}
      <section className="section bg-background">
        <div className="container-wide">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-caption mb-4">Почему CALMÉ</p>
            <h2 className="text-title">Не декор. Атмосфера.</h2>
          </motion.div>

          {/* Magazine layout grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Large feature image */}
            <motion.div 
              className="col-span-12 md:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-[4/3] overflow-hidden relative group">
                <img 
                  src={mural3} 
                  alt="Масштаб до 6 метров"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-lg md:text-xl font-light mb-2">Масштаб до 6 метров</h3>
                  <p className="text-sm text-white/70">Полотна для любых пространств</p>
                </div>
              </div>
            </motion.div>

            {/* Two stacked images */}
            <div className="col-span-12 md:col-span-5 space-y-4 md:space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="aspect-[16/10] overflow-hidden relative group">
                  <img 
                    src={mural2} 
                    alt="Сверхдетализация"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-base font-light mb-1">Сверхдетализация</h3>
                    <p className="text-xs text-white/70">Раскрывается вблизи</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="aspect-[16/10] overflow-hidden relative group">
                  <img 
                    src={mural4} 
                    alt="Индивидуальная адаптация"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-base font-light mb-1">Индивидуальная адаптация</h3>
                    <p className="text-xs text-white/70">Цвета и пропорции под интерьер</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom row - two equal images */}
            <motion.div 
              className="col-span-6 md:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="aspect-[16/10] overflow-hidden relative group">
                <img 
                  src={mural6} 
                  alt="Премиальные материалы"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-sm md:text-base font-light mb-1">Премиальные материалы</h3>
                  <p className="text-xs text-white/70 hidden md:block">5 типов покрытий</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="col-span-6 md:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="aspect-[16/10] overflow-hidden relative group">
                <img 
                  src={mural1} 
                  alt="Сервис для дизайнеров"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-sm md:text-base font-light mb-1">Сервис для дизайнеров</h3>
                  <p className="text-xs text-white/70 hidden md:block">Партнёрская программа</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <Link to="/catalog" className="btn-primary">
              Смотреть каталог
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Product Types */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-caption mb-4">Форматы</p>
            <h2 className="text-title">Три типа продуктов</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: 'Муралы', 
                desc: 'Обои с изображением по площади',
                image: mural2,
                link: '/catalog?type=mural'
              },
              { 
                title: 'Панно', 
                desc: 'Готовые арт-объекты на холсте',
                image: mural4,
                link: '/catalog?type=panel'
              },
              { 
                title: 'Фоновые обои', 
                desc: 'Обои-компаньоны в тон',
                image: mural6,
                link: '/catalog?type=companion'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <Link to={item.link} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-5">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-subtitle mb-2">{item.title}</h3>
                  <p className="text-body text-sm mb-4">{item.desc}</p>
                  <span className="link-arrow">
                    Смотреть <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HoReCa Section */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <p className="text-caption mb-4">Для бизнеса</p>
              <h2 className="text-title mb-8">HoReCa проекты</h2>
              <p className="text-body-lg mb-10">
                Отели, рестораны, общественные пространства. Специальные материалы для высокой проходимости, большие масштабы, работа с архитекторами.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'Материалы повышенной износостойкости',
                  'Адаптация под брендбук',
                  'Сопровождение проекта',
                  'Монтаж под ключ',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-body">
                    <span className="w-5 h-px bg-foreground/30 mt-3 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/designers" className="btn-primary">
                Подробнее
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={mural5} 
                  alt="HoReCa" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как мы работаем</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            {[
              { step: '01', title: 'Выбор', desc: 'Изображение из каталога или индивидуальный заказ' },
              { step: '02', title: 'Расчёт', desc: 'Размеры стены, материал, итоговая стоимость' },
              { step: '03', title: 'Адаптация', desc: 'Подгонка под ваши размеры и цветовую гамму' },
              { step: '04', title: 'Доставка', desc: 'Производство 5-7 дней, доставка по всей России' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="relative"
              >
                <span className="text-caption text-muted-foreground/40 mb-4 block">{item.step}</span>
                <h3 className="text-base font-medium mb-3">{item.title}</h3>
                <p className="text-body text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-foreground text-background">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Готовы начать?
            </h2>
            <p className="text-lg text-background/70 font-light mb-10">
              Свяжитесь с нами для консультации или закажите образцы материалов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/buyers" 
                className="btn-light"
              >
                Заказать консультацию
              </Link>
              <Link 
                to="/catalog" 
                className="inline-flex items-center justify-center px-8 py-3.5 text-[11px] tracking-[0.12em] uppercase text-background/80 hover:text-background transition-colors"
              >
                Смотреть каталог
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
