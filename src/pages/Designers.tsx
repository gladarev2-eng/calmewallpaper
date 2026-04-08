import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const Designers = () => {
  const keyOfferings = [
    {
      title: 'Адаптация цвета',
      desc: 'Корректируем палитру под конкретный проект, освещение и соседние материалы. Каждый мурал настраивается индивидуально.',
      details: ['Коррекция тональности и насыщенности', 'Согласование с палитрой проекта', 'Учёт типа освещения'],
    },
    {
      title: 'Индивидуальные размеры',
      desc: 'Работаем с нестандартными пропорциями, сложными формами стен и масштабированием без потери детализации.',
      details: ['Полотна до 6 метров без швов', 'Нестандартные формы и углы', 'Сохранение разрешения 45K px'],
    },
    {
      title: 'Капсульные коллекции',
      desc: 'Персональная селекция работ под концепцию проекта. Создаём тематические подборки для вашей студии.',
      details: ['Кураторский подбор из 100+ работ', 'Эксклюзивные варианты для партнёров', 'Брендированные презентации'],
    },
  ];

  const services = [
    {
      num: '01',
      title: 'Бесплатные визуализации',
      subtitle: 'Покажем принт в вашем интерьере',
      desc: 'Присылайте фотографии или планы помещения — мы подготовим профессиональные визуализации для презентации клиентам.',
      details: ['Монтаж на реальные фото интерьера', 'До 3 ракурсов на каждый проект', 'Готовность в течение 24 часов'],
      image: mural2,
    },
    {
      num: '02',
      title: 'Адаптация под интерьер',
      subtitle: 'Индивидуальная работа с каждым проектом',
      desc: 'Скорректируем цветовую гамму, пропорции и детализацию под конкретное пространство.',
      details: ['Коррекция цветовой температуры', 'Масштабирование под размеры стены', 'Интеграция с элементами интерьера'],
      image: mural3,
    },
    {
      num: '03',
      title: 'Образцы материалов',
      subtitle: 'Тактильный опыт для ваших клиентов',
      desc: 'Пришлём образцы всех доступных материалов для презентации заказчикам.',
      details: ['Все 5 типов материалов', 'Бесплатная доставка по России', 'Образцы с реальной печатью'],
      image: mural5,
    },
    {
      num: '04',
      title: 'Консультации и поддержка',
      subtitle: 'Персональный менеджер на связи',
      desc: 'Выделенный специалист для ваших проектов. Помощь с техническими вопросами и координацией.',
      details: ['Ответ в течение 2 часов', 'Помощь с техническими расчётами', 'Сопровождение до завершения проекта'],
      image: mural6,
    },
  ];

  const horecaImages = [mural4, mural3, mural2, mural5, mural6];
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  if (emblaApi) {
    emblaApi.on('select', onSelect);
  }

  const loyaltyTiers = [
    { level: 'Партнёр', discount: '10%', condition: 'Регистрация в программе', benefits: ['Скидка 10%', 'Доступ к 3D-библиотеке', 'Персональный менеджер'], highlighted: false },
    { level: 'Серебряный', discount: '15%', condition: 'От 500 000 ₽ в год', benefits: ['Скидка 15%', 'Приоритетное производство', 'Бесплатная доставка'], highlighted: false },
    { level: 'Золотой', discount: '20%', condition: 'От 1 500 000 ₽ в год', benefits: ['Скидка 20%', 'Индивидуальные решения', 'VIP-поддержка 24/7'], highlighted: false },
    { level: 'Платиновый', discount: '25%', condition: 'От 5 000 000 ₽ в год', benefits: ['Скидка 25%', 'Эксклюзивные коллекции', 'Совместные проекты'], highlighted: true },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-16 lg:mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-caption mb-6">Партнёрская программа</p>
              <h1 className="text-display mb-8">Среда для<br />профессионалов</h1>
              <p className="text-body-lg max-w-xl">
                Чем больше проектов — тем выгоднее условия. Четыре уровня партнёрства с растущими привилегиями.
              </p>
            </motion.div>
          </div>

          {/* Loyalty Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/6">
            {loyaltyTiers.map((tier, i) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`p-6 md:p-8 ${tier.highlighted ? 'bg-foreground text-background' : 'bg-card/30'}`}
              >
                <p className={`text-[10px] uppercase tracking-[0.2em] mb-4 font-light ${tier.highlighted ? 'text-background/60' : 'text-foreground/35'}`}>
                  {tier.level}
                </p>
                <p className={`text-4xl md:text-5xl font-light mb-2 tracking-[-0.02em] font-display ${tier.highlighted ? '' : 'text-foreground'}`}>
                  {tier.discount}
                </p>
                <p className={`text-[13px] font-light mb-6 ${tier.highlighted ? 'text-background/70' : 'text-foreground/45'}`}>
                  {tier.condition}
                </p>
                <ul className="space-y-2.5">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} className={`text-[13px] font-light flex items-start gap-3 ${tier.highlighted ? 'text-background/90' : 'text-foreground/60'}`}>
                      <span className={`w-4 h-[0.5px] mt-2.5 shrink-0 ${tier.highlighted ? 'bg-background/30' : 'bg-foreground/15'}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Offerings — Structured with Dividers */}
      <section className="section bg-card/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-caption mb-4">Ключевые возможности</p>
            <h2 className="text-title">Инструменты для вашей практики</h2>
          </motion.div>

          <div className="space-y-0">
            {keyOfferings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="border-t border-foreground/8 py-12 md:py-16"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                  <div className="lg:col-span-4">
                    <h3 className="text-h3 mb-3">{item.title}</h3>
                    <p className="text-body-lg">{item.desc}</p>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {item.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <span className="w-4 h-[0.5px] bg-foreground/20 mt-2.5 shrink-0" />
                          <p className="text-[13px] font-light text-foreground/60">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-foreground/8" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-wide">
          <div className="mb-20">
            <p className="text-caption mb-4">Сервис</p>
            <h2 className="text-title">Что мы предлагаем</h2>
          </div>

          <div className="space-y-20 md:space-y-28 lg:space-y-36">
            {services.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1.5s]" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <span className="text-step-num">{item.num}</span>
                  <h3 className="text-h3 mb-3">{item.title}</h3>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/35 mb-6 font-light">{item.subtitle}</p>
                  <p className="text-body-lg mb-8">{item.desc}</p>
                  <ul className="space-y-3">
                    {item.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3 text-[13px] font-light text-foreground/60">
                        <span className="w-4 h-[0.5px] bg-foreground/20 mt-2.5 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HoReCa */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <p className="text-caption mb-4">Для бизнеса</p>
              <h2 className="text-title">HoReCa проекты</h2>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {horecaImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-[2px] transition-all duration-300 ${currentSlide === i ? 'w-8 bg-foreground' : 'w-4 bg-foreground/20 hover:bg-foreground/40'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={scrollPrev} className="w-10 h-10 border border-foreground/10 flex items-center justify-center hover:border-foreground/30 transition-colors duration-500">
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button onClick={scrollNext} className="w-10 h-10 border border-foreground/10 flex items-center justify-center hover:border-foreground/30 transition-colors duration-500">
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-20 -mx-4 lg:-mx-8">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {horecaImages.map((image, i) => (
                  <motion.div key={i} className="flex-[0_0_100%] min-w-0 px-4 lg:px-8"
                    initial={{ opacity: 0.5, scale: 0.98 }}
                    animate={{ opacity: currentSlide === i ? 1 : 0.5, scale: currentSlide === i ? 1 : 0.98 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="aspect-[4/5] lg:aspect-[21/9] overflow-hidden">
                      <img src={image} alt={`HoReCa проект ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-foreground/90 max-w-3xl">
                Работаем с отелями, ресторанами, спа-салонами и общественными пространствами.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {[
                { title: 'Материалы для высоких нагрузок', desc: 'Винил на флизелине класса А. Антивандальное покрытие, устойчивость к UV и влаге.' },
                { title: 'Масштабные панорамы', desc: 'Полотна до 6 метров без швов. Многометровые панорамы для лобби отелей.' },
                { title: 'Адаптация под бренд', desc: 'Корректируем палитру под брендбук заведения.' },
                { title: 'Монтаж и сопровождение', desc: 'Профессиональный монтаж в Москве и Петербурге. Гарантия — 2 года.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.6 }} className="border-t border-foreground/8 pt-6">
                  <h4 className="text-[15px] font-light mb-3 text-foreground">{item.title}</h4>
                  <p className="text-body">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact form — Partner CTA */}
      <section id="contact-form" className="section bg-card/30">
        <div className="container-narrow">
          <div className="mb-16">
            <p className="text-caption mb-4">Заявка</p>
            <h2 className="text-title mb-4">Запросить партнёрские условия</h2>
            <p className="text-body-lg max-w-md">
              Заполните форму, и мы свяжемся с вами в течение дня
            </p>
          </div>

          <form className="space-y-8 max-w-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-caption block mb-3">Имя</label>
                <input type="text" className="input-field" placeholder="Ваше имя" />
              </div>
              <div>
                <label className="text-caption block mb-3">Компания</label>
                <input type="text" className="input-field" placeholder="Название студии" />
              </div>
            </div>
            <div>
              <label className="text-caption block mb-3">Email</label>
              <input type="email" className="input-field" placeholder="email@example.com" />
            </div>
            <div>
              <label className="text-caption block mb-3">Телефон</label>
              <input type="tel" className="input-field" placeholder="+7 (___) ___-__-__" />
            </div>
            <div>
              <label className="text-caption block mb-3">Сообщение</label>
              <textarea rows={4} className="input-field resize-none" placeholder="Расскажите о вашей студии и проектах" />
            </div>
            <button type="submit" className="btn-primary">
              Запросить партнёрские условия
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Designers;
