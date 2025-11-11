import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { PROCESS_TIMELINE_STEPS, PROCESS_PHASES, PROCESS_COMPARISON, PROCESS_METRICS } from '../data';
import { CheckIcon, XIcon, ArrowRightIcon } from '../assets/icons';

export const ProcessPage = () => {
    return (
        <main>
            {/* Hero Section */}
            <SectionContainer className="bg-white text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter max-w-4xl mx-auto">
                        From Brief to Production in 8 Weeks
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Our agile, AI-accelerated process delivers high-quality applications with speed and transparency, ensuring your vision becomes a reality without unnecessary delays.
                    </p>
                </AnimatedElement>
            </SectionContainer>

            {/* Timeline Section */}
            <SectionContainer className="bg-slate-50">
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200" style={{ transform: 'translateY(-2rem)' }}></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-4 gap-y-12 relative">
                        {PROCESS_TIMELINE_STEPS.map((step, index) => (
                            <AnimatedElement key={step.phase} delay={100 * index} className="text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-[#FFD6B0]/60 text-[#00334F] flex items-center justify-center border-2 border-white shadow-md mb-3">{step.icon}</div>
                                <h3 className="font-semibold text-sm text-[#0F172A] font-poppins">{step.phase}. {step.title}</h3>
                                <p className="text-xs text-gray-500">{step.summary}</p>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>
            
            {/* Phases Section */}
            <SectionContainer>
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#0F172A]">A Deep Dive into Our Process</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid lg:grid-cols-2 gap-8">
                    {PROCESS_PHASES.map((phase, index) => (
                         <AnimatedElement key={phase.title} delay={150 * index}>
                             <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg h-full">
                                <span className="font-semibold text-sm text-[#F97316]">{phase.weeks}</span>
                                <h3 className="text-2xl font-bold font-poppins text-[#00334F] mt-2">{phase.title}</h3>
                                <ul className="mt-4 space-y-3">
                                    {phase.points.map(point => (
                                        <li key={point} className="flex items-start gap-3">
                                            <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                             </div>
                         </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Comparison Section */}
            <SectionContainer className="bg-slate-50">
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#0F172A]">The Sunai Difference</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <AnimatedElement delay={100}>
                        <div className="bg-white p-8 rounded-xl border border-gray-200 h-full">
                            <h3 className="font-bold text-xl font-poppins text-gray-500">Traditional Agency (6+ Months)</h3>
                            <ul className="mt-4 space-y-3">
                                {PROCESS_COMPARISON.sixMonths.map(item => (
                                    <li key={item} className="flex items-start gap-3">
                                        <XIcon className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedElement>
                    <AnimatedElement delay={200}>
                        <div className="bg-[#00334F] text-white p-8 rounded-xl h-full shadow-2xl shadow-[#00334F]/20">
                            <h3 className="font-bold text-xl font-poppins">Sunai (8 Weeks)</h3>
                             <ul className="mt-4 space-y-3">
                                {PROCESS_COMPARISON.eightWeeks.map(item => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckIcon className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
            
            {/* Metrics Section */}
            <SectionContainer className="bg-white">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PROCESS_METRICS.map((metric, index) => (
                        <AnimatedElement key={metric.label} delay={100*index} className="bg-slate-50 p-6 rounded-xl border border-gray-100 text-center">
                            <p className="text-5xl font-bold font-poppins text-[#00334F]">
                                <Counter endValue={parseFloat(metric.value)} decimals={metric.decimals || 0} />{metric.unit || ''}
                            </p>
                            <p className="mt-2 text-gray-600">{metric.label}</p>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
};