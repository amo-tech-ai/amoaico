import React, { useState } from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { 
    PROCESS_PAGE_TIMELINE, 
    PROCESS_PAGE_COMPARISON, 
    PROCESS_PAGE_METRICS, 
    PROCESS_PAGE_QUALITY_METRICS, 
    PROCESS_PAGE_CALCULATOR 
} from '../data';
import { CheckIcon } from '../assets/icons';

export const ProcessPage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    const [selectedTimeline, setSelectedTimeline] = useState(1);

    return (
        <main>
            {/* Hero Section */}
            <SectionContainer className="bg-white text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter max-w-4xl mx-auto">
                        8 Weeks. Not 8 Months.
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-3xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Our proven 4-phase process delivers production-ready AI applications fast, turning your vision into reality with unmatched speed and precision.
                    </p>
                </AnimatedElement>
            </SectionContainer>

            {/* Process Timeline (Infographic) */}
            <SectionContainer className="bg-slate-50">
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                        <div className="relative space-y-16">
                            {PROCESS_PAGE_TIMELINE.map((step, index) => (
                                <AnimatedElement key={step.phase} className="flex items-start gap-6">
                                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#00334F] text-white font-bold text-lg z-10">{step.phase}</div>
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md flex-grow">
                                        <span className="font-semibold text-sm text-[#F97316]">{step.duration}</span>
                                        <h3 className="text-xl font-bold font-poppins text-[#00334F] mt-1">{step.title}</h3>
                                        <p className="text-gray-600 mt-2">{step.description}</p>
                                    </div>
                                </AnimatedElement>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionContainer>

            {/* Comparison Section */}
            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#0F172A]">The Sunai Advantage</h2></AnimatedElement>
                </div>
                <div className="mt-16 max-w-4xl mx-auto">
                    <AnimatedElement className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                        <div className="grid grid-cols-3 divide-x divide-gray-200">
                             <div className="p-4 font-bold font-poppins text-[#00334F]">Metric</div>
                             <div className="p-4 font-bold font-poppins text-[#00334F] bg-[#FFD6B0]/30">Sunai (8 Weeks)</div>
                             <div className="p-4 font-bold font-poppins text-gray-500">Traditional (6+ Months)</div>
                        </div>
                        {PROCESS_PAGE_COMPARISON.map((item, index) => (
                            <div key={item.category} className="grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-200">
                                <div className="p-4 font-semibold text-gray-700">{item.category}</div>
                                <div className="p-4 font-bold text-green-600 bg-[#FFD6B0]/30">{item.sunai}</div>
                                <div className="p-4 text-gray-600">{item.traditional}</div>
                            </div>
                        ))}
                    </AnimatedElement>
                </div>
            </SectionContainer>

            {/* Track Record Metrics */}
            <SectionContainer className="bg-slate-50">
                 <div className="grid md:grid-cols-3 gap-8">
                    {PROCESS_PAGE_METRICS.map((metric, index) => (
                        <AnimatedElement key={metric.label} delay={100*index} className="bg-white p-8 rounded-xl border border-gray-100 text-center shadow-lg">
                            <p className="text-5xl font-bold font-poppins text-[#00334F]">
                                <Counter endValue={parseFloat(metric.value)} />{metric.isPlus ? '+' : ''}{metric.unit}
                            </p>
                            <p className="mt-2 text-gray-600">{metric.label}</p>
                        </AnimatedElement>
                    ))}
                </div>
                <div className="mt-12 max-w-2xl mx-auto text-center">
                    <AnimatedElement delay={300}>
                        <h4 className="font-semibold text-[#00334F]">Quality Metrics Breakdown</h4>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {PROCESS_PAGE_QUALITY_METRICS.map(metric => (
                                <div key={metric.label} className="bg-white p-4 rounded-lg border border-gray-200">
                                    <p className="font-bold text-lg text-[#0F172A]">{metric.value}</p>
                                    <p className="text-xs text-gray-500">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
            
            {/* Project Timeline Calculator */}
            <SectionContainer>
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#0F172A]">Project Timeline Calculator</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid lg:grid-cols-4 gap-8">
                    {PROCESS_PAGE_CALCULATOR.map((item, index) => (
                        <AnimatedElement key={item.name} delay={100*index}>
                            <button 
                                onClick={() => setSelectedTimeline(index)}
                                className={`p-6 rounded-2xl border-2 w-full text-left transition-all duration-300 transform ${selectedTimeline === index ? 'border-[#F97316] bg-orange-50 shadow-2xl scale-105' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'}`}
                            >
                                <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${selectedTimeline === index ? 'text-[#F97316]' : 'text-[#00334F]'}`}>{item.icon}</div>
                                <h4 className="mt-4 font-bold font-poppins text-lg text-[#00334F]">{item.name}</h4>
                                <p className={`mt-1 font-semibold ${selectedTimeline === index ? 'text-[#F97316]' : 'text-gray-600'}`}>{item.time}</p>
                            </button>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
             {/* Final CTA Section */}
            <SectionContainer className="bg-gradient-to-b from-white to-orange-50">
                 <div className="text-center max-w-2xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#00334F]">Ready to Launch in 8 Weeks?</h2>
                        <p className="mt-4 text-lg text-[#0F172A]/80 max-w-2xl mx-auto">Let's turn your idea into a production-ready AI application. Start by generating your project brief with our AI assistant.</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">Start Your Project</button>
                            <button className="px-8 py-3 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 transition-all">Book Consultation</button>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
        </main>
    );
};