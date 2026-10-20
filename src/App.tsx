import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductModal } from './components/ProductModal';
import { CustomizerStudio } from './components/CustomizerStudio';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { FaqSection } from './components/FaqSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ConfirmedOrder } from './types';
import { Instagram, Truck } from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<'RSD' | 'EUR'>('RSD');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mrvobazar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mrvobazar_cart', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCurrency = () => {
    setCurrency((c) => (c === 'RSD' ? 'EUR' : 'RSD'));
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const newItem: CartItem = {
          id: `cart-${product.id}-${Date.now()}`,
          productId: product.id,
          name: product.name,
          priceRsd: product.priceRsd,
          priceEur: product.priceEur,
          image: product.image,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 2000);
  };

  const handleAddCustomToCart = (customItem: CartItem) => {
    setCartItems((prev) => [...prev, customItem]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: ConfirmedOrder) => {
    setConfirmedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF4E8] text-[#2E211A]">
      
      {/* Retro Top Promotional Banner with 600 RSD note */}
      <div className="h-10 bg-[#E8A838] border-b-2 border-[#2E211A] text-xs font-bold text-[#2E211A] flex items-center justify-center px-4 gap-3 shadow-sm">
        <a
          href="https://www.instagram.com/mrvobazar/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#FAF4E8] px-2.5 py-0.5 rounded-full border border-[#2E211A] hover:bg-white transition-colors"
        >
          <Instagram className="w-3.5 h-3.5 text-[#D95D39]" />
          <span>Instagram @mrvobazar</span>
        </a>
        <span className="hidden sm:inline text-[#2E211A]/40">·</span>
        <span className="hidden md:inline-flex items-center gap-1">
          <span>🔥 Sve futrole su 600 RSD (sa novim običnim upaljačem)</span>
        </span>
        <span className="hidden sm:inline text-[#2E211A]/40">·</span>
        <span className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#2E211A]" />
          <span>Besplatna Post Express dostava za 4+ komada (2.400+ RSD)!</span>
        </span>
      </div>

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onScrollTo={scrollToSection}
      />

      {/* Main Content */}
      <main className="flex-1">
        <Hero
          onExploreCollection={() => scrollToSection('kolekcija')}
          onCustomOrder={() => scrollToSection('po-meri')}
        />

        <ProductCatalog
          products={PRODUCTS}
          currency={currency}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          recentlyAddedId={recentlyAddedId}
        />

        <CustomizerStudio
          currency={currency}
          onAddCustomToCart={handleAddCustomToCart}
        />

        <CraftsmanshipSection />

        <FaqSection />
      </main>

      {/* Footer */}
      <Footer onScrollTo={scrollToSection} />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, q) => handleAddToCart(p, q)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

    </div>
  );
}
