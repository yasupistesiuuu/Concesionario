import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Compré mi Audi A6 aquí y la experiencia fue increíble. Me dieron todas las garantías y la revisión del vehículo fue exhaustiva.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    name: "Laura G.",
    role: "Cliente Satisfecho",
  },
  {
    text: "La tasación de mi coche antiguo fue muy justa. En menos de 24 horas tenía el dinero y me llevé un Peugeot 5008 casi nuevo.",
    image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1000&auto=format&fit=crop",
    name: "Carlos Martínez",
    role: "Comprador Frecuente",
  },
  {
    text: "Destaco el trato personalizado. Me trajeron el coche directo a mi casa en Toledo y la documentación estaba lista en el momento.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    name: "Sofía Ruiz",
    role: "Cliente Partícular",
  },
  {
    text: "Pude financiar la compra a mi medida sin complicaciones. El equipo de Velacruz son verdaderos profesionales del motor.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
    name: "Javier Muñoz",
    role: "Autónomo",
  },
  {
    text: "Mi familia necesitaba un vehículo amplio y nos recomendaron un Seat Alhambra. Tienen la mejor variedad en familiares.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    name: "María Gómez",
    role: "Madre de Familia",
  },
  {
    text: "Transparencia desde el minuto uno. Venden calidad y su servicio postventa me ha dado mucha seguridad. 100% recomendados.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
    name: "Ana Pastor",
    role: "Cliente Satisfecho",
  },
  {
    text: "Me recogieron mi viejo coche como forma de pago y el proceso de cambio de titularidad fue gratuito y rapidísimo.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
    name: "Marcos Torres",
    role: "Comprador de Madrid",
  },
  {
    text: "No sabía si fiarme de comprar de segunda mano, pero la revisión certificada de Velacruz disipó todas mis dudas.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1000&auto=format&fit=crop",
    name: "Lucía Fernández",
    role: "Primer Vehículo",
  },
  {
    text: "Rápidos, honestos y transparentes. Las garantías que ofrecen no las he visto en ningún otro concesionario de la zona sur.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop",
    name: "Daniel Santos",
    role: "Profesional",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-transparent py-20 relative border-t border-zinc-800">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border border-brand/50 bg-brand/10 text-brand py-1 px-4 rounded-full text-sm font-semibold mb-4">
              Reputación Avalada
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter mt-2 text-zinc-100">
            Lo que dicen <span className="text-brand">nuestros clientes</span>
          </h2>
          <p className="mt-5 text-zinc-400 text-lg">
            Experiencia satisfactoria y trato personalizado avalado por opiniones reales.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[650px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
