
import { WishlistItem as WishlistItemType } from "@/types/user";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove: (id: string) => void;
}

const WishlistItem = ({ item, onRemove }: WishlistItemProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(item.id);
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  };
  
  const handleAddToCart = () => {
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
      <div className="aspect-square bg-gray-100 relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x400/f5f5f5/cccccc?text=Image+Not+Found";
          }}
        />
        <button 
          className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          <Heart className="h-5 w-5 fill-current" />
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-medium truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className="font-bold">${item.price.toFixed(2)}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${item.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className={!item.inStock ? 'opacity-50 cursor-not-allowed' : ''}
            onClick={handleAddToCart}
            disabled={!item.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            {item.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
