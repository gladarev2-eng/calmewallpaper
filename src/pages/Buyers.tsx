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
import ProcessSteps from '@/components/buyers/ProcessSteps';
import MaterialsSection from '@/components/buyers/MaterialsSection';
import FAQAccordion from '@/components/buyers/FAQAccordion';
import DeliveryPayment from '@/components/buyers/DeliveryPayment';
import ServiceGuarantees from '@/components/buyers/ServiceGuarantees';

const faqs = [
  {
    q: 'Как выбрать размер?',
    a: 'Измерьте ширину и высоту стены в сантиметрах. Мы добавим необходимый запас на подрезку и рассчитаем точную стоимость с учётом материала.',
  },
  {
    q: 'Можно ли адаптировать цвета под интерьер?',
    a: 'Да, мы бесплатно скорректируем цветовую гамму под ваше пространство. Отправьте фото комнаты — мы подготовим визуализацию.',
  },
  {
    q: 'Какой материал подойдёт для влажных помещений?',
    a: 'Для ванных и зон с повышенной влажностью рекомендуем винил на флизелине — он устойчив к воде и перепадам температур.',
  },
  {
    q: 'Сколько занимает производство?',
    a: 'Стандартный срок — 5–7 рабочих дней. Для партнёров программы лояльности — 3–5 дней.',
  },
  {
    q: 'Возможен ли возврат?',
    a: 'Каждый заказ изготавливается индивидуально, поэтому возврат возможен только при обнаружении производственного дефекта.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Выберите изображение',
    desc: 'Найдите работу в каталоге или обсудите с нами индивидуальный вариант. Мы бесплатно адаптируем цвета под ваш интерьер.',
    bullets: [
      'Более 100 работ в каталоге',
      'Фильтрация по стилю и помещению',
      'Бесплатная адаптация палитры',
    ],
    image: mural2,
    cta: { label: 'Перейти в каталог', href: '/catalog' },
  },
  {
    step: '02',
    title: 'Укажите размеры стены',
    desc: 'Измерьте ширину и высоту в сантиметрах. Мы рассчитаем точную стоимость и подготовим макет под ваши пропорции.',
    bullets: [
      'Автоматический расчёт площади',
      'Учёт запаса на подрезку',
      'Работа с нестандартными формами',
    ],
    image: mural3,
  },
  {
    step: '03',
    title: 'Выберите материал',
    desc: 'Пять типов покрытий для разных задач. Рекомендуем заказать бесплатные образцы, чтобы оценить текстуру и тактильные ощущения.',
    bullets: [
      'Флизелин — для жилых помещений',
      'Винил — для влажных зон',
      'Текстиль и холст — для особых пространств',
    ],
    image: mural5,
    cta: { label: 'Заказать образцы', href: '/contacts' },
  },
  {
    step: '04',
    title: 'Оформите заказ',
    desc: 'Утвердите финальный макет, оплатите 50% и ожидайте изготовление. Мы свяжемся для подтверждения всех деталей.',
    bullets: [
      'Производство 5–7 рабочих дней',
      'Доставка по всей России',
      'Инструкция по монтажу в комплекте',
    ],
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
              Сопровождаем на каждом этапе — от выбора изображения до установки в вашем пространстве
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service & Guarantees */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="mb-16">
            <p className="text-caption mb-4">Сервис</p>
            <h2 className="text-title">Что мы гарантируем</h2>
          </div>
          <ServiceGuarantees />
        </div>
      </section>

      {/* Process Steps */}
      <section className="section bg-card/50">
        <div className="container-wide">
          <div className="mb-20">
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Четыре шага к результату</h2>
          </div>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* Materials */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="mb-16">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title">Глубокая детализация и тактильные ощущения</h2>
          </div>
          <MaterialsSection materials={materials} images={[mural4, mural6, mural1, mural5, heroMural]} />
        </div>
      </section>

      {/* Delivery & Payment */}
      <section className="section bg-card/50">
        <div className="container-wide">
          <DeliveryPayment image={mural1} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-background">
        <div className="container-narrow">
          <div className="mb-16">
            <p className="text-caption mb-4">Вопросы</p>
            <h2 className="text-title">Частые вопросы</h2>
          </div>
          <FAQAccordion faqs={faqs} />
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
            <h2 className="text-title mb-6">Расскажите о вашем проекте</h2>
            <p className="text-body-lg mb-12 max-w-md mx-auto">
              Мы подберём решение и подготовим визуализацию
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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

export default Buyers;
