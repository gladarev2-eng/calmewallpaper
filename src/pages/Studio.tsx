import { motion } from 'framer-motion';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';

const Studio = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroMural}
            alt="О студии CALMÉ"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="container-wide relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display mb-4">О студии</h1>
            <p className="text-body-lg max-w-2xl">
              CALMÉ — бутик настенных покрытий и авторских панно
            </p>
          </motion.div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-caption mb-6">Манифест</p>
            <h2 className="text-title mb-8">
              Мы создаём не декор,<br />а атмосферу интерьера
            </h2>
            <p className="text-body-lg mb-6">
              CALMÉ — это изображения с невероятной детализацией, которые производят сильное впечатление в пространстве и раскрываются при рассмотрении вблизи.
            </p>
            <p className="text-body-lg">
              Наши работы — это не узор и не фоновый декор. Это «живая архитектура стены», которая трансформирует пространство и создаёт уникальную атмосферу.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: 'Масштаб',
                desc: 'Создаём полотна шириной до 6 метров, сохраняя безупречную детализацию в каждом сантиметре',
              },
              {
                title: 'Детализация',
                desc: 'Наши изображения раскрываются при рассмотрении вблизи — каждый элемент проработан с ювелирной точностью',
              },
              {
                title: 'Индивидуальность',
                desc: 'Адаптируем каждую работу под конкретное пространство — размеры, пропорции, цветовую гамму',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-6xl text-muted-foreground/20 block mb-4">
                  0{i + 1}
                </span>
                <h3 className="font-display text-2xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
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
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={mural1}
                  alt="Подход CALMÉ"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
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
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title mb-6">Только лучшее</h2>
            <p className="text-body-lg">
              Используем премиальные материалы ведущих европейских производителей. Каждый материал подобран для своих задач.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Флизелин премиум',
                desc: 'Матовое покрытие с благородной текстурой. Идеально для жилых интерьеров.',
              },
              {
                name: 'Флизелин коммерческий',
                desc: 'Усиленная структура для общественных пространств с повышенной проходимостью.',
              },
              {
                name: 'Винил на флизелине',
                desc: 'Максимальная защита поверхности. Рекомендован для HoReCa.',
              },
              {
                name: 'Текстильное покрытие',
                desc: 'Тактильная текстура ткани. Создаёт особую атмосферу уюта.',
              },
              {
                name: 'Холст',
                desc: 'Для панно. УФ-печать на натуральном холсте с подрамником.',
              },
            ].map((material, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-background"
              >
                <h3 className="font-display text-lg mb-2">{material.name}</h3>
                <p className="text-sm text-muted-foreground">{material.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Studio;
