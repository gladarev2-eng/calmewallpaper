import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

const navItems = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Коллекции', href: '/collections' },
  { label: 'Вдохновение', href: '/inspiration' },
  { label: 'Дизайнерам', href: '/designers' },
  { label: 'О студии', href: '/studio' },
];

// Pages where the header overlays a full-screen hero
const heroPages = ['/', '/inspiration'];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  const isHeroPage = heroPages.includes(location.pathname) || location.pathname.startsWith('/artwork/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On hero pages: transparent initially, glass on scroll
  // On other pages: always glass
  const showGlass = !isHeroPage || scrolled;
  const lightText = isHeroPage && !scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: showGlass ? 'hsl(var(--glass-bg))' : 'transparent',
          backdropFilter: showGlass ? 'blur(24px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: showGlass ? 'blur(24px) saturate(1.2)' : 'none',
          borderBottom: showGlass ? '0.5px solid hsl(var(--glass-border))' : '0.5px solid transparent',
        }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-20 sm:h-24 lg:h-[96px]">
            {/* Left nav — desktop */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-[11px] font-normal uppercase tracking-[0.16em] transition-all duration-700 ${
                    location.pathname === item.href
                      ? lightText ? 'text-white' : 'text-foreground'
                      : lightText ? 'text-white/60 hover:text-white/90' : 'text-foreground/50 hover:text-foreground/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <Link
              to="/"
              className={`text-[16px] font-light uppercase tracking-[0.45em] font-display transition-colors duration-700 ${
                lightText ? 'text-white' : 'text-foreground'
              }`}
            >
              Calmé
            </Link>

            {/* Right nav — desktop */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {navItems.slice(3).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-[11px] font-normal uppercase tracking-[0.16em] transition-all duration-700 ${
                    location.pathname === item.href
                      ? lightText ? 'text-white' : 'text-foreground'
                      : lightText ? 'text-white/60 hover:text-white/90' : 'text-foreground/50 hover:text-foreground/80'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Actions */}
              <div className="flex items-center gap-2 ml-4">
                <Link
                  to="/favorites"
                  className={`relative p-2 transition-colors duration-700 ${
                    lightText ? 'text-white/60 hover:text-white/90' : 'text-foreground/50 hover:text-foreground/80'
                  }`}
                >
                  <Heart className={`w-4 h-4 stroke-[1.5] transition-colors ${totalFavorites > 0 ? (lightText ? 'fill-white/60' : 'fill-foreground/50') : ''}`} />
                  {totalFavorites > 0 && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 text-[8px] font-light flex items-center justify-center ${
                      lightText ? 'bg-white text-foreground' : 'bg-foreground text-background'
                    }`}>
                      {totalFavorites}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className={`relative p-2 transition-colors duration-700 ${
                    lightText ? 'text-white/60 hover:text-white/90' : 'text-foreground/50 hover:text-foreground/80'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                  {totalItems > 0 && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 text-[8px] font-light flex items-center justify-center ${
                      lightText ? 'bg-white text-foreground' : 'bg-foreground text-background'
                    }`}>
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile right side */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link
                to="/favorites"
                className={`relative p-2 transition-colors duration-700 ${
                  lightText ? 'text-white/60' : 'text-foreground/50'
                }`}
              >
                <Heart className={`w-4 h-4 stroke-[1.5] ${totalFavorites > 0 ? (lightText ? 'fill-white/60' : 'fill-foreground/50') : ''}`} />
              </Link>
              <Link
                to="/cart"
                className={`relative p-2 transition-colors duration-700 ${
                  lightText ? 'text-white/60' : 'text-foreground/50'
                }`}
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className={`absolute -top-1 -right-1 w-4 h-4 text-[8px] font-light flex items-center justify-center ${
                    lightText ? 'bg-white text-foreground' : 'bg-foreground text-background'
                  }`}>
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`p-2 transition-colors duration-700 ${
                  lightText ? 'text-white/70' : 'text-foreground/60'
                }`}
              >
                <Menu className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-foreground/8 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.5, ease: 'easeOut' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-6 sm:p-8">
                <span className="text-sm font-light uppercase tracking-[0.3em] text-foreground/80 font-display">
                  Calmé
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 text-foreground/50 transition-colors duration-700"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              <nav className="flex-1 px-6 sm:px-8 py-8 overflow-y-auto">
                <div className="space-y-7">
                  {[...navItems, { label: 'Покупателям', href: '/buyers' }, { label: 'Контакты', href: '/contacts' }].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block text-lg font-light uppercase tracking-[0.15em] py-2 transition-colors duration-700 ${
                          location.pathname === item.href
                            ? 'text-foreground'
                            : 'text-foreground/50 hover:text-foreground/80'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              <div className="p-6 sm:p-8 border-t border-foreground/8 space-y-4">
                <a
                  href="tel:+74951234567"
                  className="flex items-center gap-3 text-sm font-light text-foreground/50 hover:text-foreground/80 transition-colors duration-700 py-2"
                >
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                  <span>+7 (495) 123-45-67</span>
                </a>

                <a
                  href="https://wa.me/79001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-light text-foreground/50 hover:text-foreground/80 transition-colors duration-700 py-2"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>WhatsApp</span>
                </a>

                <div className="pt-4 space-y-3">
                  <Link
                    to="/favorites"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-3 py-3.5 border border-foreground/15 text-sm font-light uppercase tracking-[0.1em] hover:border-foreground/30 transition-colors duration-700"
                  >
                    <Heart className={`w-4 h-4 stroke-[1.5] ${totalFavorites > 0 ? 'fill-foreground/50' : ''}`} />
                    <span>Избранное {totalFavorites > 0 && `(${totalFavorites})`}</span>
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary w-full flex items-center justify-center gap-3"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                    <span>Корзина {totalItems > 0 && `(${totalItems})`}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
