import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { ArrowRightIcon } from '../assets/icons';

const mockPosts = [
    { title: "The Rise of AI Agents: A Guide for Businesses", category: "AI Strategy", date: "August 15, 2024" },
    { title: "Building Your First RAG Application with Supabase", category: "Tutorial", date: "August 10, 2024" },
    { title: "How AI-Powered Automation Can 5x Your Team's Productivity", category: "Case Study", date: "August 5, 2024" },
];

export const ResourcesPage = () => {
    return (
        <main>
            <SectionContainer className="text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        Insights & Resources
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-2xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        Explore our latest articles, tutorials, and case studies on AI development and business automation.
                    </p>
                </AnimatedElement>
            </SectionContainer>

            <SectionContainer>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockPosts.map((post, index) => (
                        <AnimatedElement key={post.title} delay={100 * index}>
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg h-full group flex flex-col">
                                <div className="flex-grow">
                                    <span className="text-sm font-semibold text-[#F97316]">{post.category}</span>
                                    <h3 className="mt-2 text-xl font-bold font-poppins text-[#00334F] group-hover:text-[#F97316] transition-colors">{post.title}</h3>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <span className="text-xs text-gray-500">{post.date}</span>
                                    <button className="flex items-center gap-2 font-semibold text-sm text-[#00334F] group-hover:text-[#F97316] transition-colors">
                                        Read More <ArrowRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </AnimatedElement>
                    ))}
                </div>
                 <AnimatedElement className="text-center mt-16">
                     <p className="text-gray-600">More content coming soon...</p>
                 </AnimatedElement>
            </SectionContainer>
        </main>
    );
};