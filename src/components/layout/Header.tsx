import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Heart, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';

const navItems = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Коллекции', href: '/collections' },
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
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-sm font-thin uppercase tracking-[0.3em]"
            >
              Calmé
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-[11px] font-extralight uppercase tracking-[0.15em] transition-all duration-400 hover:text-foreground ${
                    location.pathname === item.href 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Phone & Messenger - Desktop */}
            <div className="hidden lg:flex items-center gap-4 mr-4">
              <a 
                href="tel:+74951234567" 
                className="text-[11px] font-extralight tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors"
              >
                +7 (495) 123-45-67
              </a>
              <a 
                href="https://wa.me/79001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Favorites */}
              <Link 
                to="/favorites"
                className="relative p-2 transition-colors duration-400"
              >
                <Heart className={`w-4 h-4 stroke-[1.5] transition-colors ${totalFavorites > 0 ? 'fill-foreground' : ''}`} />
                {totalFavorites > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[9px] font-extralight flex items-center justify-center">
                    {totalFavorites}
                  </span>
                )}
              </Link>
              
              {/* Cart */}
              <Link 
                to="/cart"
                className="relative p-2 transition-colors duration-400"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-foreground text-background text-[9px] font-extralight flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 transition-colors duration-400"
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
              transition={{ duration: 0.4 }}
              className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-50 p-8"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-sm font-thin uppercase tracking-[0.3em]">
                  Calmé
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 transition-colors duration-400"
                >
                  <X className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>

              <nav className="flex flex-col gap-8">
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
                      className={`text-xl font-thin uppercase tracking-[0.2em] transition-colors duration-400 ${
                        location.pathname === item.href
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="absolute bottom-8 left-8 right-8 space-y-3">
                <Link
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-3 py-3 border border-foreground/20 text-sm uppercase tracking-[0.1em] hover:border-foreground transition-colors"
                >
                  <Heart className={`w-4 h-4 stroke-[1.5] ${totalFavorites > 0 ? 'fill-foreground' : ''}`} />
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};