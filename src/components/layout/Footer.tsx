import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setEmail('');
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Accent line */}
      <div className="h-[1px] bg-background/8" />

      <div className="container-wide py-24 md:py-32 lg:py-40">
        {/* Top: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-20 lg:mb-28">
          <div>
            <Link to="/" className="text-[18px] font-light uppercase tracking-[0.45em] block mb-6 text-background/90 font-display">
              Calmé
            </Link>
            <p className="text-[14px] font-light text-background/40 leading-[1.9] max-w-sm tracking-[0.01em]">
              Архитектурные муралы со сложной детализацией для современных интерьеров. Каждая работа — уникальная визуальная среда.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-sm lg:ml-auto">
            <p className="text-[10px] uppercase tracking-[0.2em] text-background/35 font-light mb-6">
              Новые коллекции и проекты
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                className="w-full bg-transparent text-[13px] font-light text-background/80 placeholder:text-background/25 pb-3 pr-10 border-b border-background/15 focus:border-background/40 transition-colors duration-700 outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-3 text-background/30 hover:text-background/70 transition-colors duration-700"
              >
                <ArrowRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-background/8 mb-16" />

        {/* Bottom: Nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Каталог */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-background/25 font-light mb-6">Каталог</p>
            <nav className="flex flex-col gap-3.5">
              {[
                { label: 'Муралы', href: '/catalog?type=mural' },
                { label: 'Панно', href: '/catalog?type=panel' },
                { label: 'Фоновые обои', href: '/catalog?type=companion' },
                { label: 'Коллекции', href: '/collections' },
              ].map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-[12px] font-light text-background/40 hover:text-background/70 transition-colors duration-700 tracking-[0.02em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Информация */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-background/25 font-light mb-6">Информация</p>
            <nav className="flex flex-col gap-3.5">
              {[
                { label: 'О студии', href: '/studio' },
                { label: 'Покупателям', href: '/buyers' },
                { label: 'Вдохновение', href: '/inspiration' },
                { label: 'Контакты', href: '/contacts' },
              ].map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-[12px] font-light text-background/40 hover:text-background/70 transition-colors duration-700 tracking-[0.02em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Профессионалам */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-background/25 font-light mb-6">Профессионалам</p>
            <nav className="flex flex-col gap-3.5">
              {[
                { label: 'Дизайнерам', href: '/designers' },
                { label: 'Партнёрская программа', href: '/designers' },
                { label: 'Bespoke-проекты', href: '/contacts' },
              ].map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-[12px] font-light text-background/40 hover:text-background/70 transition-colors duration-700 tracking-[0.02em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Контакты */}
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-background/25 font-light mb-6">Связаться</p>
            <div className="flex flex-col gap-3.5">
              <a href="tel:+79001234567" className="text-[12px] font-light text-background/40 hover:text-background/70 transition-colors duration-700 tracking-[0.02em]">
                +7 (900) 123-45-67
              </a>
              <a href="mailto:hello@calme.studio" className="text-[12px] font-light text-background/40 hover:text-background/70 transition-colors duration-700 tracking-[0.02em]">
                hello@calme.studio
              </a>
              <a
                href="https://wa.me/79001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-light text-background/40 hover:text-background/70 transition-colors duration-700 tracking-[0.02em]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="h-[1px] bg-background/8 mt-16 lg:mt-20 mb-8" />

        <p className="text-[9px] font-light text-background/20 uppercase tracking-[0.2em]">
          © 2024 Calmé — Архитектурные муралы для современных интерьеров
        </p>
      </div>
    </footer>
  );
};
