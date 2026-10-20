import React, { useState } from 'react';
import { Check, Info, ShoppingBag, Instagram } from 'lucide-react';
import { CartItem } from '../types';

interface CustomizerStudioProps {
  currency: 'RSD' | 'EUR';
  onAddCustomToCart: (item: CartItem) => void;
}

interface ThemeOption {
  id: string;
  name: string;
  desc: string;
  basePriceRsd: number;
  iconSymbol: string;
}

const THEMES: ThemeOption[] = [
  {
    id: 'cyclops-monster',
    name: 'Jednooki Kiklop sa Zubićima',
    desc: 'Veliko oko, bočni roščići i otvorena usta sa belim zubićima',
    basePriceRsd: 600,
    iconSymbol: '👁️',
  },
  {
    id: 'grumpy-ogre',
    name: 'Grumpy Ogr sa Borama & Očnjacima',
    desc: 'Namršteno ekspresivno lice sa naboranim čelom i zubima',
    basePriceRsd: 600,
    iconSymbol: '👹',
  },
  {
    id: 'retro-phone',
    name: 'Retro Telefon sa Tasterima',
    desc: 'Mobilni telefon sa reljefnim dugmićima i natpisom na ekranu',
    basePriceRsd: 600,
    iconSymbol: '📱',
  },
  {
    id: 'goofy-tongue',
    name: 'Blesavko sa Isplaženim Jezikom',
    desc: 'Krupne razrogačene oči, veseo osmeh i veliki ružičasti jezik',
    basePriceRsd: 600,
    iconSymbol: '🤪',
  },
  {
    id: 'shaman-totem',
    name: 'Zeleni Šaman & Totem Maska',
    desc: 'Mistična maska sa reljefnom krunom od kamenčića i amuletom',
    basePriceRsd: 600,
    iconSymbol: '🗿',
  },
  {
    id: 'dude-mustache',
    name: 'Kul Lik sa Brkovima & Cigarom',
    desc: 'Opušteni lik sa gustim brkovima i smotanim detaljem u ustima',
    basePriceRsd: 600,
    iconSymbol: '🥸',
  },
];

const RETRO_PALETTES = [
  { id: 'mustard-yellow', name: 'Senf Žuta (Mustard)', hex: '#E8A838', desc: 'Topla retro žuta iz 70-ih' },
  { id: 'terracotta-rust', name: 'Terakota & Rđa', hex: '#D95D39', desc: 'Zemljana topla narandžasta' },
  { id: 'olive-avocado', name: 'Avokado & Maslina', hex: '#588157', desc: 'Prirodna retro maslinasto zelena' },
  { id: 'vintage-denim', name: 'Retro Džins Plava', hex: '#2A6F97', desc: 'Duboka retro plava nijansa' },
  { id: 'dusty-rose', name: 'Vintage Puder Roze', hex: '#C26D7B', desc: 'Meka starinska roze boja' },
  { id: 'retro-plum', name: 'Kiklopska Ljubičasta', hex: '#7A3E65', desc: 'Retro duboka ljubičasta' },
  { id: 'cocoa-brown', name: 'Čokoladno Braon', hex: '#6F4E37', desc: 'Topla braon boja pečene gline' },
];

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({
  currency,
  onAddCustomToCart,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('cyclops-monster');
  const [selectedPaletteId, setSelectedPaletteId] = useState<string>('terracotta-rust');
  const [customNote, setCustomNote] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const currentTheme = THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];
  const currentPalette = RETRO_PALETTES.find((p) => p.id === selectedPaletteId) || RETRO_PALETTES[0];

  const totalPriceRsd = currentTheme.basePriceRsd;
  const totalPriceEur = 5;

  const handleAddToCart = () => {
    const customItem: CartItem = {
      id: `custom-${Date.now()}`,
      name: `Unikat po želji: ${currentTheme.name}`,
      priceRsd: totalPriceRsd,
      priceEur: totalPriceEur,
      image: '/assets/aistudio/IMG_20260920_130326_428d80ba.jpg',
      quantity: 1,
      isCustom: true,
      customDetails: {
        theme: currentTheme.name,
        colorPalette: currentPalette.name,
        customNote: customNote.trim() || undefined,
      },
    };

    onAddCustomToCart(customItem);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const displayPrice = currency === 'RSD' ? `${totalPriceRsd.toLocaleString('sr-RS')} RSD` : `€${totalPriceEur}`;

  return (
    <section id="po-meri" className="py-16 lg:py-24 bg-[#F5EDE0] border-t-2 border-b-2 border-[#2E211A]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold text-[#D95D39] bg-[#FAF4E8] border-2 border-[#2E211A] rounded-full mb-3 shadow-[2px_2px_0px_#2E211A]">
            <span>🏺</span>
            <span>Izrada po tvojoj želji · Samo 600 RSD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-fun font-bold text-[#2E211A] tracking-tight">
            Naruči Svog Blesavka u Retro Boji! 🎨
          </h2>
          <p className="text-sm text-[#695849] mt-2 font-medium">
            Izaberi vajani lik i svoju omiljenu retro boju gline. Sve pravimo ručno za najobičnije upaljače koji se kupuju na svakom kiosku — za samo 600 dinara sa upaljačem!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Options (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border-3 border-[#2E211A] shadow-[6px_6px_0px_#2E211A]">
            
            {/* Ordinary Lighter Notice */}
            <div className="p-3.5 rounded-2xl bg-[#F7EAC7] border-2 border-[#2E211A] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔥</span>
                <div className="text-xs">
                  <p className="font-fun font-bold text-[#2E211A]">Najobičniji upaljač uključen</p>
                  <p className="text-[#6E5A2A] font-medium mt-0.5">
                    Kada se potroši plin, lako se zameni novim upaljačem sa trafike.
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs font-black bg-white px-2.5 py-1 rounded-xl border border-[#2E211A] text-[#D95D39]">
                600 RSD
              </span>
            </div>

            {/* Step 1: Sculptural Theme */}
            <div>
              <label className="block text-xs font-fun font-bold text-[#2E211A] uppercase tracking-wider mb-3">
                1. Izaberi blesavi lik
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEMES.map((theme) => {
                  const isSelected = selectedThemeId === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedThemeId(theme.id)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[#FBE4DD] border-[#2E211A] shadow-[3px_3px_0px_#2E211A] -translate-y-0.5'
                          : 'bg-[#FAF4E8] border-[#E5DAC8] hover:border-[#2E211A]'
                      }`}
                    >
                      <span className="text-3xl shrink-0 mt-0.5">{theme.iconSymbol}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-fun font-bold text-[#2E211A] truncate">{theme.name}</h4>
                          {isSelected && <Check className="w-4 h-4 text-[#D95D39] shrink-0 font-bold" />}
                        </div>
                        <p className="text-[11px] text-[#6E5D4E] mt-1 leading-tight font-medium">{theme.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Retro Color Palette */}
            <div>
              <label className="block text-xs font-fun font-bold text-[#2E211A] uppercase tracking-wider mb-3">
                2. Izaberi retro boju polimerne gline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {RETRO_PALETTES.map((pal) => {
                  const isSelected = selectedPaletteId === pal.id;
                  return (
                    <div
                      key={pal.id}
                      onClick={() => setSelectedPaletteId(pal.id)}
                      className={`p-3 rounded-2xl border-2 flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#F3EAD7] border-[#2E211A] shadow-[2px_2px_0px_#2E211A]'
                          : 'bg-[#FAF4E8] border-[#E5DAC8] hover:border-[#2E211A]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-6 h-6 rounded-full border-2 border-[#2E211A] shrink-0 shadow-sm"
                          style={{ backgroundColor: pal.hex }}
                        />
                        <div className="truncate">
                          <p className="text-xs font-bold text-[#2E211A] truncate">{pal.name}</p>
                          <p className="text-[10px] text-[#7A6B5C] truncate font-medium">{pal.desc}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#D95D39] shrink-0 font-bold" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Note for Artisan */}
            <div>
              <label className="block text-xs font-fun font-bold text-[#2E211A] uppercase tracking-wider mb-2">
                3. Posebna želja ili napomena za Mrvo Bazar:
              </label>
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="Npr. hteo bih da zubići budu malo krivi, da ima veće uši, ili poseban natpis ako biraš retro telefon..."
                rows={3}
                className="w-full p-3.5 text-xs font-medium text-[#2E211A] bg-[#FAF4E8] border-2 border-[#2E211A] rounded-2xl focus:border-[#D95D39] focus:outline-none transition-colors placeholder:text-[#998A7A]"
              />
            </div>

          </div>

          {/* Right Column: Live Configuration Preview Card (5 Cols Sticky) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl border-3 border-[#2E211A] p-6 sm:p-7 shadow-[8px_8px_0px_#2E211A] relative overflow-hidden">
              
              {/* Playful Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#2E211A]/10">
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#D95D39] bg-[#F7E5DE] px-2.5 py-0.5 rounded-full border border-[#E8C2B5]">
                    Tvoj unikat po želji
                  </span>
                  <h3 className="text-xl font-fun font-bold text-[#2E211A] mt-1.5">
                    {currentTheme.name}
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#E8A838] border-2 border-[#2E211A] flex items-center justify-center text-3xl shadow-[2px_2px_0px_#2E211A]">
                  {currentTheme.iconSymbol}
                </div>
              </div>

              {/* Spec list */}
              <div className="py-4 space-y-2.5 text-xs border-b-2 border-[#2E211A]/10">
                <div className="flex justify-between">
                  <span className="text-[#736353] font-medium">Upaljač:</span>
                  <span className="text-[#2E211A] font-bold">Najobičniji sa kioska (uključen nov)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736353] font-medium">Izabrani lik:</span>
                  <span className="text-[#2E211A] font-bold">{currentTheme.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#736353] font-medium">Retro boja:</span>
                  <span className="text-[#2E211A] font-bold flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-[#2E211A]" style={{ backgroundColor: currentPalette.hex }} />
                    <span>{currentPalette.name}</span>
                  </span>
                </div>
                {customNote && (
                  <div className="pt-2 border-t border-[#2E211A]/10">
                    <span className="text-[#736353] font-medium block mb-0.5">Tvoja napomena:</span>
                    <p className="text-[#2E211A] font-bold italic">&quot;{customNote}&quot;</p>
                  </div>
                )}
              </div>

              {/* Delivery and Craft Timeline */}
              <div className="py-3.5 flex items-start gap-2.5 text-xs text-[#695849] font-medium">
                <Info className="w-4 h-4 text-[#D95D39] shrink-0 mt-0.5" />
                <span>
                  <strong>Ručna izrada:</strong> Vajamo ga za 3–5 radnih dana. Šaljemo Post Express-om ili dogovor u DM na <a href="https://www.instagram.com/mrvobazar/" target="_blank" rel="noopener noreferrer" className="text-[#D95D39] font-bold underline">@mrvobazar</a>.
                </span>
              </div>

              {/* Price Calculation */}
              <div className="pt-4 border-t-2 border-[#2E211A]/10 flex items-baseline justify-between mb-5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8A796A] block">Cena sa upaljačem</span>
                  <span className="text-3xl font-mono font-extrabold text-[#D95D39] tabular-nums">
                    {displayPrice}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#3D5A27] bg-[#E3EBD3] px-2.5 py-1 rounded-lg border border-[#C3D5A5]">
                  Plaćanje pouzećem
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full py-4 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border-2 border-[#2E211A] shadow-[4px_4px_0px_#2E211A] active:translate-x-0.5 active:translate-y-0.5 ${
                  isSuccess
                    ? 'bg-[#588157] text-white shadow-none'
                    : 'bg-[#D95D39] hover:bg-[#C24D2B] text-white hover:scale-102'
                }`}
              >
                {isSuccess ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Unikat dodat u korpu! 🚀</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-[#E8A838]" />
                    <span>Naruči ovog unikata (600 RSD) 🛍️</span>
                  </>
                )}
              </button>

              <div className="mt-3 text-center">
                <a
                  href="https://www.instagram.com/mrvobazar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E211A] hover:text-[#D95D39] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#D95D39]" />
                  <span>Ili nam piši u DM na @mrvobazar 💌</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
