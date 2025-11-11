import { useState, useEffect } from 'react';
import { User } from '../types';

// Mock authentication hook
// In a real app, this would be replaced with Supabase Auth
export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching user data
        setTimeout(() => {
            setUser({
                id: '8d5c4b1a-8c1c-4b3b-9c2b-1a1a1a1a1a1a',
                fullName: 'Alex Doe',
                avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe'
            });
            setLoading(false);
        }, 500);
    }, []);

    const logout = () => {
        setLoading(true);
        setTimeout(() => {
            setUser(null);
            setLoading(false);
        }, 300);
    };

    return { user, loading, logout };
};
