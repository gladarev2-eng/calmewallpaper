import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const Designers = () => {
  const services = [
    {
      title: 'Бесплатные визуализации',
      desc: 'Подготовим визуализации для презентации клиентам',
      image: mural2,
    },
    {
      title: 'Адаптация под интерьер',
      desc: 'Скорректируем цвета и пропорции под конкретное пространство',
      image: mural3,
    },
    {
      title: 'Образцы материалов',
      desc: 'Пришлём образцы для презентации клиентам',
      image: mural5,
    },
    {
      title: 'Консультации и поддержка',
      desc: 'Поможем с выбором и техническими вопросами',
      image: mural6,
    },
  ];

  const horecaServices = [
    {
      title: 'Материалы для HoReCa',
      desc: 'Винил на флизелине с повышенной износостойкостью, влагостойкость, антивандальные свойства',
      image: mural4,
    },
    {
      title: 'Масштабные проекты',
      desc: 'Опыт работы с полотнами до 6 метров в ширину и многометровыми панорамами',
      image: mural3,
    },
    {
      title: 'Адаптация под бренд',
      desc: 'Корректируем цветовую гамму под брендбук заведения или корпоративные цвета',
      image: mural2,
    },
    {
      title: 'Монтаж под ключ',
      desc: 'Профессиональный монтаж нашей командой или рекомендованными подрядчиками',
      image: mural5,
    },
  ];

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
    <div className="min-h-screen">
      {/* Hero + Loyalty Program Combined */}
      <section className="section-lg bg-card">
        <div className="container-wide">
          {/* Hero Header */}
          <div className="max-w-3xl mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-caption mb-6">Партнёрская программа</p>
              <h1 className="text-display mb-6">
                Среда для<br />профессионалов
              </h1>
              <p className="text-body-lg">
                Чем больше проектов — тем выгоднее условия. Четыре уровня партнёрства с растущими привилегиями.
              </p>
            </motion.div>
          </div>

          {/* Loyalty Tiers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10">
            {loyaltyTiers.map((tier, i) => (
              <motion.div
                key={tier.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 md:p-8 ${tier.highlighted ? 'bg-foreground text-background' : 'bg-background'}`}
              >
                <p className={`text-[10px] uppercase tracking-[0.2em] mb-4 ${tier.highlighted ? 'text-background/70' : 'text-muted-foreground'}`}>
                  {tier.level}
                </p>
                <p className="font-display text-5xl md:text-6xl font-light mb-2">
                  {tier.discount}
                </p>
                <p className={`text-sm mb-6 ${tier.highlighted ? 'text-background/80' : 'text-muted-foreground'}`}>
                  {tier.condition}
                </p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, j) => (
                    <li key={j} className={`text-sm flex items-start gap-2 ${tier.highlighted ? 'text-background' : 'text-foreground'}`}>
                      <span className={tier.highlighted ? 'text-background/50' : 'text-muted-foreground'}>•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Visual Presentation */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Что мы предлагаем</p>
            <h2 className="text-title">Сервис для дизайнеров</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((item, i) => (
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
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <h3 className="font-display text-2xl mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HoReCa - Visual Presentation */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Для бизнеса</p>
            <h2 className="text-title">HoReCa проекты</h2>
            <p className="text-body-lg mt-4 max-w-2xl mx-auto">
              Работаем с отелями, ресторанами, офисами и общественными пространствами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {horecaServices.map((item, i) => (
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
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <h3 className="font-display text-2xl mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section bg-card">
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