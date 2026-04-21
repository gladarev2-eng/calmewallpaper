import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight, Instagram } from 'lucide-react';

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <circle cx="12" cy="12" r="9" />
        <path d="M11 7.5c2.8-.4 5 1 5 3.6 0 2.4-1.6 4.2-3.6 4.2-1 0-1.8-.5-2-1.3l-.5 2.2c-.2.8-.7 1.7-1.1 2.3" />
      </svg>
    ),
  },
  {
    label: 'VK',
    href: 'https://vk.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" className="w-full h-full">
        <path d="M3.5 8.5c.6 4 3.2 7.5 7 8h1.2v-2.7c0-.5.2-.7.5-.7.4 0 .9.2 2 1.3.9.9 1.2 1.6 1.8 1.6h1.8c.6 0 .9-.3.7-.8-.2-.6-1.2-1.7-1.7-2.2-.6-.6-.5-.8 0-1.4 1-1.2 2.2-2.7 2.4-3.4.1-.4-.1-.7-.6-.7h-1.7c-.5 0-.7.2-.9.6-.6 1.4-1.7 3-2.2 3.4-.3.2-.5.1-.5-.4V8.6c0-.5-.1-.6-.5-.6h-2.6c-.3 0-.5.1-.5.3 0 .4.6.5.6 1.6v2.4c0 .6-.1.7-.4.7-.6 0-1.8-1.6-2.5-3.5-.1-.4-.3-.5-.8-.5H4c-.4 0-.5.2-.5.5z" />
      </svg>
    ),
  },
  {
    label: 'Дзен',
    href: 'https://dzen.ru',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path d="M12 3c0 4.5 0 9-9 9 4.5 0 9 0 9 9 0-9 4.5-9 9-9-9 0-9-4.5-9-9z" />
      </svg>
    ),
  },
];

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
      <div className="container-wide py-12 md:py-16 lg:py-20">
        <div className="max-w-lg mx-auto text-center mb-12 md:mb-16">
          <h3 className="text-[20px] md:text-[22px] font-light tracking-[-0.02em] mb-3 text-background/90" style={{ fontFamily: 'var(--font-display)' }}>
            Будьте первыми
          </h3>
          <p className="text-[13px] font-light text-background/45 leading-[1.7] mb-6 tracking-[0.01em]">
            Узнавайте первыми о новых коллекциях и закрытых пресейлах
          </p>
          <form onSubmit={handleSubscribe} className="flex items-end gap-4">
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-b border-background/20 focus:border-background/50 text-[13px] font-light text-background/80 placeholder:text-background/25 py-2 outline-none transition-colors duration-500"
            />
            <button
              type="submit"
              className="text-[11px] uppercase tracking-[0.14em] font-light text-background/60 hover:text-background/90 transition-colors duration-500 pb-2 flex items-center gap-2 shrink-0"
            >
              Подписаться <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="text-[14px] font-light uppercase tracking-[0.4em] block mb-4 text-background/90 font-display">
              Calmé
            </Link>
            <p className="text-[13px] font-light text-background/45 leading-[1.8] max-w-xs tracking-[0.01em]">
              Индивидуальное производство настенных муралов для современных интерьеров
            </p>
          </div>

          {/* Navigation */}
          <div>
            <nav className="flex flex-col gap-3">
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
                  className="text-[12.5px] font-light text-background/45 hover:text-background/75 transition-colors duration-700 tracking-[0.04em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="flex flex-col gap-3">
              <a href="tel:+79001234567" className="text-[12.5px] font-light text-background/45 hover:text-background/75 transition-colors duration-700 tracking-[0.04em]">
                +7 (900) 123-45-67
              </a>
              <a href="mailto:hello@calme.studio" className="text-[12.5px] font-light text-background/45 hover:text-background/75 transition-colors duration-700 tracking-[0.04em]">
                hello@calme.studio
              </a>
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-light text-background/35 mb-5">
              Соцсети
            </p>
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="w-10 h-10 flex items-center justify-center border border-background/15 text-background/55 hover:text-background/90 hover:border-background/40 transition-all duration-500"
                >
                  <span className="w-[18px] h-[18px] block">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-[0.5px] bg-background/10 mt-12 lg:mt-14 mb-6" />
        
        <p className="text-[10.5px] font-light text-background/25 uppercase tracking-[0.18em]">
          © 2024 Calmé
        </p>
      </div>
    </footer>
  );
};
