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
  const services = [
    {
      num: '01',
      title: 'Бесплатные визуализации',
      subtitle: 'Покажем принт в вашем интерьере',
      desc: 'Присылайте фотографии или планы помещения — мы подготовим профессиональные визуализации для презентации клиентам. Это бесплатно для всех партнёров программы.',
      details: [
        'Монтаж на реальные фото интерьера',
        'До 3 ракурсов на каждый проект',
        'Готовность в течение 24 часов',
      ],
      image: mural2,
    },
    {
      num: '02',
      title: 'Адаптация под интерьер',
      subtitle: 'Индивидуальная работа с каждым проектом',
      desc: 'Скорректируем цветовую гамму, пропорции и детализацию под конкретное пространство. Работаем с палитрой заказчика, подстраиваем под освещение и соседние материалы.',
      details: [
        'Коррекция цветовой температуры',
        'Масштабирование под размеры стены',
        'Интеграция с элементами интерьера',
      ],
      image: mural3,
    },
    {
      num: '03',
      title: 'Образцы материалов',
      subtitle: 'Тактильный опыт для ваших клиентов',
      desc: 'Пришлём образцы всех доступных материалов для презентации заказчикам. Клиент сможет оценить текстуру, плотность и качество печати до оформления заказа.',
      details: [
        'Все 5 типов материалов',
        'Бесплатная доставка по России',
        'Образцы с реальной печатью',
      ],
      image: mural5,
    },
    {
      num: '04',
      title: 'Консультации и поддержка',
      subtitle: 'Персональный менеджер на связи',
      desc: 'Выделенный специалист для ваших проектов. Поможем с выбором принта, расчётом материалов, техническими вопросами монтажа и координацией доставки.',
      details: [
        'Ответ в течение 2 часов',
        'Помощь с техническими расчётами',
        'Сопровождение до завершения проекта',
      ],
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

  // Setup select listener
  if (emblaApi) {
    emblaApi.on('select', onSelect);
  }

  const loyaltyTiers = [
    {
      level: 'Партнёр',
      discount: '10%',
      condition: 'Регистрация в программе',
      benefits: ['Скидка 10%', 'Доступ к 3D-библиотеке', 'Персональный менеджер'],
      highlighted: false,
    },
    {
      level: 'Серебряный',
      discount: '15%',
      condition: 'От 500 000 ₽ в год',
      benefits: ['Скидка 15%', 'Приоритетное производство', 'Бесплатная доставка'],
      highlighted: false,
    },
    {
      level: 'Золотой',
      discount: '20%',
      condition: 'От 1 500 000 ₽ в год',
      benefits: ['Скидка 20%', 'Индивидуальные решения', 'VIP-поддержка 24/7'],
      highlighted: false,
    },
    {
      level: 'Платиновый',
      discount: '25%',
      condition: 'От 5 000 000 ₽ в год',
      benefits: ['Скидка 25%', 'Эксклюзивные коллекции', 'Совместные проекты'],
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero + Loyalty Program Combined */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          {/* Hero Header */}
          <div className="max-w-3xl mb-16 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-caption mb-6">Партнёрская программа</p>
              <h1 className="text-display mb-8">
                Среда для<br />профессионалов
              </h1>
              <p className="text-body-lg max-w-xl">
                Чем больше проектов — тем выгоднее условия. Четыре уровня партнёрства с растущими привилегиями.
              </p>
            </motion.div>
          </div>

          {/* Loyalty Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/6">
            {loyaltyTiers.map((tier, i) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`p-6 md:p-8 ${tier.highlighted ? 'bg-foreground text-background' : 'bg-card/50'}`}
              >
                <p className={`text-[10px] uppercase tracking-[0.2em] mb-4 font-light ${tier.highlighted ? 'text-background/60' : 'text-foreground/35'}`}>
                  {tier.level}
                </p>
                <p className={`text-4xl md:text-5xl font-extralight mb-2 tracking-[-0.02em] ${tier.highlighted ? '' : 'text-foreground'}`}>
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
          
          {/* CTA after loyalty tiers */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <a 
              href="#contact-form"
              className="inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase hover:opacity-70 transition-opacity"
            >
              <span>Вступить в программу</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services - Sequential Presentation */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-20">
            <p className="text-caption mb-4">Что мы предлагаем</p>
            <h2 className="text-title">Сервис для дизайнеров</h2>
          </div>

          <div className="space-y-16 md:space-y-24 lg:space-y-32">
            {services.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center ${
                  i % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <span className="text-[11px] tracking-[0.3em] text-muted-foreground/50 block mb-6">
                    {item.num}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.1em] text-muted-foreground mb-6">
                    {item.subtitle}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed mb-8">
                    {item.desc}
                  </p>
                  <ul className="space-y-3">
                    {item.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="w-1 h-1 rounded-full bg-foreground/40 mt-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA after services */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <a 
              href="#contact-form"
              className="inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase hover:opacity-70 transition-opacity"
            >
              <span>Обсудить сотрудничество</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* HoReCa - Minimalist Design */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          {/* Header with Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <p className="text-caption mb-4">Для бизнеса</p>
              <h2 className="text-title">HoReCa проекты</h2>
            </div>
            
            {/* Modern Slider Controls */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {horecaImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-[2px] transition-all duration-300 ${
                      currentSlide === i 
                        ? 'w-8 bg-foreground' 
                        : 'w-4 bg-foreground/20 hover:bg-foreground/40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={scrollPrev}
                  className="w-10 h-10 border border-foreground/10 flex items-center justify-center hover:border-foreground/30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button 
                  onClick={scrollNext}
                  className="w-10 h-10 border border-foreground/10 flex items-center justify-center hover:border-foreground/30 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Full-width Image Slider */}
          <div className="mb-20 -mx-4 lg:-mx-8">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {horecaImages.map((image, i) => (
                  <motion.div 
                    key={i} 
                    className="flex-[0_0_100%] min-w-0 px-4 lg:px-8"
                    initial={{ opacity: 0.5, scale: 0.98 }}
                    animate={{ 
                      opacity: currentSlide === i ? 1 : 0.5,
                      scale: currentSlide === i ? 1 : 0.98
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="aspect-[2/1] lg:aspect-[21/9] overflow-hidden">
                      <img 
                        src={image} 
                        alt={`HoReCa проект ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Clean Text Layout */}
          <div className="max-w-5xl mx-auto">
            {/* Main Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-foreground/90 max-w-3xl">
                Работаем с отелями, ресторанами, спа-салонами и общественными пространствами. 
                Понимаем специфику коммерческих проектов и создаём решения, которые служат годами.
              </p>
            </motion.div>

            {/* Features Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border-t border-foreground/10 pt-6"
              >
                <h4 className="text-base mb-4">Материалы для высоких нагрузок</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Винил на флизелине класса А. Антивандальное покрытие, устойчивость 
                  к UV и влаге. Сертификаты КМ1-КМ2 для общественных пространств.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 }}
                className="border-t border-foreground/10 pt-6"
              >
                <h4 className="text-base mb-4">Масштабные панорамы</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Полотна до 6 метров без швов. Многометровые панорамы для лобби 
                  отелей и ресторанных залов. Расчёт раскладки для сложных форм.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="border-t border-foreground/10 pt-6"
              >
                <h4 className="text-base mb-4">Адаптация под бренд</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Корректируем палитру под брендбук заведения. Создаём уникальные 
                  решения, отражающие концепцию и философию пространства.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                className="border-t border-foreground/10 pt-6"
              >
                <h4 className="text-base mb-4">Монтаж и сопровождение</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Профессиональный монтаж в Москве и Петербурге. Координация 
                  подрядчиков в регионах. Гарантия на работы — 2 года.
                </p>
              </motion.div>
            </div>
            
            {/* CTA for HoReCa */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 pt-12 border-t border-foreground/10"
            >
              <a 
                href="#contact-form"
                className="inline-flex items-center gap-3 text-sm tracking-[0.1em] uppercase hover:opacity-70 transition-opacity"
              >
                <span>Обсудить проект</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contact-form" className="section bg-card">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Стать партнёром</h2>
            <p className="text-muted-foreground">
              Заполните форму, и мы свяжемся с вами в течение дня
            </p>
          </div>

          <form className="space-y-6 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-caption block mb-2">Имя</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="text-caption block mb-2">Компания</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Название студии"
                />
              </div>
            </div>
            <div>
              <label className="text-caption block mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="text-caption block mb-2">Телефон</label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div>
              <label className="text-caption block mb-2">Сообщение</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                placeholder="Расскажите о вашей студии и проектах"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Отправить заявку
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Designers;