"use client";

import React, { useState } from "react";
import { ChevronUp, Plus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
}

export const FAQAccordion = ({
  faqs,
  title = "Preguntas Frecuentes",
  subtitle = "Resolvemos tus dudas sobre nuestros servicios",
}: FAQAccordionProps) => {
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);

  return (
    <section className="section">
      <div className="container max-w-3xl">
        <div className="space-y-3 text-center mb-16">
          <h2 className="text-4xl font-bold text-yellow-400">{title}</h2>
          <p className="text-slate-400 text-lg">{subtitle}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-white/10 rounded-lg overflow-hidden bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
            >
              <button
                onClick={() =>
                  setSelectedFaq(selectedFaq === index ? null : index)
                }
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white text-left">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 ml-4">
                  {selectedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
              </button>

              {selectedFaq === index && (
                <div className="px-6 py-4 bg-black/40 border-t border-white/10">
                  <p className="text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
