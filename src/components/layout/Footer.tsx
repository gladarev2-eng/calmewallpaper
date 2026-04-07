import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card">
      <div className="divider" />
      <div className="container-wide py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="text-sm font-thin uppercase tracking-[0.3em] block mb-4 lg:mb-6">
              Calmé
            </Link>
            <p className="text-xs font-extralight text-muted-foreground leading-relaxed max-w-xs tracking-wide">
              Бутик настенных покрытий и авторских панно
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-caption mb-6">Каталог</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/catalog" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                Все работы
              </Link>
              <Link to="/inspiration" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                Вдохновение
              </Link>
              <Link to="/catalog?type=mural" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                Муралы
              </Link>
              <Link to="/catalog?type=panel" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                Панно
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-caption mb-6">Информация</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/studio" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                О студии
              </Link>
              <Link to="/buyers" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                Покупателям
              </Link>
              <Link to="/designers" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                Дизайнерам
              </Link>
              <Link to="/inspiration" className="text-xs font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 tracking-wide">
                Вдохновение
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-caption mb-6">Контакты</h4>
            <div className="flex flex-col gap-4 text-xs font-extralight text-muted-foreground tracking-wide">
              <a href="tel:+79001234567" className="hover:text-foreground transition-colors duration-400">
                +7 (900) 123-45-67
              </a>
              <a href="mailto:hello@calme.studio" className="hover:text-foreground transition-colors duration-400">
                hello@calme.studio
              </a>
              <Link to="/contacts" className="hover:text-foreground transition-colors duration-400">
                Шоурумы и адреса
              </Link>
            </div>
          </div>
        </div>

        <div className="divider mt-12 lg:mt-16 mb-8 lg:mb-10" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-[10px] font-extralight text-muted-foreground uppercase tracking-[0.15em]">
            © 2024 Calmé
          </p>
          <div className="flex gap-6 sm:gap-8">
            <Link to="/privacy" className="text-[10px] font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 uppercase tracking-[0.1em]">
              Конфиденциальность
            </Link>
            <Link to="/terms" className="text-[10px] font-extralight text-muted-foreground hover:text-foreground transition-colors duration-400 uppercase tracking-[0.1em]">
              Условия
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};