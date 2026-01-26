import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DeliveryPaymentProps {
  image: string;
}

const DeliveryPayment = ({ image }: DeliveryPaymentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
      {/* Content */}
      <div className="lg:order-1">
        <div className="max-w-md">
          <h3 className="font-display text-2xl md:text-3xl mb-6">Доставка и оплата</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-medium mb-3">Доставка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Москва — 1-2 рабочих дня
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Санкт-Петербург — 2-3 рабочих дня
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Регионы России — 3-10 рабочих дней
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Упаковка в защитный тубус
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3">Оплата</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Банковские карты, СБП, перевод
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Предоплата 50% при заказе
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2" />
                  Для юрлиц — работаем по счёту с НДС
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Link 
              to="/contacts" 
              className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
            >
              Задать вопрос
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="lg:order-2">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt="Доставка CALMÉ"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DeliveryPayment;
