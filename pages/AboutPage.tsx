import React from 'react';
import { Link } from 'react-router-dom';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import {
    ABOUT_PAGE_HERO_METRICS,
    ABOUT_PAGE_MISSION_VISION,
    ABOUT_PAGE_WHY_CHOOSE_US,
    ABOUT_PAGE_WHY_CHOOSE_US_METRICS,
    ABOUT_PAGE_PROCESS_STEPS,
    ABOUT_PAGE_TESTIMONIALS,
    ABOUT_PAGE_TRUSTED_METRICS,
    ABOUT_PAGE_BUILD_FUTURE_CARDS
} from '../data';
import { CheckIcon, StarIcon } from '../assets/icons';

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
        {[...Array(rating)].map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
    </div>
);

export const AboutPage = () => {
    return (
        <main className="bg-[#0F172A] text-white">
            {/* Hero Section */}
            <SectionContainer className="text-center pt-24 md:pt-32">
                <AnimatedElement>
                    <span className="text-sm font-semibold bg-white/10 text-white px-4 py-1.5 rounded-full">ABOUT SUNAI</span>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold font-poppins tracking-tight">
                        We Help Businesses Launch <br />
                        <span className="text-[#F97316]">AI-Powered</span> Applications in <br />
                        Weeks, Not Months
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-300">
                        Our mission is to democratize AI technology by making it accessible, practical, and profitable for businesses of all sizes.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105 w-full sm:w-auto">Get Started Today</button>
                    <Link to="/projects" className="px-8 py-3 rounded-lg font-semibold text-white border border-gray-700 bg-white/5 hover:bg-white/10 transition-all w-full sm:w-auto">See Our Work</Link>
                </AnimatedElement>
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {ABOUT_PAGE_HERO_METRICS.map((metric, index) => (
                        <AnimatedElement key={metric.label} delay={100 * index} className="text-center">
                            <p className="text-4xl font-bold font-poppins text-white">
                                <Counter endValue={parseFloat(metric.value)} />{metric.unit}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">{metric.label}</p>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>

            {/* Mission & Vision Section */}
            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">Our Mission & Vision</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {ABOUT_PAGE_MISSION_VISION.map((item, index) => (
                        <AnimatedElement key={item.title} delay={100 * index}>
                            <div className="bg-slate-800/50 p-8 rounded-2xl border border-gray-800 h-full text-center">
                                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-[#F97316]/10 text-[#F97316] mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold font-poppins text-white">{item.title}</h3>
                                <p className="mt-2 text-gray-400">{item.description}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Why Choose Us Section */}
            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">Why Choose Sunai?</h2>
                        <p className="mt-4 text-lg text-gray-300">We combine speed, quality, and AI expertise to deliver live AI applications that drive real business value.</p>
                    </AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ABOUT_PAGE_WHY_CHOOSE_US.map((item, index) => (
                        <AnimatedElement key={item.title} delay={100 * index}>
                            <div className="bg-slate-800/50 p-6 rounded-xl h-full border border-gray-800">
                                <div className="w-12 h-12 flex items-center justify-center text-[#F97316]">{item.icon}</div>
                                <h3 className="mt-4 text-lg font-semibold font-poppins text-white">{item.title}</h3>
                                <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                                <p className="mt-4 text-xs font-semibold text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded-md inline-block">{item.highlight}</p>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800 border border-gray-800 rounded-2xl overflow-hidden max-w-4xl mx-auto">
                    {ABOUT_PAGE_WHY_CHOOSE_US_METRICS.map((metric) => (
                         <div key={metric.label} className="bg-[#0F172A] p-8 text-center">
                            <p className="text-4xl font-bold font-poppins text-white">
                                <Counter endValue={parseFloat(metric.value)} />{metric.unit}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </SectionContainer>

            {/* 8-Week Process Section */}
            <SectionContainer className="bg-white text-[#0F172A]">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight text-[#0F172A]">Our 8-Week Process</h2>
                    <p className="mt-4 text-lg text-gray-600">A proven methodology that takes you from idea to live AI application in just 8 weeks.</p>
                    </AnimatedElement>
                </div>
                <div className="mt-20 max-w-3xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200" aria-hidden="true"></div>
                         {ABOUT_PAGE_PROCESS_STEPS.map((step) => (
                            <AnimatedElement key={step.step} className="relative flex items-start gap-6 my-8">
                                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-[#F97316] text-white font-bold text-lg z-10">{step.step}</div>
                                <div className="bg-white p-6 rounded-xl border-2 border-gray-100 flex-grow">
                                    <h3 className="text-xl font-bold font-poppins text-[#00334F]">{step.title}</h3>
                                    <p className="text-gray-600 mt-2">{step.description}</p>
                                    <div className="mt-4">
                                        <p className="text-sm font-semibold text-gray-500">Key Deliverables:</p>
                                        <ul className="mt-2 space-y-1 text-sm text-gray-700">
                                            {step.deliverables.map(d => <li key={d} className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500" /><span>{d}</span></li>)}
                                        </ul>
                                    </div>
                                </div>
                            </AnimatedElement>
                        ))}
                    </div>
                </div>
            </SectionContainer>

            {/* Journey CTA */}
            <SectionContainer>
                <AnimatedElement>
                    <div className="bg-slate-800/50 p-12 rounded-2xl border border-gray-800 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold font-poppins">Ready to Start Your 8-Week Journey?</h2>
                        <p className="mt-3 text-gray-300">Let's discuss your AI vision and create a custom roadmap to bring it to life.</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 rounded-lg font-semibold bg-white text-[#0F172A] hover:bg-gray-200 transition-colors">Schedule a Call</button>
                            <button className="px-6 py-3 rounded-lg font-semibold bg-[#F97316] text-white hover:opacity-90">Submit AI Brief</button>
                        </div>
                        <div className="mt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-400">
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500" /> Fixed Timeline</span>
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500" /> Transparent Pricing</span>
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500" /> Proven ROI</span>
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4 text-green-500" /> 30-Day Support</span>
                        </div>
                    </div>
                </AnimatedElement>
            </SectionContainer>
            
            {/* Trusted By Section */}
            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">Trusted by 50+ Companies</h2>
                        <p className="mt-4 text-lg text-gray-300">From startups to enterprises, we help businesses launch AI-powered solutions fast.</p>
                    </AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ABOUT_PAGE_TESTIMONIALS.map((t, i) => (
                        <AnimatedElement key={i} delay={100 * i}>
                            <div className="bg-slate-800/50 p-8 rounded-2xl border border-gray-800 h-full flex flex-col">
                                <div className="flex justify-between items-center">
                                    <StarRating rating={t.stars} />
                                    <div>
                                        <p className="font-bold text-lg">{t.rating}</p>
                                        <p className="text-xs text-gray-400">{t.category}</p>
                                    </div>
                                </div>
                                <blockquote className="mt-4 text-gray-300 italic flex-grow">"{t.quote}"</blockquote>
                                <div className="mt-6 border-t border-gray-700 pt-6">
                                    <p className="font-semibold text-white">{t.author}</p>
                                    <p className="text-sm text-gray-400">{t.company}</p>
                                    <p className="mt-3 text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-md inline-block">{t.metric}</p>
                                </div>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-800/50 p-8 rounded-2xl border border-gray-800 max-w-4xl mx-auto">
                    {ABOUT_PAGE_TRUSTED_METRICS.map(metric => (
                        <div key={metric.label} className="text-center">
                            <p className="text-3xl font-bold font-poppins text-white">
                                <Counter endValue={parseFloat(metric.value)} decimals={metric.value.includes('.') ? 1 : 0} />{metric.unit}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Build Future CTA */}
            <SectionContainer>
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">Ready to Build Your AI-Powered Future?</h2>
                        <p className="mt-4 text-lg text-gray-300">Join 50+ companies that have transformed their business with our rapid AI development process.</p>
                    </AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {ABOUT_PAGE_BUILD_FUTURE_CARDS.map((card, i) => (
                        <AnimatedElement key={card.title} delay={100*i}>
                            <div className={`p-8 rounded-2xl border h-full text-center ${card.primary ? 'bg-[#F97316] text-white border-transparent' : 'bg-slate-800/50 border-gray-800'}`}>
                                <div className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-4 ${card.primary ? 'bg-white/20 text-white' : 'bg-[#F97316]/10 text-[#F97316]'}`}>{card.icon}</div>
                                <h3 className="text-xl font-semibold font-poppins">{card.title}</h3>
                                <p className={`mt-2 ${card.primary ? 'text-orange-100' : 'text-gray-400'}`}>{card.description}</p>
                                <button className={`mt-6 w-full px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${card.primary ? 'bg-white text-[#F97316]' : 'bg-slate-700/50 hover:bg-slate-700 text-white'}`}>{card.cta}</button>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
             {/* Final Transformation CTA */}
            <SectionContainer className="bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-12 sm:p-16 rounded-3xl text-center">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tight">Let's Start Your 8-Week AI Transformation</h2>
                        <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-orange-100">
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4" /> Fixed timeline</span>
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4" /> Transparent pricing</span>
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4" /> Proven ROI</span>
                           <span className="flex items-center gap-2"><CheckIcon className="w-4 h-4" /> 30-day support</span>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-3 rounded-lg font-semibold bg-white text-[#F97316] shadow-lg hover:opacity-90 transition-all transform hover:scale-105">Start Your Project Today</button>
                            <Link to="/projects" className="px-8 py-3 rounded-lg font-semibold text-white border-2 border-white/50 hover:bg-white/10 transition-all">View Success Stories</Link>
                        </div>
                    </AnimatedElement>
                </div>
            </SectionContainer>
        </main>
    );
};
