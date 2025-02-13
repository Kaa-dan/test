import React from 'react';
import { Package, MapPin, Calendar, User } from 'lucide-react';

const ShipmentTracking = ({ trackingData }: any) => {
    const { shipment_track, shipment_track_activities } = trackingData?.tracking_data;
    const shipment = shipment_track[0];

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Shipment Tracking</h2>
                <p className="text-orange-600 font-semibold">AWB: {shipment?.awb_code}</p>
            </div>

            {/* Shipment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <Package className="text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">Current Status</p>
                            <p className="font-semibold text-black">{shipment?.current_status}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <User className="text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">Consignee</p>
                            <p className="font-semibold text-black">{shipment?.consignee_name}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <MapPin className="text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">Origin - Destination</p>
                            <p className="font-semibold text-black">{shipment?.origin} → {shipment?.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Calendar className="text-orange-500" />
                        <div>
                            <p className="text-sm text-gray-500">Expected Delivery</p>
                            <p className="font-semibold text-black">{new Date(shipment?.edd).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tracking Timeline */}
            <div className="relative">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Tracking History</h3>
                <div className="space-y-6">
                    {shipment_track_activities.map((activity: any, index: number) => (
                        <div key={index} className="flex items-start">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                {index !== shipment_track_activities.length - 1 && (
                                    <div className="w-0.5 h-16 bg-orange-200"></div>
                                )}
                            </div>
                            <div className="ml-4">
                                <p className="font-semibold text-black">{activity.activity}</p>
                                <p className="text-sm text-gray-500">{activity.location}</p>
                                <p className="text-xs text-gray-400">{new Date(activity.date).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShipmentTracking;