import React, { useState } from 'react';
import { AdvancedMap } from "@/components/ui/interactive-map";

export const ContactMap = () => {
  // Coordenadas aproximadas para Valdemoro (Cuesta de Valderremata)
  const valdemoroPosition: [number, number] = [40.190132, -3.675681];

  const [markers] = useState([
    {
      id: 1,
      position: valdemoroPosition,
      color: 'green',
      size: 'large',
      popup: {
        title: 'Autos Velacruz',
        content: 'Cuesta de Valderremata, 10, Valdemoro, Madrid'
      }
    }
  ]);

  return (
    <div className="w-full relative shadow-2xl overflow-hidden rounded-3xl h-[400px] lg:h-full min-h-[400px]">
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="bg-zinc-950/80 backdrop-blur text-brand px-4 py-2 rounded-xl text-sm font-semibold border border-brand/20 shadow-lg">
          Nuestras Ubicación 📍
        </div>
      </div>
      <AdvancedMap
        center={valdemoroPosition}
        zoom={15}
        markers={markers}
        enableClustering={false}
        enableSearch={false}
        enableControls={true}
        style={{ height: '100%', width: '100%', zIndex: 10 }}
        className="contact-map"
      />
    </div>
  );
};
