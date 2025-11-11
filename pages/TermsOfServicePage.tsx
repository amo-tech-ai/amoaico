import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';

export const TermsOfServicePage = () => {
    return (
        <main>
            <SectionContainer>
                <AnimatedElement>
                    <h1 className="text-4xl md:text-5xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        Terms of Service
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <div className="prose lg:prose-lg mt-8 max-w-4xl">
                        <p>This is a placeholder for your Terms of Service. Replace this text with your actual terms.</p>
                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing our site, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
                        <h2>2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>
                    </div>
                </AnimatedElement>
            </SectionContainer>
        </main>
    );
};