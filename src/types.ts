export type CategoryType = 'sve' | 'fantazija' | 'priroda' | 'kristali' | 'gotski' | 'boho';

export interface Product {
  id: string;
  name: string;
  category: 'fantazija' | 'priroda' | 'kristali' | 'gotski' | 'boho';
  tagline: string;
  priceRsd: number;
  priceEur: number;
  image: string;
  stock: number;
  badge?: string;
  description: string;
  clayDetails: {
    clayType: string;
    finish: string;
    bakingTemp: string;
    weight: string;
  };
  features: string[];
}

export interface CartItem {
  id: string;
  productId?: string;
  name: string;
  priceRsd: number;
  priceEur: number;
  image: string;
  quantity: number;
  isCustom?: boolean;
  customDetails?: {
    theme: string;
    colorPalette: string;
    customNote?: string;
  };
}

export interface CustomOrderState {
  themeId: string;
  paletteId: string;
  notes: string;
}

export interface CheckoutForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'pouzece' | 'racun';
  notes: string;
}

export interface ConfirmedOrder {
  orderId: string;
  date: string;
  customer: CheckoutForm;
  items: CartItem[];
  subtotalRsd: number;
  shippingRsd: number;
  totalRsd: number;
}
