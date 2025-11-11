import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { PROJECTS_PAGE_STORIES, PROJECTS_TECH_STACK } from '../data';
import { ExternalLinkIcon } from '../assets/icons';

const ProjectStoryCard = ({ story }: { story: typeof PROJECTS_PAGE_STORIES[0] }) => {
    return (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column: Project Details */}
            <div className="flex flex-col gap-8">
                <div>
                    <span className="text-sm font-medium bg-orange-100 text-orange-600 px-3 py-1 rounded-full">{story.industry}</span>
                    <h3 className="mt-4 text-4xl font-bold font-poppins text-[#00334F]">{story.name}</h3>
                    <p className="mt-1 text-lg font-semibold text-[#F97316]">{story.subtitle}</p>
                </div>

                <div>
                    <h4 className="font-semibold text-[#0F172A]">The Challenge</h4>
                    <p className="mt-2 text-gray-600">{story.challenge}</p>
                </div>
                
                <div>
                    <h4 className="font-semibold text-[#0F172A]">Our Solution</h4>
                    <p className="mt-2 text-gray-600">{story.solution}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                    {story.metrics.map(metric => (
                        <div key={metric.label} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                            <p className="text-2xl font-bold font-poppins text-[#00334F]">
                                {metric.prefix || ''}
                                <Counter endValue={parseFloat(metric.value)} decimals={metric.value.includes('.') ? 1 : 0} />
                                {metric.unit}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
                        </div>
                    ))}
                </div>
                
                <div>
                    <p className="text-sm font-semibold text-gray-500 mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                        {story.techStack.map(tech => (
                            <span key={tech} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-md">{tech}</span>
                        ))}
                    </div>
                </div>

                <button className="px-6 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105 self-start">
                    Start Similar Project →
                </button>
            </div>
            
            {/* Right Column: Testimonial & Image */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg mt-8 lg:mt-0">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-amber-200 rounded-lg flex items-center justify-center">
                    <ExternalLinkIcon className="w-12 h-12 text-gray-400" />
                </div>
                <blockquote className="mt-6 text-gray-700 italic">
                    "{story.testimonial.quote}"
                </blockquote>
                <p className="text-right mt-4 font-semibold text-[#00334F]">
                    — {story.testimonial.author}, <span className="font-normal text-gray-600">{story.testimonial.title}</span>
                </p>
                <button className="w-full mt-6 px-5 py-2.5 rounded-lg font-medium text-sm text-[#0F172A] border border-gray-300 hover:bg-gray-100 transition-all">
                    Read Full Case Study
                </button>
            </div>
        </div>
    );
};

export const ProjectsPage = () => {
    return (
        <main className="bg-[#FFF9F5]">
            {/* Hero Section */}
            <SectionContainer className="bg-[#0F172A] text-white text-center">
                <AnimatedElement>
                    <span className="text-sm font-semibold bg-white/10 text-white px-4 py-1.5 rounded-full">We Move At YOUR Speed</span>
                    <h1 className="mt-6 text-4xl md:text-6xl font-bold font-poppins tracking-tight">
                        Our AI <span className="text-[#F97316]">Success Stories</span>
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-300">
                        Discover how we've transformed businesses with AI applications delivered in 8 weeks. Real projects. Real results. Real impact.
                    </p>
                </AnimatedElement>
                <AnimatedElement delay={200} className="mt-8">
                    <button className="px-8 py-3 rounded-lg font-semibold bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 hover:opacity-90 transition-all transform hover:scale-105">
                        Start Your Project
                    </button>
                </AnimatedElement>
            </SectionContainer>

            {/* Featured Success Stories */}
            <SectionContainer>
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight text-[#0F172A]">
                            Featured <span className="text-[#F97316]">Success Stories</span>
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Real AI applications we've delivered to brand-new or local businesses in just 8 weeks
                        </p>
                    </AnimatedElement>
                </div>
                <div className="mt-20 space-y-24 max-w-6xl mx-auto">
                    {PROJECTS_PAGE_STORIES.map((story) => (
                        <AnimatedElement key={story.name}>
                            <ProjectStoryCard story={story} />
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
            
            {/* Tech Stack Section */}
            <SectionContainer className="bg-[#0F172A] text-white">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement>
                        <h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tight">We Build With The Best</h2>
                        <p className="mt-4 text-lg text-gray-300">Over 20 cutting-edge AI tools and proven technologies to bring your vision to life</p>
                    </AnimatedElement>
                </div>
                <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PROJECTS_TECH_STACK.map((category, index) => (
                        <AnimatedElement key={category.title} delay={100 * index}>
                            <div className="bg-slate-800/50 p-6 rounded-xl h-full border border-slate-700">
                                <h3 className="font-semibold font-poppins text-white">{category.title}</h3>
                                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                                    {category.technologies.map(tech => <li key={tech}>{tech}</li>)}
                                </ul>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                    <AnimatedElement delay={0}>
                        <p className="text-5xl font-bold font-poppins">20+</p>
                        <p className="text-gray-400 mt-1">Technical Platforms Mastered</p>
                    </AnimatedElement>
                     <AnimatedElement delay={100}>
                        <p className="text-5xl font-bold font-poppins">98.8%</p>
                        <p className="text-gray-400 mt-1">Avg AI Accuracy</p>
                    </AnimatedElement>
                     <AnimatedElement delay={200}>
                        <p className="text-5xl font-bold font-poppins">24/7</p>
                        <p className="text-gray-400 mt-1">Support & Uptime</p>
                    </AnimatedElement>
                </div>
            </SectionContainer>
            
            {/* CTA Section */}
            <SectionContainer className="bg-gradient-to-b from-[#FFF9F5] to-orange-50">
                 <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-12 sm:p-16 rounded-3xl text-center relative overflow-hidden">
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/10 rounded-full"></div>
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full"></div>
                    <AnimatedElement>
                        <span className="text-sm font-semibold bg-white/20 px-4 py-1.5 rounded-full">ARE WE A FIT FOR EACH OTHER?</span>
                        <h2 className="mt-6 text-3xl md:text-5xl font-bold font-poppins tracking-tight">Ready to Be Our Next Success Story?</h2>
                        <p className="mt-4 text-lg text-orange-100 max-w-3xl mx-auto">
                            Transform your business with AI applications delivered in just 8 weeks. Join the companies already achieving 3-10x ROI with our proven process.
                        </p>
                    </AnimatedElement>
                     <AnimatedElement delay={200} className="mt-8">
                        <button className="px-8 py-3 rounded-lg font-semibold bg-white text-[#F97316] shadow-lg hover:opacity-90 transition-all transform hover:scale-105">
                            Start Your Project Journey
                        </button>
                    </AnimatedElement>
                 </div>
            </SectionContainer>
        </main>
    );
};
