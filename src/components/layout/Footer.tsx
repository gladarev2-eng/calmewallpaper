import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Спасибо за подписку!', { description: 'Вы будете первыми узнавать о новинках' });
      setEmail('');
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="h-[1px] bg-background/10" />

      {/* Newsletter */}
      <div className="container-wide py-20 md:py-28 lg:py-32">
        <div className="max-w-lg mx-auto text-center mb-20 md:mb-28">
          <h3 className="text-[22px] md:text-[26px] font-light tracking-[-0.02em] mb-5 text-background/90" style={{ fontFamily: 'var(--font-display)' }}>
            Будьте первыми
          </h3>
          <p className="text-[14px] font-light text-background/45 leading-[1.8] mb-10 tracking-[0.01em]">
            Узнавайте первыми о новых коллекциях и закрытых пресейлах
          </p>
          <form onSubmit={handleSubscribe} className="flex items-end gap-4">
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-b border-background/20 focus:border-background/50 text-[14px] font-light text-background/80 placeholder:text-background/25 py-3 outline-none transition-colors duration-500"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-[0.14em] font-light text-background/60 hover:text-background/90 transition-colors duration-500 pb-3 flex items-center gap-2 shrink-0"
            >
              Подписаться <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="text-[15px] font-light uppercase tracking-[0.4em] block mb-5 text-background/90 font-display">
              Calmé
            </Link>
            <p className="text-[14px] font-light text-background/45 leading-[1.9] max-w-xs tracking-[0.01em]">
              Индивидуальное производство настенных муралов для современных интерьеров
            </p>
          </div>

          {/* Navigation */}
          <div>
            <nav className="flex flex-col gap-4">
              {[
                { label: 'Каталог', href: '/catalog' },
                { label: 'Вдохновение', href: '/inspiration' },
                { label: 'О студии', href: '/studio' },
                { label: 'Дизайнерам', href: '/designers' },
                { label: 'Покупателям', href: '/buyers' },
                { label: 'Контакты', href: '/contacts' },
              ].map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-[13px] font-light text-background/45 hover:text-background/75 transition-colors duration-700 tracking-[0.04em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="flex flex-col gap-4">
              <a href="tel:+79001234567" className="text-[13px] font-light text-background/45 hover:text-background/75 transition-colors duration-700 tracking-[0.04em]">
                +7 (900) 123-45-67
              </a>
              <a href="mailto:hello@calme.studio" className="text-[13px] font-light text-background/45 hover:text-background/75 transition-colors duration-700 tracking-[0.04em]">
                hello@calme.studio
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[0.5px] bg-background/10 mt-16 lg:mt-20 mb-8" />
        
        <p className="text-[11px] font-light text-background/25 uppercase tracking-[0.18em]">
          © 2024 Calmé
        </p>
      </div>
    </footer>
  );
};
