"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicar suficientemente para seamless looping
  const duplicatedChildren = [
    ...childrenArray,
    ...childrenArray,
    ...childrenArray,
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Calcular el ancho de un set de children
    const firstChild = containerRef.current.querySelector('[data-child="0"]') as HTMLElement;
    if (!firstChild) return;

    const childWidth = firstChild.offsetWidth + 16; // 16 es el gap
    const totalWidth = childWidth * childrenArray.length;

    // Resetear posición cada que llega al final para seamless loop
    const container = containerRef.current.querySelector('[data-slider]') as HTMLElement;
    if (container) {
      container.style.width = `${totalWidth * 3}px`;
    }
  }, [childrenArray.length]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        data-slider="true"
        className="flex gap-4"
        initial={{ x: 0 }}
        animate={{
          x: direction === "left" ? -50000 : 0
        }}
        transition={{
          duration: isHovered ? duration * 1.5 : duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop" as const,
        }}
        style={{
          willChange: "transform",
        }}
      >
        {duplicatedChildren.map((child, idx) => (
          <div key={idx} className="flex-shrink-0" data-child={idx % childrenArray.length}>
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
