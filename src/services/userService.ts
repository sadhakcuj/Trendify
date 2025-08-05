
import { WishlistItem, Order } from "@/types/user";

// Mock wishlist data
const mockWishlistItems: WishlistItem[] = [
  {
    id: "wl-1",
    productId: "p-1",
    name: "Classic Denim Jacket",
    price: 59.99,
    originalPrice: 79.99,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    dateAdded: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "wl-2",
    productId: "p-2",
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    category: "Tops",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "wl-3",
    productId: "p-3",
    name: "Slim Fit Chino Pants",
    price: 45.99,
    originalPrice: 55.99,
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: true,
    dateAdded: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "wl-4",
    productId: "p-4",
    name: "Wool Blend Sweater",
    price: 65.99,
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    inStock: false,
    dateAdded: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Mock order history data
const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "TRN" + Date.now().toString().slice(-6) + "1",
    userId: "user-1",
    items: [
      {
        id: "item-1",
        productId: "p-5",
        name: "Vintage Graphic T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: "item-2",
        productId: "p-6",
        name: "Distressed Jeans",
        price: 79.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ],
    totalAmount: 139.97,
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    deliveryStatus: "delivered",
    orderDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: "TRK123456789"
  },
  {
    id: "order-2",
    orderNumber: "TRN" + Date.now().toString().slice(-6) + "2",
    userId: "user-1",
    items: [
      {
        id: "item-3",
        productId: "p-7",
        name: "Hooded Sweatshirt",
        price: 49.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ],
    totalAmount: 49.99,
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    paymentMethod: "PayPal",
    paymentStatus: "paid",
    deliveryStatus: "shipped",
    orderDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    trackingNumber: "TRK987654321"
  },
  {
    id: "order-3",
    orderNumber: "TRN" + Date.now().toString().slice(-6) + "3",
    userId: "user-1",
    items: [
      {
        id: "item-4",
        productId: "p-8",
        name: "Leather Jacket",
        price: 129.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: "item-5",
        productId: "p-9",
        name: "Knit Beanie",
        price: 19.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      },
      {
        id: "item-6",
        productId: "p-10",
        name: "Canvas Sneakers",
        price: 59.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
      }
    ],
    totalAmount: 229.96,
    shippingAddress: {
      name: "John Doe",
      street: "456 Elm St",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "USA"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    deliveryStatus: "processing",
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Simulated API calls
export const getUserWishlist = (userId: string): Promise<WishlistItem[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(mockWishlistItems);
    }, 500);
  });
};

export const removeFromWishlist = (wishlistItemId: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(wishlistItemId);
    }, 300);
  });
};

export const getUserOrders = (userId: string): Promise<Order[]> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

export const getOrderDetails = (orderId: string): Promise<Order | undefined> => {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      const order = mockOrders.find(o => o.id === orderId);
      resolve(order);
    }, 300);
  });
};
