import React, { useState, useMemo } from 'react';
import { Search, Instagram } from 'lucide-react';
import { Product, CategoryType } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  currency: 'RSD' | 'EUR';
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  recentlyAddedId: string | null;
}

const CATEGORIES: { id: CategoryType; label: string; emoji: string; color: string }[] = [
  { id: 'sve', label: 'Svi radovi', emoji: '✨', color: 'bg-[#E8A838]' },
  { id: 'fantazija', label: 'Kiklopi & Mrgudi', emoji: '👾', color: 'bg-[#D95D39] text-white' },
  { id: 'boho', label: 'Retro Telefoni & Pop', emoji: '📱', color: 'bg-[#C26D7B] text-white' },
  { id: 'priroda', label: 'Plemenski Šamani', emoji: '🗿', color: 'bg-[#588157] text-white' },
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currency,
  onQuickView,
  onAddToCart,
  recentlyAddedId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('sve');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'sve' || p.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="kolekcija" className="py-16 lg:py-24 bg-[#FAF4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#D95D39] bg-[#F7E5DE] border border-[#E8C2B5] rounded-full mb-2">
              <span>🏺</span>
              <span>100% ručno vajana polimerna glina</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-fun font-bold text-[#2E211A] tracking-tight">
              Kolekcija Blesavih Futrola
            </h2>
            <p className="text-sm text-[#736353] mt-2 max-w-xl font-medium">
              Sve futrole su pravljene za najobičnije standardne upaljače sa trafike. Svaka stiže sa novim punim upaljačem!
            </p>
          </div>

          {/* Search Bar & Instagram badge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://www.instagram.com/mrvobazar/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#D95D39] hover:bg-[#C24D2B] rounded-xl border-2 border-[#2E211A] shadow-[2px_2px_0px_#2E211A] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>@mrvobazar</span>
            </a>

            <div className="w-full sm:w-64 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#998877]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pretraži (kiklop, ogr, telefon)..."
                className="w-full pl-9 pr-3.5 py-2.5 text-xs font-semibold text-[#2E211A] bg-white border-2 border-[#2E211A] focus:border-[#D95D39] rounded-xl focus:outline-none transition-colors placeholder:text-[#A89887] shadow-[2px_2px_0px_#2E211A]"
              />
            </div>
          </div>
        </div>

        {/* Filter Controls: Retro Category Tabs (No lighter filter!) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 border-b-2 border-[#2E211A]/10 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-2xl transition-all whitespace-nowrap cursor-pointer border-2 border-[#2E211A] flex items-center gap-1.5 ${
                  active
                    ? `${cat.color} shadow-[3px_3px_0px_#2E211A] -translate-y-0.5 font-extrabold`
                    : 'bg-white text-[#5E4D3E] hover:bg-[#F5EDE0]'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isAdded={recentlyAddedId === product.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border-3 border-[#2E211A] shadow-[5px_5px_0px_#2E211A]">
            <span className="text-4xl">🤔</span>
            <p className="text-base font-fun font-bold text-[#2E211A] mt-3">Nismo našli ništa pod tim nazivom!</p>
            <p className="text-xs text-[#7A6B5C] mt-1 font-medium">Pokušaj sa rečima poput &quot;kiklop&quot;, &quot;telefon&quot; ili &quot;šaman&quot;.</p>
            <button
              onClick={() => {
                setSelectedCategory('sve');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 text-xs font-bold text-[#2E211A] bg-[#E8A838] hover:bg-[#D49526] border-2 border-[#2E211A] rounded-xl shadow-[2px_2px_0px_#2E211A] transition-all cursor-pointer"
            >
              Prikaži sve radove
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
