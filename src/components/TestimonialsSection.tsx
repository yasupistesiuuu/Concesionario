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
    <section className="section py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3">
            {title}
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            {subtitle}
          </p>
        </motion.div>

        <div
          className="relative overflow-hidden"
          style={{
            height: '550px',
            perspective: '1000px',
          }}
        >
          <div
            className="flex gap-6 justify-center"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <TestimonialsColumn testimonials={firstColumn} duration={25} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={30}
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={28}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
