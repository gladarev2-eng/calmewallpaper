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
      title: 'Для презентации клиенту',
      desc: 'Помогаем быстро показать идею не как абстрактную картинку, а как готовое интерьерное решение.',
      details: ['PDF-каталог', 'Подборки по стилям и помещениям', 'Визуализация мурала в проекте', 'Фрагменты для мудбордов', 'Аргументы для клиента'],
    },
    {
      title: 'Для проектной работы',
      desc: 'Готовим материалы, которые удобно использовать в дизайн-процессе.',
      details: ['Изображения для коллажей', 'Фрагменты для рендеров', 'Технические параметры', 'Варианты материалов', 'Расчёт под размер', 'Рекомендации по подготовке стены'],
    },
    {
      title: 'Для реализации',
      desc: 'Сопровождаем проект после согласования, чтобы финальный результат соответствовал идее.',
      details: ['Кадрирование', 'Цветокоррекция', 'Цветопробы', 'Подготовка файла к печати', 'Контроль производства', 'Рекомендации по монтажу'],
    },
  ];

  const services = [
    {
      num: '01',
      title: 'Подбор под концепцию',
      subtitle: 'Решение под мудборд и план',
      desc: 'Вы присылаете план, рендер, мудборд или описание задачи. Мы предлагаем несколько муралов, которые подходят по настроению, масштабу, цвету и роли в интерьере.',
      details: ['Работа от концепции, а не каталога', 'Учёт стиля и палитры проекта', 'Несколько вариантов на выбор'],
      image: mural2,
    },
    {
      num: '02',
      title: 'Визуализация для клиента',
      subtitle: 'Решение на конкретной стене',
      desc: 'Показываем мурал в интерьере, чтобы клиент увидел не «красивую картинку», а решение на своей стене. Это помогает быстрее согласовать смету и снизить риск отказа.',
      details: ['Монтаж на фото интерьера или рендер', 'До 3 ракурсов', 'Готовность в течение 24 часов'],
      image: mural3,
    },
    {
      num: '03',
      title: 'Адаптация изображения',
      subtitle: 'Под архитектуру и палитру',
      desc: 'Учитываем размер стены, высоту потолка, мебель, двери, ниши, изголовья, свет и важные зоны изображения. При необходимости корректируем цвет под материалы проекта.',
      details: ['Кадрирование под архитектуру стены', 'Сохранение важных зон композиции', 'Цветокоррекция под материалы'],
      image: mural5,
    },
    {
      num: '04',
      title: 'Техническая поддержка',
      subtitle: 'От файла к печати до монтажа',
      desc: 'Даём данные по материалам, подготовке стены, срокам, монтажу и производству. Для студий можем готовить информацию для спецификаций.',
      details: ['Технические параметры и спецификации', 'Образцы и цветопробы', 'Сопровождение производства'],
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

  const partnerTiers = [
    { level: 'Start', tagline: 'Для первого знакомства с брендом', benefits: ['Доступ к каталогу', 'Быстрый расчёт', 'Консультация по подбору', 'Визуализация для проекта', 'Регистрация клиента за дизайнером'], highlighted: false },
    { level: 'Partner', tagline: 'Для дизайнеров, которые включают муралы в проекты', benefits: ['Партнёрское вознаграждение', 'Приоритетные расчёты', 'Образцы для согласования', 'Помощь в защите решения', 'Персональный менеджер'], highlighted: true },
    { level: 'Studio', tagline: 'Для интерьерных студий и бюро', benefits: ['Индивидуальные условия', 'Проектное сопровождение', 'Технические материалы', 'Файлы для визуализаций', 'Помощь со спецификациями'], highlighted: false },
    { level: 'Project', tagline: 'Для крупных объектов и коммерческих пространств', benefits: ['Подбор под концепцию объекта', 'Адаптация под большие площади', 'Материалы для HoReCa', 'Расчёт сроков и логистики', 'Сопровождение производства'], highlighted: false },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="max-w-3xl mb-16 lg:mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-caption mb-6">Дизайнерам и архитекторам</p>
              <h1 className="text-display mb-8">Новый инструмент для<br />выразительных интерьеров</h1>
              <p className="text-body-lg max-w-xl mb-10">
                Окоём помогает дизайнерам работать со стеной как с архитектурной и художественной поверхностью. Мы подбираем муралы под концепцию, делаем визуализации, адаптируем изображение под размер, готовим образцы и сопровождаем проект до реализации.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact-form" className="btn-primary">Запросить условия</a>
                <a href="#contact-form" className="btn-outline">Получить каталог</a>
              </div>
            </motion.div>
          </div>

          <div className="mb-12 max-w-2xl">
            <p className="text-caption mb-4">Партнёрство</p>
            <h2 className="text-title mb-6">Партнёрство без лишней сложности</h2>
            <p className="text-body-lg">
              Мы понимаем, как устроена проектная работа: клиенту нужно показать решение, дизайнеру — защитить идею, а поставщику — не подвести на реализации. Поэтому мы выстроили процесс так, чтобы с Окоём было удобно работать.
            </p>
          </div>

          {/* Partner Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/6">
            {partnerTiers.map((tier, i) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`p-6 md:p-8 ${tier.highlighted ? 'bg-foreground text-background' : 'bg-card/30'}`}
              >
                <p className={`text-[10px] uppercase tracking-[0.2em] mb-4 font-light ${tier.highlighted ? 'text-background/60' : 'text-foreground/35'}`}>
                  Уровень
                </p>
                <p className={`text-3xl md:text-4xl font-light mb-3 tracking-[-0.02em] font-display ${tier.highlighted ? '' : 'text-foreground'}`}>
                  {tier.level}
                </p>
                <p className={`text-[13px] font-light mb-6 leading-relaxed ${tier.highlighted ? 'text-background/70' : 'text-foreground/55'}`}>
                  {tier.tagline}
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

          <p className="text-[12px] font-light text-foreground/45 mt-6 max-w-2xl leading-relaxed">
            Условия сотрудничества фиксируются до начала работы. Если дизайнер привёл клиента или заложил мурал в проект, мы защищаем этот проект за ним.
          </p>
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
            <p className="text-caption mb-4">Инструменты</p>
            <h2 className="text-title">Всё, что нужно для согласования и реализации</h2>
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
            <h2 className="text-title">Что Окоём берёт на себя</h2>
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
            <div className="max-w-2xl">
              <p className="text-caption mb-4">Для бизнеса</p>
              <h2 className="text-title mb-6">Когда проекту нужно что-то свежее</h2>
              <p className="text-body-lg">
                Муралы Окоём подходят для проектов, где обычная акцентная стена уже не решает задачу. Они дают интерьеру глубину, настроение и узнаваемость — особенно в спальнях, гостиных, холлах, ресторанах, отелях и общественных пространствах.
              </p>
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
              <p className="text-caption mb-4">Коллекции</p>
              <h3 className="text-h3 mb-6">Коллекции под разные интерьерные задачи</h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {[
                { title: 'Атмосферные абстракции', desc: 'Мягкие градиенты, цветовые поля, дымка и глубина. Для спален, гостиных, лаунж-зон и спокойных премиальных интерьеров.' },
                { title: 'Пейзажная глубина', desc: 'Горы, горизонты, многослойные пространства. Для интерьеров, где важно расширить взгляд и создать ощущение тишины.' },
                { title: 'Ботаника', desc: 'Крупные цветы, листья, природные мотивы. Для мягких, живых, декоративных пространств без ощущения классической фрески.' },
                { title: 'Фигура и природа', desc: 'Женские силуэты, мягкая пластика, растительные мотивы. Для камерных, эмоциональных и атмосферных интерьеров.' },
                { title: 'Авангард и геометрия', desc: 'Графичный ритм, крупные формы, архитектурная композиция. Для современных квартир, офисов, ресторанов и шоурумов.' },
                { title: 'Спокойные архитектурные фоны', desc: 'Деликатные фактуры и формы, которые поддерживают интерьер, не споря с мебелью и материалами.' },
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
              Оставьте контакты, и мы пришлём каталог, условия сотрудничества и примеры материалов для проектной работы.
            </p>
          </div>

          <form className="space-y-8 max-w-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-caption block mb-3">Имя</label>
                <input type="text" className="input-field" placeholder="Ваше имя" />
              </div>
              <div>
                <label className="text-caption block mb-3">Город</label>
                <input type="text" className="input-field" placeholder="Город" />
              </div>
            </div>
            <div>
              <label className="text-caption block mb-3">Студия / профессия</label>
              <input type="text" className="input-field" placeholder="Название студии или профессия" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="text-caption block mb-3">Телефон</label>
                <input type="tel" className="input-field" placeholder="+7 (___) ___-__-__" />
              </div>
              <div>
                <label className="text-caption block mb-3">Email</label>
                <input type="email" className="input-field" placeholder="email@example.com" />
              </div>
            </div>
            <div>
              <label className="text-caption block mb-3">Портфолио или соцсети</label>
              <input type="url" className="input-field" placeholder="Ссылка на сайт, behance, instagram" />
            </div>
            <div>
              <label className="text-caption block mb-3">Комментарий по проекту</label>
              <textarea rows={4} className="input-field resize-none" placeholder="Расскажите о проекте, задаче или интересующем формате" />
            </div>
            <button type="submit" className="btn-primary">
              Получить условия
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Designers;
