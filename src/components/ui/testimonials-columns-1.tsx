"use client";
import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
  text: string;
  image?: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  // Duplicar testimonios para crear efecto infinito más fluido
  const duplicatedTestimonials = [...props.testimonials, ...props.testimonials];

  return (
    <div className={props.className}>
      <motion.div
        animate={{
          y: "-50%",
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6"
      >
        {duplicatedTestimonials.map((testimonial, i) => (
          <div
            className="p-8 rounded-3xl border border-slate-700 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 hover:border-yellow-500/50 transition-all duration-300 min-h-fit flex-shrink-0"
            key={i}
            style={{ width: "340px" }}
          >
            <div className="text-slate-200 text-sm leading-relaxed mb-6 italic">
              "{testimonial.text}"
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-700">
              {testimonial.image && (
                <img
                  width={48}
                  height={48}
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col">
                <div className="font-semibold text-yellow-400 text-sm">
                  {testimonial.name}
                </div>
                <div className="text-slate-400 text-xs">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
