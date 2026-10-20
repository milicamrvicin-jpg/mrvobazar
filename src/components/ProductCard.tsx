import React from 'react';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  currency: 'RSD' | 'EUR';
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAdded: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onQuickView,
  onAddToCart,
  isAdded,
}) => {
  const price = currency === 'RSD' ? `${product.priceRsd.toLocaleString('sr-RS')} RSD` : `€${product.priceEur}`;

  // Retro category styling
  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'fantazija':
        return 'bg-[#F2DFCE] text-[#8C3A27] border-[#DFBA9C]';
      case 'priroda':
        return 'bg-[#E3EBD3] text-[#3D5A27] border-[#C3D5A5]';
      case 'boho':
        return 'bg-[#FBE4DD] text-[#A8432C] border-[#F4BEB0]';
      default:
        return 'bg-[#F7EAC7] text-[#916212] border-[#E8CE8B]';
    }
  };

  return (
    <article className="group bg-[#FFFDF9] rounded-3xl border-3 border-[#2E211A] shadow-[5px_5px_0px_#2E211A] hover:shadow-[7px_7px_0px_#2E211A] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      
      {/* Product Image Area */}
      <div
        className="relative aspect-[4/3] w-full bg-[#F3EAD7] overflow-hidden cursor-pointer border-b-3 border-[#2E211A]"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Retro badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#E8A838] text-[#2E211A] font-fun font-bold px-3 py-1 rounded-full text-xs border-2 border-[#2E211A] shadow-sm -rotate-2">
            {product.badge}
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-4 py-2 text-xs font-bold text-[#2E211A] bg-[#FAF4E8] hover:bg-[#E8A838] border-2 border-[#2E211A] rounded-xl shadow-[2px_2px_0px_#2E211A] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#D95D39]" />
            <span>Zaviri u detalje 👀</span>
          </button>
        </div>

        {/* Ordinary lighter tag */}
        <div className="absolute bottom-2.5 right-2.5 bg-[#FAF4E8] text-[#2E211A] font-bold text-[10px] px-2.5 py-1 rounded-lg border-2 border-[#2E211A] shadow-sm">
          🔥 Za običan upaljač
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-[#FFFDF9]">
        <div>
          {/* Category Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(product.category)}`}>
              {product.category === 'fantazija' && '👾 Čudovište'}
              {product.category === 'priroda' && '🗿 Totem & Šaman'}
              {product.category === 'boho' && '📱 Retro Telefon'}
              {product.category === 'kristali' && '✨ Specijal'}
            </span>
            <span className="text-[11px] font-bold text-[#8A7866]">
              {product.stock > 0 ? `Unikat: ${product.stock} kom.` : 'Po želji'}
            </span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-fun text-lg font-bold text-[#2E211A] group-hover:text-[#D95D39] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6E5D4E] mt-1.5 line-clamp-2 leading-relaxed font-medium">
            {product.tagline}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="mt-5 pt-4 border-t-2 border-[#2E211A]/10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#94816F] block">Cena + nov upaljač</span>
            <span className="font-mono text-base font-extrabold text-[#2E211A] tabular-nums">
              {price}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap border-2 border-[#2E211A] ${
              isAdded
                ? 'bg-[#588157] text-white shadow-none'
                : 'bg-[#D95D39] hover:bg-[#C24D2B] text-white shadow-[2px_2px_0px_#2E211A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Dodato! 🎉</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#E8A838]" />
                <span>U korpu 🛍️</span>
              </>
            )}
          </button>
        </div>

      </div>

    </article>
  );
};
