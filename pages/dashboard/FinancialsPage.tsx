import React from 'react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { DollarSignIcon } from '../../assets/icons';

export const FinancialsPage = () => {
    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    Financials
                </h1>
            </AnimatedElement>
            <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl mt-8">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <DollarSignIcon className="w-8 h-8 text-gray-500" />
                </div>
                <h2 className="mt-6 text-xl font-semibold font-poppins text-sunai-blue">Coming Soon</h2>
                <p className="mt-2 text-gray-600">Financials and revenue tracking will be available here.</p>
            </div>
        </SectionContainer>
    );
};