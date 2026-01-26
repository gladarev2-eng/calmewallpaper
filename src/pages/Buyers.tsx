import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { materials } from '@/data/products';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';
import ProcessSteps from '@/components/buyers/ProcessSteps';
import MaterialsSection from '@/components/buyers/MaterialsSection';
import FAQAccordion from '@/components/buyers/FAQAccordion';
import DeliveryPayment from '@/components/buyers/DeliveryPayment';
import ServiceGuarantees from '@/components/buyers/ServiceGuarantees';

const faqs = [
  {
    q: 'Как выбрать размер мурала?',
    a: 'Измерьте ширину и высоту стены в сантиметрах. При расчёте мы добавляем 5-10% запаса на подрезку. Калькулятор на странице товара автоматически рассчитает нужную площадь и стоимость.',
  },
  {
    q: 'Можно ли изменить цвета изображения?',
    a: 'Да, мы бесплатно адаптируем цветовую гамму под ваш интерьер. Отправьте нам фото комнаты через форму на сайте или в WhatsApp, и мы подготовим визуализацию.',
  },
  {
    q: 'Какой материал выбрать для ванной?',
    a: 'Для влажных помещений рекомендуем винил на флизелине — он влагостойкий, легко моется и устойчив к перепадам температур.',
  },
  {
    q: 'Сколько времени занимает производство?',
    a: 'Стандартный срок производства — 5-7 рабочих дней. Для дизайнеров-партнёров программы лояльности — 3-5 дней.',
  },
  {
    q: 'Можно ли вернуть товар?',
    a: 'Так как каждый заказ изготавливается индивидуально под размеры вашей стены, возврат возможен только при обнаружении производственного брака.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Выберите изображение',
    desc: 'Найдите мурал или панно в нашем каталоге. Мы можем адаптировать цветовую гамму под ваш интерьер — это бесплатно.',
    bullets: [
      'Более 100 изображений в каталоге',
      'Фильтры по стилю, цвету и помещению',
      'Бесплатная адаптация цветов',
    ],
    image: mural2,
    cta: { label: 'Перейти в каталог', href: '/catalog' },
  },
  {
    step: '02',
    title: 'Укажите размеры стены',
    desc: 'Измерьте ширину и высоту стены в сантиметрах. Калькулятор на странице товара рассчитает точную стоимость с учётом материала.',
    bullets: [
      'Автоматический расчёт площади',
      'Запас на подрезку 5-10%',
      'Учёт проёмов и ниш',
    ],
    image: mural3,
  },
  {
    step: '03',
    title: 'Выберите материал',
    desc: 'У нас 5 типов материалов для разных задач. Рекомендуем заказать бесплатные образцы, чтобы оценить текстуру.',
    bullets: [
      'Флизелин — для жилых помещений',
      'Винил — для влажных зон и HoReCa',
      'Текстиль и холст — для премиум-интерьеров',
    ],
    image: mural5,
    cta: { label: 'Заказать образцы', href: '/contacts' },
  },
  {
    step: '04',
    title: 'Оформите заказ',
    desc: 'Добавьте товар в корзину, оплатите 50% и ожидайте изготовление. Мы свяжемся для подтверждения деталей.',
    bullets: [
      'Производство 5-7 рабочих дней',
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
      <section className="section-sm bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display mb-4">Покупателям</h1>
            <p className="text-body-lg">
              От выбора изображения до установки — сопровождаем на каждом этапе
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service & Guarantees */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-caption mb-4">Сервис</p>
            <h2 className="text-title">Что мы гарантируем</h2>
          </div>
          <ServiceGuarantees />
        </div>
      </section>

      {/* Process Steps - Sequential Vertical Presentation */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-20">
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как заказать</h2>
          </div>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* Materials - Image + Structured List */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title">Выберите подходящий</h2>
          </div>
          <MaterialsSection materials={materials} image={mural6} />
        </div>
      </section>

      {/* Delivery & Payment - Image + Structured Text */}
      <section className="section bg-card">
        <div className="container-wide">
          <DeliveryPayment image={mural1} />
        </div>
      </section>

      {/* FAQ - Open by Default */}
      <section className="section">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-caption mb-4">FAQ</p>
            <h2 className="text-title">Частые вопросы</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-card">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-title mb-4">Готовы начать?</h2>
            <p className="text-body-lg mb-8 max-w-lg mx-auto">
              Выберите изображение из каталога или свяжитесь с нами для консультации
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/catalog" className="btn-primary">
                Перейти в каталог
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
