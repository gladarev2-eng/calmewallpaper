import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';
import { products, collections } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';

const heroSlides = [heroMural, mural1, mural2, mural3, mural5, mural6];

const quietWorldsSeries = [
  {
    name: 'Silentia',
    tagline: 'Тишина как визуальный язык',
    poem: 'Туманные пейзажи и размытые горизонты. Цвет растворяется в пространстве, форма уступает атмосфере. Каждый мурал — медитативная пауза в ритме города.',
    images: [
      { src: mural2, productSlug: 'morning-whisper' },
      { src: heroMural, productSlug: 'morning-whisper-warm' },
    ],
  },
  {
    name: 'Botanica',
    tagline: 'Природа в масштабе стены',
    poem: 'Ботанические композиции с детализацией до прожилок листа. Акварельная мягкость и тактильная достоверность — граница между принтом и живописью стирается.',
    images: [
      { src: mural3, productSlug: 'peony-garden' },
      { src: mural5, productSlug: 'tropical-calm' },
    ],
  },
  {
    name: 'Forma',
    tagline: 'Архитектура на плоскости',
    poem: 'Геометрия, ритм, структура. Терракотовые арки и песочные формы создают диалог между стеной и пространством. Для тех, кто мыслит архитектурно.',
    images: [
      { src: mural4, productSlug: 'arch-rhythm' },
      { src: mural1, productSlug: 'terracotta-flow' },
    ],
  },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const featuredProducts = products.filter(p => p.type !== 'companion').slice(0, 6);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[2s] ease-in-out"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img
              src={slide}
              alt="CALMÉ"
              className="w-full h-full object-cover"
              style={{ animation: i === currentSlide ? 'slowZoom 12s ease-out forwards' : 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
          </div>
        ))}

        <div className="relative z-10 container-wide pb-20 md:pb-28 lg:pb-36">
          <motion.h1
            className="text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-light text-white leading-[1] tracking-[-0.03em] mb-6 font-display"
            style={{ textShadow: '0 4px 60px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Погружающая визуальная<br className="hidden md:block" /> среда для интерьера
          </motion.h1>
          <motion.p
            className="text-[15px] md:text-[17px] font-light text-white/70 tracking-[0.02em] mb-14 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Современные настенные муралы со сложной детализацией, созданные для выразительных интерьеров
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link to="/catalog" className="btn-light">Смотреть каталог</Link>
            <Link to="/contacts" className="btn-light">Заказать консультацию</Link>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-6 md:right-10 z-10 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-700 ${
                i === currentSlide
                  ? 'w-8 h-[1.5px] bg-white/90'
                  : 'w-3 h-[1px] bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── 1. Коллекции ── */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="space-y-28 md:space-y-40">
            {quietWorldsSeries.map((series, i) => (
              <motion.div
                key={series.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9 }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                    <Link to={`/artwork/${series.images[0].productSlug}`} className="group block">
                      <div className="aspect-[4/5] overflow-hidden relative">
                        <img
                          src={series.images[0].src}
                          alt={series.name}
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                        <div className="absolute bottom-5 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-[11px] uppercase tracking-[0.14em] text-white/90 font-light flex items-center gap-2">
                            Смотреть <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:col-start-1' : ''} flex flex-col gap-8`}>
                    <Link to={`/artwork/${series.images[1].productSlug}`} className="group block">
                      <div className="aspect-[3/4] overflow-hidden lg:-mt-32 relative">
                        <img
                          src={series.images[1].src}
                          alt={`${series.name} деталь`}
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                        <div className="absolute bottom-5 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <span className="text-[11px] uppercase tracking-[0.14em] text-white/90 font-light flex items-center gap-2">
                            Смотреть <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="lg:pl-2">
                      <p className="text-caption mb-4">{series.tagline}</p>
                      <h3 className="text-[28px] md:text-[36px] font-display font-light tracking-[-0.02em] mb-5">
                        {series.name}
                      </h3>
                      <p className="text-body-lg mb-8 max-w-sm">
                        {series.poem}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA — Go to catalog */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center pt-20 md:pt-28 pb-4"
          >
            <Link to="/catalog" className="link-arrow text-[12px]">
              Перейти в каталог <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Беспрецедентная детализация ── */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={mural2} alt="Детализация" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="space-y-8"
            >
              <div>
                <p className="text-caption mb-4">Беспрецедентная детализация</p>
                <h2 className="text-title mb-6">Сложность, которую невозможно повторить</h2>
                <p className="text-body-lg max-w-md">
                  Наши муралы создаются через сложный процесс цифрового синтеза и художественной доработки. 
                  Результат — изображения с глубиной и детализацией, недоступной стандартным фотообоям и печатным паттернам.
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-baseline gap-6">
                  <span className="text-[32px] md:text-[40px] font-display font-light tracking-[-0.02em] whitespace-nowrap">45 000 px</span>
                  <span className="text-body">Разрешение по длинной стороне</span>
                </div>
                <div className="divider" />
                <div className="flex items-baseline gap-6">
                  <span className="text-[32px] md:text-[40px] font-display font-light tracking-[-0.02em] whitespace-nowrap">2 400 DPI</span>
                  <span className="text-body">Плотность печати</span>
                </div>
                <div className="divider" />
                <div className="flex items-baseline gap-6">
                  <span className="text-[32px] md:text-[40px] font-display font-light tracking-[-0.02em] whitespace-nowrap">до 6 м</span>
                  <span className="text-body">Ширина без единого шва</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="divider" /></div>

      {/* ── 3. Directions ── */}
      <section className="section bg-background">
        <div className="container-wide">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-caption mb-4">Направления</p>
            <h2 className="text-title">Три формата для вашего пространства</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Муралы', desc: 'Полноформатные настенные полотна до 6 метров', image: mural1, link: '/catalog?type=mural' },
              { title: 'Панно', desc: 'Готовые композиции на холсте с подрамником', image: mural6, link: '/catalog?type=panel' },
              { title: 'Фоновые обои', desc: 'Текстуры и паттерны для соседних стен', image: mural4, link: '/catalog?type=companion' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <Link to={cat.link} className="group block">
                  <div className="aspect-[4/5] overflow-hidden mb-5 relative">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <h3 className="text-[16px] font-light mb-2 group-hover:text-foreground/80 transition-colors duration-700">{cat.title}</h3>
                  <p className="text-body">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="divider" /></div>

      {/* ── 3. Featured Works ── */}
      <section className="section bg-background">
        <div className="container-wide">
          <motion.div
            className="flex items-end justify-between mb-16"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-caption mb-4">Каталог</p>
              <h2 className="text-title">Избранные работы</h2>
            </div>
            <Link to="/catalog" className="link-arrow hidden md:flex">
              Все работы <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link to="/catalog" className="link-arrow">
              Все работы <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="container-wide"><div className="divider" /></div>

      {/* ── 4. How it works ── */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как это работает</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12">
            {[
              { step: '01', title: 'Выбор дизайна', desc: 'Изображение из каталога или индивидуальная разработка по вашему проекту' },
              { step: '02', title: 'Адаптация под стену', desc: 'Масштабирование, цветокоррекция и композиция под размеры вашего пространства' },
              { step: '03', title: 'Утверждение макета', desc: 'Визуализация в интерьере и согласование финального варианта перед печатью' },
              { step: '04', title: 'Печать и доставка', desc: 'Производство 5–7 дней на премиальных материалах, доставка по всей России' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
              >
                <span className="text-step-num">{item.step}</span>
                <h3 className="text-[16px] font-light mb-3 tracking-[-0.01em]">{item.title}</h3>
                <p className="text-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. For Designers & Partners ── */}
      <section className="section bg-card/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-caption mb-6">Для дизайнеров и партнёров</p>
              <h2 className="text-title mb-8">Инструменты для профессионалов</h2>
              <div className="space-y-8">
                {[
                  { title: 'Адаптация цвета', text: 'Коррекция палитры под конкретный проект и освещение' },
                  { title: 'Масштабирование', text: 'Работа с нестандартными размерами и сложными формами стен' },
                  { title: 'Капсульные подборки', text: 'Персональная селекция работ под концепцию проекта' },
                ].map((item, i) => (
                  <div key={i}>
                    <h4 className="text-[15px] font-light mb-2 text-foreground">{item.title}</h4>
                    <p className="text-body">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12">
                <Link to="/designers" className="btn-outline">
                  Партнёрская программа
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img src={mural5} alt="Для дизайнеров" className="w-full h-full object-cover animate-image-load" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA — Tell us about your space ── */}
      <section className="section-lg bg-background">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-title mb-6">
              Расскажите о вашем пространстве
            </h2>
            <p className="text-body-lg mb-12 max-w-lg mx-auto">
              Мы подберём решение и подготовим визуализацию в вашем интерьере
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/catalog" className="btn-primary">
                Смотреть каталог
              </Link>
              <Link to="/contacts" className="btn-outline">
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
