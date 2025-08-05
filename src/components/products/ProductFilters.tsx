
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Filter, Tag, Ruler, Droplet, DollarSign, Percent } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRanges: string[];
  discounts: string[];
  selectedBrand: string;
  selectedSize: string;
  selectedColor: string;
  selectedPriceRange: string;
  selectedDiscount: string;
  setSelectedBrand: (brand: string) => void;
  setSelectedSize: (size: string) => void;
  setSelectedColor: (color: string) => void;
  setSelectedPriceRange: (range: string) => void;
  setSelectedDiscount: (discount: string) => void;
}

const ProductFilters = ({
  brands,
  sizes,
  colors,
  priceRanges,
  discounts,
  selectedBrand,
  selectedSize,
  selectedColor,
  selectedPriceRange,
  selectedDiscount,
  setSelectedBrand,
  setSelectedSize,
  setSelectedColor,
  setSelectedPriceRange,
  setSelectedDiscount,
}: ProductFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    sizes: true,
    colors: true,
    price: true,
    discount: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </h2>
        <button 
          onClick={() => {
            setSelectedBrand("All Brands");
            setSelectedSize("All Sizes");
            setSelectedColor("All Colors");
            setSelectedPriceRange("All Prices");
            setSelectedDiscount("All Items");
          }}
          className="text-sm text-trendify-600 hover:underline"
        >
          Clear All
        </button>
      </div>
      
      <Separator className="mb-4" />
      
      {/* Brand Filter */}
      <Collapsible
        open={expandedSections.brands}
        onOpenChange={() => toggleSection('brands')}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            <h3 className="font-medium">Brands</h3>
          </div>
          {expandedSections.brands ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-1">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={cn(
                "w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100",
                selectedBrand === brand ? "bg-trendify-50 text-trendify-600 font-medium" : ""
              )}
            >
              {brand}
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="mb-4" />
      
      {/* Size Filter */}
      <Collapsible
        open={expandedSections.sizes}
        onOpenChange={() => toggleSection('sizes')}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <h3 className="font-medium">Sizes</h3>
          </div>
          {expandedSections.sizes ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "px-2 py-1 text-sm border rounded-md hover:border-trendify-600",
                  selectedSize === size 
                    ? "bg-trendify-600 text-white border-trendify-600" 
                    : "border-gray-300"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="mb-4" />
      
      {/* Color Filter */}
      <Collapsible
        open={expandedSections.colors}
        onOpenChange={() => toggleSection('colors')}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4" />
            <h3 className="font-medium">Colors</h3>
          </div>
          {expandedSections.colors ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-1">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100 flex items-center",
                selectedColor === color ? "bg-trendify-50 text-trendify-600 font-medium" : ""
              )}
            >
              {color !== "All Colors" && (
                <span 
                  className="inline-block w-3 h-3 mr-2 rounded-full" 
                  style={{ 
                    backgroundColor: color.toLowerCase().replace("light ", "").replace("dark ", "") 
                  }}
                />
              )}
              {color}
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="mb-4" />
      
      {/* Price Filter */}
      <Collapsible
        open={expandedSections.price}
        onOpenChange={() => toggleSection('price')}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <h3 className="font-medium">Price</h3>
          </div>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-1">
          {priceRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedPriceRange(range)}
              className={cn(
                "w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100",
                selectedPriceRange === range ? "bg-trendify-50 text-trendify-600 font-medium" : ""
              )}
            >
              {range}
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>
      
      <Separator className="mb-4" />
      
      {/* Discount Filter */}
      <Collapsible
        open={expandedSections.discount}
        onOpenChange={() => toggleSection('discount')}
        className="mb-4"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4" />
            <h3 className="font-medium">Discounts</h3>
          </div>
          {expandedSections.discount ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-1">
          {discounts.map((discount) => (
            <button
              key={discount}
              onClick={() => setSelectedDiscount(discount)}
              className={cn(
                "w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-100",
                selectedDiscount === discount ? "bg-trendify-50 text-trendify-600 font-medium" : ""
              )}
            >
              {discount}
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ProductFilters;
