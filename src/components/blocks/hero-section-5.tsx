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
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-transparent pt-20">
      {/* Background Video Fullscreen */}
      <div className="absolute inset-0 w-full h-full z-[-1]">
        {/* Capa de cristal suave para que resalte el texto */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/hero.mp4"
        ></video>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 w-full">
        {/* HERO PRINCIPAL */}
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* H1 PRINCIPAL */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-tight mb-8 text-center text-white drop-shadow-2xl">
                Conduce el coche <br />
                <span className="bg-gradient-to-r from-[#ff6b35] via-[#f7931e] to-[#ffdd00] bg-clip-text text-transparent drop-shadow-none">
                  de tus sueños
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
            <motion.div variants={itemVariants}>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-center w-full">
                <a
                  href="/catalogo"
                  className="inline-block py-4 px-10 bg-white text-black rounded-lg font-bold text-lg transition-transform ease-in-out hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Comprar
                </a>
                <a
                  href="/contacto"
                  className="inline-block py-4 px-10 bg-black/40 backdrop-blur-md border border-white/20 text-white rounded-lg font-bold text-lg transition-transform ease-in-out hover:-translate-y-1 hover:bg-white/10"
                >
                  Vender
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CARRUSEL DE MARCAS */}
        <section className="relative w-full py-16 md:py-20 mt-12">
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
      </div>
    </section>
  );
};
