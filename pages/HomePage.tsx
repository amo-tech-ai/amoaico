
import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { HOME_CORE_SERVICES, HOME_PROCESS_STEPS, HOME_RESULT_METRICS, INVESTMENT_LEVELS } from '../data';
import { CodeIcon, Share2Icon, MessageCircleIcon, ClockIcon, DollarSignIcon, TrendingUpIcon, CheckCircleIcon, CheckIcon } from '../assets/icons';

export const HomePage = ({ onStartWizard }: { onStartWizard: () => void; }) => {
    return (
        <main>
            {/* Hero Section */}
            <SectionContainer className="bg-white pt-16 md:pt-24 text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter leading-tight max-w-4xl mx-auto">
                        Turn Ideas Into <span className="text-[#F97316]">AI-Powered</span> Applications in Weeks
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Faster Launch. Smarter Automation. Measurable Growth. We build intelligent web and mobile apps that deliver results.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">Start Your AI Brief →</button>
                    <button className="px-8 py-3 rounded-lg font-semibold text-[#0F172A] border border-gray-300 hover:bg-gray-100 transition-all">See Live Projects</button>
                </AnimatedElement>
            </SectionContainer>
            
            {/* Core Services Section */}
            <SectionContainer className="bg-white pt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {HOME_CORE_SERVICES.map((service, index) => (
                        <AnimatedElement key={service.title} delay={100 * index}>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 h-full group transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                                <div className="w-12 h-12 flex items-center justify-center text-[#F97316]">{React.cloneElement(service.icon, { width: 32, height: 32 })}</div>
                                <h4 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{service.title}</h4>
                                <p className="mt-1 text-[#0F172A]/80">{service.description}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Tech Stack Section */}
            <SectionContainer className="bg-white">
                <div className="text-center">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">We Build With The Best</h2></AnimatedElement>
                    <AnimatedElement delay={100}>
                        <div className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 max-w-4xl mx-auto">
                            {["CopilotKit", "LangChain", "Supabase", "OpenAI", "Vercel"].map(logo => (
                                <span key={logo} className="text-gray-500 text-lg font-semibold hover:text-gray-800 transition-colors">{logo}</span>
                            ))}
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>

            {/* Process Section */}
            <SectionContainer className="bg-slate-50">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#0F172A]">From Brief to Production in 8 Weeks</h2></AnimatedElement>
                </div>
                <div className="mt-16 relative">
                     <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-gray-200"></div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {HOME_PROCESS_STEPS.map((step, index) => (
                            <AnimatedElement key={step.title} delay={150 * index}>
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-[#F97316] text-white flex items-center justify-center text-xl font-bold mb-4">{index + 1}</div>
                                    <h3 className="font-semibold text-[#0F172A] font-poppins">{step.title}</h3>
                                    <p className="mt-1 text-gray-600 text-sm">{step.description}</p>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Results Section */}
            <SectionContainer className="bg-white">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <AnimatedElement>
                            <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#00334F]">Results That Speak for Themselves</h2>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="mt-4 text-lg text-[#0F172A]/80">Our AI-driven approach doesn't just build apps faster—it builds them smarter, delivering tangible improvements to your key business metrics.</p>
                        </AnimatedElement>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        {HOME_RESULT_METRICS.map((metric, index) => (
                            <AnimatedElement key={metric.label} delay={150 * index} className="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-lg">
                                <p className="text-4xl md:text-5xl font-bold font-poppins text-[#00334F]">
                                    <Counter endValue={parseFloat(metric.value.replace(/[<+]/g, ''))} decimals={metric.label === "Satisfaction" ? 1 : 0} />
                                    {metric.unit}
                                </p>
                                <p className="mt-2 text-[#0F172A]/80">{metric.label}</p>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Investment Levels */}
            <SectionContainer className="bg-slate-50">
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#00334F]">Investment Levels</h2></AnimatedElement>
                 </div>
                 <div className="grid lg:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto items-center">
                    {INVESTMENT_LEVELS.map((level, i) => (
                        <AnimatedElement key={level.name} delay={100 * i} className={`p-8 rounded-2xl border ${level.recommended ? 'bg-[#00334F] text-white border-transparent shadow-2xl shadow-[#00334F]/20' : 'bg-white border-gray-200 shadow-lg'}`}>
                            {level.recommended && <div className="text-center mb-4"><span className="text-xs font-bold uppercase tracking-wider bg-[#F97316] text-white px-3 py-1 rounded-full">Recommended</span></div>}
                            <h3 className="text-2xl font-bold font-poppins text-center">{level.name}</h3>
                            <p className={`text-4xl font-bold font-poppins text-center my-4 ${level.recommended ? 'text-white' : 'text-[#00334F]'}`}>{level.price}</p>
                            <ul className="space-y-3 text-sm">
                                {level.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <CheckIcon className={`${level.recommended ? 'text-[#F97316]' : 'text-green-500'}`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedElement>
                    ))}
                 </div>
            </SectionContainer>
        </main>
    );
};
