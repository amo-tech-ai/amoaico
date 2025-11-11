import React from 'react';
import { SectionContainer } from '../components/layout/SectionContainer';
import { AnimatedElement } from '../components/animations/AnimatedElement';
import { Counter } from '../components/animations/Counter';
import { PROJECTS_DATA, PROJECTS_METRICS } from '../data';

const ProjectCard = ({ project, index }: { project: typeof PROJECTS_DATA[0], index: number }) => (
    <AnimatedElement delay={200 * index} className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-8">
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-2xl font-bold font-poppins text-[#00334F]">{project.name}</h3>
                    <p className="text-md text-[#F97316] font-semibold">{project.subtitle}</p>
                </div>
                 <span className="text-xs font-bold uppercase tracking-wider bg-[#F97316]/10 text-[#F97316] px-3 py-1 rounded-full whitespace-nowrap">{project.roiBadge}</span>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 my-8 text-center">
                {project.metrics.map(metric => (
                     <div key={metric.label}>
                         <p className="text-3xl font-bold font-poppins text-[#00334F] flex items-center justify-center gap-1">
                             {metric.icon}
                             <span>{metric.prefix}<Counter endValue={parseFloat(metric.value)} decimals={metric.decimals || 0} />{metric.unit}</span>
                         </p>
                        <p className="text-sm text-gray-500 mt-1">{metric.label}</p>
                     </div>
                ))}
            </div>

            <div className="text-sm space-y-4 text-gray-700">
                <p><strong className="text-gray-900">Challenge:</strong> {project.challenge}</p>
                <p><strong className="text-gray-900">Solution:</strong> {project.solution}</p>
            </div>
            
            <div className="mt-8">
                <p className="font-semibold text-sm text-gray-400 uppercase tracking-wider">Tech Stack</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map(tech => (
                        <span key={tech} className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-1 rounded-full">{tech}</span>
                    ))}
                </div>
            </div>
        </div>
         <div className="bg-slate-50 p-8 border-t border-gray-200">
            <blockquote className="text-gray-800 italic">"{project.testimonial.quote}"</blockquote>
            <p className="text-right mt-4 font-semibold text-[#00334F]">— {project.testimonial.author}, <span className="font-normal text-gray-600">{project.testimonial.title}</span></p>
        </div>
    </AnimatedElement>
);

export const ProjectsPage = () => {
    return (
        <main>
            <SectionContainer className="bg-white text-center">
                <AnimatedElement>
                    <h1 className="text-4xl md:text-6xl font-bold font-poppins text-[#0F172A] tracking-tighter">
                        Proven Results, Tangible ROI
                    </h1>
                </AnimatedElement>
                <AnimatedElement delay={100}>
                    <p className="max-w-3xl mx-auto mt-6 text-lg text-[#0F172A]/80">
                        We don't just build technology; we build business assets. Our projects are designed from day one to deliver measurable improvements to your key performance indicators.
                    </p>
                </AnimatedElement>
            </SectionContainer>
            
             <SectionContainer className="bg-slate-50 py-16 md:py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
                    {PROJECTS_METRICS.map((metric, index) => (
                        <AnimatedElement key={metric.label} delay={100 * index}>
                            <p className="text-4xl md:text-5xl font-bold font-poppins text-[#00334F]">
                                <Counter endValue={parseFloat(metric.value)} decimals={metric.label.includes('.') ? 1 : 0} />{metric.unit || ''}
                            </p>
                            <p className="mt-2 text-gray-600">{metric.label}</p>
                        </AnimatedElement>
                    ))}
                </div>
            </SectionContainer>

            <SectionContainer className="bg-[#FFF9F5]">
                <div className="space-y-20 max-w-4xl mx-auto">
                    {PROJECTS_DATA.map((project, index) => (
                        <ProjectCard key={project.name} project={project} index={index} />
                    ))}
                </div>
            </SectionContainer>
        </main>
    );
};