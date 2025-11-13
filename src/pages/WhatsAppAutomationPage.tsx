import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { 
    WHATSAPP_METRICS, 
    WHATSAPP_CORE_SERVICES, 
    WHATSAPP_USE_CASES,
    WHATSAPP_RESULTS,
    WHATSAPP_PROCESS,
    WHATSAPP_TECHNOLOGIES,
    WHATSAPP_FAQ
} from '../data';
import { WhatsAppIcon, ArrowDownRightIcon, ArrowUpRightIcon, ChevronDownIcon, XIcon, CheckIcon } from '../assets/icons';

const FaqItem = ({ q, a }: { q: string, a: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-700 py-6">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left gap-4">
                <h4 className="text-lg font-medium text-white">{q}</h4>
                {isOpen 
                    ? <XIcon className="w-6 h-6 text-gray-400 flex-shrink-0" /> 
                    : <ChevronDownIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />}
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-300">
                    <p>{a}</p>
                </div>
            )}
        </div>
    );
};

interface PublicLayoutContext {
  onStartWizard: () => void;
}

export const WhatsAppAutomationPage = () => {
    const { onStartWizard } = useOutletContext<PublicLayoutContext>();
    return (
        <main className="bg-white">
            {/* Hero Section */}
            <SectionContainer className="bg-gradient-to-b from-gray-50 to-white text-center">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="text-left">
                        <AnimatedElement>
                            <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                                Automate, Sell & Support — All on <span className="text-whatsapp-green">WhatsApp</span>
                            </h1>
                        </AnimatedElement>
                        <AnimatedElement delay={100}>
                            <p className="mt-6 text-lg text-[#0F172A]/80">
                                We help businesses turn WhatsApp into a 24/7 sales and customer service channel — powered by automation, AI agents, and real data. No delays. No missed messages. Just seamless conversations that convert into revenue.
                            </p>
                        </AnimatedElement>
                        <AnimatedElement delay={200} className="mt-8">
                            <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">
                                Start Your AI Brief →
                            </button>
                        </AnimatedElement>
                    </div>
                    <AnimatedElement delay={150}>
                        <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-sm mx-auto border border-gray-100">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-whatsapp-green rounded-full flex items-center justify-center text-white"><WhatsAppIcon className="w-6 h-6"/></div>
                                    <div>
                                        <p className="font-semibold text-[#0F172A]">AMO AI Assistant</p>
                                        <p className="text-xs text-green-600">Always Active</p>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <p className="bg-gray-200 text-gray-800 text-sm p-3 rounded-lg w-fit">Hi! How can I help you today? 👋</p>
                                    <p className="bg-gray-200 text-gray-800 text-sm p-3 rounded-lg w-fit">Check my order status</p>
                                    <p className="bg-whatsapp-green text-white text-sm p-3 rounded-lg w-fit self-end ml-auto">Your order #4821 is out for delivery! 📦</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>

            {/* Why It Matters Section */}
            <SectionContainer className="bg-[#111] text-white">
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">Why WhatsApp Automation Matters</h2>
                        <p className="mt-4 text-lg text-gray-300">Your customers are already on WhatsApp — your business should be too. We connect your brand to them with AI-powered chat flows, CRM integrations, and automated campaigns that scale your communication and sales — all through the official WhatsApp Business API.</p>
                    </AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {WHATSAPP_METRICS.map((metric, index) => (
                        <AnimatedElement key={metric.label} delay={100 * index}>
                            <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 h-full">
                                <p className="text-5xl font-bold font-poppins text-whatsapp-green">{metric.value}</p>
                                <h3 className="mt-2 text-xl font-semibold font-poppins">{metric.label}</h3>
                                <p className="mt-2 text-gray-400">{metric.subtext}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>

            {/* Core Services Section */}
            <SectionContainer className="bg-gray-50">
                <div className="text-center max-w-3xl mx-auto"><AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight text-[#0F172A]">Our Core Services</h2></AnimatedElement></div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {WHATSAPP_CORE_SERVICES.map((service, index) => (
                        <AnimatedElement key={service.title} delay={100 * index}>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 h-full shadow-lg">
                                <div className="w-12 h-12 flex items-center justify-center text-whatsapp-green">{service.icon}</div>
                                <h3 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{service.title}</h3>
                                <p className="text-sm text-gray-500">{service.subtitle}</p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                                    {service.points.map(point => <li key={point} className="flex items-start gap-2"><CheckIcon className="w-4 h-4 mt-0.5 text-whatsapp-green flex-shrink-0" /><span>{point}</span></li>)}
                                </ul>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Real-World Use Cases */}
            <SectionContainer className="bg-[#111] text-white">
                <div className="text-center max-w-3xl mx-auto"><AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">Real-World Use Cases</h2></AnimatedElement></div>
                <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {WHATSAPP_USE_CASES.map((useCase, index) => (
                        <AnimatedElement key={useCase.title} delay={150*index}>
                            <div className="p-8 rounded-2xl border border-gray-800 bg-gray-900/50 h-full">
                                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-whatsapp-green">{useCase.icon}</div>
                                <h3 className="mt-4 text-xl font-semibold font-poppins">{useCase.title}</h3>
                                <p className="mt-4 text-sm text-gray-400 bg-gray-800/60 p-3 rounded-lg font-mono tracking-tight">{useCase.steps.join('')}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Results Section */}
            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto"><AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight text-[#0F172A]">Results That Speak</h2><p className="mt-2 text-gray-600">Average improvement from our WhatsApp automation clients</p></AnimatedElement></div>
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {WHATSAPP_RESULTS.map((result, index) => (
                        <AnimatedElement key={result.label} delay={100*index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-xl">
                            <p className="text-gray-500 text-sm">{result.label}</p>
                            <div className="mt-2 flex items-center gap-4">
                                <p className="text-2xl font-semibold text-gray-400 line-through">{result.before}</p>
                                {result.improved ? <ArrowDownRightIcon className="text-red-500 w-6 h-6"/> : <ArrowUpRightIcon className="text-green-500 w-6 h-6"/>}
                                <p className="text-3xl font-bold font-poppins text-whatsapp-green">{result.after}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>

            {/* Process Section */}
            <SectionContainer className="bg-[#111] text-white">
                <div className="text-center max-w-3xl mx-auto"><AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">The AMO AI WhatsApp Process</h2></AnimatedElement></div>
                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                    {WHATSAPP_PROCESS.map((step, index) => (
                        <AnimatedElement key={step.step} delay={100*index} className="flex flex-col">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-whatsapp-green text-black flex items-center justify-center font-bold text-lg">{step.step}</div>
                                <div>
                                    <h3 className="font-semibold font-poppins text-white">{step.title}</h3>
                                    <p className="text-xs text-whatsapp-green font-semibold">{step.subtitle}</p>
                                </div>
                            </div>
                            <p className="mt-4 text-sm text-gray-400">{step.description}</p>
                        </AnimatedElement>
                    ))}
                </div>
                <AnimatedElement className="text-center mt-16">
                     <button className="px-8 py-3 rounded-lg font-semibold bg-whatsapp-green text-black shadow-lg shadow-green-500/20 hover:opacity-90 transition-all transform hover:scale-105">Launch in as little as 2 weeks</button>
                </AnimatedElement>
            </SectionContainer>

            {/* Tech Stack & FAQ */}
            <SectionContainer className="bg-white grid lg:grid-cols-2 gap-16 items-start">
                 <div>
                    <AnimatedElement>
                        <h2 className="text-3xl font-bold font-poppins tracking-tight text-[#0F172A]">Built on Proven Technology</h2>
                    </AnimatedElement>
                    <AnimatedElement delay={100}>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {WHATSAPP_TECHNOLOGIES.map(tech => (
                                <span key={tech} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg">{tech}</span>
                            ))}
                        </div>
                    </AnimatedElement>
                 </div>
                 <div>
                    <AnimatedElement>
                        <h2 className="text-3xl font-bold font-poppins tracking-tight text-[#0F172A]">Frequently Asked Questions</h2>
                    </AnimatedElement>
                    <AnimatedElement delay={100} className="mt-8 text-black">
                        {WHATSAPP_FAQ.map((faq, index) => (
                            <FaqItem key={index} q={faq.q} a={faq.a} />
                        ))}
                    </AnimatedElement>
                 </div>
            </SectionContainer>

            {/* Final CTA */}
            <SectionContainer className="bg-whatsapp-green text-black">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">Let's automate your business on WhatsApp — start today.</h2>
                        <p className="mt-4 text-lg text-gray-800">Whether you want faster sales responses, automated booking, or AI-driven campaigns, our team will design and deploy your WhatsApp system — from strategy to launch.</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-white text-black shadow-lg hover:opacity-90 transition-all transform hover:scale-105">Start Your AI Brief</button>
                            <button className="px-8 py-3 rounded-lg font-semibold bg-black text-white hover:opacity-90 transition-all">Start Free Trial</button>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
        </main>
    );
};