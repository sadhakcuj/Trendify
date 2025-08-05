import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { Product } from "@/types/product";

// Sample men's wear products data
const mensProducts: Product[] = [
  {
    id: "mens-1",
    name: "Classic Fit Cotton T-Shirt",
    description: "Premium quality cotton t-shirt with a comfortable classic fit.",
    price: 29.99,
    originalPrice: 39.99,
    discountPercentage: 25,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80"
    ],
    brand: "Essential",
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    category: "mens",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "mens-2",
    name: "Slim Fit Denim Jeans",
    description: "Stylish slim fit jeans made with premium denim.",
    price: 59.99,
    originalPrice: 79.99,
    discountPercentage: 25,
    rating: 4.3,
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80"
    ],
    brand: "DenimCo",
    colors: ["Blue", "Black", "Gray"],
    sizes: ["30", "32", "34", "36"],
    category: "mens",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "mens-3",
    name: "Casual Button-Down Shirt",
    description: "Versatile button-down shirt perfect for casual or semi-formal occasions.",
    price: 45.99,
    originalPrice: 55.99,
    discountPercentage: 18,
    rating: 4.1,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    brand: "Urban Style",
    colors: ["Light Blue", "White", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "mens",
    isNew: true,
    isBestSeller: false,
  },
  {
    id: "mens-4",
    name: "Athletic Performance Shorts",
    description: "Lightweight shorts designed for maximum comfort during workouts.",
    price: 32.99,
    originalPrice: 32.99,
    discountPercentage: 0,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
    ],
    brand: "SportFlex",
    colors: ["Black", "Gray", "Blue"],
    sizes: ["S", "M", "L", "XL"],
    category: "mens",
    isNew: false,
    isBestSeller: false,
  },
  {
    id: "mens-5",
    name: "Wool Blend Blazer",
    description: "Sophisticated blazer perfect for formal occasions and business meetings.",
    price: 129.99,
    originalPrice: 179.99,
    discountPercentage: 28,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
    ],
    brand: "Luxe Collection",
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["38", "40", "42", "44"],
    category: "mens",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "mens-6",
    name: "Premium Leather Belt",
    description: "Classic leather belt with a polished metal buckle.",
    price: 49.99,
    originalPrice: 49.99,
    discountPercentage: 0,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    ],
    brand: "Leather Artisan",
    colors: ["Brown", "Black"],
    sizes: ["32", "34", "36", "38", "40"],
    category: "mens",
    isNew: false,
    isBestSeller: false,
  },
];

// Filter options
const brands = ["All Brands", "Essential", "DenimCo", "Urban Style", "SportFlex", "Luxe Collection", "Leather Artisan"];
const sizes = ["All Sizes", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38", "40", "42", "44"];
const colors = ["All Colors", "Black", "White", "Navy", "Blue", "Gray", "Light Blue", "Pink", "Brown", "Charcoal"];
const priceRanges = ["All Prices", "Under $30", "$30 - $50", "$50 - $100", "Over $100"];
const discounts = ["All Items", "On Sale", "Full Price"];

const MensWear = () => {
  // Filters state
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedDiscount, setSelectedDiscount] = useState("All Items");
  
  // Apply filters
  const filteredProducts = mensProducts.filter(product => {
    // Brand filter
    if (selectedBrand !== "All Brands" && product.brand !== selectedBrand) return false;
    
    // Size filter
    if (selectedSize !== "All Sizes" && !product.sizes.includes(selectedSize)) return false;
    
    // Color filter
    if (selectedColor !== "All Colors" && !product.colors.includes(selectedColor)) return false;
    
    // Price range filter
    if (selectedPriceRange !== "All Prices") {
      if (selectedPriceRange === "Under $30" && product.price >= 30) return false;
      if (selectedPriceRange === "$30 - $50" && (product.price < 30 || product.price > 50)) return false;
      if (selectedPriceRange === "$50 - $100" && (product.price < 50 || product.price > 100)) return false;
      if (selectedPriceRange === "Over $100" && product.price <= 100) return false;
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
          <h1 className="text-3xl font-bold mb-6">Men's Collection</h1>
          
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

export default MensWear;
