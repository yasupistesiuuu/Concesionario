"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressiveBlurProps {
  children: React.ReactNode;
  className?: string;
}

export const ProgressiveBlur = ({
  children,
  className = "",
}: ProgressiveBlurProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ backdropFilter: "blur(0px)" }}
      animate={{ backdropFilter: "blur(8px)" }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)",
        }}
      />
    </motion.div>
  );
};
