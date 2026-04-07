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
    <div className="space-y-20 md:space-y-28">
      {steps.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
            i % 2 === 1 ? 'lg:grid-flow-dense' : ''
          }`}
        >
          {/* Image */}
          <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`${i % 2 === 1 ? 'lg:col-start-1' : ''}`}>
            <div className="max-w-md">
              <span className="text-step-num">
                {item.step}
              </span>
              <h3 className="text-h3 mb-4">{item.title}</h3>
              <p className="text-body-lg mb-8">{item.desc}</p>
              
              <ul className="space-y-3 mb-8">
                {item.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3 text-[13px] font-light text-foreground/60">
                    <span className="w-4 h-[0.5px] bg-foreground/20 mt-2.5 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {item.cta && (
                <Link 
                  to={item.cta.href} 
                  className="link-arrow"
                >
                  {item.cta.label}
                  <span className="ml-1">→</span>
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
