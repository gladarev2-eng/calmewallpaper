import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calculator, Palette, FileText, ChevronDown } from 'lucide-react';
import { materials } from '@/data/products';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';
import ProcessSteps from '@/components/buyers/ProcessSteps';
import MaterialsGrid from '@/components/buyers/MaterialsGrid';
import FAQAccordion from '@/components/buyers/FAQAccordion';
import DeliveryPayment from '@/components/buyers/DeliveryPayment';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

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

const steps = [
  {
    step: '01',
    title: 'Выберите изображение',
    desc: 'Найдите мурал или панно в нашем каталоге. Можем адаптировать цвета под ваш интерьер.',
    image: mural2,
  },
  {
    step: '02',
    title: 'Укажите размеры',
    desc: 'Измерьте ширину и высоту стены в сантиметрах. Калькулятор рассчитает стоимость.',
    image: mural3,
  },
  {
    step: '03',
    title: 'Выберите материал',
    desc: 'Флизелин для жилых помещений, винил для влажных зон и HoReCa.',
    image: mural5,
  },
  {
    step: '04',
    title: 'Оформите заказ',
    desc: 'Добавьте в корзину, оплатите 50% и ждите доставку через 5-7 дней.',
    image: mural4,
  },
];

const materialImages = [mural4, mural6, mural1, mural5, mural2];

const quickLinks = [
  {
    icon: Calculator,
    title: 'Рассчитать стоимость',
    desc: 'Калькулятор на странице любого товара',
    href: '/catalog',
    cta: 'В каталог',
  },
  {
    icon: Palette,
    title: 'Заказать образцы',
    desc: 'Бесплатные образцы материалов',
    href: '/contacts',
    cta: 'Связаться',
  },
  {
    icon: FileText,
    title: 'Консультация',
    desc: 'Поможем с выбором и адаптацией',
    href: '/contacts',
    cta: 'Написать',
  },
];

const Buyers = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero - Value Proposition */}
      <section className="section bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-display mb-4">Покупателям</h1>
            <p className="text-body-lg mb-8">
              От выбора изображения до установки — мы сопровождаем вас на каждом этапе
            </p>
          </motion.div>

          {/* Quick Actions - High Priority CTAs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {quickLinks.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="block p-6 border border-border bg-background hover:bg-accent/5 transition-colors group"
                >
                  <item.icon className="w-6 h-6 mb-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <h3 className="font-display text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.cta} →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps - Visual Guide */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-caption mb-4">Процесс</p>
            <h2 className="text-title">Как заказать</h2>
          </div>
          <ProcessSteps steps={steps} />
        </div>
      </section>

      {/* Materials - Important for Decision */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title mb-4">Выберите подходящий</h2>
            <p className="text-body max-w-2xl mx-auto">
              Каждый материал подобран для своих задач
            </p>
          </div>
          <MaterialsGrid materials={materials} images={materialImages} />
          
          {/* CTA for samples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/contacts" className="btn-primary">
              Заказать образцы бесплатно
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Delivery & Payment - Compact */}
      <section className="section">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-caption mb-4">Условия</p>
            <h2 className="text-title">Доставка и оплата</h2>
          </div>
          <DeliveryPayment />
        </div>
      </section>

      {/* FAQ - Collapsible Low Priority */}
      <section className="section-sm bg-card">
        <div className="container-narrow">
          <Collapsible open={isFaqOpen} onOpenChange={setIsFaqOpen}>
            <CollapsibleTrigger className="w-full flex items-center justify-between py-4 group">
              <div className="text-left">
                <p className="text-caption mb-1">FAQ</p>
                <h2 className="font-display text-xl md:text-2xl">Частые вопросы</h2>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                  isFaqOpen ? 'rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6">
              <FAQAccordion faqs={faqs} />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section">
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
