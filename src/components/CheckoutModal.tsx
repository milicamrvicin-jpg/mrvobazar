import React, { useState } from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import { CartItem, CheckoutForm, ConfirmedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'RSD' | 'EUR';
  onOrderSuccess: (order: ConfirmedOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<CheckoutForm>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'pouzece',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotalRsd = items.reduce((sum, item) => sum + item.priceRsd * item.quantity, 0);
  const isFreeShipping = subtotalRsd >= 2400; // 4 komada po 600 RSD
  const shippingRsd = isFreeShipping ? 0 : 350;
  const totalRsd = subtotalRsd + shippingRsd;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Upiši svoje ime i prezime';
    if (!formData.phone.trim() || formData.phone.length < 7)
      errs.phone = 'Upiši broj mobilnog telefona za kurira';
    if (!formData.address.trim()) errs.address = 'Upiši ulicu i broj';
    if (!formData.city.trim()) errs.city = 'Upiši grad ili mesto';
    if (!formData.postalCode.trim()) errs.postalCode = 'Upiši poštanski broj';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const orderNumber = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
      const confirmedOrder: ConfirmedOrder = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('sr-RS'),
        customer: formData,
        items,
        subtotalRsd,
        shippingRsd,
        totalRsd,
      };

      setIsSubmitting(false);
      onOrderSuccess(confirmedOrder);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-[#2E211A] shadow-[10px_10px_0px_#2E211A] z-10 my-8 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b-2 border-[#2E211A]/10 flex items-center justify-between bg-[#FFFDF9]">
          <div>
            <h3 className="text-2xl font-fun font-bold text-[#2E211A]">
              Gde Šaljemo Tvog Blesavka? 📦
            </h3>
            <p className="text-xs text-[#73685B] mt-0.5 font-medium">
              Sve šaljemo Post Express kurirskom službom u bezbedno tapaciranoj kutiji sa novim punim upaljačem unutra.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#F7E5DE] hover:bg-[#D95D39] hover:text-white text-[#2E211A] border-2 border-[#2E211A] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto bg-white">
          
          {/* Order Brief Summary */}
          <div className="p-4 rounded-2xl bg-[#F7EAC7] border-2 border-[#2E211A] text-xs flex items-center justify-between shadow-[2px_2px_0px_#2E211A]">
            <span className="text-[#2E211A] font-bold">
              Ukupno u korpi: <strong>{items.reduce((s, i) => s + i.quantity, 0)} kom.</strong> (600 RSD/kom)
            </span>
            <span className="font-mono text-sm font-extrabold text-[#D95D39] tabular-nums">
              Ukupno: {totalRsd.toLocaleString('sr-RS')} RSD {isFreeShipping && '🎉 (Besplatna dostava)'}
            </span>
          </div>

          {/* Row 1: Name and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2E211A] mb-1">
                Ime i prezime primaoca *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="npr. Milica Petrović"
                className={`w-full px-3.5 py-2.5 text-xs font-semibold text-[#2E211A] bg-[#FAF4E8] border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.fullName ? 'border-red-500 bg-red-50' : 'border-[#2E211A] focus:border-[#D95D39]'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-red-500 font-bold mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2E211A] mb-1">
                Broj mobilnog telefona (za kurira) *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="npr. 064 123 4567"
                className={`w-full px-3.5 py-2.5 text-xs font-semibold text-[#2E211A] bg-[#FAF4E8] border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-500 bg-red-50' : 'border-[#2E211A] focus:border-[#D95D39]'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-red-500 font-bold mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Row 2: Email */}
          <div>
            <label className="block text-xs font-bold text-[#2E211A] mb-1">
              Email adresa (za potvrdu narudžbine)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="npr. tvoj@email.com"
              className="w-full px-3.5 py-2.5 text-xs font-semibold text-[#2E211A] bg-[#FAF4E8] border-2 border-[#2E211A] focus:border-[#D95D39] rounded-xl focus:outline-none transition-colors"
            />
          </div>

          {/* Row 3: Address */}
          <div>
            <label className="block text-xs font-bold text-[#2E211A] mb-1">
              Ulica i broj / stan *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="npr. Bulevar oslobođenja 42, stan 12"
              className={`w-full px-3.5 py-2.5 text-xs font-semibold text-[#2E211A] bg-[#FAF4E8] border-2 rounded-xl focus:outline-none transition-colors ${
                errors.address ? 'border-red-500 bg-red-50' : 'border-[#2E211A] focus:border-[#D95D39]'
              }`}
            />
            {errors.address && <p className="text-[11px] text-red-500 font-bold mt-1">{errors.address}</p>}
          </div>

          {/* Row 4: City and Postal code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2E211A] mb-1">
                Grad / Mesto *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="npr. Beograd, Novi Sad, Niš..."
                className={`w-full px-3.5 py-2.5 text-xs font-semibold text-[#2E211A] bg-[#FAF4E8] border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.city ? 'border-red-500 bg-red-50' : 'border-[#2E211A] focus:border-[#D95D39]'
                }`}
              />
              {errors.city && <p className="text-[11px] text-red-500 font-bold mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2E211A] mb-1">
                Poštanski broj *
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="npr. 11000"
                className={`w-full px-3.5 py-2.5 text-xs font-semibold text-[#2E211A] bg-[#FAF4E8] border-2 rounded-xl focus:outline-none transition-colors ${
                  errors.postalCode ? 'border-red-500 bg-red-50' : 'border-[#2E211A] focus:border-[#D95D39]'
                }`}
              />
              {errors.postalCode && <p className="text-[11px] text-red-500 font-bold mt-1">{errors.postalCode}</p>}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-fun font-bold text-[#2E211A] uppercase tracking-wider mb-2">
              Način plaćanja
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'pouzece'
                    ? 'bg-[#E3EBD3] border-[#2E211A] shadow-[2px_2px_0px_#2E211A]'
                    : 'bg-[#FAF4E8] border-[#E8DFD3]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'pouzece'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'pouzece' })}
                  className="mt-0.5 text-[#D95D39] focus:ring-0"
                />
                <div>
                  <p className="text-xs font-bold text-[#2E211A]">Plaćanje pouzećem (gotovina)</p>
                  <p className="text-[11px] text-[#5C4D3F] mt-0.5 font-medium">
                    Plaćaš kuriru Post Express-a kad ti donese paket na vrata.
                  </p>
                </div>
              </label>

              <label
                className={`p-3.5 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  formData.paymentMethod === 'racun'
                    ? 'bg-[#E3EBD3] border-[#2E211A] shadow-[2px_2px_0px_#2E211A]'
                    : 'bg-[#FAF4E8] border-[#E8DFD3]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'racun'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'racun' })}
                  className="mt-0.5 text-[#D95D39] focus:ring-0"
                />
                <div>
                  <p className="text-xs font-bold text-[#2E211A]">Uplata na račun (e-Banking)</p>
                  <p className="text-[11px] text-[#5C4D3F] mt-0.5 font-medium">
                    Broj tekućeg računa stiže ti na potvrdi.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#2E211A] mb-1">
              Napomena za kurira ili atelje (opciono)
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Npr. zvoniti na interfon ili pozvati pre dolaska..."
              className="w-full px-3.5 py-2.5 text-xs font-medium text-[#2E211A] bg-[#FAF4E8] border-2 border-[#2E211A] focus:border-[#D95D39] rounded-xl focus:outline-none transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-sm font-bold text-white bg-[#D95D39] hover:bg-[#C24D2B] rounded-2xl border-2 border-[#2E211A] shadow-[4px_4px_0px_#2E211A] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Kreiranje narudžbine... 🚀</span>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>
                    Potvrdi narudžbinu ({totalRsd.toLocaleString('sr-RS')} RSD) 🎉
                  </span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center font-bold text-[#7A6B5C] mt-2.5 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#3D5A27]" />
              <span>Sigurno pakovanje · 100% ručni rad iz radionice Mrvo Bazar</span>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
