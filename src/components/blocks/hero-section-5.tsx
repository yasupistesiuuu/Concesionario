"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const carLogos = [
  { src: "https://cdn.simpleicons.org/porsche/ffffff", alt: "Porsche" },
  { src: "https://cdn.simpleicons.org/bmw/ffffff", alt: "BMW" },
  { src: "https://cdn.simpleicons.org/audi/ffffff", alt: "Audi" },
  { src: "https://cdn.simpleicons.org/tesla/ffffff", alt: "Tesla" },
  { src: "https://cdn.simpleicons.org/ferrari/ffffff", alt: "Ferrari" },
  { src: "https://cdn.simpleicons.org/lamborghini/ffffff", alt: "Lamborghini" },
  { src: "https://cdn.simpleicons.org/astonmartin/ffffff", alt: "Aston Martin" },
];

export const HeroSection = () => {
  console.log("🎬 HeroSection montado correctamente");

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
    <main className="relative w-full overflow-hidden">
      {/* VIDEO DE FONDO */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/ElephantsDream.mp4"
            type="video/mp4"
          />
        </video>

        {/* OVERLAY PROGRESIVO */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        />
      </div>

      {/* CONTENIDO */}
      <section className="relative w-full py-32 md:py-48 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center justify-center space-y-8 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* H1 PRINCIPAL */}
            <motion.div variants={itemVariants} className="max-w-4xl space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Encuentra el Coche de tus{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Sueños
                </span>
              </h1>
            </motion.div>

            {/* SUBTÍTULO */}
            <motion.div variants={itemVariants} className="max-w-2xl">
              <p className="text-lg md:text-xl text-slate-200">
                Importación y venta de vehículos de alta gama. Gestión integral,
                entrega a domicilio y exclusividad garantizada.
              </p>
            </motion.div>

            {/* BOTONES CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            >
              <Button
                size="lg"
                className="gap-2 text-base font-semibold"
                onClick={() => (window.location.href = "/catalogo")}
              >
                Ver Catálogo
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold"
                onClick={() => (window.location.href = "/contacto")}
              >
                Solicitar Información
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CARRUSEL DE MARCAS */}
      <section className="relative w-full py-16 md:py-20 z-10 bg-gradient-to-b from-transparent to-black/40">
        <div className="container mx-auto px-4">
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            {/* TÍTULO */}
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Trabajamos con las marcas más{" "}
                <span className="text-yellow-400">exclusivas</span>
              </h2>
              <p className="text-slate-400 text-lg">
                Los vehículos de lujo más prestigiosos del mundo
              </p>
            </div>

            {/* CARRUSEL */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-4"
                animate={{ x: [0, -2000] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...carLogos, ...carLogos, ...carLogos].map((logo, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 h-16 w-32 flex items-center justify-center rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-8 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};
