import { motion } from 'framer-motion';
import { Shield, Palette, Truck, HeadphonesIcon } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Адаптация под интерьер',
    desc: 'Бесплатно подберём цветовую гамму под ваше помещение',
  },
  {
    icon: Shield,
    title: 'Гарантия качества',
    desc: 'Производство в России, экологичные сертифицированные материалы',
  },
  {
    icon: Truck,
    title: 'Надёжная доставка',
    desc: 'Упаковка в защитный тубус, доставка по всей России',
  },
  {
    icon: HeadphonesIcon,
    title: 'Поддержка',
    desc: 'Консультируем по выбору материала, размерам и монтажу',
  },
];

const ServiceGuarantees = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {services.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
        >
          <item.icon className="w-5 h-5 mb-4 text-muted-foreground" />
          <h3 className="font-display text-base mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceGuarantees;
