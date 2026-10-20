import React from 'react';
import { ArrowRight, RefreshCw, ShieldCheck, Truck, Instagram } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onExploreCollection: () => void;
  onCustomOrder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onCustomOrder }) => {
  return (
    <section id="pocetna" className="relative pt-6 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF4E8] via-[#F5EDE0] to-[#FAF4E8] border-b-2 border-[#2E211A]/10">
      
      {/* Warm Retro Ambient Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#E8A838]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-[#D95D39]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#588157]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Story */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Retro Stickers */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#D95D39] bg-[#F7E5DE] border-2 border-[#D95D39] rounded-full shadow-sm animate-wiggle">
                <span>🏺</span>
                <span>Retro & Ručno Vajano</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#2E211A] bg-[#F7EAC7] border-2 border-[#2E211A] rounded-full shadow-sm">
                <span>🔥</span>
                <span>Za obične upaljače sa kioska</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#3D5A27] bg-[#E3EBD3] border-2 border-[#588157] rounded-full shadow-sm">
                <span>🔄</span>
                <span>Večna zamena upaljača</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-fun font-bold text-[#2E211A] tracking-tight leading-[1.1] [text-wrap:balance]">
              Šarene & Blesave Glinene Futrole u Retro Bojama!
            </h1>

            <p className="text-base sm:text-lg text-[#615042] leading-relaxed max-w-2xl font-medium">
              Zaboravi na dosadne upaljače koje ti svi uzimaju! U <strong className="text-[#2E211A] font-bold">Mrvo Bazaru</strong> vajamo otkačene kiklope, mrgude, retro telefone sa tasterima i likove sa isplaženim jezikom. Sve futrole pravimo <strong className="text-[#2E211A] underline">za najobičnije standardne upaljače sa trafike</strong>. Kad se potroši gas — samo izvučeš prazan upaljač i uguraš novi, a tvoj glineni ortak ostaje s tobom zauvek!
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-bold text-white bg-[#D95D39] hover:bg-[#C24D2B] rounded-2xl shadow-[4px_4px_0px_#2E211A] hover:shadow-[2px_2px_0px_#2E211A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap border-2 border-[#2E211A]"
              >
                <span>Pogledaj sve likove 🚀</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCustomOrder}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-bold text-[#2E211A] bg-[#E8A838] hover:bg-[#D49526] border-2 border-[#2E211A] rounded-2xl shadow-[4px_4px_0px_#2E211A] hover:shadow-[2px_2px_0px_#2E211A] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>🎨 Naruči blesavka po svojoj želji</span>
              </button>

              <a
                href="https://www.instagram.com/mrvobazar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-[#2E211A] bg-[#FAF4E8] hover:bg-[#F0E6D5] border-2 border-[#2E211A] rounded-2xl shadow-[2px_2px_0px_#2E211A] transition-all whitespace-nowrap hover:scale-105"
              >
                <Instagram className="w-4 h-4 text-[#D95D39]" />
                <span>Instagram @mrvobazar</span>
              </a>
            </div>

            <p className="text-xs font-semibold text-[#7D6B5A] pt-1 flex items-center gap-1.5">
              <span>✨</span>
              <span>Odgovara običnom upaljaču sa trafike · Uz svaku futrolu stiže nov pun upaljač!</span>
            </p>
          </div>

          {/* Right Column: Hero Visual Asset with Real Works */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-4 border-[#2E211A] shadow-[8px_8px_0px_#2E211A] bg-white group hover:rotate-1 transition-transform duration-300">
              
              {/* Playful sticker corner badge */}
              <div className="absolute top-4 left-4 z-20 bg-[#E8A838] text-[#2E211A] font-fun font-bold px-3.5 py-1.5 rounded-full text-xs border-2 border-[#2E211A] shadow-sm flex items-center gap-1 -rotate-2">
                <span>🔥</span>
                <span>Originalni radovi @mrvobazar</span>
              </div>

              <img
                src={HERO_IMAGE}
                alt="Šarene i retro blesave futrole za upaljače od polimerne gline Mrvo Bazar"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] sm:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="p-4 bg-[#FAF4E8] border-t-2 border-[#2E211A] flex items-center justify-between">
                <div>
                  <p className="font-fun font-bold text-base text-[#2E211A]">Ekipa iz Mrvo Bazara 🎨</p>
                  <p className="text-xs font-medium text-[#7D6C5C]">100% ručni rad od polimerne gline</p>
                </div>
                <a
                  href="https://www.instagram.com/mrvobazar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs bg-[#D95D39] hover:bg-[#C24D2B] text-white px-3 py-1.5 rounded-xl border border-[#2E211A] transition-colors flex items-center gap-1 shadow-sm"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@mrvobazar</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Item Retro Feature Strip */}
        <div className="mt-14 pt-10 border-t-2 border-[#2E211A]/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="p-4 rounded-2xl bg-[#F7E5DE] border-2 border-[#E8C2B5] flex items-start gap-3">
            <span className="text-3xl shrink-0">👐</span>
            <div>
              <h4 className="text-sm font-fun font-bold text-[#2E211A]">100% Ručni Rad</h4>
              <p className="text-xs text-[#70483C] mt-0.5 font-medium">Svaka faca, zubić i detalj vajani su bez kalupa.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7EAC7] border-2 border-[#E8CE8B] flex items-start gap-3">
            <span className="text-3xl shrink-0">🔥</span>
            <div>
              <h4 className="text-sm font-fun font-bold text-[#2E211A]">Za Obične Upaljače</h4>
              <p className="text-xs text-[#705217] mt-0.5 font-medium">Kupuje se na svakom kiosku, menja se za 2 sekunde.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E3EBD3] border-2 border-[#C3D5A5] flex items-start gap-3">
            <span className="text-3xl shrink-0">⚡</span>
            <div>
              <h4 className="text-sm font-fun font-bold text-[#2E211A]">Pečena & Trajna</h4>
              <p className="text-xs text-[#3E5C23] mt-0.5 font-medium">Pečena na 130°C, otporna na toplotu i padove.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#E6EFF5] border-2 border-[#BDD6E7] flex items-start gap-3">
            <span className="text-3xl shrink-0">📦</span>
            <div>
              <h4 className="text-sm font-fun font-bold text-[#2E211A]">Post Express Srbija</h4>
              <p className="text-xs text-[#2A5978] mt-0.5 font-medium">Plaćaš pouzećem kuriru. Besplatno za 4.000+ RSD.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
