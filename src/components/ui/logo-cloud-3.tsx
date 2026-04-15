"use client";

import React from "react";
import { InfiniteSlider } from "./infinite-slider";
import { cn } from "@/lib/utils";

interface Logo {
  src: string;
  alt: string;
}

interface LogoCloudProps {
  logos: Logo[];
  className?: string;
  logoClassName?: string;
}

export const LogoCloud = ({
  logos,
  className,
  logoClassName,
}: LogoCloudProps) => {
  return (
    <div className={cn("w-full", className)}>
      <InfiniteSlider duration={40} direction="left" gap={16}>
        {logos.map((logo, idx) => (
          <div
            key={idx}
            className={cn(
              "flex h-16 w-32 items-center justify-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/10 transition-colors",
              logoClassName
            )}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 w-auto object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
};
