import React from 'react';
import { Instagram, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  onScrollTo: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer id="kontakt" className="bg-[#FFFDF9] border-t-4 border-[#1E1B18] text-[#1E1B18] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5 text-xl font-bold font-fun text-[#1E1B18]">
              <span className="w-9 h-9 rounded-2xl bg-[#FFD93D] border-2 border-[#1E1B18] flex items-center justify-center text-lg shadow-[2px_2px_0px_#1E1B18]">
                🤪
              </span>
              <span>MRVO BAZAR</span>
            </div>
            <p className="text-xs leading-relaxed text-[#5E554B] font-medium">
              Otkačene, šarene i blesave ručno vajane futrole za upaljače od polimerne gline. Svaka faca je unikatna i napravljena sa puno ljubavi.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE5EC] border border-[#FFA8BA] text-[11px] font-bold text-[#FF6B6B]">
              <span>🇷🇸 Ručni rad iz Srbije</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-fun font-bold text-[#1E1B18] uppercase tracking-wider">
              Brzi Linkovi
            </h4>
            <ul className="space-y-2 font-medium text-[#5E554B]">
              <li>
                <button
                  onClick={() => onScrollTo('pocetna')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  🚀 Početna strana
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('kolekcija')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  👀 Svi dostupni likovi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('po-meri')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  🎨 Naruči svog blesavka
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('izrada')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  👐 Kako nastaju radovi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('pitanja')}
                  className="hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  ❓ Česta pitanja
                </button>
              </li>
            </ul>
          </div>

          {/* Contact and studio */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-fun font-bold text-[#1E1B18] uppercase tracking-wider">
              Instagram & Kontakt
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a
                  href="https://www.instagram.com/mrvobazar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#F72585] to-[#7209B7] text-white border border-[#1E1B18] shadow-sm hover:scale-105 transition-transform"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@mrvobazar na Instagramu</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#5E554B]">
                <Mail className="w-4 h-4 text-[#FF6B6B]" />
                <span>DM poruke na Instagramu @mrvobazar</span>
              </li>
              <li className="flex items-center gap-2 text-[#5E554B]">
                <MapPin className="w-4 h-4 text-[#FF6B6B]" />
                <span>Post Express dostava za celu Srbiju</span>
              </li>
            </ul>
          </div>

          {/* Friendly note */}
          <div className="space-y-2 text-xs text-[#6B6153] font-medium bg-[#FFF9DB] p-4 rounded-2xl border-2 border-[#1E1B18] shadow-[3px_3px_0px_#1E1B18]">
            <h4 className="font-fun font-bold text-[#1E1B18] text-sm">
              Upaljač je uvek uključen! 🔥
            </h4>
            <p className="leading-relaxed text-[11px]">
              Kada kupiš futrolu, stiže sa novim punim upaljačem. Kad se potroši, samo ga izvučeš i ubaciš novi običan upaljač.
            </p>
            <p className="text-[10px] font-bold text-[#10B981]">
              ✔ Plaćanje pouzećem pri preuzimanju paketa.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t-2 border-[#1E1B18]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7165] font-medium">
          <p>
            © {new Date().getFullYear()} Mrvo Bazar. Sva prava zadržana.
          </p>
          <a
            href="https://www.instagram.com/mrvobazar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-bold text-[#1E1B18] hover:text-[#FF6B6B] transition-colors"
          >
            <span>Instagram profil:</span>
            <span className="text-[#FF6B6B] underline">@mrvobazar</span>
            <Heart className="w-3.5 h-3.5 text-[#FF6B6B] fill-current" />
          </a>
        </div>

      </div>
    </footer>
  );
};
