import React from 'react';
import { X, Trash2, ArrowRight, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'RSD' | 'EUR';
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD_RSD = 2400; // 4 komada
  const subtotalRsd = items.reduce((sum, item) => sum + item.priceRsd * item.quantity, 0);
  const subtotalEur = items.reduce((sum, item) => sum + item.priceEur * item.quantity, 0);

  const subtotalDisplay =
    currency === 'RSD' ? `${subtotalRsd.toLocaleString('sr-RS')} RSD` : `€${subtotalEur}`;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_RSD - subtotalRsd);
  const progressPercent = Math.min(100, (subtotalRsd / FREE_SHIPPING_THRESHOLD_RSD) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md bg-[#FAF4E8] h-full shadow-2xl border-l-4 border-[#2E211A] flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b-2 border-[#2E211A]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🛍️</span>
            <h3 className="text-xl font-fun font-bold text-[#2E211A]">
              Tvoja Korpa ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F7E5DE] hover:bg-[#D95D39] hover:text-white text-[#2E211A] border-2 border-[#2E211A] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="px-5 py-3.5 bg-[#F7EAC7] border-b-2 border-[#2E211A]/10 text-xs">
          <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold text-[#2E211A]">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#D95D39]" />
              {remainingForFreeShipping === 0 ? (
                <strong className="text-[#3D5A27]">🎉 Čestitamo! Tvoja dostava je BESPLATNA!</strong>
              ) : (
                <span>
                  Dodaj još <strong className="text-[#D95D39]">{remainingForFreeShipping.toLocaleString('sr-RS')} RSD</strong> za besplatnu dostavu!
                </span>
              )}
            </span>
          </div>
          <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#2E211A]">
            <div
              className="h-full bg-gradient-to-r from-[#D95D39] to-[#E8A838] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-[#F7E5DE] border-2 border-[#2E211A] flex items-center justify-center text-3xl shadow-[3px_3px_0px_#2E211A]">
                👻
              </div>
              <p className="text-base font-fun font-bold text-[#2E211A]">Korpa je prazna!</p>
              <p className="text-xs text-[#705F50] max-w-xs font-medium">
                Izaberi nekog od naših blesavih radova za samo 600 dinara.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2.5 text-xs font-bold text-[#2E211A] bg-[#E8A838] hover:bg-[#D49526] border-2 border-[#2E211A] rounded-2xl shadow-[2px_2px_0px_#2E211A] transition-all cursor-pointer"
              >
                Razgledaj radove 🚀
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-white border-2 border-[#2E211A] shadow-[3px_3px_0px_#2E211A] flex gap-3 relative group"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-[#F3EAD7] overflow-hidden shrink-0 border-2 border-[#2E211A]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-fun font-bold text-[#2E211A] truncate">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#9C8A79] hover:text-[#D95D39] transition-colors cursor-pointer p-0.5"
                      title="Ukloni iz korpe"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-[11px] font-bold text-[#705F50] mt-0.5">
                    Za običan upaljač (uključen nov)
                  </p>

                  {/* Custom specifics if custom order */}
                  {item.isCustom && item.customDetails && (
                    <div className="text-[10px] text-[#D95D39] mt-1 space-y-0.5 font-bold">
                      <p>Boja: {item.customDetails.colorPalette}</p>
                      {item.customDetails.customNote && (
                        <p className="italic">&quot;{item.customDetails.customNote}&quot;</p>
                      )}
                    </div>
                  )}

                  {/* Price and quantity stepper */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono text-sm font-extrabold text-[#D95D39] tabular-nums">
                      {currency === 'RSD'
                        ? `${(item.priceRsd * item.quantity).toLocaleString('sr-RS')} RSD`
                        : `€${item.priceEur * item.quantity}`}
                    </span>

                    <div className="flex items-center border-2 border-[#2E211A] rounded-xl bg-[#FAF4E8] shadow-[1px_1px_0px_#2E211A]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-[#2E211A] hover:bg-[#E8A838] rounded-lg transition-colors cursor-pointer text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-[#2E211A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#2E211A] hover:bg-[#E8A838] rounded-lg transition-colors cursor-pointer text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Trigger */}
        {items.length > 0 && (
          <div className="p-5 border-t-2 border-[#2E211A]/10 bg-white space-y-4">
            <div className="space-y-1.5 text-xs font-medium">
              <div className="flex justify-between text-[#6E5D4E]">
                <span>Međuzbir:</span>
                <span className="font-mono text-[#2E211A] font-bold tabular-nums">
                  {subtotalDisplay}
                </span>
              </div>
              <div className="flex justify-between text-[#6E5D4E]">
                <span>Dostava (Post Express):</span>
                <span className="font-mono tabular-nums font-bold">
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#3D5A27]">Besplatna 🎉</span>
                  ) : (
                    <span className="text-[#2E211A]">350 RSD</span>
                  )}
                </span>
              </div>
              <div className="pt-2 border-t-2 border-[#2E211A]/10 flex justify-between text-sm font-bold text-[#2E211A]">
                <span>Ukupno za plaćanje:</span>
                <span className="font-mono text-lg text-[#D95D39] font-extrabold tabular-nums">
                  {currency === 'RSD'
                    ? `${(subtotalRsd + (remainingForFreeShipping === 0 ? 0 : 350)).toLocaleString('sr-RS')} RSD`
                    : `€${subtotalEur + (remainingForFreeShipping === 0 ? 0 : 3)}`}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-4 px-4 text-xs sm:text-sm font-bold text-white bg-[#D95D39] hover:bg-[#C24D2B] rounded-2xl border-2 border-[#2E211A] shadow-[4px_4px_0px_#2E211A] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Nastavi na unos adrese za slanje 📦</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center font-bold text-[#7D6C5C]">
              🔒 Plaćanje pouzećem gotovinom pri preuzimanju paketa
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
