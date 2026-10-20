import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/products';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="pitanja" className="py-16 lg:py-24 bg-[#F5EDE0] border-t-2 border-[#2E211A]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#D95D39] bg-[#F7E5DE] border border-[#E8C2B5] rounded-full mb-3">
            <span>❓</span>
            <span>Česta pitanja i odgovori</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-fun font-bold text-[#2E211A] tracking-tight">
            Sve Što Te Zanima pre Porudžbine 🤔
          </h2>
          <p className="text-sm text-[#6E5D4E] mt-2 font-medium">
            Kako se menja običan upaljač, koliko je glina izdržljiva i kako stiže paket.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-[#2E211A] shadow-[3px_3px_0px_#2E211A] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF4E8] transition-colors"
                >
                  <span className="text-sm sm:text-base font-fun font-bold text-[#2E211A]">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-[#E8A838] border border-[#2E211A] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-[#D95D39] text-white' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-[#2E211A]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#5C4D3F] font-medium leading-relaxed border-t-2 border-[#2E211A]/10 pt-3.5 animate-in fade-in duration-200 bg-[#FAF4E8]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
