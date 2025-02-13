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

interface OrderStatusBadgeProps {
    status: Order['status'];
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
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

    return (
        <span className={getStatusStyle(status)}>
            {status}
        </span>
    );
};