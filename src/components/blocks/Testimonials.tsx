"use client";

import React from "react";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns-1";

const testimonials = [
  {
    id: 1,
    text: "Increíble la calidad de los vehículos. Importados de primera mano con toda la documentación verificada. No tenía ninguna duda.",
    author: "Carlos Mendoza",
    role: "Empresario, Madrid",
    highlight: "Calidad Verificada",
  },
  {
    id: 2,
    text: "El proceso fue transparente de principio a fin. Toda la paperwork perfectamente organizada y entregada a tiempo. Profesionales.",
    author: "María García López",
    role: "Abogada, Valdemoro",
    highlight: "Gestión Perfecta",
  },
  {
    id: 3,
    text: "Entrega a domicilio impecable. El vehículo llegó en perfectas condiciones con todos los documentos listos. Muy satisfecho.",
    author: "Fernando Rodríguez",
    role: "Ejecutivo, Toledo",
    highlight: "Servicio Premium",
  },
  {
    id: 4,
    text: "Compré un BMW importado con tasación excelente en mi vehículo anterior. Mejor que cualquier concesionario oficial.",
    author: "Ana Martínez",
    role: "Médica, Alcalá de Henares",
    highlight: "Mejor Tasación",
  },
  {
    id: 5,
    text: "La documentación de importación está 100% en regla. Toda la información clara y verificada. Confianza total.",
    author: "Jorge Ruiz Sánchez",
    role: "Ingeniero, Madrid",
    highlight: "Documentación Completa",
  },
  {
    id: 6,
    text: "Lujos a precio justo. El vehículo de ensueño que quería con financiación personalizada. Autos Velacruz lo hizo posible.",
    author: "Isabel Fernández",
    role: "Empresaria, Valdemoro",
    highlight: "Financiación A Medida",
  },
  {
    id: 7,
    text: "Importados con historial verificado y garantía. No hay sorpresas desagradables después. Totalmente recomendable.",
    author: "Roberto García",
    role: "Director Comercial, Madrid",
    highlight: "Garantía Transparente",
  },
  {
    id: 8,
    text: "El mejor servicio de atención post-venta. Cualquier consulta sobre la documentación resuelta al instante.",
    author: "Paloma Jiménez",
    role: "Empresaria, Rivas Vaciamadrid",
    highlight: "Postventa Excepcional",
  },
  {
    id: 9,
    text: "Mercedes de importación con documentación alemana verificada. Entrega a domicilio el mismo día. Extraordinario.",
    author: "David López Martín",
    role: "Consultor, Aranjuez",
    highlight: "Envío Rápido",
  },
];

export function Testimonials() {
  return (
    <TestimonialsColumns
      testimonials={testimonials}
      autoplaySpeed={6000}
    />
  );
}

export default Testimonials;
