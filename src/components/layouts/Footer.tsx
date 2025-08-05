
import { Link } from "react-router-dom";
import { 
  Facebook, Twitter, Instagram, Mail, Phone, MapPin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="trendify-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Trendify</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop fashion destination that combines AI-powered recommendations with trending styles for a personalized shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-trendify-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-trendify-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-trendify-600 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Shop Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/men" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/women" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-trendify-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={16} />
                <span>support@trendify.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={16} className="mt-1" />
                <span>123 Fashion Street, Style City, SC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Trendify. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-trendify-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-trendify-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
