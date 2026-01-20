import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { materials } from '@/data/products';

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-sm bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-display mb-4">Покупателям</h1>
            <p className="text-body-lg">
              Всё, что нужно знать о выборе, заказе и уходе за продукцией CALMÉ
            </p>
          </motion.div>
        </div>
      </section>

      {/* How to choose */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-title text-center mb-12">Как выбрать</h2>
            
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Определите тип продукта',
                  desc: 'Мурал — для оформления всей стены. Панно — как самостоятельный арт-объект. Фоновые обои — для создания спокойного фона.',
                },
                {
                  step: '02',
                  title: 'Измерьте стену',
                  desc: 'Ширина и высота стены в сантиметрах. Учтите дверные проёмы и окна, если они есть.',
                },
                {
                  step: '03',
                  title: 'Выберите материал',
                  desc: 'Для жилых помещений — флизелин премиум. Для влажных зон — винил. Для HoReCa — коммерческие варианты.',
                },
                {
                  step: '04',
                  title: 'Рассчитайте стоимость',
                  desc: 'Используйте калькулятор на сайте или свяжитесь с нами для индивидуального расчёта.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <span className="font-display text-4xl text-muted-foreground/30 flex-shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-display text-xl mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section bg-card">
        <div className="container-wide">
          <h2 className="text-title text-center mb-12">Материалы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, i) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-background"
              >
                <h3 className="font-display text-lg mb-2">{material.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                <ul className="space-y-2 mb-4">
                  {material.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs">
                      <span className="w-1 h-1 bg-foreground rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
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
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-subtitle mb-6">Оплата</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
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
              </div>
            </div>
            <div>
              <h2 className="text-subtitle mb-6">Доставка</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care */}
      <section className="section bg-card">
        <div className="container-narrow">
          <h2 className="text-title text-center mb-12">Уход за покрытием</h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-background">
              <h3 className="font-display text-lg mb-2">Флизелин премиум</h3>
              <p className="text-sm text-muted-foreground">
                Сухая чистка мягкой щёткой или тканью. Избегайте влаги и прямого солнечного света.
              </p>
            </div>
            <div className="p-6 bg-background">
              <h3 className="font-display text-lg mb-2">Винил</h3>
              <p className="text-sm text-muted-foreground">
                Влажная уборка с мягкими моющими средствами. Можно протирать влажной тканью.
              </p>
            </div>
            <div className="p-6 bg-background">
              <h3 className="font-display text-lg mb-2">Холст</h3>
              <p className="text-sm text-muted-foreground">
                Протирка сухой мягкой тканью. Избегайте влаги и прямого солнечного света.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-narrow">
          <h2 className="text-title text-center mb-12">Частые вопросы</h2>
          
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-border"
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
      <section className="section bg-card">
        <div className="container-narrow text-center">
          <h2 className="text-title mb-6">Остались вопросы?</h2>
          <p className="text-body-lg mb-8">
            Свяжитесь с нами — мы поможем с выбором и ответим на все вопросы
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
