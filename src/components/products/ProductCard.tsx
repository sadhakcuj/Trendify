
import { useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "@/contexts/CartContext";
import { useWishlistContext } from "@/contexts/WishlistContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const {
    id,
    name,
    price,
    originalPrice,
    discountPercentage,
    images,
    brand,
    colors,
    sizes,
    isNew,
    isBestSeller,
    rating
  } = product;
  
  const inWishlist = isInWishlist(id);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    addToCart({
      ...product,
      quantity: 1,
      selectedSize,
      selectedColor
    });
    
    toast.success(`${name} added to cart`);
  };
  
  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(id);
      toast.info(`${name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${name} added to wishlist`);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-all hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-trendify-600">New</Badge>
          )}
          {isBestSeller && (
            <Badge className="bg-amber-500">Best Seller</Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-red-500">{discountPercentage}% OFF</Badge>
          )}
        </div>
        
        {/* Quick actions */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <Heart
            className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-gray-700 hover:text-trendify-600 cursor-pointer" 
              onClick={() => navigate(`/product/${id}`)}>
            {name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-sm text-gray-600 ml-1">{rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">{brand}</p>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-gray-800">${price.toFixed(2)}</span>
          {originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        {/* Sizes */}
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Sizes</p>
          <div className="flex flex-wrap gap-1">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-1 text-xs border rounded ${
                  selectedSize === size
                    ? "bg-trendify-600 text-white border-trendify-600"
                    : "border-gray-300 hover:border-trendify-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        
        {/* Colors */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Colors</p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color
                    ? "border-trendify-600"
                    : "border-transparent hover:border-gray-300"
                }`}
                style={{ 
                  backgroundColor: color.toLowerCase().replace("light ", "").replace("dark ", "") 
                }}
                title={color}
              />
            ))}
          </div>
        </div>
        
        {/* Add to cart button */}
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-trendify-600 hover:bg-trendify-700"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
