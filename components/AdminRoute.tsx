import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SectionContainer } from './layout/SectionContainer';

export const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <SectionContainer className="text-center">
                 <div className="w-12 h-12 border-4 border-t-[#F97316] border-gray-200 rounded-full animate-spin mx-auto"></div>
                 <p className="mt-4 text-gray-600">Checking permissions...</p>
            </SectionContainer>
        );
    }

    if (!user) {
        // If not logged in at all, redirect to home.
        return <Navigate to="/" replace />;
    }

    if (user.role !== 'admin') {
        // If logged in but not an admin, show an access denied message or redirect.
        // Redirecting is often a better UX.
        console.warn("Access denied: User is not an admin.");
        return <Navigate to="/dashboard" replace />;
    }

    // If loading is finished and user is an admin, render the nested route.
    return <Outlet />;
};
