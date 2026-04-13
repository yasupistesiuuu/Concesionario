import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export function BadgeIcon({ type, className }: { type: string; className?: string }) {
  if (type === 'C') {
    return (
      <div className={cn("relative flex items-center justify-center rounded-full bg-[#1e201f] overflow-hidden border-2 border-green-500 w-8 h-8", className)}>
         <div className="absolute left-0 w-1/2 h-full bg-green-500 rounded-l-full"></div>
         <span className="relative text-white font-bold text-sm z-10 mr-1">C</span>
      </div>
    );
  }
  if (type === 'B') {
    return (
      <div className={cn("relative flex items-center justify-center rounded-full bg-[#1e201f] overflow-hidden border-2 border-yellow-400 w-8 h-8", className)}>
         <div className="absolute left-0 w-1/2 h-full bg-yellow-400 rounded-l-full"></div>
         <span className="relative text-white font-bold text-sm z-10 mr-1">B</span>
      </div>
    );
  }
  if (type === 'ECO') {
    return (
      <div className={cn("relative flex items-center justify-center rounded-full bg-[#1e201f] overflow-hidden border-2 border-blue-500 w-8 h-8", className)}>
         <div className="absolute left-0 w-1/2 h-full bg-green-500 rounded-l-full"></div>
         <span className="relative text-white font-bold text-[10px] z-10">ECO</span>
      </div>
    );
  }
  if (type === '0') {
    return (
      <div className={cn("relative flex items-center justify-center rounded-full bg-blue-500 overflow-hidden border-2 border-blue-500 w-8 h-8", className)}>
         <span className="relative text-white font-bold text-sm z-10">0</span>
      </div>
    );
  }
  return null;
}

interface CarData {
  id: number;
  title: string;
  price: string;
  financedPrice?: string;
  financeMonthly?: string;
  year?: string;
  km?: string;
  transmission?: string;
  fuel?: string;
  badge?: string;
  status: string;
  image: string;
}

export function EmissionsCarousel({ cars }: { cars: CarData[] }) {
  const [activeBadge, setActiveBadge] = useState<string>('C');

  const counts: Record<string, number> = {
    'C': cars.filter(c => c.badge === 'C').length,
    'B': cars.filter(c => c.badge === 'B').length,
    '0': cars.filter(c => c.badge === '0').length,
    'ECO': cars.filter(c => c.badge === 'ECO').length,
  };

  const filteredCars = cars.filter(car => car.badge === activeBadge);

  const buttonClass = (badge: string) => cn(
    "flex flex-col items-center justify-center px-4 md:px-8 py-3 rounded-2xl border transition-all duration-300",
    activeBadge === badge 
      ? "bg-zinc-800 border-zinc-600 shadow-lg scale-105" 
      : "bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50"
  );

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Distintivo <span className="text-zinc-500">ambiental</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {(['C', 'B', '0', 'ECO'] as string[]).map((badge) => (
            <button 
              key={badge} 
              onClick={() => setActiveBadge(badge)}
              className={buttonClass(badge)}
            >
               <BadgeIcon type={badge} className="mb-2 w-10 h-10" />
               <span className="text-xs text-zinc-400 font-medium">{counts[badge]} Listado{counts[badge] !== 1 && 's'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-12 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <AnimatePresence mode="wait">
          {filteredCars.map((car, idx) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="min-w-[320px] md:min-w-[350px] relative rounded-3xl overflow-hidden bg-[#1e2025] border border-zinc-800 snap-center shadow-xl group flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden relative">
                <img src={car.image} alt={car.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-zinc-700">
                  Ref: {car.id.toString().padStart(4, '0')}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-zinc-100 text-lg mb-4 line-clamp-1">{car.title}</h3>
                
                <div className="mb-3 space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-zinc-100">Al contado:</span>
                    <span className="text-xl font-bold font-mono text-zinc-100">{car.price}</span>
                  </div>
                  {car.financedPrice && (
                    <div className="flex justify-between items-baseline text-zinc-400">
                      <span className="text-sm">Financiado {car.financedPrice}:</span>
                      <span className="text-sm">Desde: <span className="text-brand font-bold">{car.financeMonthly}</span></span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mb-6 text-xs text-zinc-300 font-medium">
                  <span className="bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700/50">{car.year}</span>
                  <span className="bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700/50">{car.km}</span>
                  <span className="bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700/50">{car.transmission}</span>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <BadgeIcon type={car.badge!} />
                  <span className="text-sm font-medium text-zinc-400">{car.fuel}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredCars.length === 0 && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
               className="w-full py-20 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-zinc-800 rounded-3xl"
            >
              <div className="w-16 h-16 mb-4 opacity-50"><BadgeIcon type={activeBadge} className="w-full h-full" /></div>
              <p className="text-lg">No hay vehículos con etiqueta {activeBadge} actualmente.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
