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
  { q: 'Что такое мурал?', a: 'Мурал — это крупноформатное изображение для стены, созданное как цельная интерьерная композиция. В отличие от обычных обоев, он не повторяется раппортом, а работает как отдельная сцена или художественная поверхность.' },
  { q: 'Чем мурал отличается от фотообоев?', a: 'Фотообои часто воспринимаются как напечатанная картинка. Мурал Окоём создаётся под интерьер: мы проверяем масштаб, композицию, детализацию, цвет и посадку изображения на стену.' },
  { q: 'Можно ли напечатать мурал под мой размер?', a: 'Да. Мы работаем с индивидуальными размерами и адаптируем изображение под конкретную стену. Возможны большие форматы, включая длинные стены и высокие помещения.' },
  { q: 'Можно ли изменить цвет?', a: 'Да, возможна мягкая цветокоррекция под палитру проекта: сделать изображение теплее, холоднее, спокойнее или ближе к выбранным материалам интерьера.' },
  { q: 'Как понять, что мурал подойдёт?', a: 'Мы делаем визуализацию в вашем интерьере или на рендере. Вы увидите мурал в масштабе комнаты до запуска в печать.' },
  { q: 'Нужно ли готовить стену?', a: 'Да. Для качественного результата стена должна быть ровной, сухой и подготовленной. Мы дадим рекомендации до монтажа.' },
];

const steps = [
  {
    step: '01',
    title: 'Выбираем настроение',
    desc: 'Вы можете начать с комнаты, цвета, коллекции или ощущения, которое хотите получить: тишина, глубина, ботаника, мягкая геометрия, пейзаж, фигуративный сюжет. Мы предложим несколько муралов, которые подойдут под ваш интерьер и задачу стены.',
    image: mural2,
  },
  {
    step: '02',
    title: 'Показываем в интерьере',
    desc: 'До заказа мы делаем визуализацию: показываем, как выбранный мурал будет выглядеть на вашей стене, с учётом масштаба, мебели, света и пропорций помещения. Это помогает принять решение спокойно, без риска «представить неправильно».',
    image: mural3,
  },
  {
    step: '03',
    title: 'Адаптируем под размер',
    desc: 'Мы подбираем кадрирование, проверяем важные зоны изображения, учитываем двери, ниши, изголовья, мебель и высоту потолков. При необходимости корректируем оттенки, чтобы мурал точнее попал в палитру интерьера.',
    image: mural5,
  },
  {
    step: '04',
    title: 'Печатаем и сопровождаем монтаж',
    desc: 'После согласования мы готовим файл к печати, изготавливаем мурал и передаём рекомендации по подготовке стены и монтажу. Для сложных проектов подскажем проверенных специалистов.',
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
            <h1 className="text-display mb-8">Мурал, который меняет ощущение комнаты</h1>
            <p className="text-body-lg max-w-xl">
              Окоём создаёт авторские настенные муралы для интерьеров, где стена становится не просто фоном, а частью атмосферы. Мы поможем выбрать изображение, покажем его на визуализации, адаптируем под размер стены и подготовим к печати.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/catalog" className="btn-primary">Подобрать мурал</Link>
              <Link to="/contacts" className="btn-outline">Получить консультацию</Link>
            </div>
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
            <h2 className="text-title">Четыре шага к готовой стене</h2>
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
          <div className="mb-20 max-w-2xl">
            <p className="text-caption mb-4">Сервис</p>
            <h2 className="text-title mb-6">Спокойный процесс от выбора до монтажа</h2>
            <p className="text-body-lg">
              Мурал — заметное решение для интерьера. Поэтому мы не оставляем клиента один на один с каталогом: помогаем выбрать, проверить масштаб, цвет и материал до печати.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
            {[
              { title: 'Персональный менеджер', desc: 'Один специалист ведёт проект от первого обращения до передачи мурала в производство.' },
              { title: 'Бесплатная визуализация', desc: 'Покажем выбранный мурал в вашем интерьере, чтобы вы заранее увидели масштаб и настроение.' },
              { title: 'Кадрирование под стену', desc: 'Адаптируем изображение под реальные размеры, высоту потолка, мебель, двери и ниши.' },
              { title: 'Цветовая адаптация', desc: 'При необходимости сделаем оттенки теплее, холоднее, мягче или ближе к палитре проекта.' },
              { title: 'Образцы и цветопробы', desc: 'Поможем выбрать материал и проверить фрагмент изображения перед производством.' },
              { title: 'Поддержка монтажа', desc: 'Дадим рекомендации по подготовке стены и аккуратной установке мурала.' },
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
          <div className="mb-20 max-w-2xl">
            <p className="text-caption mb-4">Материалы</p>
            <h2 className="text-title mb-6">Издалека — композиция. Вблизи — детали</h2>
            <p className="text-body-lg">
              Муралы Окоём создаются для большого формата. Они должны хорошо смотреться в масштабе комнаты и при этом сохранять живописную структуру при близком рассмотрении.
            </p>
          </div>
          <MaterialsSection materials={materials} images={[mural4, mural6, mural1, mural5, heroMural]} />
        </div>
      </section>

      {/* Большой формат */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
            <div className="lg:col-span-7 max-w-2xl">
              <p className="text-caption mb-4">Масштаб</p>
              <h2 className="text-title mb-6">Большой формат без потери качества</h2>
              <p className="text-body-lg">
                Некоторые муралы Окоём можно печатать длиной до 24 метров при высоте потолка 3 метра как цельное бесшовное изображение. Также возможна печать до 6 метров в высоту с сохранением детализации и глубины изображения.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-foreground/8">
            {[
              { metric: 'до 24 м', label: 'в длину' },
              { metric: 'до 6 м', label: 'в высоту' },
              { metric: '1:1', label: 'проверка фрагмента' },
              { metric: 'под размер', label: 'кадрирование' },
              { metric: 'бесшовно', label: 'цельная печать' },
            ].map((s, i) => (
              <div key={i} className="bg-background p-6 md:p-8">
                <p className="text-[20px] md:text-[24px] font-display font-light tracking-[-0.02em] text-foreground mb-2">{s.metric}</p>
                <p className="text-[11px] uppercase tracking-[0.12em] text-foreground/40 font-light">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery & Payment */}
      <section className="section bg-card/30">
        <div className="container-wide">
          <DeliveryPayment image={mural1} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-background">
        <div className="container-narrow">
          <div className="mb-20">
            <p className="text-caption mb-4">Вопросы</p>
            <h2 className="text-title">Частые вопросы</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-lg bg-card/30">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-title mb-6">Расскажите о вашем интерьере</h2>
            <p className="text-body-lg mb-12 max-w-md mx-auto">
              Мы подберём несколько муралов, покажем их на визуализации и рассчитаем стоимость под ваш размер.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contacts" className="btn-primary">Обсудить проект</Link>
              <Link to="/contacts" className="btn-outline">Получить консультацию</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Buyers;
