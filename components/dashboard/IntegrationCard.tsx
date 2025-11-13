import React from 'react';

interface IntegrationCardProps {
    name: string;
    description: string;
    icon: React.ReactNode;
    isConnected: boolean;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, description, icon, isConnected }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col h-full">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold font-poppins text-sunai-blue text-lg">{name}</h3>
                    {isConnected ? (
                        <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Connected</span>
                    ) : (
                        <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">Not Connected</span>
                    )}
                </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 flex-grow">{description}</p>
            <div className="mt-6">
                {isConnected ? (
                    <button className="w-full px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                        Disconnect
                    </button>
                ) : (
                    <button className="w-full px-4 py-2 text-sm font-semibold text-white bg-sunai-blue rounded-lg hover:bg-opacity-90 transition-colors">
                        Connect
                    </button>
                )}
            </div>
        </div>
    );
};
