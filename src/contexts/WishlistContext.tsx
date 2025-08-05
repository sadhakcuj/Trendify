
import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, WishlistItem } from "@/types/product";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (itemId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (itemId: string) => boolean;
  moveToCart: (itemId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
        setWishlist([]);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  
  const addToWishlist = (item: Product) => {
    setWishlist(prevWishlist => {
      // Check if item already exists in wishlist
      if (prevWishlist.some(wishlistItem => wishlistItem.id === item.id)) {
        toast.info(`${item.name} is already in your wishlist`);
        return prevWishlist;
      }
      // Add new item if it doesn't exist
      toast.success(`${item.name} added to wishlist`);
      return [...prevWishlist, item];
    });
  };
  
  const removeFromWishlist = (itemId: string) => {
    setWishlist(prevWishlist => {
      const item = prevWishlist.find(item => item.id === itemId);
      if (item) {
        toast.info(`${item.name} removed from wishlist`);
      }
      return prevWishlist.filter(item => item.id !== itemId);
    });
  };
  
  const clearWishlist = () => {
    setWishlist([]);
    toast.info("Wishlist cleared");
  };
  
  const isInWishlist = (itemId: string) => {
    return wishlist.some(item => item.id === itemId);
  };
  
  const moveToCart = (itemId: string) => {
    // This would use the CartContext in a real implementation
    console.log(`Moving item ${itemId} to cart`);
    removeFromWishlist(itemId);
  };
  
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlistContext must be used within a WishlistProvider");
  }
  return context;
};
