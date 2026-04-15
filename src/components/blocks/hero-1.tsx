"use client";

import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { motion } from "framer-motion";

// Marcas de coches de lujo para el carrusel
const carBrands = [
  { src: "https://cdn.simpleicons.org/porsche/ffffff", alt: "Porsche" },
  { src: "https://cdn.simpleicons.org/bmw/ffffff", alt: "BMW" },
  { src: "https://cdn.simpleicons.org/audi/ffffff", alt: "Audi" },
  { src: "https://cdn.simpleicons.org/tesla/ffffff", alt: "Tesla" },
  { src: "https://cdn.simpleicons.org/ferrari/ffffff", alt: "Ferrari" },
  { src: "https://cdn.simpleicons.org/lamborghini/ffffff", alt: "Lamborghini" },
  { src: "https://cdn.simpleicons.org/astonmartin/ffffff", alt: "Aston Martin" },
];

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center justify-center space-y-8 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge Superior */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 text-white">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Nuevas entradas de importación</span>
            </div>
          </motion.div>

          {/* H1 Principal */}
          <motion.div variants={itemVariants} className="max-w-3xl space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Encuentra el Coche de tus{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                Sueños
              </span>
            </h1>
          </motion.div>

          {/* Subtítulo */}
          <motion.div variants={itemVariants} className="max-w-2xl">
            <p className="text-lg md:text-xl text-slate-300">
              Vehículos importados de primera mano con documentación verificada, financiación personalizada y máxima tasación. Exclusividad y lujo garantizados.
            </p>
          </motion.div>

          {/* Botones CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button
              size="lg"
              className="gap-2 text-base font-semibold"
              onClick={() => window.location.href = "/catalogo"}
            >
              Ver Catálogo
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base font-semibold"
              onClick={() => window.location.href = "/contacto"}
            >
              Contactar
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const LogosSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
    },
  };

  return (
    <section className="relative w-full bg-transparent py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Título */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Trabajamos con las marcas más{" "}
              <span className="text-yellow-400">exclusivas</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Los vehículos de lujo más prestigiosos del mundo
            </p>
          </div>

          {/* Carrusel de Logos */}
          <div className="relative">
            <LogoCloud logos={carBrands} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default { HeroSection, LogosSection };
