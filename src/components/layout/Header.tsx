import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navItems = [
  { label: 'Каталог', href: '/catalog' },
  { label: 'Коллекции', href: '/collections' },
  { label: 'Вдохновение', href: '/inspiration' },
  { label: 'Дизайнерам', href: '/designers' },
  { label: 'О студии', href: '/studio' },
  { label: 'Покупателям', href: '/buyers' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container-wide">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="font-display text-2xl tracking-[0.15em] uppercase"
            >
              Calmé
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm tracking-wide transition-colors duration-300 hover:text-foreground ${
                    location.pathname === item.href 
                      ? 'text-foreground' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link 
                to="/cart"
                className="relative p-2 hover:bg-muted rounded-sm transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-sm transition-colors"
              >
                <Menu className="w-5 h-5" />
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
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-background z-50 p-6"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-display text-xl tracking-[0.15em] uppercase">
                  Calmé
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-2xl font-display tracking-wide transition-colors ${
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

              <div className="absolute bottom-6 left-6 right-6">
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Корзина {totalItems > 0 && `(${totalItems})`}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
