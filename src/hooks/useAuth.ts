import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { User } from '../types';

// This hook adapts the Supabase user from our AuthContext to the application's expected User type.
export const useAuth = () => {
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
