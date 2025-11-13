import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getProjectsForUser } from '../../services/briefService';
import { Project } from '../../types';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { AnimatedElement } from '../../components/animations/AnimatedElement';
import { ProjectCard } from '../../components/dashboard/ProjectCard';
import { RocketIcon, XIcon } from '../../assets/icons';

export const ProjectsListPage = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const data = await getProjectsForUser(user.id);
                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Could not load your projects. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [user]);

    return (
        <SectionContainer className="pt-8 md:pt-12">
            <AnimatedElement>
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-sunai-slate tracking-tighter">
                    Active Projects
                </h1>
                 <p className="mt-1 text-lg text-sunai-slate/80">
                    A list of your briefs that have been approved and are in progress.
                </p>
            </AnimatedElement>
            
            <div className="mt-8">
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="border border-gray-200 rounded-xl p-6 bg-white animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/3 mt-6"></div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <AnimatedElement className="text-center py-16 border-2 border-dashed border-red-300 rounded-2xl bg-red-50/50">
                        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                            <XIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-red-800">Something Went Wrong</h2>
                        <p className="mt-2 text-red-700">{error}</p>
                    </AnimatedElement>
                ) : projects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                ) : (
                    <AnimatedElement className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <RocketIcon className="w-8 h-8 text-gray-500" strokeWidth="2" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold font-poppins text-sunai-blue">No Active Projects</h2>
                        <p className="mt-2 text-gray-600">Once a brief is approved, it will appear here as an active project.</p>
                    </AnimatedElement>
                )}
            </div>
        </SectionContainer>
    );
};