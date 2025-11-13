import React from 'react';
// FIX: Changed import of `Link` from 'react-router-dom' to 'react-router' to potentially resolve module resolution issues.
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { AnimatedElement } from '../animations/AnimatedElement';
import { FolderKanbanIcon, ClockIcon } from '../../assets/icons';

export const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    return (
        <AnimatedElement delay={100 * index} className="border border-gray-200 rounded-xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-sunai-blue/10 text-sunai-blue">
                        <FolderKanbanIcon className="w-6 h-6" />
                    </div>
                </div>
                <h3 className="font-bold font-poppins text-sunai-blue text-lg mt-4">{project.company_name}</h3>
                <p className="text-sm text-gray-500">{project.project_type}</p>
            </div>
            <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>Started: {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <Link to={`/dashboard/briefs/${project.id}`} className="font-semibold text-sunai-orange hover:text-orange-700">
                    View Details →
                </Link>
            </div>
        </AnimatedElement>
    );
};