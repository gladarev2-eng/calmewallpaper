import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Accent line */}
      <div className="h-[2px] bg-background/15" />
      
      <div className="container-wide py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <Link to="/" className="text-[15px] font-light uppercase tracking-[0.4em] block mb-5 text-background/90 font-display">
              Calmé
            </Link>
            <p className="text-[14px] font-light text-background/50 leading-[1.9] max-w-xs tracking-[0.01em]">
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
                  className="text-[13px] font-light text-background/50 hover:text-background/80 transition-colors duration-700 tracking-[0.04em]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <div className="flex flex-col gap-4">
              <a href="tel:+79001234567" className="text-[13px] font-light text-background/50 hover:text-background/80 transition-colors duration-700 tracking-[0.04em]">
                +7 (900) 123-45-67
              </a>
              <a href="mailto:hello@calme.studio" className="text-[13px] font-light text-background/50 hover:text-background/80 transition-colors duration-700 tracking-[0.04em]">
                hello@calme.studio
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-[0.5px] bg-background/10 mt-14 lg:mt-18 mb-8" />
        
        <p className="text-[10px] font-light text-background/30 uppercase tracking-[0.18em]">
          © 2024 Calmé
        </p>
      </div>
    </footer>
  );
};
