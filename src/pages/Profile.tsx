
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { getUserWishlist, removeFromWishlist, getUserOrders } from "@/services/userService";
import { WishlistItem as WishlistItemType, Order } from "@/types/user";
import WishlistItem from "@/components/profile/WishlistItem";
import OrderCard from "@/components/profile/OrderCard";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, ShoppingBag, Heart, User, Package, Map, Settings } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [wishlistItems, setWishlistItems] = useState<WishlistItemType[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [isOrdersLoading, setIsOrdersLoading] = useState(false);

  useEffect(() => {
    // Load data when tab changes
    if (activeTab === "wishlist" && user && wishlistItems.length === 0) {
      loadWishlist();
    }
    
    if (activeTab === "orders" && user && orders.length === 0) {
      loadOrders();
    }
  }, [activeTab, user]);

  const loadWishlist = async () => {
    if (!user) return;
    setIsWishlistLoading(true);
    try {
      const items = await getUserWishlist(user.id);
      setWishlistItems(items);
    } catch (error) {
      toast.error("Failed to load wishlist");
      console.error(error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const loadOrders = async () => {
    if (!user) return;
    setIsOrdersLoading(true);
    try {
      const items = await getUserOrders(user.id);
      setOrders(items);
    } catch (error) {
      toast.error("Failed to load orders");
      console.error(error);
    } finally {
      setIsOrdersLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      await removeFromWishlist(id);
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
      console.error(error);
    }
  };

  // Redirect if not authenticated
  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-trendify-600" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="trendify-container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                >
                  Edit profile
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <nav>
                  <div
                    className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeTab === "profile" ? "text-trendify-600 font-medium" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeTab === "orders" ? "text-trendify-600 font-medium" : ""
                    }`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag size={18} />
                    <span>Orders</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeTab === "wishlist" ? "text-trendify-600 font-medium" : ""
                    }`}
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeTab === "addresses" ? "text-trendify-600 font-medium" : ""
                    }`}
                    onClick={() => setActiveTab("addresses")}
                  >
                    <Map size={18} />
                    <span>Addresses</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                      activeTab === "settings" ? "text-trendify-600 font-medium" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </div>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Manage your personal information and account settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Full Name</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50">
                            {user?.name}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email Address</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50">
                            {user?.email}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Account Type</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50 capitalize">
                            {user?.role}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Member Since</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50">
                            {new Date().toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button>Update Information</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>
                      View and track your recent orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isOrdersLoading ? (
                      <div className="text-center py-12">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-trendify-600" />
                        <p className="mt-2 text-sm text-gray-500">Loading your orders...</p>
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <OrderCard key={order.id} order={order} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Your order history will appear here once you make a purchase.
                        </p>
                        <div className="mt-6">
                          <Button asChild>
                            <a href="/collections">Start Shopping</a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                    <CardDescription>
                      Items you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isWishlistLoading ? (
                      <div className="text-center py-12">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-trendify-600" />
                        <p className="mt-2 text-sm text-gray-500">Loading your wishlist...</p>
                      </div>
                    ) : wishlistItems.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {wishlistItems.map((item) => (
                          <WishlistItem 
                            key={item.id} 
                            item={item} 
                            onRemove={handleRemoveFromWishlist}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Save items you like by clicking the heart icon on product pages.
                        </p>
                        <div className="mt-6">
                          <Button asChild>
                            <a href="/collections">Explore Products</a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>My Addresses</CardTitle>
                        <CardDescription>
                          Manage your shipping and billing addresses
                        </CardDescription>
                      </div>
                      <Button>Add Address</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Map className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-lg font-medium text-gray-900">No addresses saved</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add your first address to speed up the checkout process.
                      </p>
                      <div className="mt-6">
                        <Button>Add New Address</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account preferences and settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Password</h3>
                        <p className="text-sm text-gray-500">
                          Update your password to keep your account secure
                        </p>
                        <div className="mt-4">
                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="text-lg font-medium">Email Preferences</h3>
                        <p className="text-sm text-gray-500">
                          Manage your email notification settings
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <input
                              id="email-promotions"
                              name="email-promotions"
                              type="checkbox"
                              className="h-4 w-4 text-trendify-600 border-gray-300 rounded"
                              defaultChecked
                            />
                            <label htmlFor="email-promotions" className="ml-2 text-sm">
                              Promotions and sales
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="email-orders"
                              name="email-orders"
                              type="checkbox"
                              className="h-4 w-4 text-trendify-600 border-gray-300 rounded"
                              defaultChecked
                            />
                            <label htmlFor="email-orders" className="ml-2 text-sm">
                              Order updates
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="email-newsletter"
                              name="email-newsletter"
                              type="checkbox"
                              className="h-4 w-4 text-trendify-600 border-gray-300 rounded"
                              defaultChecked
                            />
                            <label htmlFor="email-newsletter" className="ml-2 text-sm">
                              Newsletter
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
