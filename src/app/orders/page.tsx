
"use client"
// types.ts
export interface User {
    _id: string;
    name: string;
    phone: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    name: string;
    sku: string;
    units: number;
    selling_price: number;
    discount: number;
    tax: number;
    hsn?: string;
}

export interface Order {
    _id: string;
    order_id: string;
    user: string | User;
    shiprocket_order_id?: number;
    shipment_id?: number;
    order_date: string;
    status: 'NEW' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
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



    // Order Items and Payment
    order_items: OrderItem[];
    razorpay_order_id: string;
    payment_method: string;
    shipping_charges: number;
    giftwrap_charges: number;
    transaction_charges: number;
    total_discount: number;
    sub_total: number;

    // Package Details
    length: number;
    breadth: number;
    height: number;
    weight: number;

    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
}

// OrdersPage.tsx
import { useEffect, useState } from 'react';
import { Loader2, X } from "lucide-react";
import { useRouter } from 'next/navigation';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
// import type { User, Order, ApiResponse } from './types';

const OrdersPage: React.FC = () => {
    const [profile, setProfile] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [cancelLoading, setCancelLoading] = useState<boolean>(false);

    const router = useRouter()

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {

                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                };

                const [profileResponse, ordersResponse] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/profile`, { headers }),
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-auth/get-orders`, { headers })
                ]);

                if (!profileResponse.ok || !ordersResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const [profileData, ordersData]: [ApiResponse<User>, ApiResponse<Order[]>] = await Promise.all([
                    profileResponse.json(),
                    ordersResponse.json()
                ]);

                console.log({ profileData, ordersData })
                if (profileData.success && profileData.data) {
                    setProfile(profileData.data);
                }

                if (ordersData.success && ordersData.data) {
                    setOrders(ordersData.data);
                }

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                // window.alert('something went wront')
                // router.push('/')

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCancelOrder = async (orderId: string): Promise<void> => {
        setCancelLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch('YOUR_API_ENDPOINT/orders/cancel', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ order_id: orderId })
            });

            const data: ApiResponse<null> = await response.json();

            if (data.success) {
                setOrders(orders.map(order =>
                    order.order_id === orderId
                        ? { ...order, status: 'CANCELLED' as const }
                        : order
                ));
                setSelectedOrder(null);
            } else {
                throw new Error(data.message || 'Failed to cancel order');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setCancelLoading(false);
        }
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusStyle = (status: Order['status']): string => {
        const baseClasses = "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium";
        switch (status) {
            case 'DELIVERED':
                return `${baseClasses} bg-green-100 text-green-800`;
            case 'CANCELLED':
                return `${baseClasses} bg-red-100 text-red-800`;
            case 'SHIPPED':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            default:
                return `${baseClasses} bg-yellow-100 text-yellow-800`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex items-center justify-center h-screen">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="flex items-center justify-center h-screen">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">
                <main className="container mx-auto px-4 py-8">
                    {/* Profile Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{profile?.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{profile?.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold mb-4">Order History</h2>
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div
                                    key={order.order_id}
                                    onClick={() => setSelectedOrder(order)}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="grid md:grid-cols-4 gap-4">
                                        <div className=''>
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-medium text-sm">#{order.order_id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Date</p>
                                            <p className="font-medium">
                                                {new Date(order.order_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className={getStatusStyle(order.status)}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="font-medium">{formatCurrency(order.sub_total)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Details Modal */}
                    {selectedOrder && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold">Order Details</h3>
                                        <button
                                            onClick={() => setSelectedOrder(null)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Order Summary */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Order Summary</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Order ID</p>
                                                    <p className="font-medium">#{selectedOrder.order_id}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Status</p>
                                                    <span className={getStatusStyle(selectedOrder.status)}>
                                                        {selectedOrder.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Items</h4>
                                            <div className="space-y-2">
                                                {selectedOrder.order_items.map((item, index) => (
                                                    <div key={index} className="border rounded p-3">
                                                        <div className="flex justify-between">
                                                            <div>
                                                                <p className="font-medium">{item.name}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    Qty: {item.units} × {formatCurrency(item.selling_price)}
                                                                </p>
                                                            </div>
                                                            <p className="font-medium">
                                                                {formatCurrency(item.units * item.selling_price)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Shipping Details */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Shipping Details</h4>
                                            <div className="space-y-1">
                                                <p>{selectedOrder.billing_customer_name}</p>
                                                <p>{selectedOrder.billing_address}</p>
                                                <p>{selectedOrder.billing_city}, {selectedOrder.billing_state}</p>
                                                <p>{selectedOrder.billing_pincode}</p>
                                                <p>{selectedOrder.billing_phone}</p>
                                            </div>
                                        </div>

                                        {/* Price Details */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Price Details</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <p className="text-gray-500">Subtotal</p>
                                                    <p>{formatCurrency(selectedOrder.sub_total)}</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <p className="text-gray-500">Shipping Charges</p>
                                                    <p>{formatCurrency(selectedOrder.shipping_charges)}</p>
                                                </div>
                                                {selectedOrder.total_discount > 0 && (
                                                    <div className="flex justify-between">
                                                        <p className="text-gray-500">Discount</p>
                                                        <p className="text-green-600">
                                                            -{formatCurrency(selectedOrder.total_discount)}
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="flex justify-between font-semibold pt-2 border-t">
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

                                        {/* Cancel Button */}
                                        {selectedOrder.status !== 'CANCELLED' &&
                                            selectedOrder.status !== 'DELIVERED' && (
                                                <div className="pt-4 border-t">
                                                    <button
                                                        onClick={() => handleCancelOrder(selectedOrder.order_id)}
                                                        disabled={cancelLoading}
                                                        className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 
                                                      disabled:bg-red-300 disabled:cursor-not-allowed flex items-center justify-center"
                                                    >
                                                        {cancelLoading ? (
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                        ) : (
                                                            'Cancel Order'
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <Footer /></>
    );
};

export default OrdersPage;


