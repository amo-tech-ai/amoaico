import React from 'react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { ProfileManager } from '../../components/ProfileManager';

export const SettingsPage = () => {
    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    Settings
                </h1>
                <p className="mt-1 text-lg text-sunai-slate/80">
                    Manage your profile and account settings.
                </p>
            </AnimatedElement>
            <AnimatedElement delay={100} className="mt-8 max-w-lg">
                <ProfileManager />
            </AnimatedElement>
        </SectionContainer>
    );
};