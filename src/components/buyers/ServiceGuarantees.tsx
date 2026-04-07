import { motion } from 'framer-motion';

const services = [
  {
    title: 'Адаптация под интерьер',
    desc: 'Бесплатно подберём цветовую гамму под ваше помещение. Подготовим визуализацию.',
  },
  {
    title: 'Гарантия качества',
    desc: 'Производство в России. Экологичные материалы с сертификатами. Гарантия на печать.',
  },
  {
    title: 'Надёжная доставка',
    desc: 'Упаковка в защитный тубус. Доставка по всей России за 3–10 дней.',
  },
  {
    title: 'Поддержка на всех этапах',
    desc: 'Консультируем по выбору материала, размерам и монтажу. Отвечаем в течение часа.',
  },
];

const ServiceGuarantees = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
      {services.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.6 }}
          className="border-t border-foreground/8 pt-6"
        >
          <h3 className="text-[15px] font-light mb-3 text-foreground">{item.title}</h3>
          <p className="text-body">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceGuarantees;
