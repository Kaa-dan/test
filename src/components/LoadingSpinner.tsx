import { Loader2 } from "lucide-react";

export const LoadingSpinner: React.FC = () => (
    <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
    </div>
);