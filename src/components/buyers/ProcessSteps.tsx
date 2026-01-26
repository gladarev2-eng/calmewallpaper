import { motion } from 'framer-motion';

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  image: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps = ({ steps }: ProcessStepsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {steps.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="group relative aspect-[16/10] overflow-hidden"
        >
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-background">
            <span className="font-display text-2xl md:text-3xl opacity-50 block mb-1 md:mb-2">{item.step}</span>
            <h3 className="font-display text-xl md:text-2xl mb-1 md:mb-2">{item.title}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProcessSteps;
