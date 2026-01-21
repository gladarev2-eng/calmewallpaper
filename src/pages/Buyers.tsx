import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { materials } from '@/data/products';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const faqs = [
  {
    q: 'Как выбрать размер мурала?',
    a: 'Измерьте ширину и высоту стены. При расчёте мы добавляем 5-10% запаса на подрезку. Наш калькулятор автоматически рассчитает нужную площадь.',
  },
  {
    q: 'Можно ли изменить цвета изображения?',
    a: 'Да, мы адаптируем цветовую гамму под ваш интерьер. Отправьте нам фото комнаты, и мы подготовим визуализацию.',
  },
  {
    q: 'Какой материал выбрать для ванной?',
    a: 'Для влажных помещений рекомендуем винил на флизелине — он влагостойкий и легко моется.',
  },
  {
    q: 'Сколько времени занимает производство?',
    a: 'Стандартный срок — 5-7 рабочих дней. Для партнёров программы — 3-5 дней.',
  },
  {
    q: 'Как осуществляется доставка?',
    a: 'Доставляем по всей России транспортными компаниями. Мурал упакован в жёсткий тубус для защиты.',
  },
  {
    q: 'Можно ли вернуть товар?',
    a: 'Так как каждый заказ изготавливается индивидуально, возврат возможен только при производственном браке.',
  },
];

const Buyers = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      step: '01',
      title: 'Определите тип продукта',
      desc: 'Мурал — для всей стены. Панно — как арт-объект. Фоновые обои — для спокойного фона.',
      image: mural2,
    },
    {
      step: '02',
      title: 'Измерьте стену',
      desc: 'Ширина и высота в сантиметрах. Учтите проёмы, если есть.',
      image: mural3,
    },
    {
      step: '03',
      title: 'Выберите материал',
      desc: 'Для жилых помещений — флизелин. Для влажных зон — винил.',
      image: mural5,
    },
    {
      step: '04',
      title: 'Рассчитайте стоимость',
      desc: 'Используйте калькулятор на сайте или свяжитесь с нами.',
      image: mural4,
    },
  ];

  const materialImages = [mural4, mural6, mural1, mural5, mural2];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Header - Clean */}
      <section className="section-sm bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display mb-4">Покупателям</h1>
            <p className="text-body-lg">
              Всё о выборе, заказе и уходе за продукцией CALMÉ
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to choose - Visual Presentation */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как выбрать</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((item, i) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <span className="font-display text-3xl opacity-50 block mb-2">{item.step}</span>
                  <h3 className="font-display text-2xl mb-2">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials - Visual */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center mb-16">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title mb-6">Выберите подходящий</h2>
            <p className="text-body-lg max-w-2xl mx-auto">
              Каждый материал подобран для своих задач. Закажите бесплатные образцы.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, i) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img 
                    src={materialImages[i % materialImages.length]} 
                    alt={material.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-xl mb-2">{material.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {material.features.map((feature, j) => (
                    <span key={j} className="text-xs px-2 py-1 bg-background">
                      {feature}
                    </span>
                  ))}
                </div>
                {material.forHoreca && (
                  <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs">
                    Для HoReCa
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery & Payment */}
      <section className="section">
        <div className="container-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={mural6}
                  alt="Доставка"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-subtitle mb-4">Доставка</h2>
              <p className="text-muted-foreground mb-4">
                Доставляем по всей России. Мурал упакован в защитный тубус для безопасной транспортировки.
              </p>
              <ul className="space-y-2">
                {[
                  'Москва — 1-2 дня',
                  'Санкт-Петербург — 2-3 дня',
                  'Регионы — 3-10 дней',
                  'Самовывоз из Москвы',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
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
              <div className="aspect-[4/3] overflow-hidden mb-6">
                <img
                  src={mural1}
                  alt="Оплата"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-subtitle mb-4">Оплата</h2>
              <p className="text-muted-foreground mb-4">
                Принимаем оплату картами, банковским переводом, через СБП. Для юридических лиц — по счёту.
              </p>
              <ul className="space-y-2">
                {[
                  'Предоплата 50% при заказе',
                  'Оставшиеся 50% перед отправкой',
                  'Для постоянных клиентов — особые условия',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-foreground rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-card">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-caption mb-4">FAQ</p>
            <h2 className="text-title">Частые вопросы</h2>
          </div>
          
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border bg-background"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-narrow text-center">
          <h2 className="text-title mb-6">Остались вопросы?</h2>
          <p className="text-body-lg mb-8">
            Свяжитесь с нами — мы поможем с выбором
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalog" className="btn-primary">
              Перейти в каталог
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

export default Buyers;