import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';

export const ContactPage = () => {
    return (
        <main>
            <SectionContainer className="text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        Contact Us
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Content for the Contact page will be added here soon.
                    </p>
                </AnimatedElement>
            </SectionContainer>
        </main>
    );
};