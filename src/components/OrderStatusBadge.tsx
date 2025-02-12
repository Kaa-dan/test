import { Order } from "@/app/orders/page";

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