import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  bullets: string[];
  image: string;
  cta?: { label: string; href: string };
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps = ({ steps }: ProcessStepsProps) => {
  return (
    <div className="space-y-16 md:space-y-24">
      {steps.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
            i % 2 === 1 ? 'lg:direction-rtl' : ''
          }`}
        >
          {/* Image */}
          <div className={`${i % 2 === 1 ? 'lg:order-2' : ''}`}>
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`${i % 2 === 1 ? 'lg:order-1' : ''}`}>
            <div className="max-w-md">
              <span className="font-display text-4xl md:text-5xl text-muted-foreground/30 block mb-4">
                {item.step}
              </span>
              <h3 className="font-display text-2xl md:text-3xl mb-4">{item.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{item.desc}</p>
              
              <ul className="space-y-3 mb-8">
                {item.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <span className="w-1 h-1 bg-foreground rounded-full mt-2 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {item.cta && (
                <Link 
                  to={item.cta.href} 
                  className="inline-flex items-center text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  {item.cta.label}
                  <span className="ml-2">→</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProcessSteps;
