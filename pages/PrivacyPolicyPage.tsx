import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';

export const PrivacyPolicyPage = () => {
    return (
        <main>
            <SectionContainer>
                <AnimatedElement>
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        Privacy Policy
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <div className="prose lg:prose-lg mt-8 max-w-4xl">
                        <p>This is a placeholder for your Privacy Policy. Replace this text with your actual policy.</p>
                        <h2>1. Information We Collect</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                        <h2>2. How We Use Your Information</h2>
                        <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.</p>
                    </div>
                </AnimatedElement>
            </SectionContainer>
        </main>
    );
};