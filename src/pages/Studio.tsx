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
  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero - Full Width Image */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={heroMural}
          alt="CALMÉ Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16"
        >
          <div className="container-wide">
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-background mb-4">
              CALMÉ
            </h1>
            <p className="text-background/90 text-lg md:text-xl max-w-xl">
              Бутик настенных покрытий и авторских панно
            </p>
          </div>
        </motion.div>
      </section>

      {/* Block 1: Manifesto */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Манифест</p>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-6 leading-tight">
                Мы создаём не декор,<br />а атмосферу интерьера
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                CALMÉ — это изображения с невероятной детализацией, которые производят сильное впечатление в пространстве и раскрываются при рассмотрении вблизи.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Наши работы — это не узор и не фоновый декор. Это «живая архитектура стены», которая трансформирует пространство.
              </p>
              <Link 
                to="/catalog" 
                className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Смотреть каталог
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={mural2}
                  alt="Атмосфера CALMÉ"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 2: Scale - Full Width Image */}
      <section className="relative">
        <div className="aspect-[21/9] overflow-hidden">
          <img
            src={mural3}
            alt="Масштаб"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Block 2b: Scale Text */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container-wide">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Масштаб</p>
              <h2 className="font-display text-2xl md:text-3xl mb-6">
                До 6 метров без потери качества
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Создаём полотна шириной до 6 метров, сохраняя безупречную детализацию. Каждое изображение подготовлено для печати с разрешением более 45 000 пикселей.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Разрешение печати 2400 DPI
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Бесшовное полотно до 3.2 метра
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Точное совпадение швов
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 3: Detail */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={mural5}
                  alt="Детализация"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Детализация</p>
              <h2 className="font-display text-2xl md:text-3xl mb-6">
                Раскрывается вблизи
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Наши изображения — это не просто картинки на стене. Каждая работа раскрывается при приближении, открывая новые детали и текстуры.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Художественная постобработка каждого изображения
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Сохранение микро-деталей при масштабировании
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Глубина цвета и тональные переходы
                </li>
              </ul>
              <Link 
                to="/inspiration" 
                className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Смотреть примеры
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 4: Approach - Full Width */}
      <section className="relative">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src={mural1}
            alt="Подход"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Block 4b: Approach Text */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Подход</p>
              <h2 className="font-display text-2xl md:text-3xl mb-6">
                Бутик, а не конвейер
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Мы не производим обои тысячами рулонов. Каждый заказ — это индивидуальная работа: от адаптации изображения под ваше пространство до контроля качества печати.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <ul className="space-y-4">
                <li className="flex items-start gap-4 pb-4 border-b border-border">
                  <span className="text-xs text-muted-foreground w-6">01</span>
                  <div>
                    <h4 className="font-medium mb-1">Персональные консультации</h4>
                    <p className="text-sm text-muted-foreground">Помогаем с выбором изображения и материала</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-border">
                  <span className="text-xs text-muted-foreground w-6">02</span>
                  <div>
                    <h4 className="font-medium mb-1">Адаптация цветов</h4>
                    <p className="text-sm text-muted-foreground">Подстраиваем гамму под ваш интерьер</p>
                  </div>
                </li>
                <li className="flex items-start gap-4 pb-4 border-b border-border">
                  <span className="text-xs text-muted-foreground w-6">03</span>
                  <div>
                    <h4 className="font-medium mb-1">Визуализация</h4>
                    <p className="text-sm text-muted-foreground">Покажем, как будет выглядеть в вашем пространстве</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-xs text-muted-foreground w-6">04</span>
                  <div>
                    <h4 className="font-medium mb-1">Контроль качества</h4>
                    <p className="text-sm text-muted-foreground">Проверяем каждый заказ перед отправкой</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Block 5: Materials */}
      <section className="py-20 md:py-32 bg-card">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Материалы</p>
            <h2 className="font-display text-2xl md:text-3xl">
              Только премиальные материалы
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Флизелин премиум',
                desc: 'Матовое покрытие с благородной текстурой. Идеально для жилых интерьеров.',
                image: mural4,
              },
              {
                name: 'Винил на флизелине',
                desc: 'Влагостойкий материал для HoReCa и влажных помещений.',
                image: mural6,
              },
              {
                name: 'Холст для панно',
                desc: 'Натуральный холст с УФ-печатью для арт-объектов.',
                image: heroMural,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden mb-5">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-display text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link 
              to="/buyers" 
              className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              Все материалы и образцы
              <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Block 6: Production */}
      <section className="py-20 md:py-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">Производство</p>
              <h2 className="font-display text-2xl md:text-3xl mb-6">
                Собственное производство в России
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Печатаем на профессиональном оборудовании в Москве. Полный контроль качества на каждом этапе — от подготовки файлов до упаковки.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Срок производства 5-7 дней
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Экологичные латексные чернила
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Надёжная упаковка для доставки
                </li>
              </ul>
              <Link 
                to="/contacts" 
                className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Связаться с нами
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={mural4}
                  alt="Производство"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA - Full Width Image */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <img
          src={mural6}
          alt="Начать сотрудничество"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="relative container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-2xl md:text-4xl text-background mb-4">
              Начнём сотрудничество?
            </h2>
            <p className="text-background/80 mb-8 max-w-md mx-auto">
              Расскажите о вашем проекте — мы подберём решение
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/catalog" 
                className="inline-flex items-center justify-center h-12 px-8 bg-background text-foreground text-xs uppercase tracking-widest hover:bg-background/90 transition-colors"
              >
                Смотреть каталог
              </Link>
              <Link 
                to="/contacts" 
                className="inline-flex items-center justify-center h-12 px-8 border border-background text-background text-xs uppercase tracking-widest hover:bg-background/10 transition-colors"
              >
                Связаться
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Studio;
