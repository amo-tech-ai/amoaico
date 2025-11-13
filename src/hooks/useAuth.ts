import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { User } from '../types';

// --- DEVELOPMENT ONLY ---
// To disable authentication during development and auto-login as a mock admin user,
// create a `.env.local` file in the root of your project and add the following line:
// VITE_DISABLE_AUTH=true
const isAuthDisabled = (import.meta as any)?.env?.VITE_DISABLE_AUTH === 'true';

const mockUser: User = {
    id: 'mock-user-id',
    fullName: 'Dev Admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=mock-admin',
    role: 'admin', // Give admin role for easy access to all routes during dev
};
// --- END DEVELOPMENT ONLY ---


// This hook adapts the Supabase user from our AuthContext to the application's expected User type.
export const useAuth = () => {
    // --- DEVELOPMENT ONLY ---
    if (isAuthDisabled) {
        console.warn(
            '%cAUTH DISABLED', 
            'color: white; background: red; font-size: 14px; font-weight: bold; padding: 4px;',
            'Authentication is disabled for development. Using mock admin user.'
        );
        return {
            user: mockUser,
            loading: false,
            logout: async () => { console.log('Mock logout'); window.location.reload(); },
        };
    }
    // --- END DEVELOPMENT ONLY ---
    
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    const { user: supabaseUser, profile, loading, logout } = context;

    let user: User | null = null;
    if (supabaseUser) {
        user = {
            id: supabaseUser.id,
            fullName: profile?.full_name || supabaseUser.email || 'User',
            avatarUrl: profile?.avatar_url || `https://i.pravatar.cc/150?u=${supabaseUser.id}`,
            role: profile?.role || 'user'
        };
    }

    return { user, loading, logout };
};