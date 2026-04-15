"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  highlight?: string;
}

interface TestimonialsColumnsProps {
  testimonials: Testimonial[];
  autoplaySpeed?: number;
}

export function TestimonialsColumns({
  testimonials,
  autoplaySpeed = 5000,
}: TestimonialsColumnsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 3) % testimonials.length);
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [testimonials.length, autoplaySpeed, isClient]);

  const getVisibleTestimonials = () => {
    const visible: Testimonial[] = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(activeIndex + i) % testimonials.length]);
    }
    return visible;
  };

  const visibleTestimonials = getVisibleTestimonials();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const highlightVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { delay: 0.3, duration: 0.6 },
    },
  };

  if (!isClient) {
    // SSR fallback - render static version
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 md:p-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-yellow-500/50 transition-all h-full flex flex-col justify-between hover:shadow-xl hover:shadow-yellow-500/10"
            >
              {testimonial.highlight && (
                <div className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mb-6" />
              )}
              <p className="text-base md:text-lg italic text-slate-200 mb-8 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="space-y-2">
                <p className="font-bold text-yellow-400 text-base md:text-lg">
                  {testimonial.author}
                </p>
                <p className="text-slate-400 text-sm">{testimonial.role}</p>
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === 0 ? "bg-yellow-500 w-8" : "bg-slate-600"
                }`}
              />
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="wait">
          {visibleTestimonials.map((testimonial, index) => (
            <motion.div
              key={`${testimonial.id}-${activeIndex}`}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="h-full"
            >
              <div className="p-8 md:p-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-yellow-500/50 transition-all h-full flex flex-col justify-between hover:shadow-xl hover:shadow-yellow-500/10">
                {testimonial.highlight && (
                  <motion.div
                    variants={highlightVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full mb-6"
                  />
                )}

                <p className="text-base md:text-lg italic text-slate-200 mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="space-y-2">
                  <p className="font-bold text-yellow-400 text-base md:text-lg">
                    {testimonial.author}
                  </p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>

                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2 mt-12">
        {Array.from({ length: Math.ceil(testimonials.length / 3) }).map(
          (_, index) => (
            <motion.button
              key={index}
              onClick={() =>
                setActiveIndex((index * 3) % testimonials.length)
              }
              className={`h-2 rounded-full transition-all ${
                index === Math.floor(activeIndex / 3)
                  ? "bg-yellow-500 w-8"
                  : "bg-slate-600 w-2"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
          )
        )}
      </div>
    </div>
  );
}
