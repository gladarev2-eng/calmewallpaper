import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const Studio = () => {
  const [activeValue, setActiveValue] = useState(0);

  const values = [
    {
      num: '01',
      title: 'Масштаб',
      subtitle: 'До 6 метров без швов',
      desc: 'Создаём полотна шириной до 6 метров, сохраняя безупречную детализацию на каждом сантиметре.',
      features: ['Бесшовная печать', 'Сохранение пропорций', 'Адаптация под любую высоту'],
      image: mural3,
    },
    {
      num: '02',
      title: 'Детализация',
      subtitle: '45K пикселей / 2400 DPI',
      desc: 'Наши изображения раскрываются при рассмотрении вблизи — каждая текстура, каждый мазок.',
      features: ['Сверхвысокое разрешение', 'Глубина цвета', 'Видимые детали с 30 см'],
      image: mural2,
    },
    {
      num: '03',
      title: 'Индивидуальность',
      subtitle: 'Адаптация под ваш интерьер',
      desc: 'Каждая работа адаптируется под конкретное пространство — цвета, масштаб, композиция.',
      features: ['Цветокоррекция', 'Кадрирование', 'Визуализация в интерьере'],
      image: mural5,
    },
  ];

  const materials = [
    { name: 'Флизелин премиум', desc: 'Матовое покрытие с благородной текстурой для жилых помещений', image: mural4 },
    { name: 'Текстильное покрытие', desc: 'Тактильная текстура ткани для премиум-интерьеров', image: mural6 },
    { name: 'Холст для панно', desc: 'Натуральный холст с УФ-печатью для галерейного эффекта', image: mural1 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero - Full Screen Dramatic */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroMural}
            alt="CALMÉ Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground/60" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-background px-5"
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-4 opacity-80">Бутик настенных покрытий</p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6">CALMÉ</h1>
          <p className="text-lg sm:text-xl max-w-xl mx-auto opacity-90">
            Создаём атмосферу интерьера через искусство масштаба и детализации
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </section>

      {/* Manifesto - Large Quote Block */}
      <section className="section bg-card">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-caption mb-8">Манифест</p>
            <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-8">
              «Мы создаём не декор,<br />
              а живую архитектуру стены»
            </blockquote>
            <p className="text-body-lg max-w-2xl mx-auto">
              CALMÉ — это изображения с невероятной детализацией, которые производят 
              сильное впечатление в пространстве и раскрываются при рассмотрении вблизи.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy - Horizontal Image + Text */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-square lg:aspect-auto"
            >
              <img
                src={mural1}
                alt="Философия CALMÉ"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center p-8 md:p-12 lg:p-16 xl:p-20 bg-card"
            >
              <div>
                <p className="text-caption mb-4">Философия</p>
                <h2 className="text-title mb-6">Бутик, а не конвейер</h2>
                <p className="text-body-lg mb-8">
                  Мы не производим обои тысячами рулонов. Каждый заказ — это индивидуальная работа: 
                  от адаптации изображения под ваше пространство до контроля качества печати.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Персональные консультации по выбору',
                    'Адаптация цветов под ваш интерьер',
                    'Визуализация в вашем пространстве',
                    'Контроль качества каждого заказа',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-sm"
                    >
                      <span className="w-8 h-px bg-foreground" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <Link to="/designers" className="btn-outline inline-flex items-center gap-2">
                  Связаться с нами
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values - Interactive Tabs with Large Image */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <p className="text-caption mb-4">Ценности</p>
            <h2 className="text-title">Что нас отличает</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Side */}
            <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeValue}
                  src={values[activeValue].image}
                  alt={values[activeValue].title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-background">
                <motion.p
                  key={`num-${activeValue}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-6xl md:text-7xl opacity-30"
                >
                  {values[activeValue].num}
                </motion.p>
              </div>
            </div>

            {/* Tabs Side */}
            <div className="flex flex-col justify-center order-1 lg:order-2">
              {values.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveValue(i)}
                  className={`cursor-pointer border-b border-border py-6 md:py-8 transition-all duration-300 ${
                    activeValue === i ? 'opacity-100' : 'opacity-50 hover:opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-caption font-mono">{value.num}</span>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl md:text-3xl mb-1">{value.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{value.subtitle}</p>
                      
                      <AnimatePresence>
                        {activeValue === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm mb-4">{value.desc}</p>
                            <div className="flex flex-wrap gap-2">
                              {value.features.map((feature, fi) => (
                                <span
                                  key={fi}
                                  className="text-xs px-3 py-1.5 bg-background rounded-full"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials Preview - Horizontal Scroll Feel */}
      <section className="section">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-caption mb-4">Материалы</p>
              <h2 className="text-title">Только лучшее</h2>
            </div>
            <p className="text-body max-w-md">
              Премиальные материалы ведущих европейских производителей для безупречного результата
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {materials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/buyers" className="btn-outline inline-flex items-center gap-2">
              Все материалы и цены
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Full Width Image Background */}
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="absolute inset-0">
          <img
            src={mural4}
            alt="CTA Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        
        <div className="relative z-10 container-narrow text-center text-background">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6">
              Начнём сотрудничество?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">
              Расскажите о вашем проекте — мы подберём решение
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/catalog" className="btn-primary bg-background text-foreground hover:bg-background/90">
                Смотреть каталог
              </Link>
              <Link to="/contacts" className="btn-outline border-background text-background hover:bg-background hover:text-foreground">
                Связаться с нами
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Studio;