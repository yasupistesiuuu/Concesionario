'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsColumn } from './ui/testimonials-columns-1';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  image?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSection({
  testimonials,
  title = 'Lo que nuestros clientes dicen',
  subtitle = 'Experiencias reales de clientes satisfechos con AUTOS VELACRUZ',
}: TestimonialsSectionProps) {
  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="border border-yellow-500/30 py-2 px-4 rounded-lg bg-yellow-500/5">
              <span className="text-yellow-400 font-semibold text-sm">Testimonios</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center text-white mb-4">
            {title}
          </h2>
          <p className="text-center text-slate-400 text-lg">
            {subtitle}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[640px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
}
