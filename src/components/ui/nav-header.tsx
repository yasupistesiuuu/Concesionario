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
      className="relative mx-auto flex w-fit rounded-full border border-white/10 bg-black/30 backdrop-blur-md p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] mt-6"
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
        className="relative z-10 block cursor-pointer px-4 py-2 text-sm font-medium tracking-wide text-zinc-300 transition-colors hover:text-white md:px-6 md:py-2.5 md:text-base"
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
      className="absolute z-0 h-9 md:h-11 rounded-full bg-white/10 border border-white/20 shadow-inner"
    />
  );
};

export default NavHeader;
