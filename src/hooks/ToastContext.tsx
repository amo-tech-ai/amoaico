import React, { createContext, useState, useCallback, ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface Toast {
    message: string;
    type: ToastType;
    id: number; // Add an ID to handle rapid-fire toasts
}

interface ToastContextType {
    toast: Toast | null;
    showToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = useCallback((message: string, type: ToastType) => {
        // Use a unique ID to ensure that consecutive identical toasts are still rendered
        setToast({ message, type, id: Date.now() });
    }, []);

    const value = { toast, showToast };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};