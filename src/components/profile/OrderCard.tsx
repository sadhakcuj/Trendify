
import { useState } from "react";
import { Order } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'PPP');
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-trendify-600" />
            <span className="font-medium">Order #{order.orderNumber}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Placed on {formatDate(order.orderDate)}
          </div>
          <div className="mt-1 flex items-center space-x-2">
            <Badge variant="outline" className={getStatusColor(order.deliveryStatus)}>
              {order.deliveryStatus.charAt(0).toUpperCase() + order.deliveryStatus.slice(1)}
            </Badge>
            <Badge variant="outline" className={getStatusColor(order.paymentStatus)}>
              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="font-semibold">${order.totalAmount.toFixed(2)}</div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2"
          >
            {isExpanded ? (
              <>Hide Details <ChevronUp className="ml-1 h-4 w-4" /></>
            ) : (
              <>View Details <ChevronDown className="ml-1 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-medium mb-2">Order Items ({order.items.length})</h4>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden mr-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/100x100/f5f5f5/cccccc?text=No+Image";
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium">{item.name}</h5>
                  <div className="text-sm text-gray-500">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="font-medium">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <div className="text-sm">
                  <p>{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Payment Info</h4>
                <div className="text-sm">
                  <p>Method: {order.paymentMethod}</p>
                  <p>Status: {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}</p>
                  {order.trackingNumber && <p>Tracking: {order.trackingNumber}</p>}
                  {order.estimatedDelivery && (
                    <p>Est. Delivery: {formatDate(order.estimatedDelivery)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span className="font-medium">Order Total:</span>
              <span className="font-bold">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
