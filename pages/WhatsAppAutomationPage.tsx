import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { WHATSAPP_METRICS, WHATSAPP_CORE_SERVICES, WHATSAPP_USE_CASES } from '../data';

export const WhatsAppAutomationPage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    return (
        <main>
            <SectionContainer className="bg-white text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter max-w-4xl mx-auto">
                        WhatsApp AI Assistants
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Engage customers 24/7 with intelligent, automated conversations on the world's most popular messaging app.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">Automate Your WhatsApp →</button>
                </AnimatedElement>
            </SectionContainer>

            <SectionContainer className="bg-[#00334F] text-white" contained={true}>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {WHATSAPP_METRICS.map((metric, index) => (
                        <AnimatedElement key={metric.label} delay={100 * index}>
                            <p className="text-5xl md:text-6xl font-bold font-poppins">
                                <Counter endValue={parseFloat(metric.value)} />{metric.label.includes('%') ? '%' : 'x'}
                            </p>
                            <p className="mt-2 text-gray-300">{metric.label}</p>
                            <p className="mt-1 text-xs text-gray-400">{metric.subtext}</p>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            <SectionContainer className="bg-slate-50" contained={true}>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Core Automation Services</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {WHATSAPP_CORE_SERVICES.map((service, index) => (
                        <AnimatedElement key={service.title} delay={100 * index}>
                            <div className="p-6 rounded-xl border border-gray-200 bg-white h-full">
                                <div className="w-12 h-12 flex items-center justify-center text-[#F97316]">{service.icon}</div>
                                <h3 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{service.title}</h3>
                                <p className="text-sm text-gray-500">{service.subtitle}</p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
                                    {service.points.map(point => <li key={point}>{point}</li>)}
                                </ul>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            <SectionContainer className="bg-white" contained={true}>
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Example Use Cases</h2></AnimatedElement>
                </div>
                <div className="mt-16 max-w-4xl mx-auto space-y-8">
                    {WHATSAPP_USE_CASES.map((useCase, index) => (
                        <AnimatedElement key={useCase.title} delay={150*index}>
                            <div className="p-6 rounded-xl border border-gray-200 bg-slate-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-[#F97316]">{useCase.icon}</div>
                                    <h3 className="text-lg font-semibold font-poppins text-[#00334F]">{useCase.title}</h3>
                                </div>
                                <p className="mt-4 text-sm text-gray-600 bg-gray-100 p-3 rounded-lg font-mono tracking-tight">
                                    {useCase.steps.join(' → ')}
                                </p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
};