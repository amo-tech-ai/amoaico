import React from 'react';
// FIX: Use useOutletContext to get onStartWizard from PublicLayout instead of props.
import { useOutletContext } from 'react-router-dom';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { ShoppingCartIcon, TrendingUpIcon } from '../assets/icons';

const ECOMMERCE_FEATURES = [
    { title: "Personalized Recommendations", description: "Increase average order value with AI-driven product suggestions." },
    { title: "Dynamic Pricing Engines", description: "Optimize pricing in real-time based on demand and competitor analysis." },
    { title: "Conversational Commerce", description: "Guide customers to purchase via intelligent chatbots on any platform." },
    { title: "Fraud Detection", description: "Minimize chargebacks and protect your revenue with AI-powered security." },
];

interface PublicLayoutContext {
  onStartWizard: () => void;
}

export const EcommercePage = () => {
    const { onStartWizard } = useOutletContext<PublicLayoutContext>();
    return (
        <main>
            <SectionContainer className="bg-white text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter max-w-4xl mx-auto">
                        AI E-Commerce Solutions
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Shop with intelligence. Drive conversions and customer loyalty with AI-powered e-commerce.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8">
                    <button onClick={onStartWizard} className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">Start Your AI Brief →</button>
                </AnimatedElement>
            </SectionContainer>

            <SectionContainer className="bg-slate-50" contained={true}>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#0F172A]">Boost Your Bottom Line</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ECOMMERCE_FEATURES.map((feature, index) => (
                        <AnimatedElement key={feature.title} delay={100 * index}>
                            <div className="p-6 rounded-xl border border-gray-100 bg-white h-full text-center flex flex-col items-center">
                                 <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#FFD6B0]/40 text-[#0F172A]"><TrendingUpIcon className="w-8 h-8" /></div>
                                <h3 className="mt-4 text-lg font-semibold font-poppins text-[#00334F]">{feature.title}</h3>
                                <p className="mt-2 text-sm text-[#0F172A]/80 flex-grow">{feature.description}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
};