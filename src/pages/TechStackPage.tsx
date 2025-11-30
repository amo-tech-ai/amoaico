
import React, { useState } from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { TECH_STACK_WHY_FEATURES, TECH_STACK_CORE_FRAMEWORKS, TECH_STACK_USE_CASES, TECH_STACK_FAQ } from '../data';
import { CheckIcon, PlusCircleIcon, XIcon } from '../assets/icons';

const FaqItem: React.FC<{ q: string, a: string }> = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-6">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left gap-4 group">
                <h4 className="text-lg font-semibold text-sunai-blue group-hover:text-sunai-orange transition-colors">{q}</h4>
                {isOpen 
                    ? <XIcon className="w-6 h-6 text-gray-500 flex-shrink-0" /> 
                    : <PlusCircleIcon className="w-6 h-6 text-sunai-orange flex-shrink-0" />
                }
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="mt-4 text-sunai-slate/80">
                        <p>{a}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const TechStackPage = () => {
    return (
        <main>
            <SectionContainer className="bg-white text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-sunai-slate tracking-tighter">
                        Built on a Modern Foundation
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-3xl mx-auto mt-6 text-lg text-sunai-slate/80">
                        We leverage a curated stack of enterprise-grade, open-source technologies to build scalable, secure, and intelligent applications faster than ever before.
                    </p>
                </AnimatedElement>
            </SectionContainer>
            
            <SectionContainer className="bg-slate-50">
                 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TECH_STACK_WHY_FEATURES.map((feature, index) => (
                        <AnimatedElement key={feature.title} delay={100 * index} className="text-center">
                            <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-white text-sunai-orange shadow-md mb-4">{feature.icon}</div>
                            <h3 className="font-semibold text-sunai-blue">{feature.title}</h3>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-sunai-slate">Core Frameworks</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {TECH_STACK_CORE_FRAMEWORKS.map((framework, index) => (
                        <AnimatedElement key={framework.title} delay={100*index}>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg h-full">
                                <h3 className="text-2xl font-bold font-poppins text-sunai-blue">{framework.title}</h3>
                                <p className="font-semibold text-sunai-orange text-sm">{framework.tagline}</p>
                                <p className="mt-4 text-gray-700">{framework.copy}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            <SectionContainer className="bg-slate-50">
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-sunai-slate">Real-World Use Cases</h2></AnimatedElement>
                </div>
                 <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {TECH_STACK_USE_CASES.map((useCase, index) => (
                        <AnimatedElement key={useCase.title} delay={150 * index} className="bg-white p-6 rounded-xl border border-gray-200">
                             <h4 className="font-semibold font-poppins text-sunai-blue">{useCase.title}</h4>
                            <p className="mt-2 text-gray-600">{useCase.description}</p>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>

            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-sunai-slate">Frequently Asked Questions</h2></AnimatedElement>
                </div>
                <div className="mt-16 max-w-3xl mx-auto">
                    {TECH_STACK_FAQ.map((faq, index) => (
                         <AnimatedElement key={index} delay={100 * index}>
                            <FaqItem q={faq.q} a={faq.a} />
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
};
