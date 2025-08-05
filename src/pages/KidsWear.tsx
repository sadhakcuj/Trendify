
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { Product } from "@/types/product";

// Updated kids wear products data to reflect the image
const kidsProducts: Product[] = [
  {
    id: "kids-1",
    name: "Blue Denim Overalls",
    description: "Cute denim overalls with star print.",
    price: 39.99,
    originalPrice: 49.99,
    discountPercentage: 20,
    rating: 4.7,
    images: [
      "/lovable-uploads/1e356d92-6345-456a-9107-f629cbe4d5f3.png"
    ],
    brand: "KidStyle",
    colors: ["Blue", "White"],
    sizes: ["4-5", "6-7", "8-9", "10-11"],
    category: "kids",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "kids-2",
    name: "Denim Overalls",
    description: "Comfortable denim overalls for playful kids.",
    price: 29.99,
    originalPrice: 39.99,
    discountPercentage: 25,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1594076598146-70e1f3a6fd3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    brand: "PlayWear",
    colors: ["Blue", "Black"],
    sizes: ["2T", "3T", "4T", "5T"],
    category: "kids",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "kids-3",
    name: "Unicorn Hoodie",
    description: "Soft and warm hoodie with unicorn design.",
    price: 34.99,
    originalPrice: 44.99,
    discountPercentage: 22,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1520348961612-5a62e2622df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    brand: "MagicKids",
    colors: ["Pink", "Purple", "White"],
    sizes: ["XS", "S", "M", "L"],
    category: "kids",
    isNew: true,
    isBestSeller: false,
  },
  {
    id: "kids-4",
    name: "Sporty Shorts Set",
    description: "Comfortable shorts and t-shirt set for active kids.",
    price: 24.99,
    originalPrice: 24.99,
    discountPercentage: 0,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80"
    ],
    brand: "ActiveKids",
    colors: ["Blue", "Green", "Red"],
    sizes: ["XS", "S", "M"],
    category: "kids",
    isNew: false,
    isBestSeller: false,
  },
  {
    id: "kids-5",
    name: "Winter Puffer Jacket",
    description: "Warm and cozy winter jacket for cold days.",
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 28,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1581787406481-0ffc6c90b9d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    brand: "WinterKids",
    colors: ["Blue", "Red", "Black"],
    sizes: ["2T", "3T", "4T", "5T", "6T"],
    category: "kids",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "kids-6",
    name: "Graphic Print Backpack",
    description: "Fun and spacious backpack for school and adventures.",
    price: 39.99,
    originalPrice: 49.99,
    discountPercentage: 20,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1615284480618-c59b5175ad87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    ],
    brand: "SchoolPro",
    colors: ["Blue", "Pink", "Green"],
    sizes: ["One Size"],
    category: "kids",
    isNew: true,
    isBestSeller: false,
  },
];

// Filter options
const brands = ["All Brands", "KidZone", "PlayWear", "MagicKids", "ActiveKids", "WinterKids", "SchoolPro"];
const sizes = ["All Sizes", "XS", "S", "M", "L", "2T", "3T", "4T", "5T", "6T", "One Size"];
const colors = ["All Colors", "Blue", "Red", "Green", "Black", "Pink", "Purple", "White"];
const priceRanges = ["All Prices", "Under $25", "$25 - $50", "Over $50"];
const discounts = ["All Items", "On Sale", "Full Price"];

const KidsWear = () => {
  // Filters state
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedDiscount, setSelectedDiscount] = useState("All Items");
  
  // Apply filters
  const filteredProducts = kidsProducts.filter(product => {
    // Brand filter
    if (selectedBrand !== "All Brands" && product.brand !== selectedBrand) return false;
    
    // Size filter
    if (selectedSize !== "All Sizes" && !product.sizes.includes(selectedSize)) return false;
    
    // Color filter
    if (selectedColor !== "All Colors" && !product.colors.includes(selectedColor)) return false;
    
    // Price range filter
    if (selectedPriceRange !== "All Prices") {
      if (selectedPriceRange === "Under $25" && product.price >= 25) return false;
      if (selectedPriceRange === "$25 - $50" && (product.price < 25 || product.price > 50)) return false;
      if (selectedPriceRange === "Over $50" && product.price <= 50) return false;
    }
    
    // Discount filter
    if (selectedDiscount === "On Sale" && product.discountPercentage === 0) return false;
    if (selectedDiscount === "Full Price" && product.discountPercentage > 0) return false;
    
    return true;
  });

  return (
    <MainLayout>
      <section className="py-8">
        <div className="trendify-container">
          <h1 className="text-3xl font-bold mb-6">Kids' Collection</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="w-full lg:w-1/4">
              <ProductFilters 
                brands={brands}
                sizes={sizes}
                colors={colors}
                priceRanges={priceRanges}
                discounts={discounts}
                selectedBrand={selectedBrand}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                selectedPriceRange={selectedPriceRange}
                selectedDiscount={selectedDiscount}
                setSelectedBrand={setSelectedBrand}
                setSelectedSize={setSelectedSize}
                setSelectedColor={setSelectedColor}
                setSelectedPriceRange={setSelectedPriceRange}
                setSelectedDiscount={setSelectedDiscount}
              />
            </div>
            
            {/* Products grid */}
            <div className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{filteredProducts.length} products found</p>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-lg text-gray-600">No products match your current filters.</p>
                  <button 
                    className="mt-4 font-medium text-trendify-600 hover:underline"
                    onClick={() => {
                      setSelectedBrand("All Brands");
                      setSelectedSize("All Sizes");
                      setSelectedColor("All Colors");
                      setSelectedPriceRange("All Prices");
                      setSelectedDiscount("All Items");
                    }}
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default KidsWear;
