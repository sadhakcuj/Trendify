
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useCartContext } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, checkout } = useCartContext();

  return (
    <MainLayout>
      <section className="py-8">
        <div className="trendify-container">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-medium">Items ({cart.length})</h2>
                  </div>
                  
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="p-4 flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          
                          <div className="mt-2 flex gap-4 text-sm">
                            <span>Size: {item.selectedSize}</span>
                            <span>Color: {item.selectedColor}</span>
                          </div>
                          
                          <div className="mt-2 flex justify-between items-center">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => 
                                  item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                                }
                                className="px-2 py-1 border-r"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-1">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 border-l"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 flex items-center gap-1 text-sm"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(subtotal * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>Total</span>
                    <span>${(subtotal + subtotal * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    onClick={checkout}
                    className="w-full bg-trendify-600 hover:bg-trendify-700"
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link to="/" className="text-trendify-600 text-sm hover:underline">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
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

export default Cart;
