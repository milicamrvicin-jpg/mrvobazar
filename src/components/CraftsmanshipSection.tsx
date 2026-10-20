import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Mešenje & Baza',
      emoji: '🥣',
      color: 'bg-[#F7EAC7] border-[#E8CE8B]',
      desc: 'Glina se ručno mesi i valja dok ne postane savršeno elastična. Zatim se oblikuje baza tačno po meri najobičnijeg standardnog upaljača.',
    },
    {
      num: '02',
      title: 'Ručno Vajanje Lica',
      emoji: '👀',
      color: 'bg-[#F7E5DE] border-[#E8C2B5]',
      desc: 'Svaki zubić, kapak, nosić ili taster na telefonu vajar oblikuje tankim iglicama. Nema livenja u kalupima — svaka faca je 100% unikat!',
    },
    {
      num: '03',
      title: 'Pečenje na 130°C',
      emoji: '🔥',
      color: 'bg-[#E3EBD3] border-[#C3D5A5]',
      desc: 'Glina ide u rernu na 130°C. Tokom pečenja masa postaje čvrsta i blago elastična — nema pucanja kao kod krhke keramike ili stakla!',
    },
    {
      num: '04',
      title: 'Finiš & Nov Upaljač',
      emoji: '✨',
      color: 'bg-[#E6EFF5] border-[#BDD6E7]',
      desc: 'Nanosi se mat zaštitni sloj koji čuva reljef od habanja u džepu. Ubacuje se novi pun upaljač i futrola je spremna za slanje!',
    },
  ];

  return (
    <section id="izrada" className="py-16 lg:py-24 bg-[#FAF4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#D95D39] bg-[#F7E5DE] border border-[#E8C2B5] rounded-full mb-3">
            <span>👐</span>
            <span>Radionica Mrvo Bazar</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-fun font-bold text-[#2E211A] tracking-tight">
            Kako Nastaju Naši Blesavi Radovi? 🎨
          </h2>
          <p className="text-sm text-[#6E5D4E] mt-2 font-medium">
            Čista polimerna glina, prsti i iglice za modelovanje. Bez plastike, bez kalupa — samo strpljenje i ljubav.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step) => {
            return (
              <div
                key={step.num}
                className={`rounded-3xl p-6 border-3 border-[#2E211A] shadow-[5px_5px_0px_#2E211A] flex flex-col justify-between group hover:-translate-y-1 transition-all ${step.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-fun text-3xl">{step.emoji}</span>
                    <span className="font-mono text-xs font-black bg-white px-2.5 py-1 rounded-xl border-2 border-[#2E211A]">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-fun text-lg font-bold text-[#2E211A]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#524132] mt-2 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Proof Section */}
        <div className="pt-12 border-t-2 border-[#2E211A]/10">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-fun font-bold text-[#2E211A]">
              Šta Kažu Ljudi Koji Već Nose Mrvo Bazar? 🥰
            </h3>
            <p className="text-xs font-semibold text-[#7D6B5A] mt-1">
              Pravi utisci kupaca sa Instagrama @mrvobazar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 border-3 border-[#2E211A] shadow-[5px_5px_0px_#2E211A] relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#E8A838] mb-3">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-[#E8A838]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#473628] font-medium leading-relaxed">
                    &quot;{test.text}&quot;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t-2 border-[#2E211A]/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#2E211A]">{test.author}</span>
                    <span className="text-[#857362] block text-[11px] font-medium">{test.city}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#D95D39] bg-[#F7E5DE] px-2.5 py-1 rounded-xl border border-[#E8C2B5]">
                    {test.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
