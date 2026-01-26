import { motion } from 'framer-motion';
import { Shield, Palette, Truck, HeadphonesIcon } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Адаптация под интерьер',
    desc: 'Бесплатно подберём цветовую гамму под ваше помещение. Подготовим визуализацию.',
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    desc: 'Производство в России. Экологичные материалы с сертификатами. Гарантия на печать.',
  },
  {
    icon: Truck,
    title: 'Надёжная доставка',
    desc: 'Упаковка в защитный тубус. Доставка по всей России за 3-10 дней.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Поддержка на всех этапах',
    desc: 'Консультируем по выбору материала, размерам и монтажу. Отвечаем в течение часа.',
  },
];

const ServiceGuarantees = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
      {services.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4"
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 border border-border flex items-center justify-center">
              <item.icon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceGuarantees;
