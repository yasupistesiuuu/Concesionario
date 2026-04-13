'use client';
import React from 'react';

const gradientDefs = `
  <defs>
    <linearGradient id="tireGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#4a4a4a;stop-opacity:0.8" />
      <stop offset="50%" style="stop-color:#2a2a2a;stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:0.8" />
    </linearGradient>
    <filter id="shadow">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
    <pattern id="tireTexture" patternUnits="userSpaceOnUse" width="4" height="4">
      <rect width="4" height="4" fill="#1a1a1a" opacity="0.3"/>
      <circle cx="1" cy="1" r="0.5" fill="#0a0a0a" opacity="0.2"/>
      <circle cx="3" cy="3" r="0.5" fill="#0a0a0a" opacity="0.2"/>
    </pattern>
  </defs>
`;

export const SubtleWheelBackground: React.FC = () => {
  const RealisticTire = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => {
    const tacoDensity = 14; // Número de tacos por fila
    const tacoRows = 7; // Número de filas de tacos

    return (
      <g>
        {/* Fondo del neumático - base oscura */}
        <rect x={x} y={y} width={w} height={h} rx="3" fill="#0a0a0a" opacity="0.9" />

        {/* Gradiente simulado para profundidad */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h * 0.3}
          rx="3"
          fill="#3a3a3a"
          opacity="0.15"
        />

        {/* Ranuras principales verticales profundas */}
        {Array.from({ length: 3 }).map((_, i) => {
          const posX = x + (w / 4) * (i + 1);
          return (
            <g key={`main-groove-${i}`}>
              {/* Ranura oscura principal */}
              <rect
                x={posX - 4}
                y={y + 5}
                width="8"
                height={h - 10}
                fill="#000"
                opacity="0.6"
                rx="1"
              />
              {/* Borde iluminado de la ranura */}
              <line
                x1={posX - 3}
                y1={y + 5}
                x2={posX - 3}
                y2={y + h - 5}
                stroke="#333"
                strokeWidth="0.5"
                opacity="0.5"
              />
            </g>
          );
        })}

        {/* Tacos detallados - patrón realista */}
        {Array.from({ length: tacoRows }).map((_, row) => (
          <g key={`row-${row}`}>
            {Array.from({ length: tacoDensity }).map((_, col) => {
              const tacoW = (w - 15) / tacoDensity;
              const tacoH = (h - 15) / tacoRows;
              const tacoX = x + 7.5 + col * tacoW;
              const tacoY = y + 7.5 + row * tacoH;

              // Variar tamaño ligeramente para efecto realista
              const variation = Math.sin(col * 0.5 + row * 0.3) * 0.3;
              const tacoW2 = tacoW * (0.85 + variation);
              const tacoH2 = tacoH * (0.8 + variation);

              return (
                <g key={`taco-${row}-${col}`}>
                  {/* Taco principal */}
                  <rect
                    x={tacoX + (tacoW - tacoW2) / 2}
                    y={tacoY + (tacoH - tacoH2) / 2}
                    width={tacoW2}
                    height={tacoH2}
                    fill="#1a1a1a"
                    opacity="0.8"
                    rx="0.5"
                  />

                  {/* Sombra izquierda del taco */}
                  <rect
                    x={tacoX + (tacoW - tacoW2) / 2}
                    y={tacoY + (tacoH - tacoH2) / 2}
                    width={tacoW2 * 0.3}
                    height={tacoH2}
                    fill="#000"
                    opacity="0.4"
                    rx="0.5"
                  />

                  {/* Línea de reflejo en el taco */}
                  <line
                    x1={tacoX + (tacoW - tacoW2) / 2 + tacoW2 * 0.3}
                    y1={tacoY + (tacoH - tacoH2) / 2 + 1}
                    x2={tacoX + (tacoW - tacoW2) / 2 + tacoW2}
                    y2={tacoY + (tacoH - tacoH2) / 2 + 1}
                    stroke="#333"
                    strokeWidth="0.3"
                    opacity="0.3"
                  />

                  {/* Textura micro de desgaste */}
                  {col % 3 === 0 && (
                    <circle
                      cx={tacoX + tacoW / 2}
                      cy={tacoY + tacoH / 2}
                      r="0.5"
                      fill="#0a0a0a"
                      opacity="0.3"
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}

        {/* Ranuras horizontales sutiles entre filas */}
        {Array.from({ length: tacoRows - 1 }).map((_, i) => (
          <line
            key={`h-groove-${i}`}
            x1={x + 5}
            y1={y + 7.5 + (i + 1) * ((h - 15) / tacoRows)}
            x2={x + w - 5}
            y2={y + 7.5 + (i + 1) * ((h - 15) / tacoRows)}
            stroke="#000"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}

        {/* Borde externo con profundidad */}
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="3"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Borde interior más oscuro */}
        <rect
          x={x + 1}
          y={y + 1}
          width={w - 2}
          height={h - 2}
          rx="2"
          fill="none"
          stroke="#000"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </g>
    );
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-zinc-950 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 2000 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        opacity="0.45"
      >
        {/* Fila 1 - Neumáticos más grandes y detallados */}
        <RealisticTire x="40" y="80" w="380" h="280" />
        <RealisticTire x="500" y="80" w="380" h="280" />
        <RealisticTire x="960" y="80" w="380" h="280" />
        <RealisticTire x="1420" y="80" w="380" h="280" />

        {/* Fila 2 */}
        <RealisticTire x="40" y="450" w="380" h="280" />
        <RealisticTire x="500" y="450" w="380" h="280" />
        <RealisticTire x="960" y="450" w="380" h="280" />
        <RealisticTire x="1420" y="450" w="380" h="280" />
      </svg>
    </div>
  );
};
