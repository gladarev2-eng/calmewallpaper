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
          <p className="text-caption mb-4">Логистика</p>
          <h3 className="text-2xl lg:text-3xl font-extralight mb-8 tracking-[-0.02em]">Доставка и оплата</h3>
          
          <div className="space-y-10">
            <div>
              <h4 className="text-[14px] font-light mb-4 text-foreground">Доставка</h4>
              <ul className="space-y-3">
                {[
                  'Москва — 1–2 рабочих дня',
                  'Санкт-Петербург — 2–3 рабочих дня',
                  'Регионы России — 3–10 рабочих дней',
                  'Упаковка в защитный тубус',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] font-light text-foreground/60">
                    <span className="w-4 h-[0.5px] bg-foreground/20 mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-light mb-4 text-foreground">Оплата</h4>
              <ul className="space-y-3">
                {[
                  'Банковские карты, СБП, перевод',
                  'Предоплата 50% при заказе',
                  'Для юрлиц — работаем по счёту с НДС',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] font-light text-foreground/60">
                    <span className="w-4 h-[0.5px] bg-foreground/20 mt-2.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10">
            <Link to="/contacts" className="link-arrow">
              Задать вопрос
              <span className="ml-1">→</span>
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
