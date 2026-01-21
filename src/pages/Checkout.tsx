import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Upload } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    comment: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    clearCart();
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Корзина пуста</h1>
          <Link to="/catalog" className="btn-primary">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 lg:pt-24">
      {/* Header */}
      <section className="section-sm bg-card">
        <div className="container-wide">
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 text-sm mb-6 hover:gap-4 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Вернуться в корзину
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-display">Оформление заказа</h1>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-b border-border">
        <div className="container-wide py-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {['Контакты', 'Подтверждение', 'Готово'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  step > i + 1 
                    ? 'bg-foreground text-background' 
                    : step === i + 1 
                      ? 'bg-foreground text-background' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`hidden md:block text-sm ${step === i + 1 ? '' : 'text-muted-foreground'}`}>
                  {s}
                </span>
                {i < 2 && <div className="w-8 md:w-16 h-px bg-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-narrow">
          {step === 1 && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
              onSubmit={(e) => { e.preventDefault(); setStep(2); }}
            >
              <h2 className="text-subtitle mb-8">Контактные данные</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-caption block mb-2">Имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-caption block mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="text-caption block mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-caption block mb-2">Город *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>

              <div>
                <label className="text-caption block mb-2">Адрес доставки</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="Уточним при подтверждении заказа"
                />
              </div>

              <div>
                <label className="text-caption block mb-2">Фото стены (опционально)</label>
                <div className="border border-dashed border-border p-8 text-center cursor-pointer hover:border-foreground transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Загрузите фото стены для визуализации
                  </p>
                </div>
              </div>

              <div>
                <label className="text-caption block mb-2">Комментарий</label>
                <textarea
                  rows={3}
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  placeholder="Особые пожелания к заказу"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Продолжить
              </button>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-subtitle mb-8">Подтверждение заказа</h2>
              
              <div className="bg-card p-6 mb-6">
                <h3 className="font-medium mb-4">Контактные данные</h3>
                <div className="space-y-2 text-sm">
                  <p>{formData.name}</p>
                  <p>{formData.phone}</p>
                  <p>{formData.email}</p>
                  <p>{formData.city}</p>
                  {formData.address && <p>{formData.address}</p>}
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm underline mt-4"
                >
                  Изменить
                </button>
              </div>

              <div className="bg-card p-6 mb-6">
                <h3 className="font-medium mb-4">Товары ({items.length})</h3>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <p>{item.product.name}</p>
                        <p className="text-muted-foreground">
                          {item.panelSize || `${item.width}×${item.height} см`} • {item.material.name}
                        </p>
                      </div>
                      <p>{formatPrice(item.price * item.quantity)} ₽</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-6 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg">Итого к оплате</span>
                  <span className="font-display text-3xl">{formatPrice(totalPrice)} ₽</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Финальная стоимость уточняется после согласования макета
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <button type="submit" className="btn-primary w-full">
                  Подтвердить заказ
                </button>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-8 bg-foreground text-background rounded-full flex items-center justify-center">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="text-title mb-4">Заказ оформлен!</h2>
              <p className="text-body-lg mb-8 max-w-md mx-auto">
                Мы свяжемся с вами в ближайшее время для уточнения деталей и согласования макета
              </p>
              <Link to="/catalog" className="btn-primary">
                Продолжить покупки
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Checkout;
