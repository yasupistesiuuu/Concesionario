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
  return (
    <div className={props.className} style={{ height: '100%' }}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-6 rounded-2xl border border-yellow-500/30 shadow-lg shadow-yellow-500/10 max-w-sm w-full bg-slate-900/50 backdrop-blur md:max-w-[320px]"
                  key={i}
                >
                  <div className="text-slate-300 text-sm leading-relaxed mb-5">"{text}"</div>
                  <div className="flex items-center gap-3">
                    {image && (
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}
                    <div className="flex flex-col">
                      <div className="font-semibold text-yellow-400 text-sm">{name}</div>
                      <div className="text-slate-400 text-xs">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
