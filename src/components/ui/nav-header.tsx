"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full bg-black/40 backdrop-blur-md border border-white/10 p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition} href="/">
        Inicio
      </Tab>
      <Tab setPosition={setPosition} href="/catalogo">
        Catálogo
      </Tab>
      <Tab setPosition={setPosition} href="/compramos-tu-coche">
        Compramos Tu Coche
      </Tab>
      <Tab setPosition={setPosition} href="/vehiculos-por-encargo">
        Vehículos por Encargo
      </Tab>
      <Tab setPosition={setPosition} href="/contacto">
        Contacto
      </Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
  href,
}: {
  children: React.ReactNode;
  setPosition: any;
  href: string;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer"
    >
      <a
        href={href}
        className="block px-3 py-1.5 text-xs uppercase text-zinc-300 hover:text-yellow-400 transition-colors mix-blend-difference md:px-5 md:py-3 md:text-sm"
      >
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/50 md:h-12"
    />
  );
};

export default NavHeader;
