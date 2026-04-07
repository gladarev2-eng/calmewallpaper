import { motion } from 'framer-motion';
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
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroMural}
            alt="CALMÉ Studio"
            className="w-full h-full object-cover"
            style={{ animation: 'slowZoom 10s ease-out forwards' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
        </div>

        <div className="relative z-10 container-wide pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] font-light uppercase tracking-[0.25em] text-white/50 mb-4">О студии</p>
            <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-extralight text-white leading-[1.05] tracking-[-0.03em]">
              На пересечении дизайна<br />интерьера и цифрового искусства
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* Manifesto */}
      <section className="section-lg bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-caption mb-10">Манифест</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extralight leading-[1.2] tracking-[-0.02em] mb-10 text-foreground">
              Мы создаём не декоративное покрытие,<br />
              а визуальную среду
            </h2>
            <p className="text-body-lg max-w-xl mx-auto">
              CALMÉ — это архитектурная композиция на стене. Изображения с глубокой 
              детализацией и мягкой передачей цвета, приближенной к живописи, которые 
              становятся частью пространства, а не его украшением.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy — Image + Text */}
      <section className="bg-background">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="aspect-square lg:aspect-auto lg:min-h-[600px]"
            >
              <img src={mural1} alt="Философия CALMÉ" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center p-8 md:p-14 lg:p-20 xl:p-24 bg-card/50"
            >
              <div>
                <p className="text-caption mb-5">Философия</p>
                <h2 className="text-title mb-8">Бутик, а не конвейер</h2>
                <p className="text-body-lg mb-10">
                  Каждый заказ — индивидуальная работа. От адаптации изображения 
                  под конкретное пространство до контроля качества печати. 
                  Мы не производим обои тысячами рулонов.
                </p>
                <div className="space-y-5">
                  {[
                    'Персональные консультации по выбору',
                    'Адаптация цветов под освещение интерьера',
                    'Визуализация в вашем пространстве',
                    'Контроль качества каждого заказа',
                  ].map((item, i) => (
                    <p key={i} className="text-[13px] font-light text-foreground/45 flex items-center gap-4">
                      <span className="w-6 h-[0.5px] bg-foreground/20 shrink-0" />
                      {item}
                    </p>
                  ))}
                </div>
                <div className="mt-12">
                  <Link to="/contacts" className="btn-outline">
                    Связаться с нами
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values — large visuals with text */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <p className="text-caption mb-4">Подход</p>
            <h2 className="text-title">Что нас отличает</h2>
          </motion.div>

          <div className="space-y-24 md:space-y-32">
            {[
              {
                title: 'Масштаб',
                subtitle: 'Полотна до 6 метров без единого шва',
                desc: 'Глубокая детализация и мягкая передача цвета сохраняются на каждом сантиметре. Изображение раскрывается и вблизи, и с расстояния — как живопись.',
                image: mural3,
              },
              {
                title: 'Детализация',
                subtitle: 'Каждая текстура видна с расстояния 30 см',
                desc: 'Разрешение до 45 000 пикселей. Каждая прожилка камня, каждый мазок кисти выглядят так, будто нанесены вручную. Это не печать — это перенос художественного произведения.',
                image: mural2,
              },
              {
                title: 'Индивидуальность',
                subtitle: 'Каждая работа адаптируется под ваш интерьер',
                desc: 'Цветокоррекция, масштабирование, кадрирование. Мы работаем с пропорциями вашего пространства, чтобы изображение стало его органичной частью.',
                image: mural5,
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={value.image} alt={value.title} className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-[1.2s]" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-2xl lg:text-3xl font-extralight mb-3 tracking-[-0.02em] text-foreground">{value.title}</h3>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-foreground/35 mb-8 font-light">{value.subtitle}</p>
                  <p className="text-body-lg">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials — larger images */}
      <section className="section bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title">Глубокая детализация и мягкая передача цвета</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Флизелин премиум', desc: 'Матовое покрытие с благородной текстурой, приближенное к фактуре художественной бумаги', image: mural4 },
              { name: 'Текстильное покрытие', desc: 'Тактильная текстура ткани для пространств, где важна глубина ощущений', image: mural6 },
              { name: 'Холст для панно', desc: 'Натуральный холст с передачей цвета, приближенной к галерейной живописи', image: mural1 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden mb-5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]" />
                </div>
                <h3 className="text-[15px] font-light mb-2 text-foreground">{item.name}</h3>
                <p className="text-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/buyers" className="btn-outline">
              Подробнее о материалах
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg bg-card/50">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-title mb-6">
              Расскажите о вашем проекте
            </h2>
            <p className="text-body-lg mb-12 max-w-md mx-auto">
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

export default Studio;
