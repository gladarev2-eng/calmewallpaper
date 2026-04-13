import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MessageCircle, Phone, ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const WHATSAPP_URL = 'https://wa.me/79001234567?text=Здравствуйте!%20Интересуют%20настенные%20покрытия%20CALMÉ';
const PHONE = '+74951234567';
const PHONE_DISPLAY = '+7 (495) 123-45-67';

const heroSlides = [heroMural, mural1, mural2, mural3, mural5, mural6];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9 },
};

const Landing = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '25%']);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container-wide flex items-center justify-between h-14 sm:h-16">
          <span className="text-sm font-thin uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)' }}>Calmé</span>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href={`tel:${PHONE}`} className="hidden sm:block text-[11px] font-extralight tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors">
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] hover:bg-foreground/90 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Написать</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* 1. HERO — Slideshow with Parallax */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        {heroSlides.map((slide, i) => (
          <motion.div
            key={i}
            className="absolute inset-[-15%] transition-opacity duration-[2s] ease-in-out"
            style={{ opacity: i === currentSlide ? 1 : 0, y: heroY }}
          >
            <img
              src={slide}
              alt="CALMÉ"
              className="w-full h-full object-cover"
              style={{ animation: i === currentSlide ? 'slowZoom 12s ease-out forwards' : 'none' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/5" />
          </motion.div>
        ))}

        <div className="relative z-10 container-wide pb-16 md:pb-24 lg:pb-32">
          <motion.p
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-5 text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Бутик настенных покрытий
          </motion.p>
          <motion.h1
            className="text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-light text-white leading-[1] tracking-[-0.03em] mb-6"
            style={{ fontFamily: 'var(--font-display)', textShadow: '0 4px 60px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            Авторские муралы<br className="hidden md:block" /> для вашего интерьера
          </motion.h1>
          <motion.p
            className="text-[15px] md:text-[17px] font-light text-white/70 tracking-[0.02em] mb-12 max-w-md leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Создаём атмосферу, а не декор. Невероятная детализация и масштаб до 6 метров.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-light inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Получить консультацию
            </a>
            <a href="#catalog" className="btn-light">
              Смотреть работы
            </a>
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

      {/* 2. MANIFESTO */}
      <section className="section bg-card/30">
        <div className="container-narrow text-center">
          <motion.div {...fadeUp}>
            <p className="text-caption mb-8">О нас</p>
            <h2 className="text-title mb-8">
              Мы не продаём обои.<br />
              Мы создаём архитектуру стены.
            </h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              CALMÉ — бутик настенных покрытий с фокусом на масштаб, детализацию и индивидуальный подход. 
              Каждый заказ — это персональная работа с изображением, материалом и вашим пространством.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. PRODUCT TYPES */}
      <section id="catalog" className="section">
        <div className="container-wide">
          <motion.div {...fadeUp} className="mb-16 md:mb-20">
            <p className="text-caption mb-4">Продукция</p>
            <h2 className="text-title">Три формата для любого интерьера</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                title: 'Муралы',
                desc: 'Обои с изображением на всю стену. Бесшовная печать до 6 метров шириной с детализацией, видимой с 30 см.',
                image: mural3,
                tag: 'от 4 900 ₽/м²',
              },
              {
                title: 'Панно на холсте',
                desc: 'Готовые арт-объекты на натуральном холсте с UV-печатью. Галерейное качество без рамы и стекла.',
                image: mural4,
                tag: 'от 12 000 ₽',
              },
              {
                title: 'Фоновые обои',
                desc: 'Обои-компаньоны в тон основному изображению для соседних стен и помещений.',
                image: mural6,
                tag: 'от 3 200 ₽/м²',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.9,  }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.1em]">
                    {item.tag}
                  </div>
                </div>
                <h3 className="text-h3 mb-2">{item.title}</h3>
                <p className="text-body leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-16 text-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Запросить каталог
            </a>
          </motion.div>
        </div>
      </section>

      {/* 4. SCALE & DETAIL — Split Blocks */}
      <section className="py-0">
        {/* Scale */}
        <div className="bg-card/30">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="aspect-square lg:aspect-auto lg:min-h-[600px]"
              >
                <img src={mural2} alt="Масштаб до 6 метров" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div {...fadeUp} className="flex items-center p-10 md:p-14 lg:p-20 xl:p-24">
                <div>
                  <span className="text-step-num">01</span>
                  <h3 className="text-title mb-3">Масштаб</h3>
                  <p className="text-[17px] text-muted-foreground mb-8 font-light">До 6 метров без единого шва</p>
                  <p className="text-body-lg mb-10">
                    Полотна печатаются единым куском на промышленном оборудовании. 
                    Никаких стыков, смещений и видимых соединений — только цельная картина.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { num: '6 м', label: 'макс. ширина' },
                      { num: '45K', label: 'пикселей' },
                      { num: '2400', label: 'DPI' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-5 border border-foreground/8">
                        <p className="text-2xl font-light mb-1" style={{ fontFamily: 'var(--font-display)' }}>{stat.num}</p>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="bg-background">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <motion.div {...fadeUp} className="flex items-center p-10 md:p-14 lg:p-20 xl:p-24 order-2 lg:order-1">
                <div>
                  <span className="text-step-num">02</span>
                  <h3 className="text-title mb-3">Детализация</h3>
                  <p className="text-[17px] text-muted-foreground mb-8 font-light">Раскрывается при рассмотрении вблизи</p>
                  <p className="text-body-lg mb-10">
                    Каждая текстура, каждый мазок видны с расстояния 30 сантиметров. 
                    Это не просто принт — это изображение, которое живёт на стене.
                  </p>
                  <ul className="space-y-4">
                    {['Сверхвысокое разрешение исходников', 'Глубина цветопередачи', 'Текстуры, видимые тактильно'].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-[14px] text-foreground/70">
                        <span className="w-6 h-px bg-foreground/20" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="aspect-square lg:aspect-auto lg:min-h-[600px] order-1 lg:order-2"
              >
                <img src={mural5} alt="Детализация" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Individuality */}
        <div className="bg-card/30">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className="aspect-square lg:aspect-auto lg:min-h-[600px]"
              >
                <img src={mural1} alt="Индивидуальный подход" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div {...fadeUp} className="flex items-center p-10 md:p-14 lg:p-20 xl:p-24">
                <div>
                  <span className="text-step-num">03</span>
                  <h3 className="text-title mb-3">Индивидуальность</h3>
                  <p className="text-[17px] text-muted-foreground mb-8 font-light">Адаптация под ваш интерьер</p>
                  <p className="text-body-lg mb-10">
                    Каждое изображение адаптируется: подбираем палитру под мебель и освещение, 
                    кадрируем под размеры стены, делаем визуализацию в интерьере.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Цветокоррекция', 'Кадрирование', 'Визуализация', 'Подбор материала'].map((tag, i) => (
                      <span key={i} className="text-[12px] px-5 py-2.5 border border-foreground/10 text-foreground/70">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-20 md:py-28 bg-foreground text-background">
        <div className="container-narrow text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-title text-background mb-5">Расскажите о вашем проекте</h2>
            <p className="text-background/60 text-[15px] mb-10 font-light">Подберём решение, рассчитаем стоимость и подготовим визуализацию — бесплатно</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-light inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Написать в WhatsApp
              </a>
              <a href={`tel:${PHONE}`} className="btn-outline border-background/30 text-background hover:border-background inline-flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. MATERIALS — 6 items */}
      <section className="section">
        <div className="container-wide">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-20">
            <div>
              <p className="text-caption mb-4">Материалы</p>
              <h2 className="text-title">Премиальные покрытия</h2>
            </div>
            <p className="text-body max-w-md">Работаем с ведущими европейскими производителями. Каждый материал подобран для своих задач.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-6">
            {[
              { name: 'Флизелин премиум', use: 'Жилые помещения', image: mural4 },
              { name: 'Флизелин коммерческий', use: 'Общественные пространства', image: mural2 },
              { name: 'Винил на флизелине', use: 'Влажные зоны, HoReCa', image: mural6 },
              { name: 'Текстильное покрытие', use: 'Премиум-интерьеры', image: mural1 },
              { name: 'Холст для панно', use: 'Галерейный эффект', image: heroMural },
              { name: 'Самоклеящаяся плёнка', use: 'Аренда, временные решения', image: mural5 },
            ].map((mat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="group"
              >
                <div className="aspect-square overflow-hidden mb-4">
                  <img src={mat.image} alt={mat.name} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.03]" />
                </div>
                <h4 className="text-[13px] font-medium mb-1">{mat.name}</h4>
                <p className="text-[11px] text-muted-foreground">{mat.use}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-2">
              Заказать образцы бесплатно <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 6. FOR WHOM */}
      <section className="section bg-card/30">
        <div className="container-wide">
          <motion.div {...fadeUp} className="text-center mb-16 md:mb-20">
            <p className="text-caption mb-4">Для кого</p>
            <h2 className="text-title">Работаем с каждым индивидуально</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/8">
            {[
              {
                title: 'Частным клиентам',
                points: ['Подбор изображения по стилю интерьера', 'Визуализация на фото вашей комнаты', 'Адаптация цветов под мебель и свет', 'Доставка и рекомендации по монтажу'],
                cta: 'Подобрать мурал',
                image: mural3,
              },
              {
                title: 'Дизайнерам',
                points: ['Скидки до 25% по программе лояльности', 'Бесплатные визуализации для клиентов', 'Персональный менеджер', 'Образцы материалов бесплатно'],
                cta: 'Стать партнёром',
                image: mural2,
              },
              {
                title: 'HoReCa',
                points: ['Материалы для высоких нагрузок', 'Масштабные панорамы для больших стен', 'Адаптация под брендбук заведения', 'Сертификаты КМ1-КМ2'],
                cta: 'Обсудить проект',
                image: mural4,
              },
            ].map((segment, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.9 }}
                className="bg-background p-8 md:p-10 lg:p-12 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden mb-8">
                  <img src={segment.image} alt={segment.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.02]" />
                </div>
                <h3 className="text-h3 mb-5">{segment.title}</h3>
                <ul className="space-y-3 mb-10 flex-1">
                  {segment.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-body">
                      <span className="w-1 h-1 rounded-full bg-foreground/30 mt-2 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline w-full text-center">
                  {segment.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW WE WORK */}
      <section className="section">
        <div className="container-wide">
          <motion.div {...fadeUp} className="mb-16 md:mb-20">
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как мы работаем</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">
            {[
              { step: '01', title: 'Выбор', desc: 'Выбираете изображение из каталога или присылаете своё. Мы консультируем по стилю и помогаем определиться.' },
              { step: '02', title: 'Расчёт', desc: 'Измеряете стену, выбираете материал — мы рассчитываем стоимость и готовим визуализацию в вашем интерьере.' },
              { step: '03', title: 'Адаптация', desc: 'Корректируем цвета, масштаб и композицию. Утверждаете финальный макет перед запуском в печать.' },
              { step: '04', title: 'Доставка', desc: 'Производство 5-7 дней. Доставка по всей России. Прилагаем инструкцию по монтажу.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <span className="text-step-num">{item.step}</span>
                <h3 className="text-[16px] font-medium mb-3">{item.title}</h3>
                <p className="text-body leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-16 text-center">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2">
              Начать подбор
            </a>
          </motion.div>
        </div>
      </section>

      {/* 8. GALLERY — Wide Image Band */}
      <section className="py-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {[mural1, mural3, mural5, mural2].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="aspect-square overflow-hidden"
            >
              <img src={img} alt={`Работа CALMÉ ${i + 1}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="section bg-card/30">
        <div className="container-narrow">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-caption mb-4">Вопросы</p>
            <h2 className="text-title">Частые вопросы</h2>
          </motion.div>

          <div className="space-y-0">
            {[
              { q: 'Как выбрать размер?', a: 'Измерьте ширину и высоту стены. Мы добавим 5-10% на подрезку и рассчитаем точную площадь и стоимость.' },
              { q: 'Можно изменить цвета?', a: 'Да, бесплатно. Адаптируем гамму под вашу мебель, свет и отделку. Пришлите фото — подготовим визуализацию.' },
              { q: 'Какой материал для ванной?', a: 'Винил на флизелине — влагостойкий, моется, устойчив к перепадам температур. Подходит для ванных и кухонь.' },
              { q: 'Сколько ждать заказ?', a: 'Производство 5-7 рабочих дней. Доставка по Москве 1-2 дня, по России — от 3 до 7 дней.' },
              { q: 'Как клеить?', a: 'Флизелин клеится стандартно — клей на стену. К заказу прилагаем подробную инструкцию. При необходимости порекомендуем мастеров.' },
              { q: 'Работаете с регионами?', a: 'Да, доставляем по всей России. Работаем удалённо: консультация, визуализация и утверждение макета — онлайн.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-b border-foreground/8"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left"
                >
                  <span className="text-[15px] font-light pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-500 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                  <p className="text-body leading-relaxed">{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-12 text-center">
            <p className="text-body mb-4">Остались вопросы?</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-2">
              Спросить в WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="relative py-28 md:py-36 lg:py-44">
        <div className="absolute inset-0">
          <img src={mural4} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container-narrow text-center text-white">
          <motion.div {...fadeUp}>
            <h2 className="text-title text-white mb-6">
              Создадим атмосферу<br />вашего интерьера
            </h2>
            <p className="text-[16px] text-white/70 font-light mb-12 max-w-lg mx-auto leading-relaxed">
              Напишите нам — расскажем о продукции, рассчитаем стоимость и подготовим визуализацию
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-light inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Написать в WhatsApp
              </a>
              <a href={`tel:${PHONE}`} className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors duration-500">
                <Phone className="w-4 h-4" />
                Позвонить
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-foreground text-background">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-sm font-thin uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-display)' }}>Calmé</span>
              <p className="text-[11px] text-background/40 mt-1 tracking-[0.05em]">Бутик настенных покрытий</p>
            </div>
            <div className="flex items-center gap-6">
              <a href={`tel:${PHONE}`} className="text-[13px] text-background/60 hover:text-background transition-colors duration-500">
                {PHONE_DISPLAY}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[13px] text-background/60 hover:text-background transition-colors duration-500 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
