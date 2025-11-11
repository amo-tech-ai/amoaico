import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { CheckIcon } from '../assets/icons';

const values = ["Innovation", "Transparency", "Velocity", "Results"];
const teamMembers = [
    { name: "Jane Doe", title: "Founder & CEO" },
    { name: "John Smith", title: "Lead AI Engineer" },
    { name: "Emily White", title: "Head of Product" },
    { name: "Michael Brown", title: "Senior Frontend Developer" },
];

export const AboutPage = () => {
    return (
        <main>
            <SectionContainer className="text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        We are Sunai
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-3xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        We are a dedicated team of engineers, designers, and strategists passionate about building intelligent applications that solve real-world business problems and deliver measurable results.
                    </p>
                </AnimatedElement>
            </SectionContainer>

            <SectionContainer className="bg-slate-50">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <AnimatedElement>
                            <h2 className="text-3xl md:text-4xl font-bold font-poppins tracking-tighter text-[#00334F]">Our Mission</h2>
                            <p className="mt-4 text-lg text-[#0F172A]/80">
                                To empower businesses of all sizes to leverage the power of artificial intelligence, transforming complex challenges into opportunities for growth and innovation.
                            </p>
                        </AnimatedElement>
                    </div>
                    <div>
                        <AnimatedElement delay={100}>
                            <h3 className="text-2xl font-semibold font-poppins text-[#00334F]">Our Core Values</h3>
                            <div className="mt-6 grid grid-cols-2 gap-4">
                                {values.map(value => (
                                    <div key={value} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="font-medium text-[#00334F]">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </AnimatedElement>
                    </div>
                </div>
            </SectionContainer>

            <SectionContainer>
                 <div className="text-center max-w-3xl mx-auto">
                    <AnimatedElement><h2 className="text-3xl md:text-5xl font-bold font-poppins tracking-tighter text-[#0F172A]">Meet the Team</h2></AnimatedElement>
                </div>
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <AnimatedElement key={member.name} delay={100 * index} className="text-center">
                            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4">
                                <img src={`https://i.pravatar.cc/150?u=${member.name}`} alt={member.name} className="w-full h-full rounded-full object-cover" />
                            </div>
                            <h4 className="font-semibold font-poppins text-[#00334F]">{member.name}</h4>
                            <p className="text-sm text-gray-500">{member.title}</p>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
};