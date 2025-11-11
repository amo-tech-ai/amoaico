import React from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../services/supabaseClient';

export const Auth = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold font-poppins text-center mb-2 text-[#00334F]">Sign In to Continue</h2>
            <p className="text-center text-gray-600 mb-8">Create an account to save and manage your project briefs.</p>
            <SupabaseAuth
                supabaseClient={supabase}
                appearance={{ 
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#F97316',
                                brandAccent: '#FB923C',
                            }
                        }
                    }
                }}
                theme="light"
            />
        </div>
    );
};