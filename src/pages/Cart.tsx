import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import heroMural from '@/assets/hero-mural.jpg';
import mural1 from '@/assets/mural-1.jpg';
import mural2 from '@/assets/mural-2.jpg';
import mural3 from '@/assets/mural-3.jpg';
import mural4 from '@/assets/mural-4.jpg';
import mural5 from '@/assets/mural-5.jpg';
import mural6 from '@/assets/mural-6.jpg';

const imageMap: Record<string, string> = {
  '/hero-mural.jpg': heroMural,
  '/mural-1.jpg': mural1,
  '/mural-2.jpg': mural2,
  '/mural-3.jpg': mural3,
  '/mural-4.jpg': mural4,
  '/mural-5.jpg': mural5,
  '/mural-6.jpg': mural6,
};

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-8 border border-foreground/10 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-foreground/30" />
          </div>
          <h1 className="text-title mb-4">Корзина пуста</h1>
          <p className="text-body-lg mb-8">
            Добавьте товары из каталога
          </p>
          <Link to="/catalog" className="btn-primary">
            Перейти в каталог
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Header */}
      <section className="section-sm bg-background">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display">Корзина</h1>
          </motion.div>
        </div>
      </section>

      {/* Cart content */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, i) => {
                const image = imageMap[item.product.images[0]] || item.product.images[0];
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 p-6 border border-foreground/8"
                  >
                    <Link 
                      to={`/artwork/${item.product.slug}`}
                      className="w-32 h-32 flex-shrink-0 overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-caption">{item.product.collection}</p>
                          <Link 
                            to={`/artwork/${item.product.slug}`}
                            className="font-display text-xl hover:text-foreground/70 transition-colors duration-500"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-foreground/30 hover:text-foreground/60 transition-colors duration-500"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-1 mb-4">
                        {item.panelSize ? (
                          <p className="text-[13px] font-light text-foreground/45">Размер: {item.panelSize}</p>
                        ) : (
                          <>
                            <p className="text-[13px] font-light text-foreground/45">Размер: {item.width}×{item.height} см</p>
                            <p className="text-[13px] font-light text-foreground/45">Площадь: {item.area.toFixed(2)} м²</p>
                          </>
                        )}
                        <p className="text-[13px] font-light text-foreground/45">Материал: {item.material.name}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 border border-foreground/12 flex items-center justify-center hover:border-foreground/25 transition-colors duration-500"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-[13px] font-light">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 border border-foreground/12 flex items-center justify-center hover:border-foreground/25 transition-colors duration-500"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-display text-xl">
                          {formatPrice(item.price * item.quantity)} ₽
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              <button
                onClick={clearCart}
                className="text-[12px] font-light text-foreground/40 hover:text-foreground/60 transition-colors duration-500"
              >
                Очистить корзину
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-foreground/8 p-6 md:p-8 sticky top-28">
                <h2 className="text-title mb-6">Итого</h2>
                
                <div className="space-y-3 mb-6 pb-6 border-b border-foreground/8">
                  <div className="flex justify-between text-[13px] font-light">
                    <span className="text-foreground/45">Товары ({items.length})</span>
                    <span>{formatPrice(totalPrice)} ₽</span>
                  </div>
                  <div className="flex justify-between text-[13px] font-light">
                    <span className="text-foreground/45">Доставка</span>
                    <span>Рассчитывается отдельно</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-[15px] font-light">К оплате</span>
                  <span className="font-display text-3xl">{formatPrice(totalPrice)} ₽</span>
                </div>
                
                <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                  Оформить заказ
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <p className="text-[11px] font-light text-foreground/35 text-center mt-4">
                  Финальная стоимость уточняется после согласования макета
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
