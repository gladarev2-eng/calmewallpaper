import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Users, Briefcase, Gift } from 'lucide-react';
import mural4 from '@/assets/mural-4.jpg';

const Designers = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={mural4}
            alt="Для дизайнеров"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
        
        <div className="container-wide relative z-10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-caption mb-4">Партнёрская программа</p>
            <h1 className="text-display mb-4">Дизайнерам</h1>
            <p className="text-body-lg max-w-2xl">
              Специальные условия для дизайнеров интерьеров и архитекторов
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Gift,
                title: 'Специальные цены',
                desc: 'Скидки до 25% для партнёров программы',
              },
              {
                icon: Users,
                title: 'Персональный менеджер',
                desc: 'Выделенный специалист для ваших проектов',
              },
              {
                icon: Briefcase,
                title: 'Приоритетное производство',
                desc: 'Сокращённые сроки для партнёрских заказов',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-muted rounded-full">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="section bg-card">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-title text-center mb-12">Что мы предлагаем</h2>
            
            <div className="space-y-4">
              {[
                'Бесплатные визуализации для ваших проектов',
                'Адаптация изображений под конкретный интерьер',
                'Образцы материалов для презентации клиентам',
                'Консультации по выбору и размещению',
                'Помощь с техническими вопросами монтажа',
                'Совместные маркетинговые активности',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 bg-background"
                >
                  <Check className="w-5 h-5 flex-shrink-0" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HoReCa */}
      <section className="section">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-caption mb-4">Для бизнеса</p>
            <h2 className="text-title mb-6">HoReCa проекты</h2>
            <p className="text-body-lg">
              Работаем с отелями, ресторанами, офисами и общественными пространствами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Материалы для HoReCa',
                desc: 'Винил на флизелине с повышенной износостойкостью, влагостойкость, антивандальные свойства',
              },
              {
                title: 'Масштабные проекты',
                desc: 'Опыт работы с полотнами до 6 метров в ширину и многометровыми панорамами',
              },
              {
                title: 'Адаптация под бренд',
                desc: 'Корректируем цветовую гамму под брендбук заведения или корпоративные цвета',
              },
              {
                title: 'Монтаж под ключ',
                desc: 'Профессиональный монтаж нашей командой или рекомендованными подрядчиками',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 border border-border"
              >
                <h3 className="font-display text-xl mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="section bg-card">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <h2 className="text-title mb-4">Стать партнёром</h2>
            <p className="text-muted-foreground">
              Заполните форму, и мы свяжемся с вами в течение дня
            </p>
          </div>

          <form className="space-y-6 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-caption block mb-2">Имя</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="text-caption block mb-2">Компания</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Название студии"
                />
              </div>
            </div>
            <div>
              <label className="text-caption block mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="text-caption block mb-2">Телефон</label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div>
              <label className="text-caption block mb-2">Сообщение</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                placeholder="Расскажите о вашей студии и проектах"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Отправить заявку
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Designers;
