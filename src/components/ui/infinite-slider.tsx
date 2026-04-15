"use client";

import React, { ReactNode, useEffect, useRef } from "react";

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
  const sliderRef = useRef<HTMLDivElement>(null);

  // Duplicar 2 veces para seamless loop
  const duplicatedChildren = [
    ...childrenArray,
    ...childrenArray,
  ];

  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const animationDuration = duration;

    // Crear animación CSS dinámica basada en el contenido
    const styleSheet = document.createElement("style");
    const keyframes = `
      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      @keyframes scroll-right {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }
      .infinite-scroll {
        animation: ${direction === "left" ? "scroll-left" : "scroll-right"} ${animationDuration}s linear infinite;
      }
    `;
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    slider.classList.add("infinite-scroll");

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [duration, direction]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden w-full"
    >
      <div
        ref={sliderRef}
        className="flex gap-4"
        style={{
          willChange: "transform",
        }}
      >
        {duplicatedChildren.map((child, idx) => (
          <div key={idx} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
