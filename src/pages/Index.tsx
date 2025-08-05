import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shirt, ShoppingBag, Zap } from "lucide-react";

const featuredCategories = [
  {
    id: "mens",
    title: "Men's Collection",
    image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    link: "/men"
  },
  {
    id: "womens",
    title: "Women's Collection",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
    link: "/women"
  },
  {
    id: "kids",
    title: "Kids' Collection",
    image: "/lovable-uploads/1e356d92-6345-456a-9107-f629cbe4d5f3.png",
    link: "/kids"
  },
  {
    id: "trending",
    title: "Trending Now",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    link: "/trending"
  },
];

const features = [
  {
    title: "AI-Powered Recommendations",
    description: "Get personalized style recommendations based on your preferences and browsing history.",
    icon: <Zap className="h-8 w-8 text-trendify-600" />,
  },
  {
    title: "Premium Quality",
    description: "All our products are made with high-quality materials to ensure comfort and durability.",
    icon: <Shirt className="h-8 w-8 text-trendify-600" />,
  },
  {
    title: "Fast Shipping",
    description: "Enjoy quick delivery with our efficient shipping process and real-time tracking.",
    icon: <ShoppingBag className="h-8 w-8 text-trendify-600" />,
  },
];

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-50 py-20">
        <div className="trendify-container">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Discover Your Perfect <span className="text-trendify-600">Style</span> With AI
              </h1>
              <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Trendify uses AI to recommend fashion that matches your style preferences. Explore our curated collections and find your perfect look.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-trendify-600 hover:bg-trendify-700"
                  asChild
                >
                  <Link to="/men">
                    Shop Men's Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-trendify-600 text-trendify-600 hover:bg-trendify-50"
                  asChild
                >
                  <Link to="/collections">
                    Explore Collections
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="Fashion model"
                className="rounded-lg shadow-xl max-h-[500px] object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="trendify-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our collections and find the perfect style that matches your personality and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link 
                key={category.id}
                to={category.link}
                className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="trendify-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Trendify</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with quality fashion to provide you with the best shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-trendify-600">
        <div className="trendify-container">
          <div className="text-center text-white space-y-6">
            <h2 className="text-3xl font-bold">Ready to Transform Your Wardrobe?</h2>
            <p className="max-w-2xl mx-auto text-trendify-100">
              Join Trendify today and discover fashion that truly represents your style. Get personalized recommendations and exclusive offers!
            </p>
            {!isAuthenticated ? (
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-trendify-600 hover:bg-trendify-50"
                asChild
              >
                <Link to="/register">Create an Account</Link>
              </Button>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-trendify-600 hover:bg-trendify-50"
                asChild
              >
                <Link to="/profile">View Your Profile</Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
