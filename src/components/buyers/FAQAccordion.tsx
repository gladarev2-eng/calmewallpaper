import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

const FAQAccordion = ({ faqs }: FAQAccordionProps) => {
  // Create array of all values to open by default
  const defaultOpenValues = faqs.map((_, i) => `faq-${i}`);

  return (
    <Accordion type="multiple" defaultValue={defaultOpenValues} className="space-y-2">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03 }}
        >
          <AccordionItem 
            value={`faq-${i}`} 
            className="border border-border bg-background px-5"
          >
            <AccordionTrigger className="text-left font-medium text-sm md:text-base py-4 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
