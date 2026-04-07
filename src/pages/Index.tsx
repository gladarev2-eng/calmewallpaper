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
import { inspirationRoomTypes } from '@/data/inspiration';

const heroSlides = [heroMural, mural1, mural2, mural3, mural5, mural6];

const roomCategories = [
  { id: 'living', label: 'Гостиная', image: mural1 },
  { id: 'bedroom', label: 'Спальня', image: mural3 },
  { id: 'hallway', label: 'Прихожая', image: mural4 },
  { id: 'kitchen', label: 'Кухня', image: mural5 },
  { id: 'bathroom', label: 'Ванная', image: mural6 },
  { id: 'horeca', label: 'HoReCa', image: mural2 },
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
              style={{ animation: i === currentSlide ? 'slowZoom 8s ease-out forwards' : 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 container-wide pb-20 md:pb-28 lg:pb-36">
          <motion.h1
            className="text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-extralight text-white leading-[1] tracking-[-0.03em] mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Тихая архитектура стены
          </motion.h1>
          <motion.p
            className="text-[14px] md:text-[16px] font-light text-white/80 tracking-[0.02em] mb-12 max-w-lg"
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

      {/* ── Positioning block — image + 3 theses with descriptions ── */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[700px] overflow-hidden">
            <img
              src={mural2}
              alt="CALMÉ в интерьере"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center px-8 md:px-14 lg:px-20 xl:px-28 py-20 lg:py-0 bg-card/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <p className="text-caption">Философия</p>
              {[
                {
                  title: 'Архитектурный подход',
                  desc: 'Каждый мурал проектируется как часть пространства — с учётом масштаба стены, освещения и окружающих материалов. Не декор, а визуальная архитектура.',
                },
                {
                  title: 'Адаптация под интерьер',
                  desc: 'Масштабируем, корректируем цвет и композицию под конкретное помещение. Изображение органично встраивается в ваш проект.',
                },
                {
                  title: 'Контроль результата',
                  desc: 'Перед печатью вы утверждаете финальный макет с визуализацией в вашем интерьере. Никаких сюрпризов — только точный результат.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <h3 className="text-[16px] md:text-[18px] font-light tracking-[-0.01em] text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body max-w-md">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Category showcase ── */}
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
                  <div className="aspect-[3/4] overflow-hidden mb-5">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="text-[15px] font-light mb-2 group-hover:text-foreground/80 transition-colors">{cat.title}</h3>
                  <p className="text-body">{cat.desc}</p>
                </Link>
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
            className="mt-20 text-center"
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

      {/* ── Inspiration — room categories ── */}
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {roomCategories.map((room, i) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.7 }}
              >
                <Link to={`/inspiration?room=${room.id}`} className="group block relative overflow-hidden aspect-[4/3]">
                  <img
                    src={room.image}
                    alt={room.label}
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-[13px] font-light text-white tracking-[0.02em]">
                      {room.label}
                    </p>
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

      {/* ── Process ── */}
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
                <span className="text-[11px] tracking-[0.2em] text-foreground/30 block mb-5 font-light">{item.step}</span>
                <h3 className="text-[15px] font-light mb-3 tracking-[-0.01em]">{item.title}</h3>
                <p className="text-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For designers ── */}
      <section className="section bg-card/50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                    <h4 className="text-[14px] font-light mb-2 text-foreground">{item.title}</h4>
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

      {/* ── CTA ── */}
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
