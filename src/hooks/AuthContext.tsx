import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

// Define a type for the user profile data from your 'profiles' table
export interface UserProfile {
    id: string;
    full_name?: string;
    avatar_url?: string;
    role?: string;
}

export interface AuthContextType {
    session: Session | null;
    user: SupabaseUser | null;
    profile: UserProfile | null; // Add profile to the context
    loading: boolean;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSessionAndProfile = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            const supabaseUser = session?.user ?? null;
            setUser(supabaseUser);

            if (supabaseUser) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', supabaseUser.id)
                    .single();
                setProfile(profileData);
            }
            setLoading(false);
        };
        
        getSessionAndProfile();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            const supabaseUser = session?.user ?? null;
            setUser(supabaseUser);
            
            if (supabaseUser) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', supabaseUser.id)
                    .single();
                setProfile(profileData);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Set up a realtime subscription to profile changes
    useEffect(() => {
        if (!user) return;

        const profileChannel = supabase
            .channel(`profile-changes-for-${user.id}`)
            .on<UserProfile>(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'profiles',
                    filter: `id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('Realtime profile update received:', payload.new);
                    setProfile(payload.new);
                }
            )
            .subscribe();
        
        return () => {
            supabase.removeChannel(profileChannel);
        };

    }, [user]);


    const logout = async () => {
        await supabase.auth.signOut();
    };

    const value = {
        session,
        user,
        profile,
        loading,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};