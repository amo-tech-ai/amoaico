import React from 'react';
// FIX: Changed import of `Navigate` from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Auth } from '../components/Auth';
import { SectionContainer } from '../components/layout/SectionContainer';

export const LoginPage = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <SectionContainer className="text-center">
                <div className="w-12 h-12 border-4 border-t-[#F97316] border-gray-200 rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </SectionContainer>
        );
    }

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <SectionContainer className="max-w-md mx-auto py-16 md:py-24">
            <Auth />
        </SectionContainer>
    );
};