
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  images: string[];
  brand: string;
  colors: string[];
  sizes: string[];
  category: "mens" | "womens" | "kids" | "accessories" | "footwear";
  isNew?: boolean;
  isBestSeller?: boolean;
}

export type CartItem = Product & {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

export type WishlistItem = Product;

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
}
