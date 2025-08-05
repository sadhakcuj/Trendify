
import MainLayout from "@/components/layouts/MainLayout";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { useCartContext } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();
  
  const handleAddToCart = (item: any) => {
    // We'd need size and color selection in a real implementation
    addToCart({
      ...item,
      quantity: 1,
      selectedSize: item.sizes[0], // Just select the first size for demo
      selectedColor: item.colors[0], // Just select the first color for demo
    });
    
    toast.success(`${item.name} added to cart`);
    
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(item.id);
  };
  
  return (
    <MainLayout>
      <section className="py-8">
        <div className="trendify-container">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Wishlist</h1>
            
            {wishlist.length > 0 && (
              <Button 
                variant="outline"
                onClick={clearWishlist}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Wishlist
              </Button>
            )}
          </div>
          
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-all">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">${item.price.toFixed(2)}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {item.discountPercentage > 0 && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                          {item.discountPercentage}% OFF
                        </span>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-trendify-600 hover:bg-trendify-700"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <Heart className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">Save items you love to your wishlist and they'll appear here.</p>
              <Button asChild className="bg-trendify-600 hover:bg-trendify-700">
                <Link to="/">Start Shopping</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Wishlist;
