import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-2xl tracking-[0.15em] uppercase block mb-4">
              Calmé
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Бутик настенных покрытий и авторских панно. Тишина, масштаб, детализация.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-caption mb-4">Каталог</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/catalog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Все работы
              </Link>
              <Link to="/collections" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Коллекции
              </Link>
              <Link to="/catalog?type=mural" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Муралы
              </Link>
              <Link to="/catalog?type=panel" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Панно
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-caption mb-4">Информация</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/studio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                О студии
              </Link>
              <Link to="/buyers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Покупателям
              </Link>
              <Link to="/designers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Дизайнерам
              </Link>
              <Link to="/inspiration" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Вдохновение
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-caption mb-4">Контакты</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:+79001234567" className="hover:text-foreground transition-colors">
                +7 (900) 123-45-67
              </a>
              <a href="mailto:hello@calme.studio" className="hover:text-foreground transition-colors">
                hello@calme.studio
              </a>
              <p>Москва, Россия</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Calmé. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
