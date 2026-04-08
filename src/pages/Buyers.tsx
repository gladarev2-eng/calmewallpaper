import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { materials } from '@/data/products';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import heroMural from '@/assets/hero-mural.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';
import MaterialsSection from '@/components/buyers/MaterialsSection';
import FAQAccordion from '@/components/buyers/FAQAccordion';
import DeliveryPayment from '@/components/buyers/DeliveryPayment';

const faqs = [
  { q: 'Как выбрать размер?', a: 'Измерьте ширину и высоту стены в сантиметрах. Мы добавим необходимый запас на подрезку и рассчитаем точную стоимость.' },
  { q: 'Можно ли адаптировать цвета под интерьер?', a: 'Да, мы бесплатно скорректируем цветовую гамму под ваше пространство.' },
  { q: 'Какой материал подойдёт для влажных помещений?', a: 'Для ванных рекомендуем винил на флизелине — он устойчив к воде и перепадам температур.' },
  { q: 'Сколько занимает производство?', a: 'Стандартный срок — 5–7 рабочих дней. Для партнёров — 3–5 дней.' },
  { q: 'Возможен ли возврат?', a: 'Каждый заказ изготавливается индивидуально, возврат возможен только при производственном дефекте.' },
];

const steps = [
  {
    step: '01',
    title: 'Выберите изображение',
    desc: 'Найдите работу в каталоге или обсудите индивидуальный вариант. Мы бесплатно адаптируем цвета под ваш интерьер.',
    image: mural2,
  },
  {
    step: '02',
    title: 'Укажите размеры стены',
    desc: 'Измерьте ширину и высоту в сантиметрах. Мы рассчитаем точную стоимость и подготовим макет под ваши пропорции.',
    image: mural3,
  },
  {
    step: '03',
    title: 'Выберите материал',
    desc: 'Пять типов покрытий для разных задач. Закажите бесплатные образцы, чтобы оценить текстуру.',
    image: mural5,
  },
  {
    step: '04',
    title: 'Оформите заказ',
    desc: 'Утвердите финальный макет, оплатите 50% и ожидайте изготовление. Производство 5–7 рабочих дней.',
    image: mural4,
  },
];

const Buyers = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero */}
      <section className="section-sm bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-caption mb-6">Покупателям</p>
            <h1 className="text-display mb-8">Как это работает</h1>
            <p className="text-body-lg max-w-xl">
              Персональный сервис на каждом этапе — от выбора изображения до установки в вашем пространстве
            </p>
          </motion.div>
        </div>
      </section>

      {/* Elegant Step-by-Step Process with Large Serif Numbers */}
      <section className="section bg-card/30">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Четыре шага к результату</h2>
          </motion.div>

          <div className="space-y-0">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7 }}
                className="border-t border-foreground/8 py-16 md:py-20 lg:py-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  {/* Large Serif Number */}
                  <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-3' : ''}`}>
                    <span className="text-[72px] md:text-[96px] lg:text-[120px] font-display font-light leading-none tracking-[-0.04em] text-foreground/8">
                      {item.step}
                    </span>
                  </div>

                  {/* Image */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1.5s]"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : 'lg:order-3'}`}>
                    <h3 className="text-h3 mb-4">{item.title}</h3>
                    <p className="text-body-lg">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-foreground/8" />
          </div>
        </div>
      </section>

      {/* Service Guarantees — Concierge Style */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="mb-20">
            <p className="text-caption mb-4">Сервис</p>
            <h2 className="text-title">Премиальное сопровождение</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
            {[
              { title: 'Адаптация под интерьер', desc: 'Бесплатно подберём цветовую гамму под ваше помещение и подготовим визуализацию.' },
              { title: 'Гарантия качества', desc: 'Производство в России. Экологичные материалы с сертификатами. Гарантия на печать.' },
              { title: 'Надёжная доставка', desc: 'Упаковка в защитный тубус. Доставка по всей России за 3–10 дней.' },
              { title: 'Поддержка на всех этапах', desc: 'Консультируем по выбору материала, размерам и монтажу. Отвечаем в течение часа.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="border-t border-foreground/8 pt-6"
              >
                <h3 className="text-[15px] font-light mb-3 text-foreground">{item.title}</h3>
                <p className="text-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section bg-card/30">
        <div className="container-wide">
          <div className="mb-20">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title">Глубокая детализация и тактильные ощущения</h2>
          </div>
          <MaterialsSection materials={materials} images={[mural4, mural6, mural1, mural5, heroMural]} />
        </div>
      </section>

      {/* Delivery & Payment */}
      <section className="section bg-background">
        <div className="container-wide">
          <DeliveryPayment image={mural1} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-card/30">
        <div className="container-narrow">
          <div className="mb-20">
            <p className="text-caption mb-4">Вопросы</p>
            <h2 className="text-title">Частые вопросы</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg bg-background">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-title mb-6">Расскажите о вашем проекте</h2>
            <p className="text-body-lg mb-12 max-w-md mx-auto">
              Мы подберём решение и подготовим визуализацию
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/catalog" className="btn-primary">Смотреть каталог</Link>
              <Link to="/contacts" className="btn-outline">Связаться с нами</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Buyers;
