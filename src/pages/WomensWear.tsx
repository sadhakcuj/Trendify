
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { Product } from "@/types/product";

// Sample women's wear products data
const womensProducts: Product[] = [
  {
    id: "womens-1",
    name: "Floral Summer Dress",
    description: "Lightweight floral dress perfect for summer days.",
    price: 49.99,
    originalPrice: 69.99,
    discountPercentage: 28,
    rating: 4.7,
    images: [
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80"
    ],
    brand: "Bloom",
    colors: ["Pink", "White", "Blue"],
    sizes: ["XS", "S", "M", "L"],
    category: "womens",
    isNew: true,
    isBestSeller: true,
  },
  {
    id: "womens-2",
    name: "High-Waisted Skinny Jeans",
    description: "Comfortable and stylish high-waisted skinny jeans.",
    price: 59.99,
    originalPrice: 79.99,
    discountPercentage: 25,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    brand: "DenimCo",
    colors: ["Blue", "Black", "Gray"],
    sizes: ["24", "26", "28", "30", "32"],
    category: "womens",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "womens-3",
    name: "Silk Blouse",
    description: "Elegant silk blouse, suitable for office or evening wear.",
    price: 65.99,
    originalPrice: 85.99,
    discountPercentage: 23,
    rating: 4.2,
    images: [
      "https://images.unsplash.com/photo-1604486602651-cb7e2b1d7b6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    brand: "Eleganza",
    colors: ["White", "Cream", "Light Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "womens",
    isNew: true,
    isBestSeller: false,
  },
  {
    id: "womens-4",
    name: "Yoga Leggings",
    description: "High-performance leggings perfect for yoga and gym workouts.",
    price: 39.99,
    originalPrice: 39.99,
    discountPercentage: 0,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    brand: "ActiveFit",
    colors: ["Black", "Navy", "Purple"],
    sizes: ["XS", "S", "M", "L"],
    category: "womens",
    isNew: false,
    isBestSeller: false,
  },
  {
    id: "womens-5",
    name: "Cashmere Sweater",
    description: "Luxurious cashmere sweater for ultimate comfort and warmth.",
    price: 129.99,
    originalPrice: 179.99,
    discountPercentage: 28,
    rating: 4.6,
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
    ],
    brand: "Luxe Collection",
    colors: ["Beige", "Gray", "Pink"],
    sizes: ["S", "M", "L", "XL"],
    category: "womens",
    isNew: false,
    isBestSeller: true,
  },
  {
    id: "womens-6",
    name: "Leather Shoulder Bag",
    description: "Stylish leather shoulder bag with multiple compartments.",
    price: 89.99,
    originalPrice: 119.99,
    discountPercentage: 25,
    rating: 4.4,
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80"
    ],
    brand: "Urban Style",
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    category: "womens",
    isNew: true,
    isBestSeller: false,
  },
];

// Filter options
const brands = ["All Brands", "Bloom", "DenimCo", "Eleganza", "ActiveFit", "Luxe Collection", "Urban Style"];
const sizes = ["All Sizes", "XS", "S", "M", "L", "XL", "24", "26", "28", "30", "32", "One Size"];
const colors = ["All Colors", "Pink", "White", "Blue", "Black", "Gray", "Navy", "Purple", "Cream", "Light Blue", "Beige", "Brown", "Tan"];
const priceRanges = ["All Prices", "Under $50", "$50 - $100", "$100 - $150", "Over $150"];
const discounts = ["All Items", "On Sale", "Full Price"];

const WomensWear = () => {
  // Filters state
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedSize, setSelectedSize] = useState("All Sizes");
  const [selectedColor, setSelectedColor] = useState("All Colors");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedDiscount, setSelectedDiscount] = useState("All Items");
  
  // Apply filters
  const filteredProducts = womensProducts.filter(product => {
    // Brand filter
    if (selectedBrand !== "All Brands" && product.brand !== selectedBrand) return false;
    
    // Size filter
    if (selectedSize !== "All Sizes" && !product.sizes.includes(selectedSize)) return false;
    
    // Color filter
    if (selectedColor !== "All Colors" && !product.colors.includes(selectedColor)) return false;
    
    // Price range filter
    if (selectedPriceRange !== "All Prices") {
      if (selectedPriceRange === "Under $50" && product.price >= 50) return false;
      if (selectedPriceRange === "$50 - $100" && (product.price < 50 || product.price > 100)) return false;
      if (selectedPriceRange === "$100 - $150" && (product.price < 100 || product.price > 150)) return false;
      if (selectedPriceRange === "Over $150" && product.price <= 150) return false;
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
          <h1 className="text-3xl font-bold mb-6">Women's Collection</h1>
          
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

export default WomensWear;
