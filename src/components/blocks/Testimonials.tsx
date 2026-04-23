"use client";

import React from "react";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns-1";
import catalogData from "@/data/catalog.json";

const testimonials = catalogData.testimonials.map((testimonial, index) => ({
  id: index + 1,
  text: testimonial.text,
  author: testimonial.name,
  role: testimonial.role,
  highlight: testimonial.role,
}));

export function Testimonials() {
  return (
    <TestimonialsColumns
      testimonials={testimonials}
      autoplaySpeed={6000}
    />
  );
}

export default Testimonials;
