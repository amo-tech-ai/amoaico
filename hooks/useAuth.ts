import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../types';

// This hook adapts the Supabase user from our AuthContext to the application's expected User type.
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    
    const { user: supabaseUser, loading, logout } = context;

    let user: User | null = null;
    if (supabaseUser) {
        user = {
            id: supabaseUser.id,
            // Supabase user_metadata is where custom fields like fullName are stored.
            fullName: supabaseUser.user_metadata?.full_name || supabaseUser.email || 'User',
            avatarUrl: supabaseUser.user_metadata?.avatar_url || `https://i.pravatar.cc/150?u=${supabaseUser.id}`
        };
    }

    return { user, loading, logout };
};