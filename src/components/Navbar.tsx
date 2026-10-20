import React from 'react';
import { ShoppingBag, Instagram } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: 'RSD' | 'EUR';
  onToggleCurrency: () => void;
  onScrollTo: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onToggleCurrency,
  onScrollTo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF4E8]/95 backdrop-blur-md border-b-2 border-[#2E211A]/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <a
          href="#pocetna"
          onClick={(e) => {
            e.preventDefault();
            onScrollTo('pocetna');
          }}
          className="flex items-center gap-3 text-2xl font-bold tracking-tight text-[#2E211A] font-fun hover:scale-105 transition-transform whitespace-nowrap shrink-0 group"
        >
          <span className="w-10 h-10 rounded-2xl bg-[#E8A838] border-2 border-[#2E211A] flex items-center justify-center text-[#2E211A] shadow-[2px_2px_0px_#2E211A] text-lg group-hover:rotate-6 transition-transform">
            🏺
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-fun text-xl sm:text-2xl text-[#2E211A] tracking-tight">
              MRVO <span className="text-[#D95D39]">BAZAR</span>
            </span>
            <span className="text-[10px] font-sans font-extrabold text-[#735A45] uppercase tracking-wider">
              Polimerna glina & upaljači
            </span>
          </div>
        </a>

        {/* Clean, Retro Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-[#574637]">
          <button
            onClick={() => onScrollTo('kolekcija')}
            className="hover:text-[#D95D39] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>👀 Svi likovi</span>
          </button>
          <button
            onClick={() => onScrollTo('po-meri')}
            className="hover:text-[#D95D39] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>🎨 Naruči po želji</span>
          </button>
          <button
            onClick={() => onScrollTo('izrada')}
            className="hover:text-[#588157] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>👐 Kako nastaju</span>
          </button>
          <button
            onClick={() => onScrollTo('pitanja')}
            className="hover:text-[#E8A838] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>❓ Pitanja</span>
          </button>
          <button
            onClick={() => onScrollTo('kontakt')}
            className="hover:text-[#D95D39] transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>💌 Kontakt</span>
          </button>
        </nav>

        {/* Zone 3: Instagram badge, Currency & Cart */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/mrvobazar/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#D95D39] hover:bg-[#C24D2B] rounded-xl border-2 border-[#2E211A] shadow-[2px_2px_0px_#2E211A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all whitespace-nowrap"
            title="Posetite @mrvobazar na Instagramu"
          >
            <Instagram className="w-4 h-4" />
            <span className="hidden sm:inline">@mrvobazar</span>
          </a>

          {/* Currency Switcher */}
          <button
            onClick={onToggleCurrency}
            className="text-xs font-mono font-bold text-[#574637] hover:text-[#2E211A] px-2.5 py-2 rounded-xl bg-white hover:bg-[#F3EAD7] border-2 border-[#2E211A] transition-colors whitespace-nowrap cursor-pointer shadow-[2px_2px_0px_#2E211A]"
            title="Promeni valutu"
          >
            {currency === 'RSD' ? 'RSD' : 'EUR (€)'}
          </button>

          {/* Playful Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#2E211A] bg-[#E8A838] hover:bg-[#D49526] rounded-xl border-2 border-[#2E211A] shadow-[2px_2px_0px_#2E211A] transition-all cursor-pointer whitespace-nowrap hover:scale-105 active:scale-95"
            aria-label="Otvori korpu"
          >
            <ShoppingBag className="w-4 h-4 text-[#2E211A]" />
            <span className="hidden sm:inline">Korpa</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center text-[11px] font-extrabold bg-[#D95D39] text-white rounded-full border border-white">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
