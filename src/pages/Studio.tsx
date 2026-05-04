import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const Studio = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-end">
        <div className="absolute inset-0">
          <img
            src={heroMural}
            alt="ОКОЁМ Studio"
            className="w-full h-full object-cover"
            style={{ animation: 'slowZoom 12s ease-out forwards' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        </div>

        <div className="relative z-10 container-wide pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] font-light uppercase tracking-[0.25em] text-white/50 mb-4">О студии</p>
            <h1 className="text-display text-white"
              style={{ textShadow: '0 4px 60px rgba(0,0,0,0.4)' }}
            >
              На пересечении дизайна<br />интерьера и цифрового искусства
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* Manifesto — Large Editorial Blockquote */}
      <section className="section-lg bg-background">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-caption mb-10">Идея</p>
            <h2 className="text-title mb-12 text-foreground">
              Окоём — это пространство,<br />до которого достаёт взгляд
            </h2>
            <div className="blockquote-editorial max-w-2xl mx-auto text-left mb-12">
              <p className="text-[18px] md:text-[22px] leading-[1.6] text-foreground/70">
                «В русском языке „окоём“ — это линия горизонта, видимый край пространства. Хороший мурал не просто закрывает стену, а открывает в ней глубину: даёт взгляду место, куда можно уйти, и делает интерьер более живым, личным и собранным.»
              </p>
            </div>
            <p className="text-body-lg max-w-xl mx-auto">
              Мы не стремимся к громкому эффекту ради эффекта. Нам важнее тихая выразительность: сложные оттенки, глубина, живописная структура, мягкое ощущение памяти и современный взгляд на декоративность.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Storytelling — Split Screen Sticky */}
      <section className="bg-background">
        <div className="container-full">
          <div className="flex flex-col lg:flex-row items-start gap-0 lg:gap-16">
            {/* Sticky Image */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-[120px]" style={{ height: 'fit-content', alignSelf: 'start' }}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full overflow-hidden"
              >
                <img src={mural1} alt="Философия ОКОЁМ" className="w-full object-cover rounded-[4px]" style={{ aspectRatio: '4 / 5' }} />
              </motion.div>
            </div>

            {/* Scrolling Text Blocks */}
            <div className="w-full lg:w-1/2 flex flex-col gap-12">
              {/* Block 1 — Philosophy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center p-8 md:p-12 lg:p-16 xl:p-20 min-h-[50vh] lg:min-h-[60vh] bg-card/30"
              >
                <div>
                  <p className="text-caption mb-5">Философия</p>
                  <h2 className="text-title mb-8">Мы создаём не обои, а визуальную среду</h2>
                  <p className="text-body-lg mb-10">
                    Мурал Окоём — это авторское изображение для стены, созданное с расчётом на масштаб, детализацию и реальный интерьер. Оно должно работать на расстоянии, быть точным в композиции и оставаться интересным вблизи.
                  </p>
                  <div className="space-y-5">
                    {[
                      'Авторский художественный отбор',
                      'Адаптация под масштаб и палитру интерьера',
                      'Визуализация на вашей стене до печати',
                      'Сопровождение от подбора до монтажа',
                    ].map((item, i) => (
                      <p key={i} className="text-[13px] font-light text-foreground/45 flex items-center gap-4">
                        <span className="w-6 h-[0.5px] bg-foreground/20 shrink-0" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Block 2 — Process */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center p-8 md:p-12 lg:p-16 xl:p-20 min-h-[50vh] lg:min-h-[60vh] bg-background"
              >
                <div>
                  <p className="text-caption mb-5">Цифровое искусство</p>
                  <h2 className="text-title mb-8">Цифровое искусство, встроенное в интерьер</h2>
                  <p className="text-body-lg mb-8">
                    Окоём работает с изображением как с цифровым художественным материалом. Современные инструменты позволяют создавать сложные, многослойные композиции, но итог всегда проходит художественный отбор, доработку и проверку на пригодность к большому формату.
                  </p>
                  <p className="text-body-lg">
                    Для нас важен не только сюжет. Важно, как изображение ведёт себя на стене: держит ли масштаб, не теряет ли глубину, сочетается ли с мебелью, светом, тканями, камнем, деревом и цветом помещения.
                  </p>
                </div>
              </motion.div>

              {/* Block 3 — Quality */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center p-8 md:p-12 lg:p-16 xl:p-20 min-h-[50vh] lg:min-h-[60vh] bg-card/30"
              >
                <div>
                  <p className="text-caption mb-5">Технология и масштаб</p>
                  <h2 className="text-title mb-8">Большой формат с сохранением детализации</h2>
                  <p className="text-body-lg mb-10">
                    Некоторые муралы Окоём можно печатать длиной до 24 метров при высоте потолка 3 метра как цельное бесшовное изображение. Также возможна печать до 6 метров в высоту с сохранением качества и живописной структуры.
                  </p>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { metric: 'до 24 м', label: 'в длину' },
                      { metric: 'до 6 м', label: 'в высоту' },
                      { metric: '1:1', label: 'детализация' },
                      { metric: 'под размер', label: 'кадрирование' },
                    ].map((item, i) => (
                      <div key={i}>
                        <span className="text-[28px] font-display font-light tracking-[-0.02em] text-foreground block mb-1">
                          {item.metric}
                        </span>
                        <span className="text-[11px] font-light text-foreground/35 uppercase tracking-[0.1em]">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values — large alternating image/text blocks */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <p className="text-caption mb-4">Подход</p>
            <h2 className="text-title">Что отличает Окоём</h2>
          </motion.div>

          <div className="space-y-24 md:space-y-32">
            {[
              {
                title: 'Масштаб',
                subtitle: 'Изображения, которые держат большой формат',
                desc: 'Мы создаём изображения, которые выдерживают большой формат. Они не просто увеличиваются до размера стены, а сохраняют цельность, глубину и композицию.',
                image: mural3,
              },
              {
                title: 'Детализация',
                subtitle: 'Интересно рассматривать вблизи',
                desc: 'В мурале есть фактура, слои, переходы, живописные нюансы и сложные фрагменты. Поэтому он не воспринимается как просто увеличенная картинка.',
                image: mural2,
              },
              {
                title: 'Погружение',
                subtitle: 'Пространство, а не плоский декор',
                desc: 'Изображение должно создавать ощущение пространства, а не плоского декора. Особенно это важно для пейзажей, абстракций и атмосферных серий.',
                image: mural5,
              },
              {
                title: 'Адаптация',
                subtitle: 'Под размер, свет и палитру',
                desc: 'Мы подстраиваем мурал под размер стены, высоту потолка, мебель, свет и цветовую палитру интерьера.',
                image: mural4,
              },
              {
                title: 'Бутиковый сервис',
                subtitle: 'Персональная работа с проектом',
                desc: 'Подбираем, визуализируем, готовим образцы, сопровождаем производство и консультируем по монтажу.',
                image: mural6,
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={value.image} alt={value.title} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1.5s]" />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <h3 className="text-h3 mb-3">{value.title}</h3>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-foreground/35 mb-8 font-light">{value.subtitle}</p>
                  <p className="text-body-lg">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-caption mb-4">Эстетика</p>
            <h2 className="text-title mb-6">Современная русская оптика</h2>
            <p className="text-body-lg max-w-2xl">
              Нас интересует русский визуальный код без прямого цитирования и декоративного шума: горизонты, дымка, сады, ботаника, мягкая геометрия, авангардные ритмы, ощущение старых альбомов и спокойных интерьеров. Мы соединяем это с современным цифровым изображением, чтобы мурал выглядел актуально, а не музейно.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Спокойный фон', desc: 'Мягкие абстракции, цветовые поля и деликатные фактуры для интерьеров, где стена должна поддерживать пространство.', image: mural4 },
              { name: 'Выразительный акцент', desc: 'Ботаника, пейзажи, фигуративные и графические композиции для стен, которые становятся центром комнаты.', image: mural6 },
              { name: 'Проектное решение', desc: 'Адаптация под большую площадь, высокие стены, коммерческие интерьеры и нестандартные архитектурные задачи.', image: mural1 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden mb-5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]" />
                </div>
                <h3 className="text-[15px] font-light mb-2 text-foreground">{item.name}</h3>
                <p className="text-body">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/buyers" className="btn-outline">
              Подробнее о процессе
            </Link>
          </div>
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
            <h2 className="text-title mb-6">Расскажите о вашем проекте</h2>
            <p className="text-body-lg mb-12 max-w-md mx-auto">
              Мы подберём мурал под задачу, покажем его в интерьере и рассчитаем стоимость под ваш размер.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contacts" className="btn-primary">Обсудить проект</Link>
              <Link to="/catalog" className="btn-outline">Получить каталог</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Studio;
