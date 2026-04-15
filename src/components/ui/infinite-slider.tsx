"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface InfiniteSliderProps {
  children: ReactNode;
  duration?: number;
  direction?: "left" | "right";
  gap?: number;
  durationOnHover?: number;
}

export const InfiniteSlider = ({
  children,
  duration = 20,
  direction = "left",
  gap = 0,
  durationOnHover,
}: InfiniteSliderProps) => {
  const childrenArray = React.Children.toArray(children);

  const duplicatedChildren = [
    ...childrenArray,
    ...childrenArray,
    ...childrenArray,
  ];

  const animationVariants = {
    animate: {
      x: direction === "left" ? -10000 : 0,
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop" as const,
      },
    },
  };

  return (
    <div className="relative flex overflow-hidden" style={{ gap: `${gap}px` }}>
      <motion.div
        className="flex gap-4"
        variants={animationVariants}
        animate="animate"
        whileHover={{
          x: direction === "left" ? -10000 : 0,
        }}
        onHoverStart={() => {
          // Optional: handle hover
        }}
      >
        {duplicatedChildren.map((child, idx) => (
          <div key={idx} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
