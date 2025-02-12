"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  X,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

// Types
interface User {
  _id: string;
  name: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount: number;
  tax: number;
  hsn?: string;
}

interface Order {
  _id: string;
  order_id: string;
  user: string | User;
  shiprocket_order_id?: number;
  shipment_id?: number;
  order_date: string;
  status: "NEW" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  status_code?: number;
  awb_code?: string;
  courier_company_id?: number;
  courier_name?: string;
  pickup_location: string;
  channel_id?: string;
  comment?: string;

  billing_customer_name: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;

  order_items: OrderItem[];
  razorpay_order_id: string;
  payment_method: string;
  shipping_charges: number;
  giftwrap_charges: number;
  transaction_charges: number;
  total_discount: number;
  sub_total: number;

  length: number;
  breadth: number;
  height: number;
  weight: number;

  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const OrdersPage: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const [profileResponse, ordersResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/profile`, {
            headers,
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/get-orders`, {
            headers,
          }),
        ]);

        if (!profileResponse.ok || !ordersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [profileData, ordersData]: [
          ApiResponse<User>,
          ApiResponse<Order[]>,
        ] = await Promise.all([profileResponse.json(), ordersResponse.json()]);

        if (profileData.success && profileData.data) {
          setProfile(profileData.data);
        }

        if (ordersData.success && ordersData.data) {
          setOrders(ordersData.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelOrder = async (orderId: string): Promise<void> => {
    setCancelLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("YOUR_API_ENDPOINT/orders/cancel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: orderId }),
      });

      const data: ApiResponse<null> = await response.json();

      if (data.success) {
        setOrders(
          orders.map((order) =>
            order.order_id === orderId
              ? { ...order, status: "CANCELLED" as const }
              : order
          )
        );
        setSelectedOrder(null);
      } else {
        throw new Error(data.message || "Failed to cancel order");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setCancelLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusStyle = (status: Order["status"]): string => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-50 text-green-700 ring-green-600/20 ring-1";
      case "CANCELLED":
        return "bg-red-50 text-red-700 ring-red-600/20 ring-1";
      case "SHIPPED":
        return "bg-blue-50 text-blue-700 ring-blue-600/20 ring-1";
      default:
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20 ring-1";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  My Profile
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1 text-lg text-gray-900">{profile?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="mt-1 text-lg text-gray-900">{profile?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Package className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  My Orders
                </h2>
              </div>

              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.order_id}
                    onClick={() => setSelectedOrder(order)}
                    className="group border border-gray-100 rounded-xl p-5 hover:border-blue-100 hover:shadow-md transition-all duration-200 cursor-pointer bg-white"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}
                          >
                            {order.status}
                          </span>
                          <p className="text-sm text-gray-500">
                            Order #{order.order_id.slice(-6)}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-6">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {new Date(order.order_date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              {order.order_items.length}{" "}
                              {order.order_items.length === 1
                                ? "item"
                                : "items"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {formatCurrency(order.sub_total)}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Order Details
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        #{selectedOrder.order_id}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    {/* Order Status */}
                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Status</p>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(selectedOrder.status)}`}
                        >
                          {selectedOrder.status}
                        </span>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">
                          {new Date(
                            selectedOrder.order_date
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Order Items
                      </h4>
                      <div className="space-y-3">
                        {selectedOrder.order_items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
                          >
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                {item.units} ×{" "}
                                {formatCurrency(item.selling_price)}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-900">
                              {formatCurrency(item.units * item.selling_price)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Details */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        Delivery Address
                      </h4>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <p className="font-medium text-gray-900">
                          {selectedOrder.billing_customer_name}
                        </p>
                        <p className="text-gray-600">
                          {selectedOrder.billing_address}
                        </p>
                        <p className="text-gray-600">
                          {selectedOrder.billing_city},{" "}
                          {selectedOrder.billing_state}{" "}
                          {selectedOrder.billing_pincode}
                        </p>
                        <p className="text-gray-600">
                          Phone: {selectedOrder.billing_phone}
                        </p>
                      </div>
                    </div>

                    {/* Price Details */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4">
                        Price Details
                      </h4>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between text-gray-600">
                          <p>Subtotal</p>
                          <p>{formatCurrency(selectedOrder.sub_total)}</p>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <p>Shipping</p>
                          <p>
                            {formatCurrency(selectedOrder.shipping_charges)}
                          </p>
                        </div>
                        {selectedOrder.total_discount > 0 && (
                          <div className="flex justify-between">
                            <p className="text-gray-600">Discount</p>
                            <p className="text-green-600">
                              -{formatCurrency(selectedOrder.total_discount)}
                            </p>
                          </div>
                        )}
                        <div className="pt-3 border-t border-gray-200">
                          <div className="flex justify-between text-gray-900 font-semibold">
                            <p>Total</p>
                            <p>
                              {formatCurrency(
                                selectedOrder.sub_total +
                                  selectedOrder.shipping_charges -
                                  selectedOrder.total_discount
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cancel Button */}
                    {selectedOrder.status !== "CANCELLED" &&
                      selectedOrder.status !== "DELIVERED" && (
                        <div className="pt-4">
                          <button
                            onClick={() =>
                              handleCancelOrder(selectedOrder.order_id)
                            }
                            disabled={cancelLoading}
                            className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 
                            disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
                          >
                            {cancelLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <X className="w-5 h-5" />
                                Cancel Order
                              </>
                            )}
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
