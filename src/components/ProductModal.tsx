import React, { useState } from 'react';
import { X, Check, ShoppingBag, RefreshCw, Layers } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  currency: 'RSD' | 'EUR';
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const priceText =
    currency === 'RSD'
      ? `${(product.priceRsd * quantity).toLocaleString('sr-RS')} RSD`
      : `€${product.priceEur * quantity}`;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] rounded-3xl border-4 border-[#2E211A] shadow-[10px_10px_0px_#2E211A] overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#D95D39] hover:bg-[#C24D2B] text-white border-2 border-[#2E211A] flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-[2px_2px_0px_#2E211A]"
          aria-label="Zatvori prozor"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Big Product Image */}
          <div className="relative bg-[#F3EAD7] aspect-[4/3] md:aspect-auto flex items-center justify-center overflow-hidden border-b-3 md:border-b-0 md:border-r-3 border-[#2E211A]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-[#E8A838] text-[#2E211A] font-fun font-bold px-3.5 py-1.5 rounded-full text-xs border-2 border-[#2E211A] shadow-sm -rotate-2">
                {product.badge}
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border-2 border-[#2E211A] text-xs text-[#2E211A] flex items-center justify-between font-bold shadow-sm">
              <span>🔥 Za običan upaljač sa kioska</span>
              <span className="font-mono text-[#D95D39]">Težina: {product.clayDetails.weight}</span>
            </div>
          </div>

          {/* Right Column: Information & Order Action */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-[#FAF4E8]">
            <div>
              {/* Status */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-[#D95D39] bg-[#F7E5DE] px-2.5 py-0.5 rounded-full border border-[#E8C2B5]">
                  🏺 Ručni rad @mrvobazar
                </span>
                <span className="text-xs font-bold text-[#3D5A27] bg-[#E3EBD3] px-2.5 py-0.5 rounded-full border border-[#C3D5A5]">
                  {product.stock > 0 ? `Na stanju: ${product.stock} kom.` : 'Izrada po želji'}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-fun font-bold text-[#2E211A] leading-tight">
                {product.name}
              </h2>

              <p className="text-xs font-bold text-[#8C3A27] mt-1">
                {product.tagline}
              </p>

              {/* Price */}
              <div className="mt-4 pb-4 border-b-2 border-[#2E211A]/10 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-extrabold text-[#2E211A] tabular-nums">
                  {priceText}
                </span>
                <span className="text-xs font-bold text-[#3D5A27] bg-[#E3EBD3] px-2.5 py-1 rounded-lg border border-[#C3D5A5]">
                  Uključen nov pun običan upaljač!
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C4D3F] leading-relaxed mt-4 font-medium">
                {product.description}
              </p>

              {/* Craft Specs */}
              <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-[#2E211A] shadow-[3px_3px_0px_#2E211A] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#2E211A] font-fun font-bold text-sm">
                  <Layers className="w-4 h-4 text-[#D95D39]" />
                  <span>Detalji izrade:</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#5E4D3E]">
                  <div><strong className="text-[#2E211A]">Materijal:</strong> {product.clayDetails.clayType}</div>
                  <div><strong className="text-[#2E211A]">Završnica:</strong> {product.clayDetails.finish}</div>
                  <div><strong className="text-[#2E211A]">Pečenje:</strong> {product.clayDetails.bakingTemp}</div>
                  <div><strong className="text-[#2E211A]">Upaljač:</strong> Najobičniji sa trafike</div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mt-4 space-y-2">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#3D2C1E]">
                    <span className="text-[#D95D39] text-sm">✔</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* How to replace note */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#F7EAC7] border-2 border-[#E8CE8B] flex items-start gap-2.5 text-xs text-[#6E4909]">
                <RefreshCw className="w-4 h-4 text-[#D95D39] shrink-0 mt-0.5" />
                <span className="font-medium">
                  <strong className="text-[#2E211A]">Jednostavna zamena:</strong> Kad nestane plina, samo izvučete upaljač i ubacite novi najobičniji upaljač sa trafike za pedesetak dinara. Futrola traje zauvek!
                </span>
              </div>

            </div>

            {/* Bottom Actions: Quantity and Add to Cart */}
            <div className="mt-6 pt-5 border-t-2 border-[#2E211A]/10 flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border-2 border-[#2E211A] rounded-2xl bg-white p-1 shadow-[2px_2px_0px_#2E211A]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#2E211A] hover:bg-[#E8A838] rounded-xl transition-colors cursor-pointer text-sm font-bold"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono text-sm font-bold text-[#2E211A]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock || 5, q + 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#2E211A] hover:bg-[#E8A838] rounded-xl transition-colors cursor-pointer text-sm font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-4 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-[#2E211A] shadow-[3px_3px_0px_#2E211A] active:translate-x-0.5 active:translate-y-0.5 ${
                  isAdded
                    ? 'bg-[#588157] text-white'
                    : 'bg-[#D95D39] hover:bg-[#C24D2B] text-white hover:scale-102'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Ubačeno u korpu! 🎉</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-[#E8A838]" />
                    <span>Dodaj u korpu ({priceText}) 🛍️</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
