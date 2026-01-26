import { motion } from 'framer-motion';
import { Truck, CreditCard, Clock, MapPin } from 'lucide-react';

const DeliveryPayment = () => {
  const deliveryInfo = [
    { icon: MapPin, text: 'Москва — 1-2 дня' },
    { icon: Clock, text: 'Регионы — 3-10 дней' },
    { icon: Truck, text: 'Надёжная упаковка в тубус' },
  ];

  const paymentInfo = [
    { icon: CreditCard, text: 'Карты, СБП, банковский перевод' },
    { icon: Clock, text: 'Предоплата 50%, остаток перед отправкой' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h3 className="font-display text-xl md:text-2xl mb-4">Доставка</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Доставляем по всей России. Мурал упакован в защитный тубус.
        </p>
        <ul className="space-y-3">
          {deliveryInfo.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {item.text}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h3 className="font-display text-xl md:text-2xl mb-4">Оплата</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          Для юридических лиц — работаем по счёту с НДС.
        </p>
        <ul className="space-y-3">
          {paymentInfo.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {item.text}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default DeliveryPayment;
