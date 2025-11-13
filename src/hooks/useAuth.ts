import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { User } from '../types';
// FIX: Import Supabase types to define AuthContextType explicitly.
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// FIX: Defining AuthContextType here to resolve TypeScript errors caused by
// an unresolvable AuthContext module, without changing the project's file structure.
interface UserProfile {
    id: string;
    full_name?: string;
    avatar_url?: string;
    role?: string;
}

interface AuthContextType {
    session: Session | null;
    user: SupabaseUser | null;
    profile: UserProfile | null;
    loading: boolean;
    logout: () => Promise<void>;
}

// --- DEVELOPMENT ONLY ---
// To disable authentication during development and auto-login as a mock admin user,
// create a `.env.local` file in the root of your project and add the following line:
// VITE_DISABLE_AUTH=true
const isAuthDisabled = (import.meta as any)?.env?.VITE_DISABLE_AUTH === 'true';

const mockUser: User = {
    id: 'mock-user-id',
    fullName: 'Dev User',
    avatarUrl: 'https://i.pravatar.cc/150?u=mock-user',
    role: 'admin', // Give admin role for easy access to all routes during dev
};
// --- END DEVELOPMENT ONLY ---


// This hook adapts the Supabase user from our AuthContext to the application's expected User type.
export const useAuth = () => {
    // FIX: Reorder the dev-only check to happen before context access to prevent errors
    // when running in dev mode without an AuthProvider.
    // --- DEVELOPMENT ONLY ---
    if (isAuthDisabled) {
        console.warn('Authentication is disabled for development. Using mock admin user.');
        return {
            user: mockUser,
            loading: false,
            logout: async () => { console.log('Mock logout'); window.location.reload(); },
        };
    }
    // --- END DEVELOPMENT ONLY ---
    
    // FIX: Cast context to the defined type to inform TypeScript about its shape.
    const context = useContext(AuthContext) as AuthContextType | undefined;

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