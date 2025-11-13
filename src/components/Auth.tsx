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
                                brandButtonText: 'white',
                                defaultButtonBackground: 'white',
                                defaultButtonBackgroundHover: '#f7f7f7',
                                defaultButtonBorder: 'lightgray',
                                defaultButtonText: 'gray',
                                dividerBackground: '#eaeaea',
                                inputBackground: 'transparent',
                                inputBorder: 'lightgray',
                                inputBorderHover: 'gray',
                                inputBorderFocus: '#F97316',
                                inputText: '#0F172A',
                                inputLabelText: '#374151',
                                inputPlaceholder: 'darkgray',
                                messageText: 'gray',
                                messageTextDanger: 'red',
                            },
                             radii: {
                                borderRadiusButton: '0.5rem',
                                buttonBorderRadius: '0.5rem',
                                inputBorderRadius: '0.5rem',
                            },
                        }
                    }
                }}
                theme="light"
            />
        </div>
    );
};