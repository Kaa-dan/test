interface ErrorDisplayProps {
    message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
    <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-screen">
            <p className="text-red-500">Error: {message}</p>
        </div>
    </div>
);