import React from 'react';
import { ArrowRight, Truck } from 'lucide-react';
import { ConfirmedOrder } from '../types';

interface OrderSuccessModalProps {
  order: ConfirmedOrder | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl border-4 border-[#1E1B18] p-6 sm:p-8 shadow-[10px_10px_0px_#1E1B18] my-8">
        
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-3xl bg-[#FFD93D] border-3 border-[#1E1B18] text-3xl flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_#1E1B18] animate-bounce">
          🎉
        </div>

        <div className="text-center mb-6">
          <span className="font-mono text-xs text-[#FF6B6B] font-bold bg-[#FFE5EC] px-3 py-1 rounded-full border border-[#FFA8BA]">
            Broj porudžbine #{order.orderId}
          </span>
          <h3 className="text-3xl font-fun font-bold text-[#1E1B18] mt-2">
            Hura! Tvoj Blesavko je Spreman za Polazak! 🚀
          </h3>
          <p className="text-xs text-[#6B6153] font-medium mt-1.5 max-w-sm mx-auto">
            Hvala ti što podržavaš ručni rad ateljea <strong>Mrvo Bazar</strong>. Pažljivo pakujemo tvoju futrolu sa novim upaljačem!
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#1E1B18] p-4 text-xs space-y-3 mb-6 shadow-[2px_2px_0px_#1E1B18]">
          <div className="flex justify-between border-b border-[#1E1B18]/10 pb-2 text-[#73685C]">
            <span>Datum:</span>
            <span className="text-[#1E1B18] font-bold">{order.date}</span>
          </div>

          <div className="flex justify-between border-b border-[#1E1B18]/10 pb-2 text-[#73685C]">
            <span>Primalac:</span>
            <span className="text-[#1E1B18] font-bold">{order.customer.fullName} ({order.customer.phone})</span>
          </div>

          <div className="flex justify-between border-b border-[#1E1B18]/10 pb-2 text-[#73685C]">
            <span>Adresa dostave:</span>
            <span className="text-[#1E1B18] font-bold text-right">
              {order.customer.address}, {order.customer.postalCode} {order.customer.city}
            </span>
          </div>

          <div className="flex justify-between border-b border-[#1E1B18]/10 pb-2 text-[#73685C]">
            <span>Plaćanje:</span>
            <span className="text-[#1E1B18] font-bold">
              {order.customer.paymentMethod === 'pouzece' ? 'Pouzećem gotovinom kuriru' : 'Uplata na tekući račun'}
            </span>
          </div>

          {/* Itemized list */}
          <div className="pt-1">
            <span className="text-[#73685C] block mb-1 font-bold">Poručene futrole:</span>
            <div className="space-y-1">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-[#1E1B18] font-medium">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-mono font-bold tabular-nums">{(it.priceRsd * it.quantity).toLocaleString('sr-RS')} RSD</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-2 border-t-2 border-[#1E1B18]/10 flex justify-between font-bold text-sm">
            <span className="text-[#1E1B18]">Ukupno za naplatu:</span>
            <span className="font-mono text-lg text-[#FF6B6B] font-extrabold tabular-nums">{order.totalRsd.toLocaleString('sr-RS')} RSD</span>
          </div>
        </div>

        {/* Post-order trust box */}
        <div className="p-3.5 rounded-2xl bg-[#FFF9DB] border-2 border-[#1E1B18] flex items-start gap-3 text-xs text-[#6B5A1D] mb-6">
          <Truck className="w-5 h-5 text-[#FF6B6B] shrink-0 mt-0.5" />
          <p className="font-medium">
            Kurir <strong>Post Express-a</strong> te zove ili šalje SMS pre isporuke. Upaljač je unutra već nov i odmah radi!
          </p>
        </div>

        {/* Close and Return */}
        <button
          onClick={onClose}
          className="w-full py-4 px-4 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] hover:from-[#FF5252] hover:to-[#FF7A33] rounded-2xl border-2 border-[#1E1B18] shadow-[4px_4px_0px_#1E1B18] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Nastavi razgledanje radionice 🎨</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
