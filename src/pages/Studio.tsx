import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const Studio = () => {
  const values = [
    {
      title: 'Масштаб',
      desc: 'Создаём полотна шириной до 6 метров, сохраняя безупречную детализацию',
      image: mural3,
    },
    {
      title: 'Детализация',
      desc: 'Наши изображения раскрываются при рассмотрении вблизи',
      image: mural2,
    },
    {
      title: 'Индивидуальность',
      desc: 'Адаптируем каждую работу под конкретное пространство',
      image: mural5,
    },
  ];

  const materials = [
    {
      name: 'Флизелин премиум',
      desc: 'Матовое покрытие с благородной текстурой',
      image: mural4,
    },
    {
      name: 'Текстильное покрытие',
      desc: 'Тактильная текстура ткани для особой атмосферы',
      image: mural6,
    },
    {
      name: 'Холст для панно',
      desc: 'Натуральный холст с УФ-печатью',
      image: mural1,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero - Clean */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-display mb-6">О студии</h1>
            <p className="text-body-lg">
              CALMÉ — бутик настенных покрытий и авторских панно
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto with image */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={heroMural}
                  alt="CALMÉ Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-caption mb-6">Манифест</p>
              <h2 className="text-title mb-8">
                Мы создаём не декор,<br />а атмосферу интерьера
              </h2>
              <p className="text-body-lg mb-6">
                CALMÉ — это изображения с невероятной детализацией, которые производят сильное впечатление в пространстве и раскрываются при рассмотрении вблизи.
              </p>
              <p className="text-body-lg">
                Наши работы — это не узор и не фоновый декор. Это «живая архитектура стены», которая трансформирует пространство.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values - Visual Presentation */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Ценности</p>
            <h2 className="text-title">Что нас отличает</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[3/4] overflow-hidden"
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

      {/* Approach */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-caption mb-4">Подход</p>
              <h2 className="text-title mb-6">Бутик, а не конвейер</h2>
              <p className="text-body-lg mb-6">
                Мы не производим обои тысячами рулонов. Каждый заказ — это индивидуальная работа: от адаптации изображения под ваше пространство до контроля качества печати.
              </p>
              <ul className="space-y-3">
                {[
                  'Персональные консультации по выбору',
                  'Адаптация цветов под ваш интерьер',
                  'Визуализация в вашем пространстве',
                  'Контроль качества каждого заказа',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={mural1}
                  alt="Подход CALMÉ"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Materials - Visual */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title mb-6">Только лучшее</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Используем премиальные материалы ведущих европейских производителей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-4">
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

          <div className="text-center mt-12">
            <Link to="/buyers" className="btn-outline">
              Все материалы
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-narrow text-center">
          <h2 className="text-title mb-6">Начнём сотрудничество?</h2>
          <p className="text-body-lg mb-8">
            Расскажите о вашем проекте — мы подберём решение
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalog" className="btn-primary">
              Смотреть каталог
            </Link>
            <Link to="/designers" className="btn-outline">
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Studio;