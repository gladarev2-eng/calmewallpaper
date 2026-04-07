import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

const navItems = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Вдохновение', href: '/inspiration' },
  { label: 'Дизайнерам', href: '/designers' },
  { label: 'Покупателям', href: '/buyers' },
  { label: 'О студии', href: '/studio' },
  { label: 'Контакты', href: '/contacts' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-[88px]">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-[13px] font-extralight uppercase tracking-[0.35em] text-foreground/80"
            >
              Calmé
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-[10px] font-extralight uppercase tracking-[0.18em] transition-all duration-500 ${
                    location.pathname === item.href 
                      ? 'text-foreground/70' 
                      : 'text-foreground/35 hover:text-foreground/60'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side: tagline + phone + actions */}
            <div className="flex items-center gap-6">
              {/* Tagline — desktop only */}
              <span className="hidden xl:block text-[9px] font-extralight tracking-[0.12em] text-foreground/25 uppercase">
                Сделано под ваш интерьер
              </span>

              {/* Phone & Messenger - Desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <a 
                  href="tel:+74951234567" 
                  className="text-[10px] font-extralight tracking-[0.08em] text-foreground/30 hover:text-foreground/60 transition-colors duration-500"
                >
                  +7 (495) 123-45-67
                </a>
                <a 
                  href="https://wa.me/79001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground/25 hover:text-foreground/50 transition-colors duration-500"
                >
                  <MessageCircle className="w-3.5 h-3.5 stroke-[1.5]" />
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Link 
                  to="/favorites"
                  className="relative p-2 text-foreground/35 hover:text-foreground/60 transition-colors duration-500"
                >
                  <Heart className={`w-4 h-4 stroke-[1.2] transition-colors ${totalFavorites > 0 ? 'fill-foreground/50' : ''}`} />
                  {totalFavorites > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground/80 text-background text-[8px] font-extralight flex items-center justify-center">
                      {totalFavorites}
                    </span>
                  )}
                </Link>
                
                <Link 
                  to="/cart"
                  className="relative p-2 text-foreground/35 hover:text-foreground/60 transition-colors duration-500"
                >
                  <ShoppingBag className="w-4 h-4 stroke-[1.2]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground/80 text-background text-[8px] font-extralight flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="lg:hidden p-2 text-foreground/40 transition-colors duration-500"
                >
                  <Menu className="w-4 h-4 stroke-[1.2]" />
                </button>
              </div>
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
              className="fixed inset-0 bg-foreground/5 backdrop-blur-sm z-50"
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
                  <span className="text-sm font-extralight uppercase tracking-[0.3em] text-foreground/60">
                    Calmé
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 -mr-2 text-foreground/40 transition-colors duration-500"
                  >
                    <X className="w-5 h-5 stroke-[1.2]" />
                  </button>
                </div>

                <nav className="flex-1 px-6 sm:px-8 py-8 overflow-y-auto">
                  <div className="space-y-7">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block text-lg font-extralight uppercase tracking-[0.15em] py-2 transition-colors duration-500 ${
                            location.pathname === item.href
                              ? 'text-foreground/70'
                              : 'text-foreground/35 hover:text-foreground/60'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <div className="p-6 sm:p-8 border-t border-foreground/5 space-y-4">
                  <a 
                    href="tel:+74951234567"
                    className="flex items-center gap-3 text-sm font-extralight text-foreground/35 hover:text-foreground/60 transition-colors py-2"
                  >
                    <Phone className="w-4 h-4" strokeWidth={1.2} />
                    <span>+7 (495) 123-45-67</span>
                  </a>
                  
                  <a 
                    href="https://wa.me/79001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-extralight text-foreground/35 hover:text-foreground/60 transition-colors py-2"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.2} />
                    <span>WhatsApp</span>
                  </a>

                  <p className="text-[9px] uppercase tracking-[0.12em] text-foreground/20 pt-2">
                    Сделано под ваш интерьер
                  </p>

                  <div className="pt-4 space-y-3">
                    <Link
                      to="/favorites"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-3 py-3.5 border border-foreground/10 text-sm font-extralight uppercase tracking-[0.1em] hover:border-foreground/25 transition-colors"
                    >
                      <Heart className={`w-4 h-4 stroke-[1.2] ${totalFavorites > 0 ? 'fill-foreground/50' : ''}`} />
                      <span>Избранное {totalFavorites > 0 && `(${totalFavorites})`}</span>
                    </Link>
                    <Link
                      to="/cart"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary w-full flex items-center justify-center gap-3"
                    >
                      <ShoppingBag className="w-4 h-4 stroke-[1.2]" />
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
