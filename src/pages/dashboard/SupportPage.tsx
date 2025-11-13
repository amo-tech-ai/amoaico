import React from 'react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { LifeBuoyIcon, HelpCircleIcon, MailIcon } from '../../assets/icons';

export const SupportPage = () => {
    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    Support & Help Center
                </h1>
                <p className="mt-1 text-lg text-sunai-slate/80">
                    Need help? Find answers to your questions here.
                </p>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <AnimatedElement delay={100}>
                    <div className="bg-white p-8 rounded-xl border border-gray-200 text-center h-full">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <HelpCircleIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-sunai-blue">Frequently Asked Questions</h2>
                        <p className="mt-2 text-gray-600">Find quick answers to common questions about our platform and services.</p>
                         <p className="mt-4 font-semibold text-gray-400">Coming Soon</p>
                    </div>
                </AnimatedElement>
                <AnimatedElement delay={200}>
                    <div className="bg-white p-8 rounded-xl border border-gray-200 text-center h-full">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <MailIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-sunai-blue">Contact Support</h2>
                        <p className="mt-2 text-gray-600">Can't find what you're looking for? Our support team is here to help.</p>
                        <p className="mt-4 font-semibold text-gray-400">Coming Soon</p>
                    </div>
                </AnimatedElement>
            </div>
        </SectionContainer>
    );
};