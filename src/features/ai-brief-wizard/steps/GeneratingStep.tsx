import React from 'react';
import { CheckCircleIcon, XIcon } from '../../../assets/icons';

interface GeneratingStepProps {
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
    onRetry: () => void;
}

export const GeneratingStep: React.FC<GeneratingStepProps> = ({ status, message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
            {(status === 'loading' || status === 'idle') && (
                <>
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-t-sunai-orange rounded-full animate-spin"></div>
                    </div>
                    <h2 className="text-2xl font-bold font-poppins mt-8 text-sunai-blue">Generating Your Brief...</h2>
                    <p className="text-gray-600 mt-2">{message || 'Preparing...'}</p>
                </>
            )}
            {status === 'success' && (
                <div className="animate-fade-in">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-bold font-poppins mt-8 text-sunai-blue">Success!</h2>
                    <p className="text-gray-600 mt-2">Your AI-powered brief is ready.</p>
                </div>
            )}
            {status === 'error' && (
                <div className="animate-fade-in">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <XIcon className="w-10 h-10 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold font-poppins mt-8 text-sunai-blue">Generation Failed</h2>
                    <p className="text-gray-600 mt-2">We couldn't generate the brief. Please try again.</p>
                    <button onClick={onRetry} className="mt-6 px-6 py-2 rounded-lg font-semibold bg-sunai-orange text-white">Retry</button>
                </div>
            )}
        </div>
    );
};