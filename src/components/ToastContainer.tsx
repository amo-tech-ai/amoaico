import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XIcon } from './assets/icons'; 
import { useToast } from '../hooks/useToast';

export const ToastContainer = () => {
    const { toast } = useToast();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (toast) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000); // Auto-hide after 3 seconds
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
        }
    }, [toast]);
    
    // This effect ensures that a new toast can be shown even if the message/type is the same as the last one.
    // The key is resetting isVisible to false when the toast is cleared from the context.
    useEffect(() => {
        if (!toast) {
            setIsVisible(false);
        }
    }, [toast]);


    if (!toast) {
        return null;
    }

    const isSuccess = toast.type === 'success';
    const containerClasses = `fixed bottom-5 right-5 z-[100] transform transition-all duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`;
    const innerClasses = `flex items-center gap-4 p-4 rounded-lg shadow-lg border w-full max-w-sm ${isSuccess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`;

    return (
        <div role="alert" aria-live="assertive" className={containerClasses}>
            <div className={innerClasses}>
                {isSuccess 
                    ? <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" /> 
                    : <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full flex-shrink-0"><XIcon className="w-4 h-4 text-red-500" /></div>
                }
                <p className={`text-sm font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
                    {toast.message}
                </p>
            </div>
        </div>
    );
};