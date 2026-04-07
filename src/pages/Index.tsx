import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';
import { products } from '@/data/products';
import { ProductCard } from '@/components/catalog/ProductCard';
import { inspirationItems } from '@/data/inspiration';

const heroSlides = [heroMural, mural1, mural2, mural3, mural5, mural6];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      {/* ── Hero — visual dominates, minimal text ── */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[2s] ease-in-out"
            style={{ opacity: i === currentSlide ? 1 : 0 }}
          >
            <img src={slide} alt="CALMÉ" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/15" />
          </div>
        ))}

        <div className="relative z-10 container-wide pb-20 md:pb-28 lg:pb-32">
          <motion.h1
            className="text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] font-extralight text-white leading-[1.05] tracking-[-0.03em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Тихая архитектура стены
          </motion.h1>
          <motion.p
            className="text-[12px] md:text-[13px] font-extralight text-white/60 tracking-[0.04em] mb-10 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Авторские настенные муралы, созданные под ваш интерьер
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link to="/catalog" className="btn-light">Смотреть коллекции</Link>
            <Link to="/contacts" className="btn-light">Заказать образец</Link>
          </motion.div>
        </div>

        {/* Slide indicators — minimal */}
        <div className="absolute bottom-8 right-6 md:right-10 z-10 flex items-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`transition-all duration-700 ${
                i === currentSlide
                  ? 'w-6 h-[1px] bg-white/80'
                  : 'w-3 h-[1px] bg-white/25'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── Three positioning blocks — text + air, no icons ── */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20">
            {[
              {
                title: 'Архитектурный подход',
                text: 'Каждый мурал воспринимается как часть пространства, а не декор. Мы проектируем визуальную среду, в которой стена становится продолжением архитектурной идеи.',
              },
              {
                title: 'Адаптация под интерьер',
                text: 'Масштаб, композиция и цвет настраиваются под конкретную стену. Мы работаем с пропорциями вашего пространства, чтобы изображение стало его органичной частью.',
              },
              {
                title: 'Контроль результата',
                text: 'Клиент утверждает финальный макет перед печатью. Визуализация в интерьере, согласование цветов и масштаба — всё до начала производства.',
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                <h3 className="text-[15px] font-extralight mb-5 tracking-[-0.01em]">
                  {block.title}
                </h3>
                <p className="text-body leading-[1.9]">
                  {block.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Collections intro + catalog preview ── */}
      <section className="section bg-background">
        <div className="container-wide">
          <motion.div
            className="max-w-3xl mb-20 md:mb-28"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption mb-6">Коллекции</p>
            <h2 className="text-title mb-8">
              Каждая серия — самостоятельная художественная история
            </h2>
            <p className="text-body-lg max-w-xl">
              Настенное изображение становится частью архитектуры пространства.
              Мы создаём не узоры, а визуальные среды — на пересечении дизайна интерьера
              и цифрового искусства.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/catalog" className="btn-outline">
              Все работы
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Inspiration — curated selection ── */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-caption mb-4">Вдохновение</p>
              <h2 className="text-title">В интерьере</h2>
            </div>
            <Link to="/inspiration" className="link-arrow hidden md:flex">
              Все проекты <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {inspirationItems.slice(0, 6).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.7 }}
              >
                <Link to="/inspiration" className="group block">
                  <div className={`overflow-hidden ${i === 0 || i === 5 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link to="/inspiration" className="link-arrow">
              Все проекты <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Process — how we work ── */}
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
                <span className="text-[10px] tracking-[0.2em] text-foreground/20 block mb-5">{item.step}</span>
                <h3 className="text-[14px] font-extralight mb-3 tracking-[-0.01em]">{item.title}</h3>
                <p className="text-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For designers — B2B signal ── */}
      <section className="section bg-card/50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
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
                    <h4 className="text-[13px] font-extralight mb-2">{item.title}</h4>
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
                <img src={mural5} alt="Для дизайнеров" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Quiet CTA ── */}
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacts" className="btn-primary">
                Связаться с нами
              </Link>
              <Link to="/catalog" className="btn-outline">
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
