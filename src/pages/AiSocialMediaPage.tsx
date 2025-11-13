import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { USE_CASES_PLATFORMS } from '../data';
import { Share2Icon } from '../assets/icons';

interface PublicLayoutContext {
  onStartWizard: () => void;
}

export const AiSocialMediaPage = () => {
    const { onStartWizard } = useOutletContext<PublicLayoutContext>();
    return (
        <main>
            <SectionContainer className="bg-white text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter max-w-4xl mx-auto">
                        AI Social Media Automation
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Create smarter content, post faster, and engage your audience with intelligent automation.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">Start Your AI Brief →</button>
                </AnimatedElement>
            </SectionContainer>
            
            <SectionContainer className="bg-slate-50" contained={true}>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Automate Across Platforms</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {USE_CASES_PLATFORMS.map((platform, index) => (
                        <AnimatedElement key={platform.platform} delay={100 * index}>
                            <div className="p-6 rounded-xl border-2 border-slate-100 bg-white h-full text-center">
                                <Share2Icon className="w-8 h-8 text-[#F97316] mx-auto"/>
                                <h3 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{platform.platform}</h3>
                                <p className="mt-2 text-[#0F172A]/80">{platform.useCase}</p>
                                <p className="mt-2 text-sm font-bold text-[#F97316]">{platform.result}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
};