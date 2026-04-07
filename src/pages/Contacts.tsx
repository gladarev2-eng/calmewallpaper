import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural5 from '@/assets/mural-5.jpg';

const Contacts = () => {
  const showrooms = [
    {
      city: 'Москва',
      address: 'ул. Большая Никитская, 24/1, стр. 5',
      metro: 'м. Арбатская',
      hours: 'Пн–Сб: 10:00–20:00',
      phone: '+7 (495) 123-45-67',
      image: mural2,
      mapUrl: 'https://yandex.ru/maps/-/CDxeZQ~D',
    },
    {
      city: 'Санкт-Петербург',
      address: 'наб. реки Мойки, 73',
      metro: 'м. Адмиралтейская',
      hours: 'Пн–Сб: 11:00–20:00',
      phone: '+7 (812) 987-65-43',
      image: mural3,
      mapUrl: 'https://yandex.ru/maps/-/CDxeZR~E',
    },
    {
      city: 'Казань',
      address: 'ул. Баумана, 68',
      metro: 'м. Площадь Тукая',
      hours: 'Пн–Пт: 10:00–19:00',
      phone: '+7 (843) 555-12-34',
      image: mural5,
      mapUrl: 'https://yandex.ru/maps/-/CDxeZS~F',
    },
  ];

  const messengers = [
    { name: 'WhatsApp', url: 'https://wa.me/79001234567', label: '+7 900 123-45-67' },
    { name: 'Telegram', url: 'https://t.me/calme_studio', label: '@calme_studio' },
  ];

  const socials = [
    { name: 'Instagram', url: 'https://instagram.com/calme.studio' },
    { name: 'Pinterest', url: 'https://pinterest.com/calme_studio' },
    { name: 'VK', url: 'https://vk.com/calme_studio' },
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Hero */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-caption mb-6">Контакты</p>
              <h1 className="text-display mb-8">
                Посмотрите<br />вживую
              </h1>
              <p className="text-body-lg mb-12 max-w-md">
                Приходите в наши шоурумы, чтобы увидеть масштаб, оценить текстуры 
                и получить консультацию специалиста.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="tel:+74951234567" 
                  className="flex items-center gap-4 text-[15px] font-light hover:text-foreground/70 transition-colors duration-500"
                >
                  <Phone className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
                  <span>+7 (495) 123-45-67</span>
                </a>
                <a 
                  href="mailto:hello@calme.studio" 
                  className="flex items-center gap-4 text-[15px] font-light text-foreground/60 hover:text-foreground transition-colors duration-500"
                >
                  <Mail className="w-4 h-4 text-foreground/40" strokeWidth={1.5} />
                  <span>hello@calme.studio</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col justify-center"
            >
              <div className="border-t border-foreground/8 pt-8 mb-10">
                <p className="text-caption mb-6">Мессенджеры</p>
                <div className="flex flex-col gap-4">
                  {messengers.map((m) => (
                    <a 
                      key={m.name}
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-3 border-b border-foreground/5 hover:border-foreground/15 transition-colors duration-500 group"
                    >
                      <span className="flex items-center gap-3">
                        <MessageCircle className="w-4 h-4 text-foreground/30" strokeWidth={1.5} />
                        <span className="text-[13px] font-light">{m.name}</span>
                      </span>
                      <span className="text-[13px] font-light text-foreground/40 group-hover:text-foreground/70 transition-colors duration-500">
                        {m.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-caption mb-6">Социальные сети</p>
                <div className="flex gap-6">
                  {socials.map((s) => (
                    <a 
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-light text-foreground/40 hover:text-foreground/70 transition-colors duration-500"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Showrooms */}
      <section className="section">
        <div className="container-wide">
          <div className="mb-20">
            <p className="text-caption mb-4">Шоурумы</p>
            <h2 className="text-title">Где нас найти</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {showrooms.map((showroom, i) => (
              <motion.div
                key={showroom.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group"
              >
                <div className="aspect-[4/5] overflow-hidden mb-6">
                  <img 
                    src={showroom.image} 
                    alt={`Шоурум ${showroom.city}`}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-[18px] font-light tracking-[-0.01em] font-display">{showroom.city}</h3>
                  
                  <div className="space-y-2.5">
                    <p className="flex items-start gap-3 text-[13px] font-light text-foreground/50">
                      <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-foreground/30" strokeWidth={1.5} />
                      <span>{showroom.address}<br />{showroom.metro}</span>
                    </p>
                    <p className="flex items-center gap-3 text-[13px] font-light text-foreground/50">
                      <Clock className="w-3.5 h-3.5 shrink-0 text-foreground/30" strokeWidth={1.5} />
                      <span>{showroom.hours}</span>
                    </p>
                    <a 
                      href={`tel:${showroom.phone.replace(/[^+\d]/g, '')}`}
                      className="flex items-center gap-3 text-[13px] font-light text-foreground/50 hover:text-foreground/80 transition-colors duration-500"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 text-foreground/30" strokeWidth={1.5} />
                      <span>{showroom.phone}</span>
                    </a>
                  </div>
                  
                  <a 
                    href={showroom.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow mt-4"
                  >
                    Построить маршрут
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section>
        <div className="aspect-[21/9] lg:aspect-[3/1] w-full">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A0&amp;source=constructor&amp;scroll=false"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Карта шоурумов CALMÉ"
            className="w-full h-full grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
          />
        </div>
      </section>

      {/* Why Visit */}
      <section className="section-lg">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-caption mb-6">Почему стоит приехать</p>
              <h2 className="text-title mb-8">
                Масштаб и текстуру<br />не передать на экране
              </h2>
              <p className="text-body-lg mb-6">
                Фотография не покажет, как свет играет на рельефе флизелина в 5 метрах 
                от вас. Не передаст ощущение от текстильного полотна под пальцами. 
                Не даст понять, насколько детализированы наши принты при печати 2400 DPI.
              </p>
              <p className="text-body-lg">
                В шоуруме вы увидите муралы в реальном масштабе, оцените качество 
                материалов и получите экспертную консультацию по вашему проекту.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-px bg-foreground/6"
            >
              {[
                { num: '45K', label: 'пикселей на метр' },
                { num: '6м', label: 'максимальная ширина' },
                { num: '5', label: 'типов материалов' },
                { num: '∞', label: 'возможностей адаптации' },
              ].map((stat, i) => (
                <div key={i} className="bg-background p-8 text-center">
                  <p className="text-3xl lg:text-4xl font-light mb-2 tracking-[-0.02em] font-display">{stat.num}</p>
                  <p className="text-[10px] text-foreground/35 uppercase tracking-[0.15em] font-light">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-foreground text-background">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-background/50 mb-6 font-light">
              Начните сейчас
            </p>
            <h2 className="text-2xl lg:text-3xl font-light mb-6 tracking-[-0.02em] font-display">
              Запишитесь на консультацию
            </h2>
            <p className="text-[14px] font-light text-background/60 mb-10 max-w-lg mx-auto leading-[1.8]">
              Подберём принты под ваш интерьер, рассчитаем стоимость 
              и подготовим визуализацию — бесплатно.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+74951234567"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-background text-foreground text-[10px] uppercase tracking-[0.14em] font-light hover:bg-background/90 transition-colors duration-500"
              >
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Позвонить</span>
              </a>
              <a 
                href="https://wa.me/79001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-background/25 text-[10px] uppercase tracking-[0.14em] font-light hover:bg-background/10 transition-colors duration-500"
              >
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Написать в WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { caption: 'Каталог', title: 'Смотреть все работы', href: '/catalog' },
              { caption: 'Для дизайнеров', title: 'Партнёрская программа', href: '/designers' },
              { caption: 'Покупателям', title: 'Как заказать', href: '/buyers' },
            ].map((item) => (
              <Link 
                key={item.href}
                to={item.href}
                className="group p-6 sm:p-8 border border-foreground/8 hover:border-foreground/20 transition-colors duration-700"
              >
                <p className="text-caption mb-4">{item.caption}</p>
                <h3 className="text-[16px] font-light mb-3 group-hover:text-foreground/70 transition-colors duration-700">
                  {item.title}
                </h3>
                <ArrowRight className="w-4 h-4 text-foreground/25" strokeWidth={1.5} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
