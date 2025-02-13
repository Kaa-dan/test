import React from 'react';

const OrderStatusTabs = ({ selectedStatus, onStatusChange, orderCounts }: any) => {
    const statuses = [
        { value: 'ALL', label: 'All Orders' },
        { value: 'NEW', label: 'New' },
        { value: 'PROCESSING', label: 'Processing' },
        { value: 'SHIPPED', label: 'Shipped' },
        { value: 'DELIVERED', label: 'Delivered' },
        { value: 'CANCELLED', label: 'Cancelled' }
    ];

    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8" aria-label="Order Status Tabs">
                {statuses.map((status) => (
                    <button
                        key={status.value}
                        onClick={() => onStatusChange(status.value)}
                        className={`
              py-4 px-1 inline-flex items-center gap-2 border-b-2 text-sm font-medium
              ${selectedStatus === status.value
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }
            `}
                    >
                        {status.label}
                        <span className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${selectedStatus === status.value
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-700'
                            }
            `}>
                            {orderCounts[status.value]}
                        </span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default OrderStatusTabs;