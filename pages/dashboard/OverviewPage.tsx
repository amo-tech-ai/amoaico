import React from 'react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { LayoutDashboardIcon } from '../../assets/icons';

export const OverviewPage = () => {
    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    Overview
                </h1>
            </AnimatedElement>
             <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl mt-8">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <LayoutDashboardIcon className="w-8 h-8 text-gray-500" />
                </div>
                <h2 className="mt-6 text-xl font-semibold font-poppins text-sunai-blue">Coming Soon</h2>
                <p className="mt-2 text-gray-600">A high-level overview of your projects and activity will be shown here.</p>
            </div>
        </SectionContainer>
    );
};